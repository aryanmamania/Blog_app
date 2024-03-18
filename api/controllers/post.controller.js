import { errorHandler } from "../utils/error"

export const create = async (req,res,next)=>{

    if(!req.body.isAdmin){
        return next(errorHandler(403, 'You are not allowed to create a Post'))
    }
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400, 'Please Provide all fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
    const newPost = {
        ...req.body, slug, userId: req.user.id
    }
      
     
}