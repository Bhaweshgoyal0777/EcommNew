const { getallCategories, createProductCategories , UpdateCategories , DeleteCategory, GetInBetween} = require("../services/category.service");

const getcategories = async (req,res)=>{
    const response  = await getallCategories()
        return res.json({
                massage:"Seccussfully Fetched the data",
                succes:true,
                code:200,
                data: response
                
        })
}
const createCategories = async(req,res)=>{
    // const data = req.body
    const response = await createProductCategories(req.body) ;
    return res.json({
        message: 'Successfully created the category',
        success: true,
        code: 201,
        data:response
    });
}
const UpdateById = async(req,res)=>{
    const response = await UpdateCategories(req.body);
    return res.json({
        massage : "data is successfully Update",
        sucess : true,
        code:201,
        data : response
    })
}
const getMetoHomePage = (req,res)=>{
    return res.send("Hello this is our home page Welcomes you to get In");
}
const DeleteCategoryContent = async(req,res)=>{
    const response = await DeleteCategory(req.body);
    return res.json({
        massage : "data is successfully Deleted",
        sucess : true,
        code:201,
        data : response
    })
}
 const dataInRange = async(req,res) =>{
    const response = await GetInBetween(req.body);
    return res.json({
        massage : "data is successfully Fetched",
        sucess : true,
        code:201,
        data : response
    })
}
module.exports = {
getcategories,createCategories,getMetoHomePage,UpdateById,DeleteCategoryContent , dataInRange
};