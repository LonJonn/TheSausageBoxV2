import puppeteer, { ResourceType } from "puppeteer";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import { createCursor } from "ghost-cursor";

// prettier-ignore
puppeteerExtra
  .use(StealthPlugin())
  .use(
    RecaptchaPlugin({
      provider: {
        id: "2captcha",
        token: process.env.API_KEY,
      },
    })
  );

export type AuthResponse = {
  success: boolean;
  data?: {
    expires: number; // In UNIX timestamp format
    accessToken: string;
  };
};

type TokenMap = {
  [slug: string]: Required<AuthResponse>;
};

class Pup {
  private browser!: puppeteer.Browser;
  private mainPage!: puppeteer.Page;
  private tokenHistory: TokenMap = {};

  /**
   * Creates a headless browser and page.
   */
  public async init(): Promise<void> {
    this.browser = await puppeteerExtra.launch({
      headless: false,
      slowMo: 20,
    });
    this.mainPage = await this.browser.newPage();

    console.log("Puppeteer browser created. 👍");

    /**
     * Repeat random search each hour
     */

    await this.randomSearch();
    setInterval(() => {
      this.randomSearch();
    }, 60 * 60 * 1000);

    /**
     * Intercept and filter requests
     */

    await this.mainPage.setRequestInterception(true);

    const whitelist: string[] = ["captcha", "false-promise"];
    const resourceTypes: ResourceType[] = ["document", "script"];
    const blacklist: string[] = [
      "adskeeper",
      "yandex",
      "inpagepush",
      "metrika",
      "mopnixhem",
      "opsoomet",
    ];

    this.mainPage.on("request", (req) => {
      if (
        whitelist.some((item) => req.url().includes(item)) ||
        (resourceTypes.includes(req.resourceType()) &&
          !blacklist.some((item) => req.url().includes(item)))
      )
        req.continue();
      else req.abort();
    });

    /**
     * Navigate to lookmovie 😙
     */

    await this.mainPage.goto("https://lookmovie.ag", {
      waitUntil: "networkidle2",
    });

    console.log("Pup ready! 😊");
  }

  /**
   * Generates new Google ReCaptcha token for lookmovie.ag.
   *
   * @param slug Slug of Show or movie
   */
  public async getNewToken(slug: string): Promise<AuthResponse> {
    const cursor = createCursor(this.mainPage as any);

    /**
     * Navigating to page
     */

    // Fake scroll
    await this.mainPage.evaluate(() => {
      window.scrollBy({ top: -520, left: 0, behavior: "smooth" });
    });

    // Move to search bar
    if (await this.mainPage.$("#search_input")) {
      await cursor.move("#search_input");
    }

    // Try to go to show page
    const navRes = await this.mainPage.goto(
      `https://lookmovie.ag/shows/view/${slug}`,
      { waitUntil: "networkidle2" }
    );

    // If show not found, return false auth
    if (navRes?.status() === 404) {
      const access: AuthResponse = {
        success: false,
      };

      return access;
    }

    /**
     * Getting Token
     */

    console.log("Trying to generate new auth token:", slug, "😖🙏");

    // Fake scroll
    await this.mainPage.waitFor(550);
    await this.mainPage.evaluate(() => {
      window.scrollBy({ top: 220, left: 0, behavior: "smooth" });
    });

    // Click play button
    await cursor.move(".thumbnail-play__btn-big");
    await this.mainPage.click(".thumbnail-play__btn-big");

    // Wait for Auth Response
    const authRes = await this.mainPage.waitForResponse((res) =>
      res.url().includes("false-promise")
    );

    let access: AuthResponse = (await authRes.json()) as AuthResponse;

    // If Auth Failed try to solve catpcha
    if (!access.success) {
      console.log("First auth failed. 😢 Trying to solve captcha.");

      let { captchas } = await this.mainPage.findRecaptchas();
      captchas.pop(); // We don't want to solve "contact us" captcha
      let { solutions } = await this.mainPage.getRecaptchaSolutions(captchas);
      await this.mainPage.enterRecaptchaSolutions(solutions);

      console.log("Finished Solving Captcha. 😎");

      const authRes = await this.mainPage.waitForResponse((res) =>
        res.url().includes("false-promise")
      );

      access = (await authRes.json()) as AuthResponse;
    }

    if (access.success) {
      console.log(
        "%cAuth successful! Adding to history. 😙",
        "color: lightgreen;"
      );
      console.log("Token will expire @", new Date(access.data!.expires * 1000));

      this.tokenHistory[slug] = access as Required<AuthResponse>;
    }

    return access;
  }

  /**
   * Return existing auth if it's still valid.
   *
   * @param slug Slug of show or movie
   */
  public getExisitingAuth(slug: string): Required<AuthResponse> | null {
    const exisitingToken = this.tokenHistory[slug];

    if (!exisitingToken) {
      return null;
    }

    const expireTime = new Date(exisitingToken.data.expires * 1000);
    if (expireTime.getTime() - new Date().getTime() < 0) {
      delete this.tokenHistory[slug];
      return null;
    }

    return this.tokenHistory[slug];
  }

  /**
   * Navigates to a random website to appear more human like.
   */
  public async randomSearch(): Promise<void> {
    const keywords = [
      "league of legends reddit",
      "youtube",
      "ozbargain",
      "reddit",
    ];
    const randomSearch = keywords[Math.floor(Math.random() * keywords.length)];

    console.log(
      "%cPerforming random search @",
      "color: hotpink;",
      new Date().toString()
    );

    const page = await this.browser.newPage();
    const cursor = createCursor(page);
    const { keyboard } = page;

    // Make search on google
    await page.goto("https://google.com", { waitUntil: "networkidle2" });
    await page.waitFor(500);
    await cursor.click("input[title='Search']");
    await keyboard.type(randomSearch);
    await page.waitFor(250);
    await keyboard.press("Enter");

    // Sit on results page for a bit
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.waitFor(1080);

    // Click first link
    await Promise.all([
      cursor.click("#search a h3"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    // Sit on page for a bit and scroll
    await page.waitFor(2500);
    await page.evaluate(() => {
      window.scrollBy({ top: 620, left: 0, behavior: "smooth" });
    });

    await page.waitFor(820);
    await page.evaluate(() => {
      window.scrollBy({ top: 420, left: 0, behavior: "smooth" });
    });

    await page.waitFor(5000);
    await page.close();
  }

  /**
   * Watches a random video on youtube.
   * Not used yet, but might be needed to appear more human like.
   */
  public async randomYoutube(): Promise<void> {
    const page = await this.browser.newPage();
    const cursor = createCursor(page);

    await page.goto("https://youtube.com", { waitUntil: "networkidle2" });
    await page.waitFor(500);

    // Play first video
    await cursor.click("#primary ytd-thumbnail");

    // Try to skip video
    try {
      await page.waitForSelector(".ytp-ad-skip-button");
      await cursor.click(".ytp-ad-skip-button");
    } catch (error) {}

    await page.waitFor(10 * 60 * 1000);

    // Fake scroll
    await page.evaluate(() => {
      window.scrollBy({ top: 520, left: 0, behavior: "smooth" });
    });
    await page.waitFor(1000);

    await page.evaluate(() => {
      window.scrollBy({ top: 320, left: 0, behavior: "smooth" });
    });
    await page.waitFor(6000);

    // Go home
    await cursor.click("#logo-icon-container");

    // Fake scroll again
    await page.evaluate(() => {
      window.scrollBy({ top: 520, left: 0, behavior: "smooth" });
    });
    await page.waitFor(1000);

    await page.evaluate(() => {
      window.scrollBy({ top: 320, left: 0, behavior: "smooth" });
    });
    await page.waitFor(10000);

    await page.close();
  }
}

export default new Pup();
