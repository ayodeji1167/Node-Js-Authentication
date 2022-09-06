const UserModel = require('../model/user-model')

const getAllUsers = async(req,res)=>{
    console.log('Server get all users');
    const users = await UserModel.find();
    if(!users){
        res.status(204).json({message:'Usr not found'})
    }
    res.status(200).json(users);
}

module.exports = getAllUsers