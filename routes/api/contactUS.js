import Contact from "../../Models/Contact.js";
import connectToDb from "../../db/db.js";

export default async (req, res) => {

    connectToDb();

    let { name, subject, email, country, message } = req.body;

    if( !name || !email || !subject || !country ||  !message ) {
        return res.status(422).json({ error: "Please fill all the fields"});
    } else {

        const contactCreated = await Contact.create({name, subject, email, country, message, });

        if(contactCreated) {
            res.status(201).json({ 
                message: "Message stored sucessfuly!!"
            });
        } else {
            res.status(500).json({ error: "Failed to register" });
        }
    }
};