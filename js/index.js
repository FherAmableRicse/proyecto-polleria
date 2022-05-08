'use strict';
import contact from "./contact.js";
const documentReady = () => {
    contact();
};
window.document.addEventListener('DOMContentLoaded', documentReady);