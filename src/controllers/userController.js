const userModel = require("../models/UserModel");

// get all users
exports.getAllUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// create a new user
exports.createNewUser = async(req,res)=>{
  newUser = req.body;
  const existingUser = await userModel.findOne({email: newUser.email});
  if(existingUser){
    return res.status(400).json({message: "User already exists"})
  }
  try {
    const user = await userModel.create(newUser);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

