var Router = require('routes');
var h = require('virtual-dom/h');

var router = new Router;
module.exports = router;

router.addRoute('/', function (m) {
    return h('div.screen', [
        h('h1.title', 'videdit'),
        h('div.menu', [
            h('a', { href: '/create' }, [
                h('button.menu-item', 'new project')
            ]),
            h('a', { href: '/load' }, [
                h('button.menu-item', 'load project')
            ])
        ])
    ]);
});

router.addRoute('/create', function () {
    return h('div', 'create!');
});
