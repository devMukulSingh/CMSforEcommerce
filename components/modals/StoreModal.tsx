import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Modal } from "@/components/ui/modal"
import { setDialog } from "@/store/slice";


export const StoreModal = () => {
    const isOpen = useAppSelector( state => state.adminSlice.isOpen);
    const dispatch = useAppDispatch();
    return(
        <Modal
            title="title"
            description="description"
            isOpen={isOpen}
            onClose={ () => { dispatch(setDialog() ) } }
            >
            Future Create Store Form
        </Modal>
    )
}