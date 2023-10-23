import { ArrowRight } from "lucide-react"
import { ComponentProps } from "react"
import { Link } from "react-router-dom"


type DashboardWrapperProps = ComponentProps<'section'> & {
    title: string,
    linkPath: string
}

export default function DashboardWrapper({ title, linkPath, ...props }: DashboardWrapperProps) {

  return (
    <section { ...props } className="py-8 px-4 flex flex-col gap-4 overflow-y-hidden">
      <header className="flex w-full items-center justify-between">
        <h3 className="text-2xl font-medium">{title}</h3>
        <Link className="flex items-center gap-2 text-gray-600 hover:text-gray-900" to={linkPath}>Ver mais <ArrowRight className="w-4 h-4" /></Link>
      </header>
      <section className="bg-white shadow-lg rounded-lg h-full p-4 overflow-y-scroll flex flex-col gap-5">
        {props.children}
      </section>
    </section>
  )
}
