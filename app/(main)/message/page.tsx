import React from 'react'
import HeaderChats from './__components/headerChats'
import ChatRequest from './__components/chat-request'

function page() {
  return (
    <div className='flex flex-col'> <HeaderChats /> <ChatRequest /> </div>
  )
}

export default page