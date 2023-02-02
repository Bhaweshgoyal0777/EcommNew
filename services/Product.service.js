// const categories = require('../models/categories');
const { Op } = require(`sequelize`);

const { Product, Categories } = require("../models/index");
const getAllProductsdata = async () => {
  const response = await Product.findAll({ include: Categories });
  return response;
};
const getAllProductsdataByCategoryId = async (data) => {
  const response = await Product.findAll({
    where: {
      categoryId: data,
    },
  });
  return response;
};
const CreateProductData = async (data) => {
  const response = await Product.create({
    name: data.name,
    description: data.description,
    cost: data.cost,
    categoryId: data.categoryId,
  });
  return response;
};
const UpdateProductData = async (data) => {
  const response = await Product.update(
    {
      name: data.name,
      description: data.description,
      cost: data.cost,
      categoryId: data.categoryId,
    },
    {
      where: {
        id: data.id,
      },
    }
  );
  return response;
};
const DeleteProduct = async (data) => {
  const response = await Product.destroy({
    where: {
      id: data.id,
    },
  });
  return response;
};
const getallProductByName = async (data) => {
  const response = await Product.findAll({
    where: {
      name: {
        [Op.like]: [`%${data.name}%`],
      },
    },
  });
  return response;
};
const getBetweenData = async (data) => {
  const response = await Product.findAll({
    where: {
      cost: {
        [Op.between]: [data.min, data.max],
      },
    },
  });
  return response;
};
const getProductByIdNum = async (data) => {
  const response = await Product.findAll({
    where: {
      id: data.productId,
    },
  });

  return response;
};
module.exports = {
  getAllProductsdata,
  CreateProductData,
  UpdateProductData,
  DeleteProduct,
  getAllProductsdataByCategoryId,
  getallProductByName,
  getBetweenData,
  getProductByIdNum,
};
