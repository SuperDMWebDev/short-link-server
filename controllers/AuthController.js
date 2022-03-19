const User = require('../model/User');

const bcrypt=require('bcrypt');
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');

dotenv.config();

// tao mot class userController chua cac ham xu ly 
// register, login, changePassword

class UserController{
    // dau tien nhan vao username, password,
    //repassword va tien hanh kiem tra
    // tim checkuser trong db 
    // neu ko co thi tao new User va goi db.save()
    async register(req,res){
        console.log(req.body);
        const {username,password,rePassword}=req.body;
        if (password !== rePassword) {
            return res.status(401).json({
                success: false,
                message: 'Password does not match',
                enumError: 1
            })
        }

        if (password.length < 6) {
            return res.status(401).json({
                success: false,
                message: 'Password length is too short',
                enumError: 2
            })
        }

        if (!username || !password || !rePassword) {
            return res.status(401).json({
                success: false,
                message: 'Missing username or password',
                enumError: 3
            })
     
        }

        try{
            const checkUser=await User.findOne({username:username})
            /// Neu user da ton tai 
            if(checkUser)
            {
                return res.status(401).json({
                    success:false,
                    message:"username already created",
                    enumError:4
                })
            }
            // tu tao ra salt 10 vong
            const hashPassword=await bcrypt.hash(password,10);
            const user= new User({
                username:username,
                password: hashPassword
            })
            const save=user.save();
            console.log('save', user.save());
            // tra ve la da tao thanh cong
            return res.status(200).json({
                success:true,
                message:'create new user success'
            })
        }catch(err)
        {
            return res.status(500).json({
                success:false,
                message:'Server error',
                enumError:0 
            })
        }

    }
    // khi login se gui theo la username va password
    // kiem tra username va password
    async login(req,res){
        const {username, password}= req.body;
        if (!username || !password) {
            return res.status(202).json({
                success: false,
                message: 'Missing email or password',
                enumError: 1
            })
        }

        if (password.length < 6) {
            return res.status(202).json({
                success: false,
                message: 'Password length is too short',
                enumError: 2
            })
        }
        try{
            const user=await User.findOne({username:username});
            // khong tim thay user tren db 
            if(!user)
            {
                return res.status(401).json({
                    success:false,
                    message:'User not found',
                    enumError:3
                })
            }

            // neu tim thay user tren debugger
            const checkPassWord = await bcrypt.compare(password,user.password);
            if(checkPassword)
            {
                // tao cho nguoi dung mot cai accessToken 
                const accessToken= await jwt.sign(
                    {
                        userId: user._id,
                        isAdmin:user.isAdmin
                    },
                    process.env.ACCESS_TOKEN,
                    {
                        expiresIn: '5d'
                    }
                )
                const { password, isAdmin, ...info } = user._doc

                return res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    accessToken,
                    info
                })
            }

        }catch(err)
        {
            return res.status(500).json({
                success:false,
                message:'Server error',
                enumError:0
            })
        }

    }
    

}
module.exports=new UserController();




