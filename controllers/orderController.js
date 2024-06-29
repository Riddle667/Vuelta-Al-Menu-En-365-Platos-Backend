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

const showOrderDelivey = async (req = request, res = response) => {
    const { id } = req.user;
    try {
        const ordersDispatched = await Order.findAll({
            where: {
                delivery_id: id,
                status: 'dispatched'
            },
            include: [
                {
                    model: Product,
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }
            ]
        });

        const ordersOnTheWay = await Order.findAll({
            where: {
                delivery_id: id,
                status: 'on_the_way'
            },
            include: [
                {
                    model: Product,
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }
            ]
        });

        const ordersDelivered = await Order.findAll({
            where: {
                delivery_id: id,
                status: 'delivered'
            },
            include: [
                {
                    model: Product,
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }
            ]
        });

        return res.status(200).json({
            success: true,
            ordersDispatched,
            ordersOnTheWay,
            ordersDelivered
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

const showOrderClient = async (req = request, res = response) => {
    const { id } = req.user;
    try {
        const ordersPending = await Order.findAll({
            where: {
                id: id,
                status: 'pending'
            },
            include: [
                {
                    model: Product,
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }
            ]
        });

        const ordersDispatched = await Order.findAll({
            where: {
                id: id,
                status: 'dispatched'
            },
            include: [
                {
                    model: Product,
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }
            ]
        });

        const ordersOnTheWay = await Order.findAll({
            where: {
                id: id,
                status: 'on_the_way'
            },
            include: [
                {
                    model: Product,
                    through: {
                        attributes: ['quantity', 'price']
                    }
                }
            ]
        });

        return res.status(200).json({
            success: true,
            ordersPending,
            ordersDispatched,
            ordersOnTheWay
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

module.exports = { 
    manageCart,
    showOrderDelivey,
    showOrderClient
};

const getAllOrders = async (req = request, res = response) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderProduct,
                    include: [
                        {
                            model: Product,
                            attributes: ['name', 'description', 'price', 'image']
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ['name', 'lastName', 'email', 'phone']
                }
            ]
        });

        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        console.error('Error in getAllOrders:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const updateOrderStatus = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { status, delivery_id } = req.body;

        const order = await Order.findByPk(id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        order.status = status;
        if (delivery_id) {
            order.delivery_id = delivery_id;
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        console.error('Error in updateOrderStatus:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    manageCart,
    getAllOrders,
    updateOrderStatus
};