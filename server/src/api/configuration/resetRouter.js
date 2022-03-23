const resetUserRouter = require("../routers/resetUserRouter");

module.exports = (app) => {
    app.use("/resetpassword", resetUserRouter);
}