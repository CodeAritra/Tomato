import userModel from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //chechking if user exist or not
     let existinguser = await userModel.findOne({ username });
     if (existinguser) {
       return res.send("User already exist");
     }

    //creating new user
    bcrypt.hash(password, 10,async function(err, hash) {
        let createdUser = await userModel.create({
            username,
            email,
            password:hash,
          });

          let token = jwt.sign({username},process.env.JWT_KEY)
      
          if (createdUser) {
            res.cookie("token",token)
            res.send(createdUser);
          }
    });
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async(req,res)=>{
    try {
        const {username,password} = req.body

        let user = await userModel.findOne({username})
        if(!user){
            return res.send("Incorrect Credentials")
        }

        bcrypt.compare(password, user.password, function(err, result) {
            if(result){
                let token = jwt.sign({username},process.env.JWT_KEY)
                  res.cookie("token",token)
                  res.send("Logged In");
                
            }
            else{
                res.send("Something went wrong")
            }
        });

    } catch (error) {
        res.send(error)
    }
}