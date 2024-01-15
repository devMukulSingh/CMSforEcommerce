"use client"
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs';
import { Modal } from '@/components/ui/modal';
import { setDialog } from '@/store/slice';

export default function Home() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector( state => state.adminSlice.isOpen);
 
  return (
    <>
      <main>
        <Modal 
          title='title' 
          description='desct' 
          isOpen  
          onClose={ () => { dispatch(setDialog()) } }
          >  
          </Modal>
          hello
      </main>
    </>
  )
}
