const v1UserRouter = require("../v1/routers/userRouter");
const v1EmployeeRouter = require("../v1/routers/employeeRouter");
// const v1DepartmentRouter = require("../v1/routers/departmentRouter");
const v1RoleRouter = require("../v1/routers/roleRouters");
const v1LeaveTypeRouter = require("../v1/routers/leaveRouter");
const v1TeamRouter = require("../v1/routers/projectRouter");
const v1TeamTaskRouter = require("../v1/routers/projectTaskRouter");
const v1LeaveRequestRouter = require("../v1/routers/leaveRequestRouter");
const v1RwpmRouter = require("../v1/routers/rwpmRouter");
const v1SkillRouter = require("../v1/routers/skillRouters");
module.exports = (app) => {
    app.use("/api/v1/users", v1UserRouter);
    app.use("/api/v1/employees", v1EmployeeRouter);
    app.use("/api/v1/skills", v1SkillRouter);
    app.use("/api/v1/roles", v1RoleRouter);
    app.use("/api/v1/projects", v1TeamRouter);
    app.use("/api/v1/tasks", v1TeamTaskRouter);
    app.use("/api/v1/leavetypes",v1LeaveTypeRouter);
    app.use("/api/v1/leaverequests", v1LeaveRequestRouter);
    app.use("/api/v1/rwpms", v1RwpmRouter);       
    // app.use("/api/v1/departments", v1DepartmentRouter);

}