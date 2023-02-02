const ProductItems = require("../controller/Product.controller");
const { isAuthenticated, checkAdminOrSeller } = require("../Middlewares/Authentication.Validation");
const { ValidateCreate, UpdateValidator, DeleteValidator} = require("../Middlewares/validators");
const routes = (app)=>{
    app.get("/ecomm/api/v1/Product/HomePage",ProductItems.getMetoHomePage);
    app.get("/ecomm/api/v1/Product/getallProduct",ProductItems.getallProduct);
    app.get("/ecomm/api/v1/Product/getProduct/:productId" , ProductItems.getProductById)
    app.get("/ecomm/api/v1/Product/getallProduct/:categoryId",ProductItems.getallProductBycategoryId);
    app.get("/ecomm/api/v1/Product/getallProductByName/:name",ProductItems.getByName);
    app.put("/ecomm/api/v1/Product/between",ProductItems.getProductDataOfRange);
    app.post("/ecomm/api/v1/Product/CreateProductData",isAuthenticated,checkAdminOrSeller,ValidateCreate,ProductItems.CreateProduct);
    app.put("/ecomm/api/v1/Product/UpdateProductData",isAuthenticated,checkAdminOrSeller,UpdateValidator,ProductItems.UpdateProduct);
    app.delete("/ecomm/api/v1/Product/DeleteProduct",isAuthenticated,checkAdminOrSeller,DeleteValidator,ProductItems.DeleteProductContent);
    
}

module.exports = routes;