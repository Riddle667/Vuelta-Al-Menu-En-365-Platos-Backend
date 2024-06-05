const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const fileUpload = require('express-fileupload');
const db = require('../db/connection');
const Role = require('../models/role');
const User = require('../models/user');
const Category = require('../models/category');
const Product = require('../models/product');
const Address = require('../models/address');
const Order = require('./order');
const Image = require('./Image');
const OrderProduct = require('./orderProduct');
const CategoryProduct = require('./categoryProduct');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);

        // Paths
        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
            upload: '/api/upload',
            category: '/api/category',
            product: '/api/product',
            address: '/api/address',
            order: '/api/order',
            image: '/api/image'
        }

        // Connect to database
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes Application
        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            await Role.sync({ force: false });
            await User.sync({ force: false });
            await Category.sync({ force: false });
            await Product.sync({ force: false });
            await Order.sync({ force: false });
            await Address.sync({ force: false });
            await Image.sync({ force: false });
            await OrderProduct.sync({ force: false });
            await CategoryProduct.sync({ force: false });
            console.log('DATABASE CONNECTED');
        } catch (error) {
            console.log(error);
        }
    }

    middlewares() {

        // Morgan
        this.app.use(logger('dev'));

        // Read and parse body
        this.app.use(express.json());

        // Cors
        this.app.use(cors());

        // Fileupload - load archives
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/authRoutes'));
        this.app.use(this.paths.user, require('../routes/userRoutes'));
        this.app.use(this.paths.upload, require('../routes/uploadRoutes'));
        this.app.use(this.paths.category, require('../routes/categoryRoutes'));
        this.app.use(this.paths.product, require('../routes/productRoutes'));
        this.app.use(this.paths.address, require('../routes/addressRoutes'));
        this.app.use(this.paths.order, require('../routes/orderRoutes'));
        this.app.use(this.paths.image, require('../routes/imageRoutes'));
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server Running, Port:', this.port);
        });
    }
}

module.exports = Server;