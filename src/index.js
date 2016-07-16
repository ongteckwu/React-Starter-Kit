import React from 'react';
import { render } from 'react-dom'


class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Hello';
    }
    render() {
        return <div>Hello {this.props.name}</div>;
    }
}

export default Hello;

render(
 <Hello name="World" />,
 document.getElementById('app')
);