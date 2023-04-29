const User=require('../modal/userSchema');
const bcrypt=require('bcrypt')

const handleRegistration=async(req,res)=>{
    const username=req.body.user;
    const password=req.body.pwd;
    const email=req.body.email;
    const phone=req.body.phone;

    console.log(username,password,email,phone);
    if(!username||!password ||!email || !phone)return res.status(400).json({'message': 'username,email,phone and password required.' });


    const result=await User.findOne({where:{user_username:username}});
    if(result){
        res.status(409).json('Username already exists')
    }else{

       const hashPassword=await bcrypt.hash(password,10);

        const response= await User.create({
            user_username:username,
            user_password:hashPassword,
            user_email:email,
            user_phone:phone
        })

        res.status(200).json(response)
    }

}

module.exports={
    handleRegistration,
}