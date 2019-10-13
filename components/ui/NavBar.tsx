import styled from 'styled-components';

const MenuBtn = styled.button`
    color: inherit;
    cursor: pointer;
    background: none;
    border: none;
`;

function Menu() {
    return <MenuBtn id='Menu'>Menu</MenuBtn>;
}

const Nav = styled.nav`
    background: var(--secondary-color);
    color: var(--white);
    width: 100%;
    padding: 1rem;
    text-transform: uppercase;
`;

export function NavBar() {
    return (
        <Nav id='NavBar'>
            <Menu />
        </Nav>
    );
}
