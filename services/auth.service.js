const bcrypt = require(`bcryptjs`)
const {User} = require(`../models/index`);
const {getRoleByName} = require(`./role.service`)
var jwt = require('jsonwebtoken');

require(`dotenv`).config();
const signup = async(data)=>{
    const response = await User.create({
        username : data.username,
        email : data.email,
        password : data.password
    })
    const CustomerRole = await getRoleByName(`customer`)
    await response.addRole(CustomerRole);
    return response ;
}


const verifyPassword = (password, hashedPassword) =>{
    return bcrypt.compareSync(password, hashedPassword); // compare the hashed password and normal password
}
const verifyToken = (token) =>{
     try{
        const response = jwt.verify(token,process.env.JWT_SECRET_KEY);
        return response;
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    signup, verifyPassword , verifyToken 
}