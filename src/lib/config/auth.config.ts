import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/app/(auth)/schema"
import { getUserByEmail } from "@/lib/data/user"
import bcrypt from 'bcryptjs';

export default { providers: [
  Credentials({
    credentials: {
      email: {},
      password: {},
    },
   async authorize(credentials) {
    const validatedFieldss = LoginSchema.safeParse(credentials) 

    if(validatedFieldss.success){
      const { email, password } = validatedFieldss.data

      const user = await getUserByEmail(email)
      if (!user || !user.password) return null

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (passwordMatch) return user
    }
    return null
   },
  }),
    GitHub({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google ({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
] } satisfies NextAuthConfig
