export interface IConditionIms {
    id?: number;
    name?: string;
}

export class ConditionIms implements IConditionIms {
    constructor(public id?: number, public name?: string) {}
}
