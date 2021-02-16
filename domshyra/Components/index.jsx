import React from "react";
import ReactDOM from "react-dom";

//css
import "bootstrap"
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";

//styles
import "../Styles/scss/main.scss"

//components
import HelloReact from "./HelloReact";

ReactDOM.render(<HelloReact />, document.getElementById("hello-react"));
