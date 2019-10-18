import React from 'react';
import styled from 'styled-components';
import ViewingButton from './ViewingButton';
import DatePicker from './DatePicker';
import Events from './Events';
import { User } from '../../models/User/User';
import { Organization } from '../../models/Organization/Organization';
import { OrgEvent } from '../../models/OrgEvent';
import { OrgEventsCollection } from '../../collections/OrgEvents/OrgEventsCollection';
import { ReserveButtonText } from './ReserveButton';

const StyledEventList = styled.div`
    padding: 1rem;
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
    numEventsReserved: number;
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
        this.state.numEventsReserved = this.props.user
            ? this.props.user.reserved.length
            : 0;
    }

    public state: IState = {
        viewing: 'Scheduled',
        selectedDay: 0,
        events: [],
        numEventsReserved: 0,
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
        return (
            <StyledEventList data-viewing={this.state.viewing}>
                <section className='ViewButtonsSection'>
                    {EventList.ViewingButtons.map(btnVal => (
                        <ViewingButton
                            key={btnVal}
                            value={btnVal}
                            selected={this.state.viewing === btnVal}
                            onClick={this._toggleViewing.bind(this)}
                            number={
                                btnVal === 'Scheduled'
                                    ? null
                                    : this.state.numEventsReserved
                            }
                        />
                    ))}
                </section>
                <DatePicker
                    dates={this._dates}
                    selectedDay={this.state.selectedDay}
                    setSelectedDay={this._setSelectedDay}
                    viewing={this.state.viewing}
                />
                <Events
                    events={this.state.events}
                    user={this.props.user}
                    onClick={this._reserveHandler}
                    viewing={this.state.viewing}
                />
            </StyledEventList>
        );
    }

    private _reserveHandler = async (
        text: ReserveButtonText,
        event: OrgEvent
    ) => {
        if (text === 'Reserve') {
            await this.props.user.reserve(event);
        } else if (text === 'Unreserve') {
            await this.props.user.unreserve(event);
        }

        this.setState({
            numEventsReserved: this.props.user.reserved.length,
            events: this._getEvents(),
        });
    };

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (!prevProps.user) {
            this.setState({
                numEventsReserved: this.props.user.reserved.length,
                events: this._getEvents(),
            });
        }
    }

    componentDidMount() {
        if (
            !this._eventsCollection &&
            this.props.user &&
            this.props.organization
        ) {
            this.setState({
                events: this._getEvents(),
            });
        }
    }

    private _setSelectedDay = (num: number): void => {
        const updatedState: Partial<IState> = {
            selectedDay: num,
        };
        if (this.state.viewing !== 'Scheduled') {
            updatedState.viewing = 'Scheduled';
        }
        this.setState(updatedState as IState, () => {
            this.setState({
                events: this._getEvents(),
            });
        });
    };

    private _getEvents(viewingNext: Viewing = this.state.viewing): OrgEvent[] {
        if (!this.props.user || !this.props.organization) {
            return [];
        }
        if (viewingNext === 'Scheduled') {
            return this.props.user.getEvents(
                this._dates,
                this.state.selectedDay
            );
        } else {
            return this.props.user.reserved;
        }
    }

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
