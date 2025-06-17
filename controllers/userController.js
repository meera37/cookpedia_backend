// const users = require("../models/userModel")
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken')

// //register
// exports.registerController = async (req, res) => {

//     const { username, email, password } = req.body
//     console.log(username, email, password);

//     try {
//         const existingUser = await users.findOne({ email })
//         if (existingUser) {
//             res.status(401).json('User Already Exists')
//         }
//         else {
//             const hashedPswd = await bcrypt.hash(password, 10)
//             console.log(hashedPswd);

            
//             const newUser = new users({
//                 username,
//                 email,
//                 password:hashedPswd
//             })
//             await newUser.save()
//             res.status(200).json(newUser)
//         }
//     } catch (error) {
//         res.status(500).json(error)
//     }

// }
// //login
// exports.loginController = async(req,res)=>{
//     const {email, password} = req.body
//     console.log(email, password);
//     try {
//        const existingUser = await users.findOne({ email })
//        console.log(existingUser);
       
//         if (existingUser) {

//             const existingpassword = await bcrypt.compare(password, existingUser.password)
//             console.log(existingpassword);
//             // res.status(200).json('request recieved')
//             if(existingpassword==true){
//                 const token = jwt.sign({userId:existingUser._id}, process.env.SECRETKEY)
//                 console.log(token);
//                 res.status(200).json({existingUser, token})            
//             }
//             else{
//                 res.status(401).json('incorrect email or password')
//             }
//         }
//         else {
//             res.status(404).json('Account does not exists...please check')//user doesnot exist
//         }
 
//     } catch (error) {
//         res.status(500).json(error)
//     }
    
// }
const users = require("../models/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

//register
exports.registerController = async(req,res) => {
    const {username, email, password} = req.body
    console.log(username, email, password);
    try {
        const existingUser = await users.findOne({email})
        if(existingUser) {
            res.status(401).json('User already exists.')
        } else {
            const hashedPswd = await bcrypt.hash(password, 10)
            const newUser = new users({
                username,
                email,
                password : hashedPswd
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
    
}
// login
exports.loginController = async(req,res) => {
const { email, password } = req.body
    
    try {
        const existingUser = await users.findOne({ email })// only email because key and value same
        console.log(existingUser);
        
        if (existingUser) {
            const existingpassword = await bcrypt.compare(password, existingUser.password)
            console.log(existingpassword);
            
            if (existingpassword == true) {
               const token = jwt.sign({ userId: existingUser._id }, process.env.SECRETKEY)
                res.status(200).json({existingUser, token})
            } else {
                res.status(401).json("Incorrect email or password") // password doesnot match
            }
        } else {
            res.status(404).json("User doesnot exist") // user doesnot exist
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//update profile
exports.updateProfileController = async(req,res)=>{
    const userId = req.payload
    console.log(userId);
    
    const {profileImage} = req.body
    console.log(profileImage);

    try {
        const existingUser = await users.findOne({_id:userId})

        if(existingUser){

            const newUser = await users.findByIdAndUpdate({_id:userId},{
                username:existingUser.username,
                email:existingUser.email,
                password:existingUser.password,
                role:existingUser.role,
                profile:profileImage
            },{new:true})
            res.status(200).json(newUser)
       }
        else{
            res.status(406).json('User does not exist')
        }
    } catch (error) {
        res.status(401).json(error)
    }
    
}

//get all user controler
exports.getAllUsersConstroller = async(req,res)=>{
try {
    const allUsers = await users.find()
    console.log(allUsers);
    
    res.status(200).json(allUsers)
    
} catch (error) {
    res.status(401).json(error)
}
}