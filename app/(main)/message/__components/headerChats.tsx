import { Button } from '@/components/ui/button'
import { Plus, Settings } from 'lucide-react'
import Link from 'next/link'

function HeaderChats() {
  return (
    <div className='flex items-center p-4 w-full h-fit justify-between' >
        <p className='text-xl font-semibold'>Chats</p>
        <div className='flex gap-4 justify-center items-center'>
            <Link href={"message/settings"} className='hover:bg-accent/40 transition-colors duration-100 p-2 rounded-full'>
            <Settings  />
            </Link>
            <Button>
               <Plus /> New chat
            </Button>
        </div>
    </div>
  )
}

export default HeaderChats