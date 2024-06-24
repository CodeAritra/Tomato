import userModel from "../models/User.js";
import orderModel from "../models/order.js";

export const createOrder = async (req, res) => {
  try {
    let user = await userModel.findOne({ username: req.user.username });
    // console.log(user._id);
    const { items, amount, address } = req.body;
    const newOrder = await orderModel.create({
      userId: user._id,
      items,
      amount,
      address,
    });

    await newOrder.save()
    await userModel.findByIdAndUpdate(user._id,{cartData:{}})

    res.send({
        success:true,
        newOrder
    });
  } catch (error) {
    res.send({
        success:false,
        message:error
    });
  }
};
