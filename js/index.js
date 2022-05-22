'use strict';
import contact from "./contact.js";
import header from "./header.js";
const documentReady = () => {
    header();
    contact();

};
document.addEventListener('DOMContentLoaded', documentReady);