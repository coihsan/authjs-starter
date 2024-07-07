import authConfig from "@/lib/config/auth.config"
import NextAuth from "next-auth"

import { 
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT
 } from "../routes"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

  // If the user access private route, and not logged in, redirect to login page
  if (isApiAuthRoutes){
    return null
  }

  // If the user access public route, and logged in, redirect to home page
  if (isAuthRoutes){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  // If the user is not logged in and the user access private route, redirect to sign-in page
  if(!isLoggedIn && !isPublicRoutes){
    return Response.redirect(new URL("/sign-in", nextUrl))
  }
  return null
})

export const config = {
  matcher: [ '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};