"use client"

import Image from "next/image"
import {useUser} from '@clerk/nextjs'
import HomeCard from "./HomeCard"
import {useState} from 'react'
import { useRouter } from "next/navigation"
import MeetingModal from "./MeetingModal"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useToast } from "./use-toast"

export default function MeetingTypeList(){
    const router = useRouter();
    const [meetingState,setMeetingState]=useState<'isScheduleMeeting'| 'isJoiningMeeting'|'isInstantMeeting'| undefined>()
     const [callDetails,setCallDetails]=useState<Call>()
     const{toast}= useToast();
     const {user} =useUser();
     const client=useStreamVideoClient();
     const [values,setValues]=useState({
        dateTime:new Date(),
        description:'',
        link:''
     })

    const createMeeting = async()=>{
        if(!client) return <p>Waiting for connection to be estabislhed</p>

        if(!client ||!user) return;
       

        try{
            if(!values.dateTime){
                toast({title: "Please select a date and time"})
                return;
            }


         const id=crypto.randomUUID();
         const call=client.call('default',id);

         if(!call) throw new Error('Failed to create call');

         const startsAt=values.dateTime.toISOString()||
         new Date(Date.now()).toISOString();
         const description=values.description||'Instant meeting';

         await call.getOrCreate({
            data:{
                starts_at:startsAt,
                custom:{
                    description
                } 
            }
         })
           setCallDetails(call);

           if(!values.description){
            router.push(`/meeting/${call.id}`)
           }
           toast({title: "Meeting created"})
        }
        catch(error){
            console.log(error);
             toast({title: "Failed to create meeting"})
        }
    }
    
    return <section className="grid grid-cols-1 gap-5
    md:grid-cols-2 xl:grid-cols-4">
       <HomeCard
        img='/icons/add-meeting.svg'
        title="New Meeting"
        description ="Start an instant Meetting"
        handleClick={()=> setMeetingState('isInstantMeeting')}
        className='bg-orange-1'
        />

        <HomeCard 
        img='/icons/join-meeting.svg'
        title="Join Meeting"
        description ="via invitation link"
        handleClick={()=> setMeetingState('isJoiningMeeting')}
        className='bg-blue-1'
        />

        <HomeCard
        img='/icons/schedule.svg'
        title="Schedule Meeting"
        description ="Plan your Meetting"
        handleClick={()=> setMeetingState('isScheduleMeeting')}
        className='bg-purple-1'
        />
    
       <HomeCard
        img='/icons/recordings.svg'
        title="View Recordings"
        description ="Checkout your Recordings"
        handleClick={()=>router.push('/recordings')}
        className='bg-yellow-1'
        />

        <MeetingModal
         isOpen={meetingState ==='isInstantMeeting'}
         onClose={()=> setMeetingState(undefined)}
         title="start an instant meeting"
         className ="text-center"
         buttonText='start Meeting'
         handleClick={createMeeting}
        />
       
    </section>
}