import { Modal, ModalDialog } from '@mui/joy'
import React from 'react'
import SignInForm from '../../forms/SignInForm'

export default function LoginModal({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ padding: 0, overflow: 'hidden' }}
            >
                <SignInForm />
            </ModalDialog>
        </Modal>
    )
}
