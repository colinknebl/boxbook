import styled from 'styled-components';
import Avatar from './Avatar';

const MenuBtn = styled.button`
    border: none;
    border-radius: 5px;
    color: inherit;
    cursor: pointer;
    background: none;
    padding: 0.5rem;
    transition: all var(--transition-duration) ease-in-out;

    &:hover {
        background: var(--secondary-color--hover);
    }
`;

const Nav = styled.nav`
    background: var(--secondary-color);
    color: var(--white);
    width: 100%;
    padding: 1rem;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface IProps {
    toggle(): void;
}

function NavBar(props: IProps) {
    return (
        <Nav id='NavBar'>
            <MenuBtn id='Menu' onClick={props.toggle}>
                Menu
            </MenuBtn>
            <Avatar />
        </Nav>
    );
}

export default NavBar;
