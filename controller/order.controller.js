const { STATUS } = require(`../config/order.constants`);
const { Order } = require("../models/index");
const {
  getOrderByUser,
  createOrder,
  addProductToOrder,
  removeProductFromOrder,
  getOrderDetails
} = require(`../services/order.service`);

const createOrderInit = async (req, res) => {
  const response = await Order.findOne({
    where: {
      userId: req.body.userId,
    },
  });
  if (response) {
    return res.json({
      cartId: response.id,
      status: 200,
      success: true,
      message: "Successfully Created the Order",
    });
  } else {
    const order = await Order.create({
      userId: req.user.id,
      status: STATUS.CREATION,
    });

    return res.json({
      cartId: order.id,
      status: 200,
      success: true,
      message: "Successfully Created the Order",
    });
  }
};

const addProduct = async (req, res) => {
  console.log(req.user.id, "=======================================");
  let order = await getOrderByUser(req.user, STATUS.CREATION);
  if (!order) {
    order = await createOrder(req.user, STATUS.CREATION);
  }
  let response = addProductToOrder(req.body.ProductId, order.id);
  // console.log(order , "===============================================")
  // response.then(data => console.log(data , "Resolved Data")).catch(err => console.log(err, "ERRRROR>>>>>>"));
  if (response) {
    return res.json({
      cartId: order.id,
      status: 200,
      success: true,
      message: "Successfully Added the Product to Order",
      data: response,
    });
  }
};
const removeProduct = async (req, res) => {
  let order = await getOrderByUser(req.user, STATUS.CREATION);
  if (!order) {
    return res.json({
      status: 400,
      success: true,
      message: "No Product Is Ordered",
    });
  }
  const response = await removeProductFromOrder(req.body.ProductId, order.id);
  if (!response) {
    return res.json({
      status: 400,
      success: true,
      message: "Product Does Not Exist",
    });
  }
  if (response.error) {
    return res.json({
      status: 400,
      success: true,
      message: response.error,
    });
  }
  return res.json({
    status: 200,
    success: true,
    message: "Product removed Successfully",
  });
};
const getAllOrdersProduct = async (req, res) => {
  let userId = req.user.id
  let response = await getOrderDetails(req.query.orderID);
  console.log(response);
  return res.status(200).json({
    message: "All Yours Orders",
    success: true,
    data: response,
  });
};
module.exports = {
  addProduct,
  removeProduct,
  createOrderInit,
  getAllOrdersProduct,
};
