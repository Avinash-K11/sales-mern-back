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

                const hashCpassword = bcrypt.hash(this.password, 12);

                const user = new User({name, email, password: hashCpassword, cpassword: hashCpassword});

                user.save().then(() => {
                    res.status(201).json({ message: "User sign up sucessfuly!!" });
                }).catch((error) => res.status(500).json({ error: "Failed to register" }) );
            }

        }).catch((error) => { console.log(error); } );
};