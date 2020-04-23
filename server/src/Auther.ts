/**
 * Need to add support for movies
 */

import fetch from "node-fetch";

/**
 * Errors
 */
const NoSlugError = new Error("Slug not set! Set a movie/show slug first.");
const NoTokenError = new Error(
  "No Captcha token currently set! Use `waitForResult()` first."
);
const NoCaptchaIDError = new Error(
  "No Captcha ID currently set! Use `sendCaptcha()` first."
);
const SendCaptchaError = (msg: string) =>
  new Error("Something went wrong while sending the captcha: " + msg);
const GetResultError = (msg: string) =>
  new Error("Unable to get result: " + msg);
const MaxRetriesError = new Error(
  "Maximum number of 2captcha result retires met."
);
const AuthFailedError = new Error("Lookmovie auth failed. Please try again.");

/**
 * Auther Class
 */
export interface IAuthResponse {
  expires: number;
  accessToken: string;
}

export default class Auther {
  private key: string;
  private googleKey: string;
  private captchaId: string = "";
  private _slug: string = "";
  private token: string = "";

  constructor(googleKey: string = "6Ley5moUAAAAAJxloiuF--u_uS28aYUj-0E6tSfZ") {
    this.key = process.env["apikey"]!;
    this.googleKey = googleKey;
  }

  set slug(value: string) {
    this._slug = value;
  }

  get pageUrl() {
    if (!this._slug) throw NoSlugError;

    return `https://lookmovie.ag/show/view/${this._slug}`;
  }

  public async sendCaptcha() {
    const url =
      "https://2captcha.com/in.php?" +
      `key=${this.key}&` +
      `googlekey=${this.googleKey}&` +
      `pageurl=${this.pageUrl}&` +
      "method=userrecaptcha&" +
      "version=v3&" +
      "action=view&" +
      "min_score=0.7&" +
      "json=1";

    const inRes = await fetch(url);
    const data = await inRes.json();

    if (data.status !== 1) throw SendCaptchaError(data.request);

    const captchaId = data.request as string;
    this.captchaId = captchaId;
    return captchaId;
  }

  public async getCaptchResult() {
    if (!this.captchaId) throw NoCaptchaIDError;

    const url =
      "https://2captcha.com/res.php?" +
      `key=${this.key}&` +
      `id=${this.captchaId}&` +
      "action=get&" +
      "json=1";

    const resultRes = await fetch(url);
    const data = await resultRes.json();

    if (data.status !== 1) throw GetResultError(data.request);

    const captchaToken = data.request as string;
    this.token = captchaToken;
    return captchaToken;
  }

  public waitForResult(retries = 10, interval = 2500) {
    return new Promise<string>((resolve, reject) => {
      let iteration = 0;

      const poller = setInterval(async () => {
        if (iteration >= retries) {
          clearInterval(poller);
          reject(MaxRetriesError);
        }

        try {
          const captchaToken = await this.getCaptchResult();

          clearInterval(poller);
          resolve(captchaToken);
        } catch (error) {
          console.info(error.message);
          iteration++;
        }
      }, interval);
    });
  }

  public async auth() {
    if (!this._slug) throw NoSlugError;
    if (!this.token) throw NoTokenError;

    const lookUrl =
      "https://false-promise.lookmovie.ag/api/v1/storage/shows/?" +
      `slug=${this._slug}&` +
      `token=${this.token}&` +
      "sk=null&" +
      "step=1";

    const authRes = await fetch(lookUrl);
    const auth = await authRes.json();

    let reportUrl =
      "https://2captcha.com/res.php?" +
      `key=${this.key}&` +
      `id=${this.captchaId}&` +
      "action=report";

    reportUrl += auth.success ? "good" : "bad";
    fetch(reportUrl);

    if (auth.success) return auth.data as IAuthResponse;
    else throw AuthFailedError;
  }
}
