const authService = require(`../services/auth.service`);
require(`dotenv`).config();
const {Role,Order} = require(`../models/index`)
const {getUserByEmail}=require(`../services/auth.helper.service`)
const jwt = require(`jsonwebtoken`);
const signup = async(req,res)=>{
    const response = await authService.signup(req.body)     
    return res.status(200).json({
        message :  `Successfully signed Up`,    
        success : true,
        data : response
    })
}   
const signin = async(req,res)=>{
    const userData = await getUserByEmail(req.body.email);
    // const order = await Order.findOne({
    //     where : {
    //         userId : userData.id
    //     }
    // })
    if(!userData){
        return res.status(400).json({
            message :  `Email Id is Incorrect , Please Try Again Later`,
            success : true,
            data : null
        })
    }
    else{
    //     const passwordGivenByUser = req.body.password;
    //     const actualHashedPassword = userData.password;
    const passwordVerified = authService.verifyPassword(req.body.password , userData.password);/// it verify the password to the hashed password

    if(passwordVerified){ // if password Verified
        console.log(process.env.JWT_SECRET_KEY , "SECRET KEY")
        var token  = jwt.sign({ email:userData.email,password : userData.password ,username : userData.username },process.env.JWT_SECRET_KEY); // giving token token to the user/client ---- Secret key is used to rematch the passsword which we are going to use further
        return res.status(200).json({
            message :  `Successfully signed In`,    
            success : true,
            // data : userData\
            // cartId : order.id, 
            username : userData.username,
            email : req.body.email,
            id : userData.id,
            token : token
        })
    }
    else
    {
        return res.status(400).json({
            message :  `Password is Incorrect , Please Try Again Later`,
            success : true,
            data : null
    })
}
}
}

module.exports = {signup , signin }