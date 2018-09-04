export interface ICategoryIms {
    id?: number;
    name?: string;
    parentId?: string;
    categoryLevel?: string;
}

export class CategoryIms implements ICategoryIms {
    constructor(public id?: number, public name?: string, public parentId?: string, public categoryLevel?: string) {}
}
