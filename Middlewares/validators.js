const ValidateCreate = (req,res,next) =>{
    if(!req.body.name){
        return res.json({
            message: 'Category name is missing, please try again by adding a category name',
            success: false,
            err: 'name parameter is missing in the request body',
            data: {}
        })
    }
    else if(!req.body.cost){
        return res.json({
            message: 'Category Cost is missing, please try again by adding a category Cost',
            success: false,
            err: 'Cost parameter is missing in the request body',
            data: {}
        })
    }
    else if(!req.body.categoryId){
        return res.json({
            message: 'Category CategoryId is missing, please try again by adding a category Id',
            success: false,
            err: 'CategoryId parameter is missing in the request body',
            data: {}
        })
    }
    next();
}
const UpdateValidator = (req,res,next) =>{
    if(!req.body.id){
        return res.json({
            message: "Not Getting Updated",
            sucess : false,
            err : "ID parameter is missing",
            data : {}
        })
    }
    next();
}
const DeleteValidator = (req,res,next)=>{
    if(!req.body.id) {
        return res.json({
            message: ' Id is missing, please try again by adding a category name',
            success: false,
            err: 'Id parameter is missing in the request body',
            data: {}
        })
    }
    next()
}
module.exports = {
    ValidateCreate , UpdateValidator ,DeleteValidator 
}