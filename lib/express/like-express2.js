const http = require("http");
const slice = Array.prototype.slice;

class Express {
    constructor() {
        this.stacks = [];
    }
    _isMatch(req, stack) {
        if (req.url === "/favicon.ico") {
            return false;
        }
        if (req.url.indexOf(stack.path) === 0) {
            if (req.method.toLowerCase() === stack.method || stack.method === "all") {
                return true;
            }
        }
        return false;
    }
    _resgister(method, args) {
        if (typeof args[0] === "string") {
            this.stacks.push({
                path: args[0],
                middleware: slice.call(args, 1),
                method
            });
        } else {
            this.stacks.push({
                path: "/",
                middleware: slice.call(args),
                method
            });
        }
    }
    use() {
        this._resgister("all", arguments);
    }
    get() {
        this._resgister("get", arguments);
    }
    post() {
        this._resgister("post", arguments);
    }
    _trigger(req, res) {
        const finalStacks = [];
        this.stacks.forEach(stack => {
            if (this._isMatch(req, stack)) {
                finalStacks.push(...stack.middleware);
            }
        });
        const next = () => {
            const cb = finalStacks.shift();
            if (cb) {
                cb(req, res, next);
            }
        };
        next();
    }
    _serverHandle(req, res) {
        res.json = data => {
            res.setHeader("content-type", "application/json");
            res.end(JSON.stringify(data));
        };
        this._trigger(req, res);
    }
    listen() {
        // 利用箭头函数在定义时绑定
        const server = http.createServer((req, res) => {
            // console.log("this === http", this === http); // false
            // console.log("this intanceof Express", this instanceof Express); // true
            this._serverHandle(req, res);
        });
        server.listen(...arguments);
    }
}

module.exports = function() {
    return new Express();
};