export class Company {
    constructor(
      public name: string,
      public location: {
          long: string,
          lat: string,
          radius: number
      }) {}
}
