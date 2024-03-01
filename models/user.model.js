import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "email is required"]
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      required: [true, "Password must be at least 6 characters"]
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  }, 
  {timestamps: true});

  const User = mongoose.models.users || mongoose.model("users", userSchema);

  export default User;