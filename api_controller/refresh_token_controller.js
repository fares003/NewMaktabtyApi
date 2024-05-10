const User=require('../model/users')

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken =async (req, res) => {
    const cookies = req.cookies;
    console.log(cookies)
    if (!cookies?.jwt)
    {
        console.log(cookies.jwt)
    return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
console.log(refreshToken)
    const foundUser =await User.findOne({refreshToken}).exec()
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(

        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            console.log(decoded.email)
            console.log(foundUser.email)
            console.log(err)


            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const roles = Object.values(foundUser.roles);

            const accessToken = jwt.sign(
                {

                "UserInfo":{
                 "username": decoded.email,
                 "roles": roles,

                },
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1000s' }
            
            );
            res.json({email:foundUser.email, roles, accessToken,firstname:foundUser.firstname,lastname:foundUser.lastname,id:foundUser._id })
        }
    );
}

module.exports = { handleRefreshToken }