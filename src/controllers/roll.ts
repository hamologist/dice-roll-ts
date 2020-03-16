import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { RollPayload } from "../models/roll-payload";
import { RollResponse } from "../models/roll-response";
import { roll } from "../roller";

const router = express.Router();

const errorMiddleware = (err: string, req: Request, resp: Response, next: NextFunction) => {
  resp.status(500).send({
    error: err
  });
};

router.use('/', bodyParser.json());

router.post('/', (req, res, next) => {
  const body: RollPayload = req.body;

  try {
    const rollResponse: RollResponse = roll(body);
    res.send(rollResponse);
  } catch (e) {
    return next('Invalid Payload');
  }

});

router.use('/', errorMiddleware);

export {router as rollRouter};
