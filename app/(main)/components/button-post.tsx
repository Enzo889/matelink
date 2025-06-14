import { PostFeed } from '@/components/post-component'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'
import React from 'react'

function ButtonPost() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-8 right-3 rounded-full px-6 py-4 shadow-lg bg-primary hover:bg-primary/90 cursor-pointer md:hidden"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-sm:w-fit p-0 rounded-4xl ">
        <DialogTitle className="sr-only hidden">Create Post</DialogTitle>
          <PostFeed  offsetNumber={15} />
      </DialogContent>
    </Dialog>
  )
}

export default ButtonPost