import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
})

const userModel = mongoose.model('users', userSchema)

export default userModel