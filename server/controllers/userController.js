const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//Registering User

const Register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    //Checking blank fields
    if (!fullName || !username || !password || !gender || !confirmPassword) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    //Matching password
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password does not match!",
        success: false,
      });
    }

    //Checking Password length
    if (password.length < 7 || confirmPassword.length < 7) {
      return res.status(400).json({
        success: false,
        message: "Password at least 8 characters",
      });
    }

    //checking username
    const ExUsername = await User.findOne({ username });
    if (ExUsername) {
      return res.status(400).json({
        success: false,
        message: `"${username}" is Already exists, Try different!`,
      });
    }

    //Hashing Password to secure
    const Hashedpassword = await bcrypt.hash(password, 10);
    const BoyPhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const GirlPhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const user = await new User({
      fullName,
      username,
      password: Hashedpassword,
      profilePhoto: gender === "male" ? BoyPhoto : GirlPhoto,
      gender,
    });

    //saving user
    await user.save();

    //sending response
    return res.status(200).json({
      message: "Account Created Successfully",
      success: true,
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Login User

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password!",
        success: false,
      });
    }
    const isVerfied = await bcrypt.compare(password, user.password);
    if (!isVerfied) {
      return res.status(400).json({
        message: "Incorrect username or password!",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullName}`,
        success: true,
        user: {
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          profilePhoto: user.profilePhoto,
          gender: user.gender,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//Logout

const Logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//Other users

const getOtherUsers = async (req, res) => {
  try {
    const loggedUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    );
    return res.status(200).json(otherUsers);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  Register,
  Login,
  Logout,
  getOtherUsers,
};
