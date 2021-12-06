interface ICreateClientDTO {
  id: string;
  name: string;
}
export class Client {
  id: string;
  name: string;

  private constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public static create({ id, name }: ICreateClientDTO): Client {
    return new Client(id, name);
  }
}
