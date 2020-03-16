import { APIGatewayEvent } from "aws-lambda";
import { RollPayload } from "./models/roll-payload";
import { roll } from "./roller";

exports.handler = async (event: APIGatewayEvent) => {
  let rollPayload: RollPayload|undefined;
  if (event.body) {
    try {
      rollPayload = JSON.parse(event.body);
    } catch (e) {}
  }

  if (rollPayload) {
    return roll(rollPayload);
  }
};