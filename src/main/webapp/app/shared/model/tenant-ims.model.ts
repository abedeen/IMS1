export interface ITenantIms {
    id?: number;
    company?: string;
    contactEmail?: string;
    contactName?: string;
    contactPhone?: string;
    contactTitle?: string;
    department?: string;
    email?: string;
    logoURL?: string;
    name?: string;
}

export class TenantIms implements ITenantIms {
    constructor(
        public id?: number,
        public company?: string,
        public contactEmail?: string,
        public contactName?: string,
        public contactPhone?: string,
        public contactTitle?: string,
        public department?: string,
        public email?: string,
        public logoURL?: string,
        public name?: string
    ) {}
}
