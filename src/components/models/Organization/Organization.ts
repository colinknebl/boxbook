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
    /**
    /// **** Constructor ***********************************************
     */
    constructor(org: any, user: User) {
        this.id = org.id;
        this.code = org.code;
        this.address = org.address;
        this.admins = org.admins;
        this.director = org.director;
        this.image = org.image;
        this.name = org.name;
        this.settings = org.settings;
        this._createdAt = org.createdAt;

        this.events = new OrgEventsCollection(org.events || [], user);
    }

    /**
    /// **** Properties ************************************************
     */
    // ***** Static Props **********************************************
    // *****************************************************************
    // ***** Private Props *********************************************
    private _createdAt: string;
    // *****************************************************************
    // ***** Protected Props *******************************************
    // *****************************************************************
    // ***** Public Props & Getters/Setters ****************************
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
    // *****************************************************************

    /**
    /// **** Methods ***************************************************
     */
    // ***** Static Methods ********************************************
    // *****************************************************************
    // ***** Private Methods *******************************************
    // *****************************************************************
    // ***** Protected Methods *****************************************
    // *****************************************************************
    // ***** Public Methods ********************************************
    public reserveForEvent(event: OrgEvent, user: User) {
        return this.events.addUserToEvent(event, user);
    }

    // *****************************************************************

    public unreserveFromEvent(event: OrgEvent, user: User) {
        return this.events.removeUserFromEvent(event, user);
    }

    // *****************************************************************

    /**
     * Return a list of events the user is registered for
     */
    public getReserved(user: User) {
        return this.events.getReserved(user);
    }

    // *****************************************************************

    public getEventsByDates(dates: Date[], selectedDay: number): OrgEvent[] {
        const selected = dates[selectedDay];
        return this.events.filterByDate(selected);
    }

    // *****************************************************************
}
