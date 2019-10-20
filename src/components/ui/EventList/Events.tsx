import styled from 'styled-components';
import SingleEvent from './SingleEvent';
import Link from 'next/link';
import { OrgEvent } from '../../models/OrgEvent/OrgEvent';
import { User } from '../../models/User/User';
import { ReserveButtonText } from './ReserveButton';
import { Viewing } from './EventList';

interface IProps {
    events: OrgEvent[];
    user: User;
    viewing: Viewing;
    onClick(text: ReserveButtonText, event: OrgEvent): void;
}

const StyledEvents = styled.section`
    &.no-events {
        text-align: center;
        a {
            color: var(--tertiary-color);

            &:hover {
                color: var(--primary-color);
            }
        }
    }
`;

function Events({ events, user, onClick, viewing }: IProps) {
    if (!user) {
        return (
            <StyledEvents className='no-events'>
                <p>
                    Please{' '}
                    <Link href='/app/login' shallow={true}>
                        <a>log in</a>
                    </Link>{' '}
                    to view your events.
                </p>
            </StyledEvents>
        );
    }

    if (events.length === 0) {
        if (viewing === 'Scheduled') {
            return (
                <StyledEvents className='no-events'>
                    <p>There are no events scheduled today</p>
                </StyledEvents>
            );
        } else {
            return (
                <StyledEvents className='no-events'>
                    <p>You have not reserved a place in any events</p>
                </StyledEvents>
            );
        }
    }

    return (
        <StyledEvents>
            {events.map((event, i) => (
                <SingleEvent
                    key={event.id}
                    event={event}
                    user={user}
                    onClick={onClick}
                    viewing={viewing}
                />
            ))}
        </StyledEvents>
    );
}

export default Events;
