"use server"
import { isRedirectError } from "next/dist/client/components/redirect"
import {verify} from "@node-rs/argon2";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginSchema, LoginValues } from "@/lib/validation";
import prisma from "@/lib/prisma";
export async function login(
    credentials: LoginValues,
): Promise<{ error: string }> {
        try {
             
    const { username, password } = loginSchema.parse(credentials);
    const exisitingUser = await prisma.user.findFirst({
        where:{
            username:{
                equals: username,
                mode: "insensitive"
            }
        }
    })
           
    if(!exisitingUser || !exisitingUser.passwordHash){
        return {error: "Invalid username or passsssssssword"};
         
    }    
    const { verify } = await import('@node-rs/argon2');
    const validatePassword = await verify(exisitingUser.passwordHash, password,{
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    if(!validatePassword){
        return {error: "Invalid usersdsdsdsdname or password"};
    } 

    const session = await lucia.createSession(exisitingUser.id,{

    });
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    ) 
    return redirect("/");

        } catch (error) {
            if(isRedirectError(error))  throw error;
            
              console.error(error);
                return {error: "An error occurred"};
            
             
        }
}
