const { STATUS } = require(`../config/order.constants`);
const { Order, Product } = require(`../models/index`);
const { Order_Product } = require("../models/index");
const getOrderByUser = async (user, orderStatus) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: user.id,
        status: orderStatus,
      },
    });
    return order;
  } catch (err) {
    console.log(err);
  }
};
const createOrder = async (user, data) => {
  const order = await Order.create({
    userId: user.id,
    status: STATUS.CREATION,
  });
  // const order = await Order.findOne({
  //     where : {
  //         userId  : user.id
  //     }
  // })

  return order;
};
const addProductToOrder = async (productId, orderId) => {
  const order = await Order.findByPk(orderId);
  const product = await Product.findByPk(productId);
  let entry = await Order_Product.findOne({
    where: {
      OrderId: orderId,
      ProductId: productId,
    },
  });
  if (!entry) {
    entry = await order.addProduct(product, { through: { quantity: 1 } });
  } else {
    entry = await entry.increment("quantity", { by: 1 });
  }

  // if(entry){
  //     await entry.increment(`quantity`,{by : 1})
  // }
  // if(entry){
  //     console.log("GOING TO UPDATE")
  // const Update =  await Order_Product.update(`quantity`,{by:1}
  //     )
  // }
  //    if(Update){
  //         console.log(Update , "Quantity Updated");
  //     }

  return entry;
};
const removeProductFromOrder = async (ProductId, OrderId) => {
  try {
    const order = await Order.findByPk(OrderId);
    const product = await Product.findByPk(ProductId);
    if (order.status !== STATUS.CREATION) {
      return {
        error: "Order Cannot be Found",
      };
    }
    if (!product) {
      return {
        error: "Product Cannot be Found",
      };
    }
    const entry = await Order_Product.findOne({
      where: {
        orderId: OrderId,
        productId: ProductId,
      },
    });
    if (!entry) {
      return {
        error: "No such Product found in the order",
      };
    } else {
      if (entry.quantity <= 1) {
        order.removeProduct(product);
      } else {
        await entry.decrement(`quantity`, { by: 1 });
      }
    }
    return entry;
  } catch (err) {
    console.log(err);
  }
};
const getOrderDetails =async(orderId)=>{

    // const orderDetails = await Order.findAll({
    //     where :{
    //         userId : userId
    //     }
    // })
    // const response = await Order_Product.findOne({
    const response = await Order_Product.findAll({

        where : {
            orderId : orderId 
        }
    })
    return response
}
module.exports = {
  getOrderByUser,
  createOrder,
  addProductToOrder,
  removeProductFromOrder,
  getOrderDetails
};
