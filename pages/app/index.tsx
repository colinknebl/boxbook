import React from 'react';

class App extends React.PureComponent {
    render() {
        console.log('TCL: App -> render -> props', this.props);
        return <p>the app</p>;
    }
}

export default App;
