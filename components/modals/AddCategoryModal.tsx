import CategoryFormDialog from '@/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/CategoryFormDialog';
import React, { FC } from 'react'
import { Modal } from '../ui/modal';

interface AddCategoryModalProps{
    isOpen:boolean,
    onClose : () => void
}

const AddCategoryModal: FC<AddCategoryModalProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        description=""
        isOpen={isOpen}
        onClose={onClose}
        title="Add Category"
      >
        <CategoryFormDialog onClose={onClose} />
      </Modal>
    </>
  );
};

export default AddCategoryModal