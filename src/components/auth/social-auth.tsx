"use client"
import { Button } from "../ui/button"
import { RiGoogleFill } from "../icons/googleIcons"
import { RiGithubFill } from "../icons/githubicons"

const SocialAuth = () =>{
    return(
        <div className="flex items-center gap-x-2 w-full">
            <Button
            size={'lg'}
            className="w-full flex items-center gap-x-3 justify-center"
            variant="default"
            onClick={() => {}}
            >
                <RiGoogleFill className="size-6" />
                <span>Google</span>
            </Button>
            <Button
            size={'lg'}
            className="w-full flex items-center gap-x-3 justify-center"
            variant="default"
            onClick={() => {}}
            >
                <RiGithubFill className="size-6" />
                <span>GitHub</span>
            </Button>
        </div>
    )
}

export default SocialAuth