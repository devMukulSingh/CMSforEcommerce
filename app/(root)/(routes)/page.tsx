"use client"
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs';
import { Modal } from '@/components/ui/modal';
import { setDialog } from '@/store/slice';
import { StoreModal } from '@/components/modals/StoreModal';

export default function Home() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector( state => state.adminSlice.isOpen);
 
  return (

    <>
      <main>
        <StoreModal/>  
          <Button onClick={ () => dispatch( setDialog())}>Add Store</Button>
      </main>
    </>
  )
}
