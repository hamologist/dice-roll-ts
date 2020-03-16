import { isRollPayload, RollPayload } from "./models/roll-payload";
import { RollResponse, Step } from "./models/roll-response";

const roll = (rollPayload: RollPayload): RollResponse => {
  const rollResponse: RollResponse = {
    step: []
  };

  if (!isRollPayload(rollPayload)) {
    throw Error('Invalid Payload');
  }

  let rollCount = rollPayload.count || 1;

  while (rollCount > 0) {
    const step: Step = {
      rolls: [],
      total: 0
    };
    for (const dice of rollPayload.dice) {
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

  return rollResponse;
};

export { roll }