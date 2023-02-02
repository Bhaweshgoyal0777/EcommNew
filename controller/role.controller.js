const {addRoleToUser,removeUserRole} = require(`../services/role.service`)
const addRole = (req,res) =>{
    let response = addRoleToUser(req.body.userEmail , req.body.RoleName);
    if(response){
        return res.json({
            message : "Role is Added Successfully" , 
            success : true,
            code : 200
        })
    }
    else{
        return res.json({
            message : "Internal Server is Error",
            code :500,
            success : true
        })
    }
}
const RemoveRole = (req,res)=>{
    let response = removeUserRole(req.body.userEmail , req.body.RoleName);
    if(response){
        return res.json({
            message: "Successfully Removed the Role",
            success : true,
            code: 200,
        })
    }else{
        return res.json({
            message : "Internal Server is Error",
            code :500,
            success : true
        })
    }
}
module.exports = {addRole,RemoveRole}