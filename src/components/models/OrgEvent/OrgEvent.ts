import { User } from '../User';
import { Person } from '../Person';
import { DataRequest } from '../../utils/DataRequest/DataRequest';
import { operationName } from '@apollo/react-common';

interface OrgEventInterface {
    id: string;
    attendees: User[];
    coordinator: Person;
    date: Date;
    hourDuration: number;
    image: string;
    eventType: string;

    toggleReserved(reserved?: boolean): void;
}

const ReserveEventMutation: string = `
    mutation reserveUser($userID: ID!, $eventID: ID!) {
        reserveUser(data: {
            userID: $userID
            eventID: $eventID
        }) {
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
        unreserveUser(data: {
            userID: $userID
            eventID: $eventID
        }) {
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

    constructor(event: any, user: User) {
        this.id = event.id;
        this.date = new Date(event.date);
        this.hourDuration = event.hourDuration;
        this.image = event.image;
        this.eventType = event.eventType;
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
        } else {
            this.attendees = [];
        }

        if (this.attendees.length) {
            this._isReserved = this.attendees.some(
                attendee => attendee.id === user.id
            );
        } else {
            this._isReserved = false;
        }
    }

    public id: string;
    public attendees: User[];
    public coordinator: Person;
    public date: Date;
    public hourDuration: number;
    public image: string;
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

    public async unreserve(user: User) {
        const req = new DataRequest<OrgEvent>({
            query: OrgEvent.UnreserveEventMutation,
            variables: {
                userID: user.id,
                eventID: this.id,
            },
            operationName: 'unreserveUser',
            errorMessage:
                'Uh Oh, something went wrong! Unreserving your spot in the event was unsuccessful.',
        });
        await req.fetch();
        if (req.success) {
            this._isReserved = false;
            this.attendees = this.attendees.filter(
                attendee => attendee.id !== user.id
            );
            return this;
        }
    }

    public async reserve(user: User) {
        const req = new DataRequest<OrgEvent>({
            query: OrgEvent.ReserveEventMutation,
            variables: {
                userID: user.id,
                eventID: this.id,
            },
            operationName: 'reserveUser',
            errorMessage:
                'Uh Oh, something went wrong! Unable to reserve your spot in the event!',
        });
        await req.fetch();
        if (req.success) {
            this._isReserved = true;
            this.attendees.push(user);
            return this;
        }
    }
}
