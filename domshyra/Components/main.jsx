//js
import "bootstrap";
import "@popperjs/core";
import $ from "jquery";
window.jQuery = $;
window.$ = $;

$(function () {
    $("[data-toggle='tooltip']").tooltip();
});

//styles
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/free-solid-svg-icons";
import "@fortawesome/react-fontawesome";
import "../Styles/scss/main.scss";
