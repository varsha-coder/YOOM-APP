import {SignIn} from '@clerk/nextjs'

export default function Signin(){
    return <main className=' flex h-screen justify-center items-center w-full'>
         <SignIn/>
    </main>
}