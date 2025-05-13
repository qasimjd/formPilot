import { Button } from '@/components/ui/button'
import { BadgePlus } from 'lucide-react'

const page = () => {
    return (
        <main className="p-18 w-full h-screen">
            <div className='flex items-center justify-between my-6'>
                <h2 className='font-bold'>Dashboard</h2>
                <Button size='sm'>
                    <BadgePlus />
                    <span>Create Form</span>
                </Button>
            </div>
        </main>
    )
}

export default page
