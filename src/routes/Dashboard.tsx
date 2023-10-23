/* eslint-disable react-hooks/exhaustive-deps */
import DashboardWrapper from "../components/DashboardWrapper";
import CompanyItem from "../components/CompanyItem/index.tsx";
import EmployeeItem from "../components/EmployeeItem.tsx";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext.tsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const { setUserData, employees, companies } = useUserContext()
  const navigate = useNavigate()
  const [loadingAuth] = useState(false)

  //Check Auth
  useEffect(() => {
    const localData = JSON.parse(String(localStorage.getItem("@userData")))
    setUserData(localData)
    if (!localData) {
      navigate('/SignIn')
    }
  }, [])


  if (loadingAuth) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <svg
          className="h-14 w-14 animate-spin text-zinc-950"
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="currentColor"
            fillRule="evenodd"
            opacity="0.2"
          />
          <path
            d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
            fill="currentColor"
          />
        </svg>
      </div>
    )
  }

  return (
      <main className="bg-gradient-to-t from-indigo-200 via-sky-200 to-stone-100 w-full lg:col-start-2 min-h-screen">
        <div className="max-w-7xl w-full mx-auto h-full min-h-screen grid grid-rows-2 lg:max-h-screen pt-16 lg:pt-0">
          <DashboardWrapper linkPath="/employees" title="Últimos Funcionários Cadastrados:">
            {employees?.slice(0, 6).map((element) => {
              return <EmployeeItem
                key={element.id}
                id={String(element.id)}
                name={element.name}
                startDate={element.startDate}
                vacationDate={element.vacationDate}
                exitDate={element.exitDate}
              />
            })}
          </DashboardWrapper>
          <DashboardWrapper linkPath="/companies" title="Últimas Empresas Cadastradas:">
            {companies?.slice(0, 6).map((element) => {
              return <CompanyItem
                key={element.id}
                id={String(element.id)}
                name={element.name}
                startDate={element.startDate}
                category={element.category}
                status={element.status}
              />
            })}
          </DashboardWrapper>
        </div>
      </main>
  )
}
