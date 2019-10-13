import { useState, useRef } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { OrgEvent } from '../../models/OrgEvent/OrgEvent';
import { User } from '../../models/User/User';

interface IProps {
    event: OrgEvent;
    user: User;
}

const StyledReserveButton = styled.button`
    border-color: var(--primary-color);
    border-radius: var(--button-border-radius);
    color: var(--primary-color);
    transition: background var(--transition-duration) ease-in-out;

    &[data-text='Reserve']:hover,
    &[data-text='Reserved'] {
        background: var(--primary-color);
        color: var(--white);
    }

    &[data-text='Unreserve'] {
        background: var(--cancel-color);
        color: var(--white);
        &:hover {
            background: var(--cancel-color--hover);
        }
    }
    &[data-text='Confirm'] {
        background: var(--confirm-color);
        color: var(--secondary-color);
        &:hover {
            background: var(--confirm-color--hover);
        }
    }
`;

function ReserveButton({ event, user }: IProps) {
    const getReservedText = () => {
        return event.isReserved ? 'Reserved' : 'Reserve';
    };
    const [text, setText] = useState(getReservedText());
    const button = useRef<HTMLButtonElement>(null);

    const onClick = () => {
        if (text === 'Confirm') {
            setText('Reserved');
            event.reserve(user.id);
        } else if (text === 'Unreserve') {
            setText('Reserve');
            event.unreserve(user.id);
        } else if (text === 'Reserve') {
            setText('Confirm');
        } else if (text === 'Reserved') {
            setText('Unreserve');
        }
    };
    return (
        <StyledReserveButton
            className={classnames({
                reserved: event.isReserved,
            })}
            ref={button}
            onClick={onClick}
            data-text={text}
        >
            {text}
        </StyledReserveButton>
    );
}

export default ReserveButton;
