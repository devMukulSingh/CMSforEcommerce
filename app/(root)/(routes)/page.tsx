"use client"

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button'
import { setDialog } from '@/store/slice';
import { StoreModal } from '@/components/modals/StoreModal';

export default function Home() {
  const dispatch = useAppDispatch();
 
  return (

    <>
      <main className='w-screen h-screen flex item-center justify-center'>
        <StoreModal/>  
          <Button onClick={ () => dispatch( setDialog(true))}>
            Add Store
          </Button>
      </main>
    </>
  )
}
