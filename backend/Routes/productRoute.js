import express from "express"
import {createProduct,updateProduct,deleteProduct,allproducts,product} from "../controllers/productController.js"
import {isAdmin,isLoggedIn} from "../middlewares/auth.js"

const router = express.Router()

router.post("/create-product",isLoggedIn,isAdmin,createProduct)
router.put("/update-product/:slug",isLoggedIn,isAdmin,updateProduct)
router.delete("/delete-product/:pid",isLoggedIn,isAdmin,deleteProduct)
router.get("/allproducts",allproducts)
router.get("/product/:slug",product)

export default router