import bcrypt from 'bcryptjs';

import User from "../../Models/User.js";
import connectToDb from "../../db/db.js";

connectToDb();

export default async (req, res) => {
    let { name, email, password, cpassword } = req.body;

    if( !name || !email ||  !password ||  !cpassword ) {
        return res.status(422).json({ error: "Please fill all the fields"});
    }

    await User.findOne({ email:email })
        .then((userExists) => {
            if(userExists) {
                return res.status(422).json({ error: "User already exits or use another email"});
            } else if ( password !== cpassword ) {
                return res.status(422).json({ error: "Passwords not matching!"});
            } else {

                const salt = 12;
                const hashPassword = bcrypt.hash(password, salt);

                const userCreated = new User.create({name:name, email:email, password: hashPassword, cpassword: hashPassword});

                userCreated.save().then(() => {
                    res.status(201).json({ message: "User sign up sucessfuly!!", token: userCreated.generaToken() });
                }).catch((error) => res.status(500).json({ error: "Failed to register" }) );
            }

        }).catch((error) => { console.log(error); } );
};