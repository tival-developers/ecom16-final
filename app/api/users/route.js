

import {NextResponse} from "next/server"
import bcrypt from "bcryptjs"
import User from "@/lib/db/models/user.model";
 
export async function POST(req){
    try {
        const body = await req.json();
        const userData = body.formData;

        //confirm data exist
        if (!userData?.email || !userData.password){
            return NextResponse.json(
                {message: "all fields are required idiot"},
                {status: 400}
            );
        }
        
        //check for duplicate emails
        const duplicate = await User.findOne({email: userData.email})
        .lean()
        .exec();

        if(duplicate){
            return NextResponse.json(
                {message: "User already exist bastard"},
                {status: 409}

            )
        }
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;

        await userData.create(userData)
        return NextResponse.json(
            {message: "created user"},
            {status: 200}
        );
    } catch (err   ) {
        console.log(err);
        return NextResponse.json(
            {message: "Error creating user", err},
            {status: 500}
        );
        
    }
}
