import React from 'react';
import styled from 'styled-components';
import ViewingButton from './ViewingButton';
import DatePicker from './DatePicker';
import Events from './Events';
import { User } from '../../models/User/User';
import { Organization } from '../../models/Organization/Organization';
import { OrgEvent } from '../../models/OrgEvent';
import { OrgEventsCollection } from '../../collections/OrgEvents/OrgEventsCollection';

const StyledEventList = styled.div`
    .ViewButtonsSection {
        display: flex;
        justify-content: space-around;
    }
`;

export type Viewing = 'Scheduled' | 'Reserved';

interface IState {
    viewing: Viewing;
    selectedDay: number;
    events: OrgEvent[];
}

interface IProps {
    user: User;
    organization: Organization;
}

class EventList extends React.PureComponent<IProps, IState> {
    static MillisecondsInADay = 86400000;
    private _dates: Date[];
    private _eventsCollection: OrgEventsCollection;

    constructor(props: IProps) {
        super(props);
        this._dates = this._getDates(Date.now(), []);
    }

    public state: IState = {
        viewing: 'Scheduled',
        selectedDay: 0,
        events: [],
    };
    static ViewingButtons: Viewing[] = ['Scheduled', 'Reserved'];

    private _toggleViewing(nameOfClicked?: Viewing) {
        if (nameOfClicked === this.state.viewing) return;
        const viewingNext =
            this.state.viewing === 'Scheduled' ? 'Reserved' : 'Scheduled';
        this.setState({
            viewing: viewingNext,
            events: this._getEvents(viewingNext),
        });
    }

    render() {
        const numScheduled = this.props.user
            ? this.props.user.reserved.events.length
            : 0;

        return (
            <StyledEventList>
                <section className='ViewButtonsSection'>
                    {EventList.ViewingButtons.map(btnVal => (
                        <ViewingButton
                            key={btnVal}
                            value={btnVal}
                            selected={this.state.viewing === btnVal}
                            onClick={this._toggleViewing.bind(this)}
                            number={
                                btnVal === 'Scheduled' ? null : numScheduled
                            }
                        />
                    ))}
                </section>
                <DatePicker
                    dates={this._dates}
                    selectedDay={this.state.selectedDay}
                    setSelectedDay={this._setSelectedDay}
                />
                <Events events={this.state.events} user={this.props.user} />
            </StyledEventList>
        );
    }

    componentDidUpdate() {
        if (
            !this._eventsCollection &&
            this.props.user &&
            this.props.organization
        ) {
            this._eventsCollection = new OrgEventsCollection(
                [
                    ...this.props.user.reserved.events,
                    ...this.props.organization.events.events,
                ],
                {
                    ascending: true,
                    combine: true,
                }
            );
        }
    }

    private _getEvents(viewingNext: Viewing = this.state.viewing): OrgEvent[] {
        if (!this.props.user || !this.props.organization) {
            return [];
        }
        if (viewingNext === 'Scheduled') {
            const today = this._dates[this.state.selectedDay];
            return this._eventsCollection.filterByDate(today);
        } else {
            return this.props.user.reserved.events;
        }
    }

    private _setSelectedDay = (num: number): void => {
        this.setState(
            {
                selectedDay: num,
            },
            () => {
                this.setState({
                    events: this._getEvents(),
                });
            }
        );
    };

    /**
     * Gets the current
     * current date - current date + 7
     */
    private _getDates(time: number, days: Date[]): Date[] {
        if (days.length === 7) {
            return days;
        }

        days.push(new Date(time));
        return this._getDates(time + EventList.MillisecondsInADay, days);
    }
}

export default EventList;
