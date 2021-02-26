import React from "react";
import ReactDOM from "react-dom";

//js
import "bootstrap"
import "@popperjs/core"
import $ from "jquery";
window.jQuery = $;
window.$ = $;

$(function () {
    $("[data-toggle='tooltip']").tooltip()
})

//styles
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
import "../Styles/scss/main.scss"

//components
import HelloReact from "./HelloReact";

if (document.getElementById("hello-react") !== null) {
    ReactDOM.render(<HelloReact />, document.getElementById("hello-react"));
}
