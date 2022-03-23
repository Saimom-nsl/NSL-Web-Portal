const userRouters = require("../routers/userRouter");
const employeeRouters = require("../routers/employeeRouter");
const departmentRouters = require("../routers/departmentRouter");
const roleRouters = require("../routers/roleRouters");
const leaveTypeRouters = require("../routers/leaveRouter");
const teamRouters = require("../routers/projectRouter");
const teamTaskRouters = require("../routers/projectTaskRouter");
const leaveRequestRouters = require("../routers/leaveRequestRouter");
const rwpmRouters = require("../routers/rwpmRouter");

module.exports = (app) => {
    app.use("/api/user", userRouters);
    app.use("/api/employee", employeeRouters);
    app.use("/api/department", departmentRouters);
    app.use("/api/role", roleRouters);
    app.use("/api/project", teamRouters);
    app.use("/api/task", teamTaskRouters);
    app.use("/api/leavetype",leaveTypeRouters);
    app.use("/api/leavereq", leaveRequestRouters);
    app.use("/api/rwpm", rwpmRouters);

}