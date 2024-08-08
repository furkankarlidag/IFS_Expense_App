export class userModel {
    username: string;
    password: string;
    active = false;
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
      this.active = true;
    }
}