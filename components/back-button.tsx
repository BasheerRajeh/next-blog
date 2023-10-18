'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Button } from '@/components/ui/button'

type BackButtonProps = React.ComponentPropsWithRef<'button'>

const BackButton: React.FC<BackButtonProps> = (props) => {
    const router = useRouter()

    return (
        <Button
            className='group flex items-center'
            onClick={() => router.back()}
            type='button'
            variant='ghost'
            {...props}
        >
            <ArrowLeft
                size={20}
                className='mr-2 transition-transform duration-300 group-hover:-translate-x-1'
            />
            Back
        </Button>
    )
}

export default BackButton
