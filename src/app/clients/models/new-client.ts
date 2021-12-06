export class NewClient {
  name: string;

  private constructor(name: string) {
    this.name = name;
  }

  public static create(name: string): NewClient {
    return new NewClient(name);
  }
}
