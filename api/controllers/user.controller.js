import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const test = (req, res) =>{
    res.json({message: 'API is working'});
};

export const updateUser = async(req , res , next)=>{
  if (req.user.id !== req.params.userId){
  return next (errorHandler(403, 'You are not allowed to update this user'))
  }
  if(req.body.password){
    if(req.body.password.length(400, 'Password must be atleast 6 characters'));
  }
  req.body.password = bcryptjs.hashSync(req.body.password, 10)
}
