import { MessageSquareWarningIcon } from "lucide-react";

interface FormAuthErrorProps{
    message: string | undefined
}
const FromAuthError = ({message} : FormAuthErrorProps) =>{
    if (!message) return null;
    return(
        <div className="bg-red-500/10 p-3 rounded-md flex items-center gap-x-2 text-red-500">
            <MessageSquareWarningIcon className="size-5" />
            <span>{message}</span>
        </div>
    )
}
export default FromAuthError;