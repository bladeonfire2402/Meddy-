
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Doesn't exist" });
    }
    const isMatch =await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const role=user.role;
    const token = createToken(user._id);
    res.json({ success: true, token,role });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Create token


const createToken = (id) => {
    const jwtSecret = process.env.JWT_SECRET || "defaultSecret";
    return jwt.sign({ id }, jwtSecret, { expiresIn: "10h" });
  };
  

// register user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checking user is already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const role=user.role;
    const token = createToken(user._id);
    res.json({ success: true, token, role});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//list user
const listUser=async(req,res)=>{
  try{
    const user=await userModel.find({});
      res.json({
        success:true,
        data:user,
      })
    
  }
  catch(error){
    console.error("Error fetching user:", error);
  
    // Trả về thông báo lỗi nếu có lỗi xảy ra
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
    
  }

}

export { loginUser, registerUser,listUser };
