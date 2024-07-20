import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import Layout from "../layout/Layout";
import axios from "axios";
import { url } from "../utils/url";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const token = JSON.parse(localStorage.getItem("auth")).token;

  const getAllOrders = async () => {
    const { data } = await axios.get(`${url}order/user`, {
      headers: {
        authorization: `${token}`,
      },
    });
    console.log(data.orderData.flat());
    if (data.success) {
      setOrders(data.orderData.flat());
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  useEffect(() => {
    console.log("order = ", orders);
  }, []);

  return (
    <Layout>
      {orders.length!==0 ? (
        <>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ marginTop: "1vw" }}
          >
            Your Orders
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ width: "95vw", margin: "auto" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Items</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>
                      {order.items.map((item, index) => (
                        <div key={index}>
                          <Typography variant="body2">
                            {item.bookname}
                          </Typography>

                          <Typography variant="body2">
                            Quantity: {item.quantity}
                          </Typography>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>Rs. {order.amount}</TableCell>
                    <TableCell>{order.status}</TableCell>

                    <TableCell>
                      {new Date(order.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography variant="h5" sx={{height:"50%",width:"50%"}}>No orders yet</Typography>
      )}
    </Layout>
  );
};

export default OrderPage;
