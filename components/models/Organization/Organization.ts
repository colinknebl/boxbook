import { User } from '../User';
import { Person } from '../Person';
import { OrgEvent } from '../OrgEvent';
import { OrgEventsCollection } from '../../collections/OrgEvents/OrgEventsCollection';

interface OrganizationInterface {
    id: string;
    code: string;
    address: IAddress;
    admins: User[];
    director: Person;
    events: OrgEventsCollection;
    image: string;
    name: string;
    settings: {
        id: string;
    };
}

interface IAddress {
    id: string;
    street1: string;
    street2: string;
    street3: string;
    city: string;
    state: string;
    country: string;
    postCode: string;
}

export class Organization implements OrganizationInterface {
    constructor(org: any) {
        this.id = org.id;
        this.code = org.code;
        this.address = org.address;
        this.admins = org.admins;
        this.director = org.director;
        this.image = org.image;
        this.name = org.name;
        this.settings = org.settings;
        this._createdAt = org.createdAt;

        if (Array.isArray(org.events)) {
            const events = org.events.reduce(
                (events: OrgEvent[], event: OrgEvent) => {
                    events.push(new OrgEvent(event, this));
                    return events;
                },
                [] as OrgEvent[]
            );
            this.events = new OrgEventsCollection(events);
        }
    }

    private _createdAt: string;

    public id: string;
    public code: string;
    public address: IAddress;
    public admins: User[];
    public director: Person;
    public events: OrgEventsCollection;
    public image: string;
    public name: string;
    public settings: {
        id: string;
    };
}
