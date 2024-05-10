const Users = require('../model/users');
const books=require('../model/books');
const users = require('../model/users');
const bcrypt = require('bcrypt');

const getUserInfo=async(req,res)=>{
    const foundUser =await Users.findOne({_id:req.params.id}).exec();
    if (!foundUser) return res.sendStatus(401); 
    return res.json(foundUser);
}
const updateUserInfo = async (req, res) => {
    try {
      if (!req?.params?.id) {
        return res.status(400).json({ 'message': 'id parameter is required.' });
      }
  
      const user = await Users.findOne({ _id: req.params.id }).exec();
      if (!user) {
        return res.status(204).json({ "message": `No users matches id: ${req.params.id} not found` });
      }
  
      const duplicate = await Users.findOne({ email: req.body.email }).exec();
      if (duplicate && duplicate._id.toString() !== req.params.id) {
        return res.sendStatus(409); // Conflict
      }
  
      if (req.body.email) user.email = req.body.email;
      if (req.body.firstname) user.firstname = req.body.firstname;
      if (req.body.lastname) user.lastname = req.body.lastname;
      if (req.body.image) user.image = req.body.image;
      if (req.body.password) {
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPwd;
      }
  
      await user.save();
  
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ 'message': 'Internal server error' });
    }
  };
  
module.exports = {getUserInfo,updateUserInfo };
