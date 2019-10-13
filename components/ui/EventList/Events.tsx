import styled from 'styled-components';
import SingleEvent from './SingleEvent';
import { OrgEvent } from '../../models/OrgEvent/OrgEvent';
import { User } from '../../models/User/User';

interface IProps {
    events: OrgEvent[];
    user: User;
}

const StyledEvents = styled.section`
    &.no-events {
        text-align: center;
    }
`;

function Events({ events, user }: IProps) {
    if (!events) {
        return null;
    }

    if (events.length === 0) {
        return (
            <StyledEvents className='no-events'>
                <p>There are no events scheduled today</p>
            </StyledEvents>
        );
    }

    return (
        <StyledEvents>
            {events.map((event, i) => (
                <SingleEvent key={event.id} event={event} user={user} />
            ))}
        </StyledEvents>
    );
}

export default Events;
