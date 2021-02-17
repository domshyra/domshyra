import React from "react";
import ReactDOM from "react-dom";

export default class HelloReact extends React.Component {
    render() {
        return (
            <div>Hello React</div>
        );
    }
}


ReactDOM.render(<HelloReact />, document.getElementById("hello-react"));