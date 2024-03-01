import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const {username, email, phone, password} = reqBody;

    const user = await User.findOne({email});

    if(user) {
      return NextResponse.json({msg: "User Already exists"}, {status: 400})
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User ({
      username,
      email,
      phone,
      password: hashedPassword
    })

    const savedUser = await newUser.save();
    return NextResponse.json({msg: "User Created Succesfully"}, {status: 201})
  } catch (error) {
    return NextResponse.json({msg: "Error Ocuured while saving the user"}, {status: 500})
  }
}