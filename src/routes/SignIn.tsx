import { Link, useNavigate } from "react-router-dom";
import FormPageLayout from "../components/FormPageLayout";
import Input from "../components/FormPageLayout/input";
import { FormEvent, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

export default function SignIn() {

  const { setUserData } = useUserContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingAuth, setLoadingAuth] = useState(false)

  const navigate = useNavigate()

  async function signInUser(email: string, password: string) {
    setLoadingAuth(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
          // console.log(value.user.uid)
          const docRef = doc(db, "users", value.user.uid)
          await getDoc(docRef)
            .then((value) => {
              const userData = {
                name: value?.data()?.name,
                email: email,
                role: value?.data()?.role,
                userUid: value?.data()?.userUid,
                isAdmin: value?.data()?.isAdmin,
              }
              setUserData(userData)
              localStorage.setItem("@userData", JSON.stringify(userData))
              toast.success('Olá, bom te ver novamente!')
              navigate("/")
              setLoadingAuth(false)
            })
        })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if(err.code == 'auth/invalid-login-credentials'){
        toast.error("Email ou senha inválidos, tente novamente!")
      } 
      else {
        console.log(err)
      }
      setLoadingAuth(false)
    }
  }

  function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    if (email !== '' && password !== '') {
      signInUser(email, password)
    }
  }

  return (
    <FormPageLayout subheading="Olá visitante, bem vindo ao nosso sistema!">
      <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
        <Input required type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input required type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} />
        <div className="flex flex-col gap-2 text-center">
          <button style={loadingAuth ? { cursor: 'not-allowed' } : { cursor: 'pointer' }} type="submit" className="w-full bg-zinc-950 py-3 text-zinc-50 font-medium md:text-base text-sm flex items-center justify-center">
            {loadingAuth ?
              <Loading /> :
              'Entrar'}
          </button>
          <Link to="/guestSignUp" className="text-sm underline text-center">Não tem conta? Crie agora mesmo!</Link>
        </div>
      </form>
    </FormPageLayout>
  )
}
