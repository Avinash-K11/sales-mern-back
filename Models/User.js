import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now},
    isAdmin: {
        type: Boolean,
        default: false,
    },
    tokens:[
        {
            token: {
                type: String,
            },
        },
    ],
});


//generating jwt token

userSchema.methods.generateAuthLogin = async function() {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token:token }); 
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = model("User", userSchema);

export default User;
