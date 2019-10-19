import { useContext } from 'react';
import styled from 'styled-components';
import MainAppContext from '../context/MainAppContext';

const StyledAvatar = styled.div`
    border: 1px solid var(--white);
    border-radius: 50%;
    height: 40px;
    width: 40px;
    margin-right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Avatar() {
    const context = useContext(MainAppContext);

    if (!context.user) {
        return null;
    }

    const initials = context.user.getInitials();

    return (
        <StyledAvatar>
            <p>{initials}</p>
        </StyledAvatar>
    );
}

export default Avatar;
