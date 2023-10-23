import { Link } from "react-router-dom"

type EmployeeItemProps = {
    id: string,
    name: string,
    startDate: string,
    vacationDate: string,
    exitDate?: string
}

export default function EmployeeItem({ id, name, startDate, vacationDate, exitDate }: EmployeeItemProps) {
  return (
    <div className="w-full bg-gray-100 p-2 lg:py-2 lg:px-6 rounded-lg min-w-[39.375rem]">
      <Link relative="path" to={`/employee/${id}`} className="w-full h-full flex items-center justify-between">
        <span className="font-medium flex-1">{name}</span>
        <span className="flex-1"><b>Entrada:</b> {startDate}</span>
        <span className="flex-1"><b>Férias:</b> {vacationDate}</span>
        <span className="flex-1"><b>Saída:</b> {exitDate ? exitDate : '-----'}</span>
      </Link>
    </div>
  )
}
