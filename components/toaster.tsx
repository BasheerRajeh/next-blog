'use client'

import { Toaster as ReactHotToaster } from 'react-hot-toast'

const Toaster = () => {
    return (
        <ReactHotToaster
            position='bottom-right'
            toastOptions={{
                className: '!bg-background !text-foreground !border',
            }}
        />
    )
}

export default Toaster
