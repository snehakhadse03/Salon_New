const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const model = require('../Models/EmployeeSchema');
const req = require('express/lib/request');
const res = require('express/lib/response');
const { db } = require('../Models/EmployeeSchema');
const { JsonWebTokenError } = require('jsonwebtoken');
let url = "mongodb+srv://salon:Salon123@cluster0.hh3vjsg.mongodb.net/salon-managment-system?retryWrites=true&w=majority";
const AddEmployee = function (req, res) {

   MongoClient.connect(url, async function (err, db) 
   {
        if (err) throw err;
        var database = db.db("salon-managment-system");

        const { name, email, dob, doj, address, contact, usertype, status, category, gender, salary, password } = req.body;
        if (!(name && email && dob && doj && address && contact && usertype && status && category && gender && salary && password)) {
            res.status(400).send("All input is required");
            console.log("All input is required")
        }

        else {
            const data = await database.collection("employee").findOne({ email });
            if (data) {
                
                res.status(400).send("You are already registered");
                console.log("You are already registered");
                return ;
            }
        }
        if (password) {
            bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                }
                else {
                    const obj = new model({
                        _id: mongoose.Schema.Types.ObjectId,
                        name: req.body.name,
                        email: req.body.email,
                        dob: req.body.dob,
                        doj: req.body.doj,
                        address: req.body.address,
                        contact: req.body.contact,
                        usertype: req.body.usertype,
                        status: req.body.status,
                        category: req.body.category,
                        gender: req.body.gender,
                        salary: req.body.salary,
                        password: hash
                    })

                     obj.generateAuthToken()
                    database.collection("employee").insertOne(obj, function (err, db) 
                    {
                        if (err) throw err;
                        
                        console.log(" Document Inserted......", obj);

        
                         db.close
                    })
                    
            }
            })
        }

        else {
            res.send("Password not match")
            console.log("Password not match")
        }
        
   })
    
}

const AllListOfEmployee = function(req,res){
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
var database = db.db("salon-managment-system");
 database.collection("employee").find({}).toArray(function(err, result) {
   
    if (err) throw err;
   
   res.send(result)
   
   console.log("All Employee List",result);



})
}) 

}



module.exports = {AddEmployee, AllListOfEmployee}
