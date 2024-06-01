import { ReactNode } from "react";

export default function MeetingLayout({children}:{children:ReactNode}){
    return <main>
        navbar
        {children}
        footer
    </main>
}