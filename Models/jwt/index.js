import jwt from 'jsonwebtoken';

export const generateToken = function(user) {

    try{
        
        const secret = process.env.SECRET_KEY;
        const payload = {
                userId : user._id.toString(),
        };
        const options = {
            expiresIn: "30d",
        };

        const token = jwt.sign(payload, secret, options);

        return token;
    } catch (error) {
        console.log(error);
    }
};
