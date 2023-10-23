/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import CompanyItem from '../components/CompanyItem'
import DefaultPageWrapper from '../components/DefaultPageWrapper'
import { useUserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

export default function Companies() {

  const { setUserData, companies } = useUserContext()
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
      <DefaultPageWrapper linkName='Adicionar Empresa' linkPath='/newCompany' title='Empresas Cadastradas'>
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
      </DefaultPageWrapper>
  )
}