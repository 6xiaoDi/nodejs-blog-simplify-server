const expressLike = require("./like-express");

const app = expressLike();

app.use("/", (req, res, next) => {
    console.log(1, "use 开始");
    next();
    console.log(1, "use 结束");
    res.json({
        say: "Hello World"
    });
});
app.get("/test", (req, res, next) => {
    console.log(2, "get 开始");
    next();
    console.log(2, "get 结束");
});
app.post("/test", (req, res, next) => {
    console.log(3, "post 开始");
    next();
    console.log(3, "post 结束");
});
app.use("/test", (req, res, next) => {
    console.log(4, "use 开始");
    next();
    console.log(4, "use 结束");
});
app.listen("1314", () => {
    console.log("server is running on PORT 1314");
});