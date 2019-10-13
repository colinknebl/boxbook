import React from 'react';
import styled from 'styled-components';
import Day from './DatePickerDay';

const StyledDatePicker = styled.div`
    border-top: 2px solid var(--secondary-color);
    border-bottom: 2px solid var(--secondary-color);
    display: flex;
    justify-content: center;
`;

interface IProps {
    dates: Date[];
    selectedDay: number;
    setSelectedDay(num: number): void;
}

class DatePicker extends React.PureComponent<IProps> {
    render() {
        const { dates, selectedDay, setSelectedDay } = this.props;
        return (
            <StyledDatePicker>
                {dates.map((date, index) => (
                    <Day
                        key={date.getTime()}
                        day={date}
                        selected={index === selectedDay}
                        index={index}
                        onClick={setSelectedDay}
                    />
                ))}
            </StyledDatePicker>
        );
    }
}

export default DatePicker;
