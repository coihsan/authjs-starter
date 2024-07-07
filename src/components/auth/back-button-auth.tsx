'use client'

import Link from "next/link"
import { Button } from "../ui/button"

interface BackButtonAuthProps{
    href: string,
    label: string
}
const BackButtonAuth = ({href, label} : BackButtonAuthProps) =>{
    return(
        <Button variant={'link'} className="font-normal w-full">
            <Link href={href}>
                {label}
            </Link>
        </Button>
    )
}

export default BackButtonAuth