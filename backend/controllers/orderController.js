import userModel from "../models/User.js";
import orderModel from "../models/order.js";
import Razorpay from "razorpay"
import { configDotenv } from "dotenv";

configDotenv();


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEYID ,
  key_secret: process.env.RAZORPAY_SECRETKEY
});

export const createOrder = async (req, res) => {
  try {
    let user = await userModel.findOne({ username: req.user.username });
    const { items, amount, address, contact } = req.body;

    // Create Razorpay order
    const razorpayOrderOptions = {
      amount: amount * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_${new Date().getTime()}`
    };

    const razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);

    // Create new order in the database
    const newOrder = await orderModel.create({
      userId: user.username,
      items,
      amount,
      address,
      contact,
      razorpayOrderId: razorpayOrder.id
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(user._id, { cartData: [] });
    user.order.push(newOrder._id);
    await user.save();

    res.send({
      success: true,
      newOrder,
      razorpayOrderId: razorpayOrder.id
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }
};


 export const getallorder = async(req,res)=>{
  try {
    let order = await orderModel.find({})

    res.send({
      success:true,
      message:"order",
      order
    })    
  } catch (error) {
    res.send({
      success:false,
      message:error
    })
  }
 }

export const braintreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    res.send(error);
  }
};

export const braintreePayment = (req, res) => {
  try {
    const { total, nonce, items, address } = req.body;
    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (err, result) => {
        if (err) {
          console.error(err);
          return;
        }

        if (result.success) {
          let user = await userModel.findOne({ username: req.user.username });
          // console.log(user._id);
          // const { items, amount, address } = req.body;
          const newOrder = await orderModel.create({
            userId: user._id,
            items,
            amount: total,
            address,
            payment: result,
          });

          await newOrder.save();
          await userModel.findByIdAndUpdate(user._id, { cartData: {} });

          res.send({
            success: true,
            TransactionID: result.transaction.id,
            newOrder,
          });
        } else {
          res.send(result.message);
        }
      }
    );
  } catch (error) {
    res.send(error);
  }
};


