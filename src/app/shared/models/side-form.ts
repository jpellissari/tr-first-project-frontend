type SideFormType = 'create' | 'update';

class SideForm {
  private _status: boolean;
  private _type: SideFormType;

  constructor(status: boolean, type: SideFormType) {
    this._status = status;
    this._type = type;
  }

  get status(): boolean {
    return this._status;
  }

  get type(): SideFormType {
    return this._type;
  }

  set type(type: SideFormType) {
    this._type = type;
  }

  isTargetUpdate(): boolean {
    return this._type === 'update';
  }

  isTargetCreate(): boolean {
    return this._type === 'create';
  }

  open(): void {
    this._status = true;
  }

  close(): void {
    this._status = false;
  }
}

export { SideForm, SideFormType };
