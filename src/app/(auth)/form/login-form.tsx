"use client"
import LoginWrapper from "./login-wrapper";
import { Form, FormField, FormLabel, FormControl, FormItem, FormMessage} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import * as z from 'zod'
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import FromAuthError from "@/components/auth/form-auth-error";
import FormAuthSuccess from "@/components/auth/form-auth-success";
import { loginAction } from "../action";
import { LoginSchema } from "../schema";


const LoginForm = () =>{
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransition] = useTransition()
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });

const onSubmit = (values : z.infer<typeof LoginSchema>) =>{
    setError("")
    setSuccess("")

    startTransition(() => {
        loginAction(values)
        .then((data) =>{
            setError(data?.error)
        })
        .catch((error) =>{
            setError(error)
        })
    })
}

  return(
    <LoginWrapper
    headerDescription="Enter your email below to login to your account"
    headerLabel="Access your account"
    backButtonLabel="Don't have an account?"
    backButtonHref="/sign-up"
    showSocial>
      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full">
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    disabled={isPending}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="achonk@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    disabled={isPending}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FromAuthError message={error} />
            <FormAuthSuccess message={success} />
            <Button className="w-full" variant={'default'} type="submit">
                Login
            </Button>
        </form>
      </Form>
    </LoginWrapper>
  )
}

export default LoginForm