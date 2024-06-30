const { request, response } = require("express")
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



const createPayment = async (req = request, res = response) => {
    try {
        const { token, amount, currency, description, order } = req.body;
        const payment = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: currency,
            description: description,
            payment_method: token,
            return_url: 'http://localhost:3000/success',
            confirm: true
        });

        if(!payment.ok){ 

            return res.status(400).json({
                success: false,
                message: payment.error['raw'].message,
                payment
            });
        };

        let orderUpdate = await Order.findOne({
            where: {
                user_id: order.client_id,
                status: 'created'
            }
        });

        orderUpdate.status = 'pending';

        orderUpdate.address_id = order.address_id;

        await orderUpdate.save();

        return res.status(200).json({
            success: true,
            message: 'Payment created',
            payment
        }); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error
        });
    }
}

module.exports = {
    createPayment
}