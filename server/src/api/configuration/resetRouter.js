const resetUserRouter = require("../v1/routers/resetUserRouter");

module.exports = (app) => {
    app.use("/resetpassword", resetUserRouter);
}