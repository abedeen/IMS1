export interface IUserGroupIms {
    id?: number;
    groupName?: string;
}

export class UserGroupIms implements IUserGroupIms {
    constructor(public id?: number, public groupName?: string) {}
}
