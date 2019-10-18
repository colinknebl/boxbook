import styled from 'styled-components';
import classnames from 'classnames';
import { Viewing } from './EventList';

const ViewingBtn = styled.button`
    --width: calc(100% - 2px);
    background: inherit;
    border: none;
    cursor: pointer;
    position: relative;
    margin: 10px;
    padding: 0 0 3px 0;

    &:after {
        content: '';
        border: 1px solid;
        border-color: red;
        position: absolute;
        bottom: 0;
        left: 0;
        width: var(--width);
        transition: all var(--transition-duration) ease-in-out;
        transform: scale(0);
    }

    &.selected,
    &:hover {
        &:after {
            border-color: var(--secondary-color);
            width: var(--width);
            transform: scale(1);
        }
    }
`;

interface IProps {
    value: Viewing;
    selected: boolean;
    number: number | null;
    onClick: (nameOfClicked: Viewing) => void;
}

function ViewingButton(props: IProps) {
    return (
        <ViewingBtn
            className={classnames({
                selected: props.selected,
            })}
            onClick={() => {
                props.onClick(props.value);
            }}
        >
            {props.value}{' '}
            {typeof props.number === 'number' ? `(${props.number})` : null}
        </ViewingBtn>
    );
}

export default ViewingButton;
