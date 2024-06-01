"use client"

import { useUser } from "@clerk/nextjs"
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import {useState} from 'react'
import MeetingSetUp from "@/components/ui/MeetingSetUp";
import MeetingRoom from "@/components/ui/MeetingRoom";
import { useGetCallById } from "@/hooks/useGetCallById";
export default function Meeting({params:{id}}:{params:{id:string}}){
    const {user,isLoaded}=useUser();
    const [isSetupComplete, setIsSetupComplete]= useState(false);
    const {call,isCallLoading}= useGetCallById(id);
    return(<main className="h-screen w-full">
            <StreamCall call={call}>
                   <StreamTheme>
                    {isSetupComplete? (
                        <MeetingSetUp setIsSetupComplete={setIsSetupComplete}/>
                    ):(
                        <MeetingRoom/>
                    )

                    }
                   </StreamTheme>   
            </StreamCall>
        </main>
    )
}