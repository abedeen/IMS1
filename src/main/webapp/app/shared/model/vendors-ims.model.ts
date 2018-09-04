export interface IVendorsIms {
    id?: number;
    name?: string;
    url?: string;
    address?: string;
    contactPerson?: string;
}

export class VendorsIms implements IVendorsIms {
    constructor(public id?: number, public name?: string, public url?: string, public address?: string, public contactPerson?: string) {}
}
