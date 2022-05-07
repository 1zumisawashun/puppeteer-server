import { RequestHandler } from 'express';
import * as automemo from '../datas/automemo';
import { productScraping } from '../middleware/scrapingMiddleware';

export const yodobashiApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(automemo.yodobashi);
  res.json(result);
};
export const bicApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(automemo.bic);
  res.json(result);
};
export const yamadaApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(automemo.yamada);
  res.json(result);
};
export const nojimaApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(automemo.nojima);
  res.json(result);
};
export const edionApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(automemo.edion);
  res.json(result);
};
export const kakakucomApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(automemo.kakakucom);
  res.json(result);
};
export const rakutenApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(automemo.rakuten);
  res.json(result);
};
export const paypayApi: RequestHandler = async (req, res, next) => {
  const result = await productScraping(automemo.paypay);
  res.json(result);
};
