
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const res = require('express/lib/response');

//Create Schema.....

const EmployeeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unique_id: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    dob: {
        tpye: Number
    },
    doj: {
        type: Number
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
        unique: true
    },
    usertype: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },


    TOKENS: [{
        TOKEN: {
            type: String,
            required: true
        }

    }]




})

//Create Token...........

EmployeeSchema.methods.generateAuthToken = function () {
    try {

        const Token = jwt.sign({ _id: this._id }, process.env.TOKEN_KEY, {

            expiresIn: "2h",

        });
        this.TOKENS = this.TOKENS.concat({ TOKEN: Token })


        return Token;

    }
    catch (err) {
        res.send("This part give error.....");
        console.log("This part give error.....")
    }
}



module.exports = mongoose.model('Employee', EmployeeSchema);