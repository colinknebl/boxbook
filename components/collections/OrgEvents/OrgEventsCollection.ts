import { Collection } from '../BaseCollection';
import { OrgEvent } from '../../models/OrgEvent';
import { User } from '../../models/User/User';

interface OrgEventsCollectionInterface {
    sort(ascending: boolean): OrgEvent[];
    filterByDate(date: Date): OrgEvent[];
}

// interface IOptions {
//     combine: boolean;
//     ascending: boolean;
// }

export class OrgEventsCollection extends Collection<OrgEvent>
    implements OrgEventsCollectionInterface {
    constructor(events: any, user: User) {
        super();

        if (Array.isArray(events)) {
            this._events = events.reduce(
                (events: OrgEvent[], event: any) => {
                    events.push(new OrgEvent(event, user));

                    return events;
                },
                [] as OrgEvent[]
            );
        } else {
            this._events = [];
        }
    }

    private _events: OrgEvent[];

    get events() {
        return this._events.slice();
    }

    private _sort(
        ascending: boolean
    ): (eventA: OrgEvent, eventB: OrgEvent) => number {
        return (eventA, eventB): number => {
            if (eventA.date.getUTCDate() > eventB.date.getUTCDate()) {
                return ascending ? 1 : -1;
            } else if (eventA.date.getUTCDate() < eventB.date.getUTCDate()) {
                return ascending ? -1 : 1;
            } else {
                return 0;
            }
        };
    }

    /**
     * Combines the organization's events with the user's events
     * and filters out any duplicate organization events.
     */
    // private _combine(ascending: boolean): void {
    //     const sortFunc = this._sort(ascending);
    //     const combined = this._events
    //         .reduce(
    //             (combined: OrgEvent[], event: OrgEvent) => {
    //                 if (combined.some(added => added.id === event.id)) {
    //                     return combined;
    //                 }
    //                 combined.push(event);
    //                 return combined;
    //             },
    //             [] as OrgEvent[]
    //         )
    //         .sort(sortFunc);
    //     this._events = combined;
    // }

    public filterByDate(date: Date): OrgEvent[] {
        return this._events.filter(event => {
            if (date.toDateString() === event.date.toDateString()) {
                return event;
            }
        });
    }

    public getReserved(user: User): OrgEvent[] {
        return this.events.reduce(
            (reserved: OrgEvent[], event: OrgEvent) => {
                if (event.isReserved) {
                    reserved.push(event);
                }
                // if (event.attendees.some(attendee => attendee.id === user.id)) {
                //     reserved.push(event);
                //     event.isReserved = true;
                // }
                return reserved;
            },
            [] as OrgEvent[]
        );
    }

    public sort(ascending: boolean) {
        return this._events.sort(this._sort(ascending));
    }

    public async removeUserFromEvent(event: OrgEvent, user: User) {
        return await event.unreserve(user);
    }

    public async addUserToEvent(event: OrgEvent, user: User) {
        return await event.reserve(user);
    }
}
