interface RollResponse {
  step: Array<Step>
}

interface Step {
  rolls: Array<Roll>,
  total: number
}

interface Roll {
  count: number,
  sides: number,
  modifier: number,
  rolls: Array<number>,
  total: number
}

export { RollResponse, Step };