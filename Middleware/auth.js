 const jwt = require('jsonwebtoken');

const database = require('../Models/UserSchema');

const auth = async function(){

try{
  const token = req.body.TOKEN;
  const verifyuser = jwt.verify(TOKEN,process.env.TOKEN_KEY);

  console.log(verifyuser);
  
  const user = await database.findOne({_id:verifyuser._id});
  //console.log(user.firstname);
  req.token = token;
  req.user = user;
  next();

}catch(err){
    res.status(401).send(err)
}
}



module.exports = auth;