const Layer = require('express/lib/router/layer');

function isAsyncFunction(value) {
    return value[Symbol.toStringTag] === 'AsyncFunction';
}

Layer.prototype.handle_request = async function handle(req, res, next) {
    var fn = this.handle;

    if (fn.length > 3) {
        // not a standard request handler
        return next();
    }

    try {
        if (isAsyncFunction(fn)) {
            await fn(req, res);
            next();
        } else {
            fn(req, res, next);
        }
    } catch (err) {
        next(err);
    }
};