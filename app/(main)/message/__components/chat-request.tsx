import { ArrowRight, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function ChatRequest() {
  return (
    <div className='bg-accent/40 hover:bg-accent/80 transition-colors duration-75 '>
        <Link href={"/message/inbox"} className='flex w-full justify-between items-center p-2 py-2.5'>
        <div className='flex gap-2 items-center justify-center'>
            <Mail /> Chat requests
        </div>
        <ArrowRight />
        </Link>
    </div>
  )
}

export default ChatRequest