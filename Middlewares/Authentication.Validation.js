const {  verifyToken } = require("../services/auth.service");
const {getUserByEmail } = require(`../services/auth.helper.service`);
const{getRoleById, getRoleByName} = require(`../services/role.service`)


const isAuthenticated = async(req,res,next)=>{
 const token = req.headers[`x-access-token`];
    if(!token){
        return res.json({
            status : `JWT is Missing`,
            data :[],
            err:`Invalid Request orr missing argument in Header`
        });
    }
    const returnedData = verifyToken(token);
    if(!returnedData){
        return res.json({
            status : 401,
            message : `Invalid JWT token`,
            data :[],
            err : `Invalid auth Details`
        });
    }
    const user = await getUserByEmail(returnedData.email);
    if(!user){
        return res.json({
            status : 401 ,
            message : "JWT token Given For Invalid user",
            err : "Invalid credentials"
        });
    }
    req.user = user;
    next()
}
const checkAdmin = async(req,res,next)=>{
    const user = req.user;
    const adminRole = await getRoleByName('admin')
    const isAdmin = await user.hasRole(adminRole);
    if(!isAdmin){
       return  res.json({
            status : 401 ,
            message : "User Is Not a Admin",
            err : "Invalid credentials"
        })
    }

    next()
}
const checkAdminOrSeller = async(req,res,next)=>{
    const user = req.user;
    const adminRole = await getRoleByName(`admin`);
    const Seller = await getRoleByName(`seller`)
    const isAdmin = await user.hasRole(adminRole);
    const isSeller = await user.hasRole(Seller);
    if(!isAdmin && !isSeller){
       return  res.json({
            status : 401 ,
            message : "User Is Not a Admin or Seller",
            err : "Invalid credentials"
        })
    }

    next()
}

module.exports = {
    isAuthenticated, checkAdmin , checkAdminOrSeller
}