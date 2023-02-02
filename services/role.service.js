const {STATUS} = require(`../config/order.constants`)
const {User , Role} = require(`../models/index`);
const {getUserByEmail}  = require(`./auth.helper.service`)
const addRoleToUser = async(userEmail, RoleName)=>{
    try
    {
    const user =  await getUserByEmail(userEmail)
    const role = await getRoleByName(RoleName)
     await user.addRole(role);
    return user;
    }
    catch(err){
        console.log(err)
    }
}
const removeUserRole = async(userEmail, RoleName)=>{
    try
    {
        const user =  await getUserByEmail(userEmail)
    const role = await getRoleByName(RoleName)
    await user.removeRole(role);
    return user;
    }
    catch(err){
        console.log(err);
}
}
const  getRoleByName= async(Rolename)=>{
   try {
    const response = await Role.findOne({
        where : {
            name :Rolename
        }
    })
    return response
}
    catch(err){
        console.log(err);
    }
}


module.exports = {
    addRoleToUser ,removeUserRole , getRoleByName 
}