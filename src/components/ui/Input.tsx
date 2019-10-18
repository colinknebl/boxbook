import React, { useState, useRef } from 'react';
import styled from 'styled-components';

interface IProps {
    type: 'text' | 'password' | 'email';
    placeholder: string;
    required: boolean;
    isErrored: boolean;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.div`
    margin-bottom: 8px;
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    input {
        border: none;
        border-bottom: 2px solid transparent;
        border-bottom-color: var(--secondary-color);
        color: var(--secondary-color);
        outline: none;
        padding: 10px;
        width: 100%;
        margin-top: 14px;
        transition: all var(--transition-duration);

        &:focus {
            border-bottom-color: var(--primary-color);
        }

        &[data-error='true'] {
            border: 2px solid var(--cancel-color);
        }
    }

    /* input:focus + span, */
    span[data-has-input='true'] {
        transform: translate3d(0px, -40px, 0px) scale3d(0.7, 0.7, 1);
    }

    input:focus + span:not([data-has-input='true']) {
        opacity: 0.5;
    }

    span {
        position: absolute;
        text-align: left;
        display: block;
        transform: translate3d(10px, -10px, 0px);
        pointer-events: none;
        transition: all var(--transition-duration);
        transform-origin: left;
    }
`;

function Input(props: IProps) {
    let { type, placeholder, required, isErrored, value } = props;
    let inputEl = useRef(null);
    const [hasValue, setHasValue] = useState(Boolean(value));
    const update = (event?: React.ChangeEvent<HTMLInputElement>) => {
        inputEl &&
            inputEl.current &&
            setHasValue(Boolean(inputEl.current.value));
    };
    setTimeout(() => {
        update();
    }, 100);
    return (
        <StyledInput>
            <input
                type={type}
                value={value}
                required={required}
                ref={inputEl}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    update(event);
                    props.onChange(event);
                }}
                data-error={isErrored}
            />
            <span data-has-input={hasValue}>{placeholder}</span>
        </StyledInput>
    );
}

export default Input;
