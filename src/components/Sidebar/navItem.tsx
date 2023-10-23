import { Building2, LayoutDashboard, Users } from 'lucide-react'
import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

type NavItemProps = ComponentProps<'li'> & {
    linkPath: string,
    linkText: string,
}

export default function NavItem({linkPath, linkText, ...props}: NavItemProps) {
  return (
    <li {...props} className="group hover:bg-sky-500 font-medium hover:text-white rounded-lg w-full h-full text-lg text-gray-500">
        <Link className="px-4 py-2 flex items-center gap-2 w-full h-full" to={linkPath}>
            {linkText === 'Resumo' && <LayoutDashboard className="w-5 h-5"/>} 
            {linkText === 'Empresas' && <Building2 className="w-5 h-5"/>} 
            {linkText === 'Funcionários' && <Users className="w-5 h-5"/>}
            {linkText}
        </Link>
    </li>
  )
}
