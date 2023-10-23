import { Plus } from 'lucide-react'
import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'

type DefaultPageWrapperProps = ComponentProps<'main'> & {
    title: string,
    linkName: string,
    linkPath: string
} 

export default function DefaultPageWrapper({ title, linkName, linkPath, ...props }: DefaultPageWrapperProps) {

    const { user } = useUserContext()

  return (
    <main {...props} className="bg-gradient-to-t from-indigo-200 via-sky-200 to-stone-100 w-full lg:max-h-screen min-h-screen">
        <section className='w-full h-full max-w-7xl mx-auto px-4 overflow-y-hidden flex flex-col gap-8 pt-24 pb-8 lg:py-8'>
            <header className='flex gap-2 flex-col justify-start items-center lg:flex-row lg:justify-between'>
                <h1 className='lg:text-2xl text-xl font-medium'>{title}:</h1>
                {user?.isAdmin && <Link to={linkPath} className='flex items-center gap-1 bg-white shadow-lg rounded-lg py-2 px-3 text-gray-600 hover:text-gray-900'><Plus className='w-5 h-5' />{linkName}</Link>}
            </header>
            <div className='bg-white rounded-lg h-[90%] p-4 flex flex-col gap-4 overflow-y-scroll'>
                {props.children}
            </div>
        </section>
    </main>
  )
}
