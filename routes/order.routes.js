const {addProduct , removeProduct , getAllOrdersProduct} = require(`../controller/order.controller`);
const { isAuthenticated } = require("../Middlewares/Authentication.Validation");
const { createOrderInit } = require('../controller/order.controller')

const OrderRoutes = (app)=>{
    // to add product 
    app.get('/ecomm/api/v1/getAllOrdersProduct' , isAuthenticated , getAllOrdersProduct)
    app.post('/ecomm/api/v1/createcart',isAuthenticated,createOrderInit)
    app.post('/ecomm/api/v1/addProduct',isAuthenticated,addProduct)
    app.patch(`/ecomm/api/v1/removeProduct`,isAuthenticated ,removeProduct)
}
module.exports = {
    OrderRoutes
}