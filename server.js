var http = require('http');
var fs = require('fs');
var path = require('path');
var tostr = require('vdom-to-html');
var hyperstream = require('hyperstream');
var router = require('./routes');

var ecstatic = require('ecstatic');
var st = ecstatic(__dirname + '/public');

var server = http.createServer(function (req, res) {
    var m = router.match(req.url);
    if (m) {
        res.setHeader('content-type', 'text/html');
        read('index.html').pipe(hyperstream({
            '#content': tostr(m.fn({
                params: m.params,
                state: {
                    href: req.url,
                    timeline: { start: 0, end: 90 }
                }
            }))
        })).pipe(res);
    }
    else st(req, res)
});
server.listen(5000);

function read (file) {
    return fs.createReadStream(path.join(__dirname, 'public', file));
}
