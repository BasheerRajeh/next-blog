'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { Loader2, UserIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

import { saveSettings } from '@/app/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const accountFormSchema = z.object({
    image: z.string().min(1),
    name: z.string().min(1),
    bio: z.string().optional(),
})

type AccountFormProps = {
    user: User
}

const AccountForm: React.FC<AccountFormProps> = ({ user }) => {
    const { name, image, bio } = user
    const router = useRouter()
    const [saving, setSaving] = useState(false)

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof accountFormSchema>>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            name: name!,
            image: image!,
            bio: bio || undefined,
        },
    })

    const onSubmit = async (values: z.infer<typeof accountFormSchema>) => {
        setSaving(true)

        try {
            await saveSettings(values)
            toast.success('Settings saved.')
            setSaving(false)

            router.refresh()
        } catch (error) {
            toast.error((error as Error).message)
            setSaving(false)
        }
    }

    return (
        <form
            className='space-y-4 rounded-lg border bg-zinc-900/60 p-4'
            onSubmit={handleSubmit(onSubmit)}
        >
            <h4 className='mb-6 text-2xl font-semibold'>Account</h4>
            <Avatar className='h-24 w-24'>
                <AvatarImage
                    src={image!}
                    width={96}
                    height={96}
                    alt={name!}
                />
                <AvatarFallback>
                    <UserIcon size={40} />
                </AvatarFallback>
            </Avatar>

            <div className='flex flex-col gap-2'>
                <Label htmlFor='image'>Image</Label>
                <Input
                    type='url'
                    id='image'
                    placeholder='Image'
                    {...register('image')}
                />
                {errors.image && (
                    <p className='text-red-500'>{errors.image.message}</p>
                )}
            </div>

            <div className='flex flex-col gap-2'>
                <Label htmlFor='name'>Name</Label>
                <Input
                    type='text'
                    id='name'
                    placeholder='Name'
                    {...register('name')}
                />
                {errors.name && (
                    <p className='text-red-500'>{errors.name.message}</p>
                )}
            </div>

            <div className='flex flex-col gap-2'>
                <Label htmlFor='bio'>Bio</Label>
                <Input
                    type='text'
                    id='bio'
                    placeholder='Bio'
                    {...register('bio')}
                />
                {errors.bio && (
                    <p className='text-red-500'>{errors.bio.message}</p>
                )}
            </div>

            <Button
                type='submit'
                disabled={saving}
                className='ml-auto'
            >
                {saving && (
                    <Loader2
                        size={16}
                        className='mr-2 animate-spin'
                    />
                )}
                Save
            </Button>
        </form>
    )
}

export default AccountForm
