/*
 * The entry points of pseudocode-js
 **/

import ParseError from './ParseError';
import Lexer from './Lexer';
import Parser from './Parser';
import Renderer from './Renderer';

function makeRenderer(data, options) {
    var lexer = new Lexer(data);
    var parser = new Parser(lexer);
    return new Renderer(parser, options);
}

function mathjaxTypeset(elem) {
    try {
        // MathJax 3.x
        MathJax.typeset([elem]);
    }
    catch (_) {
        // MathJax 2.x
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, elem]);
    }
}


function render(input, baseDomEle, options) {
    if (input === null || input === undefined)
        throw 'input cannot be empty';

    var renderer = makeRenderer(input, options);
    var elem = renderer.toDOM();
    if (baseDomEle) baseDomEle.appendChild(elem);

    if (renderer.backend.name === 'mathjax') {
        mathjaxTypeset(elem);
    }
    return elem;
}

function renderToString(input, options) {
    if (input === null || input === undefined)
        throw 'input cannot be empty';

    var renderer = makeRenderer(input, options);
    if (renderer.backend.name === 'mathjax') {
        console.warn('Using MathJax backend -- math may not be rendered.');
    }

    return renderer.toMarkup();
}


function renderElement(elem, options) {
    if (!(elem instanceof Element))
        throw 'a DOM element is required';

    elem.style.display = 'none';

    var renderer = makeRenderer(elem.textContent, options);
    return renderer.toDOM();
}


function renderClass(className, options) {
    [].forEach.call(
        document.getElementsByClassName(className),
        function (el) { 
            renderElement(el, options);
        }
    );
}

export {
    ParseError,
    render,
    renderToString,
    renderElement,
    renderClass,
};
