import classnames from 'classnames';
import styled from 'styled-components';
import ReserveButton, { ReserveButtonText } from './ReserveButton';
import Names from './Names';
import { OrgEvent } from '../../models/OrgEvent';
import { User } from '../../models/User/User';
import { Viewing } from './EventList';
import { WeekDays } from './DatePickerDay';

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

    .attendees {
        line-height: 0.9;
    }

    span {
        font-size: 11px;
    }
`;

interface IProps {
    event: OrgEvent;
    user: User;
    viewing: Viewing;
    onClick(text: ReserveButtonText, event: OrgEvent): void;
}

function SingleEvent({ event, user, viewing, onClick }: IProps) {
    const coordinatorName =
        event.coordinator.name.first + ' ' + event.coordinator.name.last;
    const formattedTime = (date: Date) => {
        let charLen = date.toLocaleTimeString().length;
        const amPm = date.toLocaleTimeString().slice(charLen - 2);
        let formattedDate: string = '';
        if (viewing === 'Reserved') {
            formattedDate = `${date.getDate().toString()} ${WeekDays[
                date.getDay()
            ].slice(0, 3)} -`;
        }
        return `${formattedDate} ${date.getHours()}:${date.getMinutes()} ${amPm}`;
    };

    return (
        <StyledEvent
            className={classnames({
                reserved: event.isReserved,
            })}
        >
            <div className='left-column'>
                <p>{event.name}</p>
                <p>{user.activeOrganization.name}</p>
                <p>{coordinatorName}</p>
            </div>
            <div className='right-column'>
                <p>{formattedTime(event.date)}</p>
                <ReserveButton event={event} user={user} onClick={onClick} />
                <Names attendees={event.attendees} user={user} />
            </div>
        </StyledEvent>
    );
}

export default SingleEvent;
