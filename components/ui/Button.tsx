import styled from 'styled-components';

interface IProps {
    type: 'primary' | 'secondary';
    text: string;
    onClick: () => void;
}

const StyledButton = styled.button`
    padding: 10px;
    transition: all var(--transition-duration) ease-in-out;

    &[data-type='primary'] {
        background: var(--primary-color);
        color: var(--secondary-color);

        &:hover,
        &:focus {
            background: var(--primary-color--hover);
        }
    }

    &[data-type='secondary'] {
        background: var(--tertiary-color);
        color: var(--white);

        &:hover,
        &:focus {
            background: var(--primary-color);
            color: var(--secondary-color);
        }
    }
`;

function Button({ text, onClick, type }: IProps) {
    return (
        <StyledButton onClick={onClick} data-type={type}>
            {text}
        </StyledButton>
    );
}

export default Button;
