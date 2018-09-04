export interface IOrderItemsIms {
    id?: number;
    category?: string;
    condition?: string;
    price?: string;
    quantity?: string;
    vendor?: string;
    status?: string;
    receiveDate?: string;
    totalSpending?: number;
    currency?: string;
    statusId?: string;
    quantityIn?: number;
    quantityOut?: number;
    notes?: string;
    statusId?: number;
    categoryId?: number;
    conditionId?: number;
    namesId?: number;
    orderItemsId?: number;
    usersId?: number;
}

export class OrderItemsIms implements IOrderItemsIms {
    constructor(
        public id?: number,
        public category?: string,
        public condition?: string,
        public price?: string,
        public quantity?: string,
        public vendor?: string,
        public status?: string,
        public receiveDate?: string,
        public totalSpending?: number,
        public currency?: string,
        public statusId?: string,
        public quantityIn?: number,
        public quantityOut?: number,
        public notes?: string,
        public statusId?: number,
        public categoryId?: number,
        public conditionId?: number,
        public namesId?: number,
        public orderItemsId?: number,
        public usersId?: number
    ) {}
}
