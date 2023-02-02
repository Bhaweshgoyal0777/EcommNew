const { Op } = require("sequelize");

const user = require(`../models/index`).Categories
const getallCategories = async () => {
    const response = await user.findAll();
    return response;
}
const createProductCategories = async(data)=>{
    const response = await user.create({
        name : data.name ,
        description :data.description
    })
    return response
}
const UpdateCategories = async(data)=>{
    const response = await user.update({
        name : data.name,
        description : data.description
    },{
        where : {
            id : data.id
        }
    })
    return response
}

const DeleteCategory = async(data)=>{
    const response  = await user.destroy({
        where :{
            id : data.id
        }
    })
    return response;
}
const GetInBetween = async(data) =>{
    const response = await user.findAll({
        where :{
            id : {
                [Op.between] : [data.min , data.max ]
            }
        }
    })
    return response ;
}

module.exports = {
    getallCategories , createProductCategories , UpdateCategories , DeleteCategory ,GetInBetween
}