import { redirect } from 'next/navigation'

import PageHeader from '@/components/page-header'
import { getCurrentUser } from '@/lib/get-current-user'

import DangerArea from './danger-area'
import AccountForm from './form'

const SettingsPage = async () => {
    const user = await getCurrentUser()

    if (!user) redirect('/login?redirect=/me/settings')

    return (
        <>
            <PageHeader
                title='Settings'
                description='Manage your account settings'
            />
            <div className='my-8 space-y-4'>
                <AccountForm user={user} />
                <DangerArea />
            </div>
        </>
    )
}

export default SettingsPage
