/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react'
import Input from '../components/FormPageLayout/input'
import { useNavigate, useParams } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../libs/firebase'
import { EmployeeDocProps } from '../context/UserContext'


export default function NewEmployee() {

  const { id } = useParams()
  const { user, setUserData, addEmployee, removeDoc, updateEmployee } = useUserContext()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [exitDate, setExitDate] = useState('')
  const [vacationDate, setVacationDate] = useState('')
  const [currentEmployee, setCurrentEmployee] = useState<EmployeeDocProps | null>(null)
  const [loading, setLoading] = useState(true)

  //Add New Employee
  function handleAddEmployee(e: FormEvent) {
    e.preventDefault()
    if(id){
      updateEmployee({ id, name, startDate, exitDate, vacationDate })
    } else {
      addEmployee({ name, startDate, exitDate, vacationDate })
    }
    setName('')
    setStartDate('')
    setExitDate('')
    setVacationDate('')
  }

  //Get Current Employee
  async function getCurrentEmployee(id: string) {
    const docRef = doc(db, "employees", id)
    try {
      await getDoc(docRef)
        .then((doc) => {
          setCurrentEmployee({
            name: doc?.data()?.name,
            startDate: doc?.data()?.startDate,
            exitDate: doc?.data()?.exitDate,
            vacationDate: doc?.data()?.vacationDate
          })
        })
    } catch (err) {
      console.log(err)
    }
  }

  //Deleting Employee
  function handleOnDelete() {
    removeDoc("employees", String(id))
    navigate("/")
  }

  //Check Auth
  useEffect(() => {
    const localData = JSON.parse(String(localStorage.getItem("@userData")))
    setUserData(localData)
    if (!localData) {
      navigate('/SignIn')
    } else if (!user?.isAdmin && !id) {
      navigate('/')
    }
  }, [])

  //Check Employee Existence
  useEffect(() => {
    if (id) {
      getCurrentEmployee(id)
      setLoading(false)
    }
    setLoading(false)
  }, [id])

  if (loading) {
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
      </div>)
  }


  return (
      <main className='w-full min-h-[calc(100vh+80px)] lg:min-h-screen h-full flex flex-col gap-6 items-center justify-center bg-gradient-to-t from-indigo-200 via-sky-200 to-stone-100'>
        {user?.isAdmin ? (
          <div className='w-full h-full lg:px-0 px-4 flex flex-col gap-6 items-center justify-center'>
            <h1 className='text-2xl font-medium'>{currentEmployee ? `Editar Funcionário: ${currentEmployee.name}` : 'Novo Funcionário:'}</h1>
            <form onSubmit={handleAddEmployee} className="flex flex-col gap-4 lg:gap-6 max-w-[500px] w-full bg-white shadow-lg p-4 rounded-lg">
              <label className='flex flex-col gap-2'>
               {currentEmployee ? `Nome atual: ${currentEmployee.name}` : 'Nome do funcionário:'}
                <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder='Digite o nome do funcionário...' />
              </label>
              <label className='flex flex-col gap-2'>
              {currentEmployee ? `Data de entrada atual: ${currentEmployee.startDate}` : 'Data de entrada:'}
                <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} type='date' required />
              </label>
              <label className='flex flex-col gap-2'>
              {currentEmployee ? `Data de saída atual: ${currentEmployee.exitDate}` : 'Data de saída:'}
                <Input value={exitDate} onChange={(e) => setExitDate(e.target.value)} type='date' />
                <span className='text-sm text-gray-500'>Preencher apenas se o funcionário saiu da empresa!</span>
              </label>
              <label className='flex flex-col gap-2'>
              {currentEmployee ? `Período de férias atual: ${currentEmployee.vacationDate}` : 'Período de férias:'}
                <Input value={vacationDate} onChange={(e) => setVacationDate(e.target.value)} type='date' required />
              </label>
              <div className='flex flex-col w-full gap-2'>
                <button className='hover:bg-sky-600 bg-sky-500 text-zinc-50 py-3 text-sm md:text-base font-medium' type='submit'>{currentEmployee ? 'Editar' : 'Cadastrar'}</button>
                {currentEmployee && <button onClick={handleOnDelete} className='hover:bg-red-600 bg-red-500 text-zinc-50 py-3 text-sm md:text-base font-medium' type='button'>Excluir</button>}
              </div>
            </form>
          </div>
        ) : 
          <div className="flex flex-col gap-6 max-w-[350px] w-full bg-white shadow-lg p-4 rounded-lg">
            <span className='flex flex-col'>Nome do funcionário: <b>{currentEmployee?.name}</b></span>
            <span className='flex flex-col'>Data de entrada do funcionário: <b>{currentEmployee?.startDate}</b></span>
            <span className='flex flex-col'>Período de férias do funcionário: <b>{currentEmployee?.vacationDate}</b></span>
            <span className='flex flex-col'>Data de saida do funcionário: <b>{currentEmployee?.exitDate}</b></span>
          </div>
        }
      </main>
  )
}
