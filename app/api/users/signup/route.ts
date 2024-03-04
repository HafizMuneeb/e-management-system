import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user.model.js"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export  async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password} = reqBody;

    const user = await User.findOne({email})
     
    if(user) {
      return NextResponse.json({error: "Users already exists"}, {status: 401})
    }

    //hashed password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User ({
      username,
      email,
      password: hashedPassword
    })

   const savedUser =  await newUser.save();
    console.log(savedUser);

    return NextResponse.json({message: "User Created Succesfully", success: true}, {status: 201})
    
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
}