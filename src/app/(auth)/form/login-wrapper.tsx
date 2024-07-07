"use client"

import BackButtonAuth from "@/components/auth/back-button-auth"
import HeaderAuth from "@/components/auth/header-auth"
import SocialAuth from "@/components/auth/social-auth"
import { ArrowLeftIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
 } from "@/components/ui/card"
import Link from "next/link"

interface LoginWrapperProps{
    children: React.ReactNode,
    headerLabel: string,
    headerDescription: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean
}

const LoginWrapper = ({
    children,
    headerLabel,
    headerDescription,
    backButtonLabel,
    backButtonHref,
    showSocial
} : LoginWrapperProps) =>{
    return(
        <div className="max-w-[400px] w-full">
            <Button variant={'link'}>
                <Link className="flex items-center gap-2 mb-3" href={'/'}>
                    <ArrowLeftIcon />
                    <span>Back</span>
                </Link>
            </Button>
            <div className="shadow-2xl shadow-white/30 rounded-xl">
                <Card className="CardStyle">
                    <CardHeader>
                        <HeaderAuth label={headerLabel} description={headerDescription} />
                    </CardHeader>
                    <CardContent>
                        {children}
                    </CardContent>
                    <CardContent>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="p-3 text-muted-foreground backdrop-blur-md rounded-full">
                                Or
                                </span>
                            </div>
                        </div>
                        </CardContent>
                    {showSocial && (
                        <CardFooter>
                            <SocialAuth />
                        </CardFooter>
                    )}
                    <CardFooter>
                        <BackButtonAuth href={backButtonHref} label={backButtonLabel} />
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default LoginWrapper