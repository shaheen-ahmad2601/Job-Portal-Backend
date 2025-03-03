import bcrypt from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// -----------------------user registration logic------------------------

// export const register = async (req, res) => {
//   // user registeration logic

//   try {
//     const { fullname, email, phoneNumber, password, role } = req.body;
//     if (!fullname || !email || !phoneNumber || !password || !role) {
//       return res.status(400).json({
//         message: "Something went wrong",
//         success: false,
//       });
//     }
//     const user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         message: "User already exists with this email address",
//         success: false,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10); // what you want to encrypt and the length;

//     await User.create({
//       // create user
//       fullname,
//       email,
//       phoneNumber,
//       password: hashedPassword,
//       role,
//     });

//     return res.status(201).json({
//       message: "account created successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const register = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    const { fullname, email, password, role } = req.body;
    const phoneNumber = req.body.phoneNumber || req.body.PhoneNumber;

    // Validate required fields
    if (!fullname || !email || !phoneNumber || !password || !role) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    console.log("Checking if user already exists...");
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists with this email address",
        success: false,
      });
    }

    console.log("Hashing the password...");
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("Creating user in the database...");
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    console.log("User created:", newUser);
    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in register API:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


// -----------------------user login logic------------------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something went wrong",
        success: false,
      });
    }
// check if user exists or not
    let user = await User.findOne({ email }); 
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }

     // normal passward and db password from user, above 10 lines of code in db user email , can find the user.password
    const isPasswardMatch = await bcrypt.compare(password, user.password);
    if (!isPasswardMatch) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }

    // chekc role correct or not
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role",
        success: false,
      });
    }

    // now generate a token
    const tokenData = {
      userId: user._id,
    };

    // for authentication authorization purposes
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome  ${user.fullname}`,
        success: true,
      }); // 1 day format
  } catch (error) {
    console.log(error);
  }
};

// logout logic------------------------------------------

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// update profile ---------------------------------------------------

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // cloudinary will come here
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // it will come from middle ware authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume will come here

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "profile updated successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
