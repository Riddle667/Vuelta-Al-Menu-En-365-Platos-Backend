const { request, response } = require("express");
const Order = require("../models/order");
const Product = require("../models/product");
const OrderProduct = require("../models/orderProduct");
const User = require("../models/user");
const db = require("../db/connection");
const moment = require("moment");

const manageCart = async (req = request, res = response) => {
    const { id } = req.user;
    const { products, total } = req.body;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid products array'
        });
    }

    const transaction = await db.transaction();

    try {
        let order = await Order.create({
            total_price: total,
            date: new Date(),
            user_id: id
        }, { transaction });

        for (const product of products) {
            if (!product.id || !product.quantity || !product.price || !product.name || product.quantity < 1) {
                await transaction.rollback();
                return res.status(400).json({
                    success: false,
                    message: 'Invalid product data'
                });
            }

            await OrderProduct.create({
                order_id: order.id,
                product_id: product.id,
                quantity: product.quantity,
                price: product.price
            }, { transaction });

            order.cant += product.quantity;
            
        }
        await order.save({ transaction });
        await transaction.commit();

        order = await Order.findByPk(order.id, {
            include: [
                {
                    model: Product,
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }
            ]
        });

        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        });

    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = { 
    manageCart 
};
