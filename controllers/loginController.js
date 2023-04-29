const User= require('../modal/userSchema');

const bcrypt=require('bcrypt');
require("dotenv").config();
const jwt=require('jsonwebtoken');

const handleLogin=async(req,res)=>{
    const username=req.body.user;
    const password=req.body.pwd;

    console.log(username,password);
    if(!username,!password)return res.status(201).json({"message":"username and password required"});
    const FoundUser= await User.findOne({where: {user_username:username}});
    console.log(`console log function${FoundUser}`);
    if(!FoundUser)return res.status(401).json({"message":"UNAUTHORIZED"});
    const match=bcrypt.compare(password,FoundUser.user_password);
     if(match){
      const roles=JSON.parse(FoundUser.user_roles);
      console.log(roles)
       // create jwt
       const accessToken= jwt.sign(
        {
            "UserInfo": {
                "username": FoundUser.user_username,
                "roles": roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' }
    );
       const refreshToken=jwt.sign(
        {"username":FoundUser.user_username},
         process.env.REFRESH_TOKEN_SECRET,
         {expiresIn:"1d"}
       );

       console.log(refreshToken);
       
       FoundUser.user_refreshToken=refreshToken;
       const result=await FoundUser.save();
       console.log(result);

       res.cookie("jwt",refreshToken, { httpOnly: true,sameSite:'None', maxAge:24*60*60*1000}); //secure:true,
       res.json({ accessToken,roles});
      }else{
        res.status(401);
     }
       
}



module.exports={handleLogin}