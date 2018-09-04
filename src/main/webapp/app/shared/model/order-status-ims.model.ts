export interface IOrderStatusIms {
    id?: number;
    name?: string;
}

export class OrderStatusIms implements IOrderStatusIms {
    constructor(public id?: number, public name?: string) {}
}
