var EventEmitter = require('events');

var e = new EventEmitter();

e.on('click', function () {
    console.log('click');
});

e.emit('click');