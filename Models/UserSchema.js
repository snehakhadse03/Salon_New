
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const res = require('express/lib/response');

//Create Schema.....

const UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    unique_id: {type: Number,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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

    gender: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mobileno: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
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


var appointmentSchema = new mongoose.Schema({

    appointmentDate: {type: String, required: true},
    appointmentTime: {type: String, required: true}, 
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: String, maxlength: 10, required: true}
});

var appointmentModel = mongoose.model('Appointment', appointmentSchema, 'appointments');

module.exports = {appointmentModel};
    





//Create Token...........

UserSchema.methods.generateAuthToken = function () {
    try {
        //console.log(this._id)
        const Token = jwt.sign({ _id: this._id }, process.env.TOKEN_KEY,{
            
            expiresIn: "2h",

        });
       
        this.TOKENS = this.TOKENS.concat({ TOKEN: Token })
        console.log(Token)

        return Token;
 
    }
    catch (err) {
        res.send("This part give error.....");
        console.log("This part give error.....")
    }
}

const auth = function () {
    try {
        
        const Token = jwt.verify({ _id: this._id }, process.env.TOKEN_KEY,{
            
            expiresIn: "2h",

        });
       
        this.TOKENS = this.TOKENS.concat({ TOKEN: Token })
        console.log(Token)

        return Token;
 
    }
    catch (err) {
        res.send("This part give error.....");
        console.log("This part give error.....")
    }
}



module.exports = mongoose.model('Database', UserSchema);