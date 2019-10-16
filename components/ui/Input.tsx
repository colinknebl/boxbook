import React, { useState } from 'react';
import styled from 'styled-components';

interface IProps {
    type: 'text' | 'password';
    placeholder: string;
    required: boolean;
    ref?: any;
}

const StyledInput = styled.div`
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    input {
        border: none;
        border-bottom: 2px solid var(--secondary-color);
        color: var(--secondary-color);
        outline: none;
        padding: 10px;
        width: 100%;
        margin-top: 14px;
        transition: all var(--transition-duration);

        &:focus {
            border-color: var(--primary-color);
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

const Input = React.forwardRef(
    (
        { type, placeholder, required }: IProps,
        ref: React.RefObject<HTMLInputElement>
    ) => {
        let [inputVal, setInputVal] = useState('');
        const update = () => {
            setInputVal(ref.current.value);
        };
        setTimeout(() => {
            ref.current && update();
        }, 100);
        return (
            <StyledInput>
                <input
                    type={type}
                    value={inputVal}
                    required={required}
                    ref={ref}
                    onChange={update}
                    onInput={() => console.log('input')}
                />
                <span data-has-input={Boolean(inputVal)}>{placeholder}</span>
            </StyledInput>
        );
    }
);

export default Input;
