const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const db = require('../db/connection');
const Role = require('../models/role');
const User = require('../models/user');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
       

        //paths
        this.paths = {
            auth: '/api/auth',
            user: '/api/user'
        }

        // Connect to database
        this.dbConnection();

        // Middleware
        this.middlewares();

        // Routes Application
        this.routes();
         
    }

    async dbConnection() {
        try {
            await db.authenticate();
            await Role.sync({force: false});
            await User.sync({force: false});
            console.log('Database online');
        }
        catch (error) {
            console.log(error);
        }
    }

    middlewares() {

        // Morgan
        this.app.use(logger('dev'));

        // CORS
        this.app.use(cors());
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/authRoutes'))
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }
}

module.exports = Server;

