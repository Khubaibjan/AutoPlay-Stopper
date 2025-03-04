// ==UserScript==
// @name         Auto Pause Audio
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automatically pauses audio when the page loads and the pause button appears.
// @author       You
// @match        https://www.humanatic.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const waitForElement = (selector) => {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    };

    waitForElement('i.fa.fa-pause').then((pauseButton) => {
        const buttonElement = pauseButton.parentElement;
        console.log('Pause button found. Clicking...');
        buttonElement.click();
    });
})();
