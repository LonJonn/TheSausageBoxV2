import puppeteer from "puppeteer";
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
        token: process.env["API_KEY"],
      },
    })
  );

export type AuthResponse = {
  success: boolean;
  data: {
    expires: number;
    accessToken: string;
  };
};

// Errors
const InitError = new Error("Must initilize Pup object first using .init()");
const PageError = new Error(
  "Must navigate to lookmovie.ag first using .load()"
);

class Pup {
  private browser!: puppeteer.Browser;
  private mainPage!: puppeteer.Page;
  private initialised: boolean;
  private tokenHistory: { [slug: string]: AuthResponse };

  /**
   * Must call `.init()` before this Object can be used!
   */
  constructor() {
    this.initialised = false;
    this.tokenHistory = {};
  }

  /**
   * Creates a headless browser and page.
   */
  public async init() {
    this.browser = await puppeteerExtra.launch({
      headless: false,
      slowMo: 20,
    });
    this.mainPage = await this.browser.newPage();
    this.initialised = true;

    console.info("Puppeteer browser created.");
  }

  /**
   * Navigates to Lookmovie.ag.
   */
  public async load() {
    if (!this.initialised) throw InitError;

    await this.mainPage.goto("https://lookmovie.ag", {
      waitUntil: "networkidle2",
    });

    console.info("Navigated to lookmovie.ag.");
  }

  /**
   * Generates new Google ReCaptcha token for lookmovie.ag.
   *
   * @param slug Slug of Show or movie
   */
  public async getNewToken(slug: string) {
    if (!this.initialised) throw InitError;
    if (!this.mainPage.url().includes("lookmovie")) throw PageError;

    /**
     * Navigating to page
     */

    // Create ghost cursor
    const cursor = createCursor(this.mainPage as any);

    // Fake scroll
    await this.mainPage.waitFor(1250);
    await this.mainPage.evaluate(() => {
      window.scrollBy({ top: 220, left: 0, behavior: "smooth" });
    });
    await this.mainPage.waitFor(550);
    await this.mainPage.evaluate(() => {
      window.scrollBy({ top: -520, left: 0, behavior: "smooth" });
    });

    // Move to search bar
    await cursor.move("#search_input");

    await this.mainPage.goto(`https://lookmovie.ag/shows/view/${slug}`, {
      waitUntil: "networkidle2",
    });

    /**
     * Getting Token
     */

    console.info("Generating new Google ReCaptcha token.");

    // Fake scroll
    await this.mainPage.waitFor(1250);
    await this.mainPage.evaluate(() => {
      window.scrollBy({ top: 220, left: 0, behavior: "smooth" });
    });

    // Click play button
    await cursor.click(".thumbnail-play__btn-big");

    // Wait for Auth Response
    console.log("Waiting for auth response...");
    const res = await this.mainPage.waitForResponse((res) =>
      res.url().includes("false-promise")
    );

    let access = (await res.json()) as AuthResponse;

    // If Auth Failedm try to solve catpcha
    if (!access.success) {
      console.log("First auth failed. Trying to solve captcha.");

      let { captchas } = await this.mainPage.findRecaptchas();
      captchas.pop(); // We don't want to solve "contact us" captcha
      let { solutions } = await this.mainPage.getRecaptchaSolutions(captchas);
      await this.mainPage.enterRecaptchaSolutions(solutions);

      console.log("Finished Solving Captcha.");

      const res = await this.mainPage.waitForResponse((res) =>
        res.url().includes("false-promise")
      );

      access = (await res.json()) as any;
    }

    if (access.success) {
      this.tokenHistory[slug] = access;
    }

    return access;
  }

  /**
   * Navigates to a random website to appear more human like.
   */
  public async randomSearch() {
    const keywords = [
      "league of legends reddit",
      "youtube",
      "ozbargain",
      "reddit",
    ];
    const randomSearch = keywords[Math.floor(Math.random() * keywords.length)];

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
   * Return existing auth if it's still valid.
   *
   * @param slug Slug of show or movie
   */
  public getExisitingAuth(slug: string) {
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
}

export default new Pup();
