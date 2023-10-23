/* eslint-disable react-hooks/exhaustive-deps */
import DefaultPageWrapper from '../components/DefaultPageWrapper'
import EmployeeItem from '../components/EmployeeItem.tsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext.tsx'

export default function Employees() {

  const { setUserData, employees } = useUserContext()
  const navigate = useNavigate()

  //Check Auth
  useEffect(() => {
    const localData = JSON.parse(String(localStorage.getItem("@userData")))
    setUserData(localData)
    if (!localData) {
      navigate('/SignIn')
    }
  }, [])

  return (
      <DefaultPageWrapper linkName='Adicionar Funcionário' linkPath='/newEmployee' title='Funcionários Cadastrados'>
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
      </DefaultPageWrapper>
  )
}
