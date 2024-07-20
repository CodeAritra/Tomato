import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { url } from "../utils/url";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([1]);

  //fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${url}product/allproducts`
      );
      if (data.success) {
        setProducts(data.allproducts);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  //handle quantity
  const handleQuantityChange = (productId, amount) => {
    setQuantity((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + amount),
    }));
  };

  const addToCart = async (id) => {
    try {
      const { data } = await axios.post(
        `${url}cart/add/${id}`,
        {
          quantity: quantity[id],
        }
      );
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Book Store"}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4}>
              <Card>
                <CardActionArea>
                  <Box sx={{ height: "200px"}}>
                    <CardMedia
                      component="img"
                      alt={product.bookname}
                      image={`${url}${product.img}`}
                      title={product.bookname}
                      style={{
                        height: '200px',
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <CardContent sx={{height:"150px"}}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.bookname}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        sx={{ marginTop: "9px" }}
                      >
                        Rs. {product.price}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        onClick={() => handleQuantityChange(product._id, 1)}
                        component="p"
                      >
                        {quantity[product._id] || 1}
                        <IconButton>
                          <AddIcon />
                        </IconButton>
                      </Typography>
                    </Box>
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => addToCart(product._id)}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default HomePage;
