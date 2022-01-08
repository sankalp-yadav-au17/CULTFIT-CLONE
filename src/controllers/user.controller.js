require("dotenv").config()

const jwt = require("jsonwebtoken")

const user = require('../models/user.model')

const newToken = (user) =>{
    return jwt.sign({ user: user },process.env.JWT_ACCESS_KEY);
}





const register = async (req, res) =>{

    try{
        
        
        
        // if user is already exist
        let users = await user.findOne({email:req.body.email}).lean().exec()
        
        
        
        // if exist than throw an error
        
        if(users){
            return res.status(404).json({message:"Please provide a different email address",status:"Failed"})
        }
        
        
        //if not exist then create user and hash the password 
        users = await user.create(req.body)
        
        // we will create the token 
        const token = newToken(users)
        console.log(token)
        // types of authentication :- 1)stateful :- remember 2)stateless :-forget
        
        
        // return the user and token

        res.status(201).json({users,token})
    }catch(e){
        return res.status(500).json({message:e.message, status:"failed"})
    }


}


const login = async (req, res) => {
    try {
      // check if the email address provided already exist
      let User = await user.findOne({ email: req.body.email });
  
      // if it does not exist then throw an error
      if (!User)
        return res.status(400).json({
          status: "failed",
          message: " Please provide correct email address and password",
        });
     console.log(User);
      // else we match the password
      const match =  await User.checkPassword(req.body.password);
      console.log(match)
  
      // if not match then throw an error
      if (!match)
        return res.status(400).json({
          status: "failed",
          message: " Please provide correct email address and password",
        });
  
      // if it matches then create the token
      const token = newToken(User);
  
      // return the user and the token
      res.status(201).json({ User, token });
    } catch (e) {
      return res.status(500).json({ status: "failed", message: e.message });
    }
  };

module.exports = {register, login,newToken}