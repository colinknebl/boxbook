import classnames from 'classnames';
import styled from 'styled-components';

const WeekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const StyledDay = styled.button`
    border: none;
    border-right: 2px solid var(--secondary-color);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 0px;
    text-align: center;
    width: 50px;

    transition: background var(--transition-duration) ease-in-out;

    &.selected {
        background: var(--secondary-color);
        color: var(--white);
    }

    &:first-of-type {
        border-left: 2px solid var(--secondary-color);
    }

    &:hover:not(.selected) {
        background: var(--tertiary-color);
        color: var(--white);
    }
`;

interface IProps {
    day: Date;
    selected: boolean;
    index: number;
    onClick(num: number): void;
}

export default function Day({ day, selected, onClick, index }: IProps) {
    return (
        <StyledDay
            className={classnames({
                selected: selected,
            })}
            onClick={() => onClick(index)}
        >
            <span>{day.getDate()}</span>
            <span>{WeekDays[day.getDay()].slice(0, 3)}</span>
        </StyledDay>
    );
}
