const CategoriesController = require("../controller/category.controller");
const { isAuthenticated ,  checkAdmin } = require("../Middlewares/Authentication.Validation");
const { ValidateCreate, UpdateValidator } = require("../Middlewares/validators");
const routes = (app)=>{
    app.get("/ecomm/api/v1/HomePage",CategoriesController.getMetoHomePage);
    app.get("/ecomm/api/v1/categories",CategoriesController.getcategories)
    app.post(`/ecomm/api/v1/CreateCategory`,isAuthenticated,checkAdmin,CategoriesController.createCategories);
    app.put(`/ecomm/api/v1/UpdateCategory`,UpdateValidator,CategoriesController.UpdateById);
    app.delete("/ecomm/api/v1/DeleteCategory",isAuthenticated,checkAdmin,CategoriesController.DeleteCategoryContent);
    app.get("/ecomm/api/v1/InRange",CategoriesController.dataInRange);
}
module.exports = routes ;

