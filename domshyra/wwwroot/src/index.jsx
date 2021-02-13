import React from "../../node_modules/react";
import ReactDOM from "../../node_modules/react-dom";

export class HelloReact extends React.Component {
    render() {
        return (
            <div>Hello React</div>
        );
    }
}

ReactDOM.render(<HelloReact />, document.getElementById("root"));