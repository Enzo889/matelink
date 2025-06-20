import { Button } from '@/components/ui/button'
import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function ShoppingCart() {
  return (
    <Button asChild variant={"outline"} size={"icon"} title='Cart'>
    <Link href={'/marketplace/cart'}>
    <ShoppingCartIcon/>
    </Link>
</Button>
  )
}

export default ShoppingCart