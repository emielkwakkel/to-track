export class Company {
    constructor(
      public name: String,
      public locationEnabled: Boolean,
      public location?: {
          long: String,
          lat: String,
          radius: Number
      }) {}
}
