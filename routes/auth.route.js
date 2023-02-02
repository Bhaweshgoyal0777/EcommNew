const authcontroller = require(`../controller/auth.controller`);
const routes = (app)=>{
    // let hashedPassword = bcrypt.hashSync(data.password , salt);
    app.post(`/ecomm/api/v1/signup`,authcontroller.signup)
    app.post(`/ecomm/api/v1/signin`,authcontroller.signin) 
   
}

module.exports = routes