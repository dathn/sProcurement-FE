export class LoggedInUser {
  constructor(access_token: string, UserId: string, username: string, FullName: string,
    Firstname: string, Lastname: string, email: string, avatar: string, roles: string) {
    this.access_token = access_token;
    this.UserId = UserId;
    this.username = username;
    this.Firstname = Firstname;
    this.Lastname = Lastname;
    this.FullName = Lastname + Firstname;
    this.email = email;
    this.avatar = avatar;
    this.roles = roles;
  }
  public UserId: string;
  public access_token: string;
  public username: string;
  public FullName: string;
  public Firstname: string;
  public Lastname: string;
  public email: string;
  public avatar: string;
  public roles: string;
}
