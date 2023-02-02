const {addRole,RemoveRole} = require(`../controller/role.controller`);
const {isAuthenticated, checkAdmin} = require(`../Middlewares/Authentication.Validation`)
const RoleRoute = (app)=>{
app.patch('/ecomm/api/v1/User',isAuthenticated,checkAdmin,addRole); 
app.delete(`/ecomm/api/v1/UserDelete`,isAuthenticated,checkAdmin,RemoveRole)
};
module.exports = {
    RoleRoute
}