import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import { isRollPayload, RollPayload } from "../models/roll-payload";
import { RollResponse, Step } from "../models/roll-response";

const router = express.Router();

const errorMiddleware = (err: string, req: Request, resp: Response, next: NextFunction) => {
  resp.status(500).send({
    error: err
  });
};

router.use('/', bodyParser.json());

router.post('/', (req, res, next) => {
  const body: RollPayload = req.body;
  const rollResponse: RollResponse = {
    step: []
  };

  if (!isRollPayload(body)) {
    return next('Invalid Payload');
  }

  let rollCount = body.count || 1;

  while (rollCount > 0) {
    const step: Step = {
      rolls: [],
      total: 0
    };
    for (const dice of body.dice) {
      const diceCount = dice.count || 1;
      const diceModifier = dice.modifier || 0;
      const rolls: Array<number> = Array.from(
        {length: diceCount},
        () => Math.floor(Math.random() * dice.sides) + 1
      );
      const rollsTotal = rolls.reduce((a, b) => a + b, 0) + diceModifier;
      step.total += rollsTotal;
      step.rolls.push({
        count: diceCount,
        sides: dice.sides,
        modifier: diceModifier,
        rolls: rolls,
        total: rollsTotal
      });
    }
    rollResponse.step.push(step);
    rollCount--;
  }

  res.send(rollResponse);
});

router.use('/', errorMiddleware);

export {router as rollRouter};
