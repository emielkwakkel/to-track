export class User {
    constructor(
      public displayName: string,
      public email: string,
      public emailVerified: boolean,
      public phoneNumber: string,
      public photoURL: string,
      public uid: string,
      public providerId: string) {}
}
