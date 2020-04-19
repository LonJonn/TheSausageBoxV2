import puppeteer from "puppeteer";

// Errors
const InitError = new Error("Must initilize Pup object first using .init()");
const PageError = new Error(
  "Must navigate to lookmovie.ag first using .load()"
);

class Pup {
  private browser!: puppeteer.Browser;
  private page!: puppeteer.Page;
  private initialised: boolean;

  /**
   * Must call `.init()` before this Object can be used!
   */
  constructor() {
    this.initialised = false;
  }

  /**
   * Creates a headless browser and page.
   * Will block any request that is NOT a document or Google ReCaptcha request.
   */
  public async init() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    console.info("Puppeteer browser created.");

    // Handle all requests manually
    await this.page.setRequestInterception(true);

    // Only accept document and Google ReCaptcha requests
    this.page.on("request", (req) => {
      if (req.resourceType() == "document" || req.url().includes("captcha"))
        req.continue();
      else req.abort();
    });

    this.initialised = true;

    return this;
  }

  /**
   * Navigates to Lookmovie.ag.
   */
  public async load() {
    if (!this.initialised) throw InitError;

    await this.page.goto("https://dev.lookmovie.ag", {
      waitUntil: "networkidle2",
    });
    console.info("Navigated to lookmovie.ag.");
  }

  /**
   * Generates new Google ReCaptcha token for lookmovie.ag.
   */
  public async getNewToken() {
    if (!this.initialised) throw InitError;
    if (!this.page.url().includes("lookmovie")) throw PageError;

    console.info("Generating new Google ReCaptcha token.");
    const token = await this.page.evaluate((): string =>
      (window as any).grecaptcha
        .execute("6Ley5moUAAAAAJxloiuF--u_uS28aYUj-0E6tSfZ")
        .then((token: string) => token)
    );

    return token;
  }
}

export default Pup;
