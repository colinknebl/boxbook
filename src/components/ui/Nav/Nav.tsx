import React from 'react';
import NavBar from './NavBar';
import NavMenu from './NavMenu';

interface IState {
    slidingMenuOpen: boolean;
}

class Nav extends React.PureComponent {
    state: IState = {
        slidingMenuOpen: false,
    };

    render() {
        return (
            <>
                <NavMenu
                    open={this.state.slidingMenuOpen}
                    toggle={this._toggle}
                />
                <NavBar toggle={this._toggle} />
            </>
        );
    }

    private _toggle = () => {
        this.setState({
            slidingMenuOpen: !this.state.slidingMenuOpen,
        });
    };
}

export default Nav;
