var h = require('virtual-dom/h');
var url = require('url');
var router = require('./routes');
var state = { href: location.pathname };

var singlePage = require('single-page');
var show = singlePage(function (href) {
    var u = url.parse(url.resolve(location.href, href));
    if (state.href !== u.pathname) {
        state.href = u.pathname;
        loop.update(state);
    }
});

var vdom = require('virtual-dom');
var main = require('main-loop');
var loop = main(state, render, vdom);

var root = document.querySelector('#content');
root.insertBefore(loop.target, root.children[0]);
root.removeChild(root.children[1]);

var catchLinks = require('catch-links');
catchLinks(window, show);

function render (state) {
    var m = router.match(state.href);
    if (m) return m.fn({
        params: m.params,
        state: state,
        show: show
    });
    return h('div', []);
}
