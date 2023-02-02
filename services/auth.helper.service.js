const {User} = require(`../models/index`)
const getUserByEmail = (data) =>{
    const response =   User.findOne({
        where:{
            email:data // select * from users where email = data or data.email
        }
    });

    return response;
}
module.exports = {
     getUserByEmail 
}