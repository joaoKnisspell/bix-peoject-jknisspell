/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react'
import Input from '../components/FormPageLayout/input'
import { CompanyDocProps, useUserContext } from '../context/UserContext'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../libs/firebase'


export default function NewCompany() {

  const { id } = useParams()

  const { user, setUserData, addCompany, removeDoc, updateCompany } = useUserContext()
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('Ativo')
  const [loading, setLoading] = useState(true)
  const [currentCompany, setCurrentCompany] = useState<CompanyDocProps | null>(null)
  const navigate = useNavigate()

  function handleAddCompany(e: FormEvent) {
    e.preventDefault()
    if(id){
      updateCompany({ id, name, category, startDate, status })
      navigate('/')
    } else{
      addCompany({ name, startDate, category, status })
    }
    setName('')
    setStartDate('')
    setCategory('')
    setStatus('')
  }

  //Get Current Company
  async function getCurrentCompany(id: string) {
    const docRef = doc(db, "companies", id)
    try {
      await getDoc(docRef)
        .then((doc) => {
          setCurrentCompany({
            name: doc?.data()?.name,
            startDate: doc?.data()?.startDate,
            category: doc?.data()?.category,
            status: doc?.data()?.status
          })
        })
    } catch (err) {
      console.log(err)
    }
  }

  //Deleting Company
  function handleOnDelete() {
    removeDoc("companies", String(id))
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

  //Check Company Existence
  useEffect(() => {
    if (id) {
      getCurrentCompany(id)
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
      <main className='w-full min-h-screen h-full flex flex-col gap-6 items-center justify-center bg-gradient-to-t from-indigo-200 via-sky-200 to-stone-100'>
        {user?.isAdmin ? (
          <>
            <h1 className='text-2xl font-medium'>{currentCompany ? `Editar Empresa: ${currentCompany.name}` : 'Adicionar Empresa:'}</h1>
            <form onSubmit={handleAddCompany} className="flex flex-col gap-6 max-w-[500px] w-full bg-white shadow-lg rounded-lg p-4">
              <label className='flex flex-col gap-2'>
                {currentCompany ? `Nome atual: ${currentCompany.name}` : 'Nome da empresa:'}
                <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder='Digite o nome da empresa...' />
              </label>
              <label className='flex flex-col gap-2'>
              {currentCompany ? `Data de início atual: ${currentCompany.startDate}` : 'Data de início:'}
                <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} type='date' required />
              </label>
              <label className='flex flex-col gap-2'>
              {currentCompany ? `Categoria atual: ${currentCompany.category}` : 'Categoria:'}
                <Input value={category} onChange={(e) => setCategory(e.target.value)} required placeholder='Digite a categoria da empresa...' />
              </label>
              <label className='flex flex-col gap-2'>
              {currentCompany ? `Status Atual: ${currentCompany.status}` : 'Status:'}
                <select value={status} onChange={(e) => setStatus(e.target.value)} name='select' className='bg-gray-100 py-3 px-4 rounded-lg' required>
                  <option placeholder='Ativo' value='Ativo'>Ativo</option>
                  <option placeholder='Inativo' value='Inativo'>Inativo</option>
                </select>
              </label>
              <div className='flex flex-col w-full gap-2'>
                <button className='hover:bg-sky-600 bg-sky-500 text-zinc-50 py-3 text-sm md:text-base font-medium' type='submit'>{currentCompany ? 'Editar' : 'Cadastrar'}</button>
                {currentCompany && <button onClick={handleOnDelete} className='hover:bg-red-600 bg-red-500 text-zinc-50 py-3 text-sm md:text-base font-medium' type='button'>Excluir</button>}
              </div>
            </form>
          </>
        ) : (
            <div className="flex flex-col gap-6 max-w-[350px] w-full bg-white shadow-lg p-4 rounded-lg">
              <span className='flex flex-col'>Nome da empresa: <b>{currentCompany?.name}</b></span>
              <span className='flex flex-col'>Data de entrada da empresa: <b>{currentCompany?.startDate}</b></span>
              <span className='flex flex-col'>Categoria de empresa: <b>{currentCompany?.category}</b></span>
              <span className='flex flex-col'>Status da empresa: <b>{currentCompany?.status}</b></span>
            </div>
        )}
      </main>
  )
}
