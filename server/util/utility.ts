export class Utility {
  constructor() {}
  getRandomInt(min: number= 1, max: number= 32): number{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
}

export default Utility;
