import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {Dialog,DialogContent,DialogDescription,DialogHeader,
    DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import Image from "next/image";
import { Button } from "./button";
  

interface MeetingModalProps{
    isOpen:boolean;
    onClose:()=>void;
    title:string;
    className?:string;
    buttonText?:string,
    handleClick?:()=>void;
    children?:ReactNode;
    image?:string;
    buttonIcon?:string
}



export default function MeetingModal({isOpen,onClose,title,className,buttonText,handleClick,children,buttonIcon,image}:MeetingModalProps){
    return <Dialog open={isOpen} >
        <DialogTrigger>open</DialogTrigger>
           <DialogContent className="flex w-full max-w-[520px]
              flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                <div className="flex flex-col gap-6">
                 {image  && (
                <div className="flex justify-content">
                    <Image src={image} alt='image' width={72} height={72}/>
                </div>
            )}
            <h1 className={cn('text-3xl fonr-bold leading-[42px]', className)}>
              {title}
            </h1>
              {children}
             <Button className="bg-blue-1 focus-visible:ring-0 
             focus-visible:ring-offset-0" onClick={handleClick}>
                {buttonIcon &&(
                    <Image src={buttonIcon} alt={"button"} width={13} height={13}/>
                )}&nbsp;
                {buttonText||'ScheduleMeeting'}
             </Button>
        </div>
      
    </DialogContent>
  </Dialog>
  
}