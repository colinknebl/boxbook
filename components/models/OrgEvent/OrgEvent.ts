import { User } from '../User';
import { Person } from '../Person';
import { Organization } from '../Organization';
import { OrgEventFragment } from '../../../graphql/types/fragments';
import { GQLRequest } from '../../utils/GQLRequest';

interface OrgEventInterface {
    id: string;
    attendees: User[];
    coordinator: Person;
    date: Date;
    hourDuration: number;
    image: string;
    organization: Organization;
    eventType: string;

    toggleReserved(reserved?: boolean): void;
}

const ReserveEventMutation: string = `
    mutation reserveUser($userID: ID!, $eventID: ID!) {
        reserveUser(
            userID: $userID
            eventID: $eventID
            ) {
                attendees {
                name {
                    first
                }
            }
        }
    }
`;

const UnreserveEventMutation: string = `
    mutation unreserveUser($userID: ID!, $eventID: ID!) {
        unreserveUser(
            userID: $userID
            eventID: $eventID
            ) {
                attendees {
                name {
                    first
                }
            }
        }
    }
`;

export class OrgEvent implements OrgEventInterface {
    static ReserveEventMutation = ReserveEventMutation;
    static UnreserveEventMutation = UnreserveEventMutation;

    constructor(event: any, org: Organization, reserved: boolean = false) {
        this.id = event.id;
        this.date = new Date(event.date);
        this.hourDuration = event.hourDuration;
        this.image = event.image;
        this.organization = org;
        this.eventType = event.eventType;
        this._isReserved = Boolean(reserved);
        this.name = event.name;

        this.coordinator = new Person(
            event.coordinator.id,
            event.coordinator.name,
            event.coordinator.email,
            event.coordinator.phone,
            event.coordinator.image
        );

        if (Array.isArray(event.attendees)) {
            this.attendees = event.attendees.reduce(
                (attendees: User[], attendee: any) => {
                    attendees.push(new User(attendee));
                    return attendees;
                },
                [] as User[]
            );
        }
    }

    public id: string;
    public attendees: User[];
    public coordinator: Person;
    public date: Date;
    public hourDuration: number;
    public image: string;
    public organization: Organization;
    public eventType: string;
    public name: string;
    public _isReserved: boolean = false;

    get isReserved() {
        return this._isReserved;
    }

    set isReserved(reserved: boolean) {
        this._isReserved = reserved;
    }

    public toggleReserved(reserved?: boolean) {
        if (typeof reserved === 'boolean') {
            this.isReserved = reserved;
        } else {
            this.isReserved = !this.isReserved;
        }
    }

    public async unreserve(userID: string) {
        const req = new GQLRequest<OrgEvent>();
        const res = await req.set({
            query: OrgEvent.UnreserveEventMutation,
            variables: {
                userID,
                eventID: this.id,
            },
            operationName: 'unreserveUser',
        });
        this._isReserved = false;
        return this;
    }

    public async reserve(userID: string) {
        const req = new GQLRequest<OrgEvent>();
        const res = await req.set({
            query: OrgEvent.ReserveEventMutation,
            variables: {
                userID,
                eventID: this.id,
            },
            operationName: 'reserveUser',
        });
        this._isReserved = true;
        return this;
    }
}
