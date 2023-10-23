import { Link } from "react-router-dom"

type CompanyItemProps = {
    id: string,
    name: string,
    startDate: string,
    category: string,
    status: string
}

export default function CompanyItem({ id, name, startDate, category, status }: CompanyItemProps) {
  return (
    <div className="w-full bg-gray-100 p-2 lg:py-2 lg:px-6 rounded-lg min-w-[39.375rem]">
      <Link relative="path" to={`/company/${id}`} className="w-full h-full gap-4 flex items-center justify-between"> 
        <span className="font-medium flex-1">{name}</span>
        <span className="flex-1"><b>Entrada:</b> {startDate}</span>
        <span className="flex-1"><b>Nicho:</b> {category}</span>
        <span className="flex-1"><b>Status:</b> {status}</span>
      </Link>
    </div>
  )
}
