import bcrypt from 'bcryptjs';

import User from "../../Models/User.js";
import connectToDb from "../../db/db.js";

import { generateToken } from '../../jwt/index.js';

export default async (req, res) => {

    connectToDb();

    let { name, email, password, cpassword } = req.body;

    if( !name || !email ||  !password ||  !cpassword ) {
        return res.status(422).json({ error: "Please fill all the fields"});
    }

    const userExists = await User.findOne({ email });
        
    if(userExists) {
        return res.status(422).json({ error: "User already exits or use another email"});
    } else if ( password !== cpassword ) {
        return res.status(422).json({ error: "Passwords not matching!"});
    } else {

        const salt = 12;
        const hashPassword = await bcrypt.hash(password, salt);

        const userCreated = await User.create({name, email, password:hashPassword, cpassword:hashPassword });

        if(userCreated) {
            const token = generateToken(userCreated);

            res.status(201).json({ 
                message: "User sign up sucessfuly!!", 
                token: token,
                userId: userCreated._id.toString(), 
            });
        } else {
            res.status(500).json({ error: "Failed to register" });
        }
    }
};