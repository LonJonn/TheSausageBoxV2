import Pup from "./Pup";
import express, { Request, RequestHandler } from "express";

let web: Pup;
(async () => {
  web = await new Pup().init();
  await web.load();
})();

export interface ICaptchaReq extends Request {
  web?: Pup;
}

export const captchaMw: RequestHandler = (req: ICaptchaReq, res, next) => {
  req.web = web;
  req.web.refreshToken();

  next!();
};
