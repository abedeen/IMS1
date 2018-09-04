export interface IProdNameIms {
    id?: number;
    name?: string;
}

export class ProdNameIms implements IProdNameIms {
    constructor(public id?: number, public name?: string) {}
}
