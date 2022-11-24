import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req,res)=>{
    const user = req.body;
    let {name, email, password} = user;

    let existingUser = await userModel.findOne({
        email
    })

    if(existingUser){
        return res.status(400).send({
            status: 'error',
            message: 'User already exists'
        })
    } else{
        password = bcrypt.hashSync(password);
        let user = await userModel.create({
            name,email,password
        })
        user = user.toJSON();
        delete user.password;

        return res.send({
            status:"Success",
            data:user
        })
    }
}

export const login = async (req,res)=>{
    const user = req.body;

    let {email,password} = user;

    let existingUser = await userModel.findOne({email});

    if(existingUser) {
        let match = bcrypt.compareSync(password, existingUser.password);

        if(match) {
            let token = jwt.sign({
                _id : existingUser._id,
                name: existingUser.name,
                email: existingUser.email
            },JWT_SECRET)

            console.log(token,"token");
            // Verifying...
            let result = jwt.verify(token, JWT_SECRET);
            console.log(result,"result or payload");
            // Decoding...
            result = jwt.decode(token);
            console.log(result,"decrypted result");

            return res.send({
                status : "success",
                data : {token}
            })

        } else {
            return res.status(400).send({
                status: 'error',
                message: 'incorrect password !'
            })
        }

    } else {
        return res.status(400).send({
            status: 'error',
            message: 'user does not exist'
        })
    }


}

export const getLoggedInUser = async (req,res)=>{
    try{
        console.log(req.headers,"header");
        let token = req.headers.authorization || '';

        token = token.split(' ')[1];
        console.log(token,"token")

        if(token) {
            const result = jwt.verify(token,JWT_SECRET);
            console.log(result,"result or user")
            let user = await userModel.findById(result._id);

            user = user.toJSON();
            delete user.password;   

            return res.send({
                status:"success",
                data : user
            })

        } else {
            return res.status(400).send({
                status: 'error',
                message:'user not logged in'
            })
        }
    } catch(err){
        return res.status(400).send({
            status: 'error',
            message:'something went wrong'
        })
    }
}