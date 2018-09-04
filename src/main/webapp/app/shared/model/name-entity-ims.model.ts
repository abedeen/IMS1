export interface INameEntityIms {
    id?: number;
    name?: string;
}

export class NameEntityIms implements INameEntityIms {
    constructor(public id?: number, public name?: string) {}
}
