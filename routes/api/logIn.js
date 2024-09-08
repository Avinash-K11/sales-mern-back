import bcrypt from 'bcryptjs';

import User from "../../Models/User.js";
import connectToDb from "../../db/db.js";
import { generateToken } from '../../jwt/index.js';

connectToDb();

export default async (req, res) => {
    
    try {
        const { email, password } = req.body;

        if ( !email || !password ) {
            return res.status(422).json({ error: "Please fill all the fields"});
        } 

        const loginUser = await User.findOne({ email : email});

        if(loginUser) {

            const isMatch = await bcrypt.compare(password, loginUser.password);

            if(!isMatch) {
                res.status(400).json({ message: "Invalid credential!" });
            } else {

                const token = generateToken(loginUser);

                res.status(201).json({ 
                    message: "User sign up sucessfuly!!", 
                    token: token,
                    userId: loginUser._id.toString(),  
                });
            }
        } else {
            res.status(401).json({ message: "Invalid credential!" });
        }

    } catch (error) {
        res.status(500).json("Internal Server Error!");
    }
}