"use server"

import * as z from 'zod';
import { LoginSchema, SignupSchema } from '../schema';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/lib/data/user';
import { signIn } from '@/lib/auth';
import { DEFAULT_LOGIN_REDIRECT } from '../../../../routes';
import { AuthError } from 'next-auth';

// Form Login
export const loginAction = async (values : z.infer<typeof LoginSchema>) =>{
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success){
        return {error : "Invalid credentials!" }
    }
    const {email, password} = validatedFields.data;
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                return {error: "Invalid credentials!"}
            default: 
                return {error: "Something went wrong!"}
            }
        }
        throw error;
    }
}
// For sign up
export const SignupAction = async (values : z.infer<typeof SignupSchema>) =>{
    const validatedFields = SignupSchema.safeParse(values);

    if (!validatedFields.success){
        return {error : "Invalid credentials!" }
    }
    const {email, password, name} = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email)

    if (existingUser){
        return {error: "User already exists"}
    } 

    await db.user.create({
        data:{
            email,
            name,
            password: hashedPassword
        }
    });

    // TODO : Send verification token

    return {success: "Sign up Successful"}
}