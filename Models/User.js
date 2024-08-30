import { Schema, model } from 'mongoose';
// import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
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
});

// //generating jwt token

// userSchema.methods.generateToken = async function() {

//     const secret = process.env.SECRET_KEY;

//     try{
//         return jwt.sign({
//             userId : this._id.toString(),
//             email: this.email,
//             }, 
//             secret,
//             {
//                 expiresIn: "30d",
//             }
//         );
//     } catch (error) {
//         console.log(error);
//     }
// };

const User = model("User", userSchema);

export default User;
