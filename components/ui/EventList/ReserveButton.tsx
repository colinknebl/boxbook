import { useState, useRef } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { OrgEvent } from '../../models/OrgEvent/OrgEvent';
import { User } from '../../models/User/User';

export type ReserveButtonText =
    | 'Confirm'
    | 'Reserve'
    | 'Reserved'
    | 'Unreserve';
interface IProps {
    event: OrgEvent;
    user: User;
    onClick(text: ReserveButtonText, event: OrgEvent): void;
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

    &[data-text='Reserved']:hover {
        color: var(--primary-color);
        background: inherit;
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

function ReserveButton({ event, user, onClick }: IProps) {
    const getReservedText = () => {
        return event.isReserved ? 'Reserved' : 'Reserve';
    };
    const [text, setText] = useState(getReservedText());
    const button = useRef<HTMLButtonElement>(null);

    const clickHandler = () => {
        if (text === 'Confirm') {
            setText('Reserved');
            onClick('Reserve', event);
        } else if (text === 'Unreserve') {
            setText('Reserve');
            onClick('Unreserve', event);
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
            onClick={clickHandler}
            data-text={text}
        >
            {text}
        </StyledReserveButton>
    );
}

export default ReserveButton;
