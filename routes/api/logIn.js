import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from "../../Models/User.js";
import connectToDb from "../../db/db.js";

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

            const token = await loginUser.generateAuthLogin();

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 18000000),
                httponly: true
            });

            if(!isMatch) {
                res.status(400).json({ message: "Invalid credential!" });
            } else {
                res.json({ message: "Logged In!" });
            }
        } else {
            res.status(400).json({ message: "Invalid credential!" });
        }

    } catch (error) {
        console.log(error);
    }

    res.json({ message: "ok" });
}