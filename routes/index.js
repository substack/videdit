var Router = require('routes');
var h = require('virtual-dom/h');

var router = new Router;
module.exports = router;

router.addRoute('/', function (m) {
    return h('div.screen.title-screen', [
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

router.addRoute('/create', function (m) {
    var labels = [];
    var start = m.state.timeline.start;
    var end = m.state.timeline.end;
    var step = Math.floor((end - start) / 10);
    var width = Math.floor(m.state.width / 10) - 20;
    if (width < 60) {
        step *= 2;
        width *= 2;
    }
    
    for (var i = start; i <= end; i += step) {
        labels.push(h('div.label', {
            style: { width: width + 'px' }
        }, label(i)));
    }
    return h('div.screen.edit-screen', [
        h('div.top', [
            h('div.files', [
                h('input', { type: 'file', multiple: true }),
            ]),
            h('div.preview', [
                h('video')
            ])
        ]),
        h('div.timeline', [
            h('div.timeline-inner', labels)
        ])
    ]);
});

function label (seconds) {
    var m = String(Math.floor(seconds / 60));
    var s = String(Math.floor(seconds % 60));
    if (m.length === 1) m = '0' + m;
    if (s.length === 1) s = '0' + s;
    return m + ':' + s;
}
