const express = require('express');
const cors = require('cors');
const logger = require('morgan');

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

        // Middleware
        this.middlewares();

        // Routes Application
        this.routes();
         
    }

    async dbConnection() {
        
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

