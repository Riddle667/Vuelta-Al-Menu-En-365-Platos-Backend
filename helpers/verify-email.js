const User = require("../models/User");

const verifyEmail = async (email) => {
    const existEmail = await User.findeOne({where: {email}});

    if(existEmail){
        throw new Error(`El email ya esta registrado.`);
    }
}

module.exports = {verifyEmail};