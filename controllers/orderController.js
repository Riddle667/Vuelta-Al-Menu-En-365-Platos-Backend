const { request, response } = require("express");
const Order = require("../models/order");
const Product = require("../models/product");
const OrderProduct = require("../models/orderProduct");



const addToCart = async (req = request, res = response) => {
    const { id } = req.user;
    const { productId, quantity } = req.body;

    try {
        const order = await Order.findOne({
            where: {
                user_id: id,
                status: 'PENDING'
            }
        });
        
        if (!order) {
            return res.status(400).json({
                success: false,
                message: 'Order not found'
            });
        }

        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        order.setProducts(product, {
            through: {
                quantity,
                price: product.price * quantity
            }
        });
        

        // if (orderProduct) {
        //     orderProduct.quantity += quantity;
        //     orderProduct.price += product.price * quantity;
        //     await orderProduct.save();
        // } else {
        //     await OrderProduct.create({
        //         order_id: order.id,
        //         product_id: productId,
        //         quantity,
        //         price: product.price * quantity
        //     });
        // }

        // order.total_price += product.price * quantity;
        // await order.save();

        // return res.json({
        //     success: true,
        //     message: 'Product added to cart'
        // });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = { 
    addToCart 
};