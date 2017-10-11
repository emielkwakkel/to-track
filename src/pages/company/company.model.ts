import { Location } from '../../shared/location/location.model';

export class Company {
    constructor(
      public name: string,
      public locationEnabled: boolean,
      public location?: Location) {}
}
