export class Stock {
    private _name:string;
    private _code:string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get code(): string {
        return this._code;
    }

    set code(value: string) {
        this._code = value;
    }
}