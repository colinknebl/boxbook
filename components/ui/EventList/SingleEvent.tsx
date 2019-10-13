import classnames from 'classnames';
import styled from 'styled-components';
import ReserveButton from './ReserveButton';
import { OrgEvent } from '../../models/OrgEvent';
import { User } from '../../models/User/User';

const StyledEvent = styled.div`
    border-bottom: 2px solid var(--secondary-color);
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 600px;
    margin: auto;
    padding: 10px 0;

    p {
        margin: 0;
    }

    .right-column {
        justify-self: end;
        align-self: center;
        text-align: right;
    }
`;

interface IProps {
    event: OrgEvent;
    user: User;
}

function SingleEvent({ event, user }: IProps) {
    const coordinatorName =
        event.coordinator.name.first + ' ' + event.coordinator.name.last;
    const formattedTime = (date: Date) => {
        let charLen = date.toLocaleTimeString().length;
        const amPm = date.toLocaleTimeString().slice(charLen - 2);
        return `${date.getHours()}:${date.getMinutes()} ${amPm}`;
    };

    return (
        <StyledEvent
            className={classnames({
                reserved: event.isReserved,
            })}
        >
            <div className='left-column'>
                <p>{event.name}</p>
                <p>{event.organization.name}</p>
                <p>{coordinatorName}</p>
            </div>
            <div className='right-column'>
                <p>{formattedTime(event.date)}</p>
                <ReserveButton event={event} user={user} />
            </div>
        </StyledEvent>
    );
}

export default SingleEvent;
