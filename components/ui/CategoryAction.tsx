"use client"
import { Copy, Edit, Menu, MenuIcon, Trash } from 'lucide-react';
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from './dropdown-menu';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from '../modals/AlertModal';
import axios from 'axios';
import { CategoryColumn } from './CategoryColumn';

interface IcategoryActionsProps{
    data : CategoryColumn;
}

const CategoryAction:React.FC<IcategoryActionsProps> = ({
    data
}) => {

    const { storeId } = useParams();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    
    const handleCopy = () => {
        navigator.clipboard.writeText(data.id);
        toast.success('Copied to clipboard');
    }
    const handleDelete = async() => {
        try{
            setLoading(true);
            await axios.delete(`/api/${storeId}/category/${data.id}`);
            toast.success('Category deleted');
            router.refresh();
        }catch(e){
            console.log(`Error in handleDelete ${e}`);
            toast.error(`Something went wrong`);
        }
        finally{
            setLoading(false);
        }
    }

  return (
    <main>
        <AlertModal
            isOpen={isOpen}
            loading={loading}
            onClose={ () => setIsOpen(false)}
            onConform={ () => handleDelete() }
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Menu className='cursor-pointer'/>
            </DropdownMenuTrigger>
                <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem 
                        className='cursor-pointer flex gap-2 items-center'
                        onClick={ () => handleCopy() }
                        >
                        <Copy 
                            className='w-4 h-4'
                            /> Copy category Id
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className='cursor-pointer flex gap-2 items-center'
                            onClick={ () => router.push(`/${storeId}/categories/${data.id}`) }
                            >
                         <Edit 
                            className='w-4 h-4' 
                            /> Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className='cursor-pointer flex gap-2 items-center'
                            onClick={ () => setIsOpen(true)}
                        >
                            <Trash className='w-4 h-4'/>Delete
                        </DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    </main>
  )
}

export default CategoryAction