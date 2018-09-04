export interface IOrdersIms {
    id?: number;
    orderReferenceNumber?: string;
    orderDate?: string;
    name?: string;
    statusId?: string;
    notes?: string;
    vendorsId?: number;
}

export class OrdersIms implements IOrdersIms {
    constructor(
        public id?: number,
        public orderReferenceNumber?: string,
        public orderDate?: string,
        public name?: string,
        public statusId?: string,
        public notes?: string,
        public vendorsId?: number
    ) {}
}
