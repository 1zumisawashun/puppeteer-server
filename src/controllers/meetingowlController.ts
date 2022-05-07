import { RequestHandler } from 'express';
import * as meetingowl from '../datas/meetingowl';
import { productScraping } from '../middleware/scrapingMiddleware';

export const yodobashiApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(meetingowl.yodobashi);
  res.json(result);
};
export const bicApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(meetingowl.bic);
  res.json(result);
};
export const yamadaApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(meetingowl.yamada);
  res.json(result);
};
export const nojimaApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(meetingowl.nojima);
  res.json(result);
};
export const edionApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(meetingowl.edion);
  res.json(result);
};
export const kakakucomApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(meetingowl.kakakucom);
  res.json(result);
};
export const rakutenApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(meetingowl.rakuten);
  res.json(result);
};
export const paypayApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(meetingowl.paypay);
  res.json(result);
};
