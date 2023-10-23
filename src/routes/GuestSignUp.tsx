import { FormEvent, useState } from "react";
import FormPageLayout from "../components/FormPageLayout";
import Input from "../components/FormPageLayout/input";

import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../libs/firebase";
import { useUserContext } from "../context/UserContext";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../components/Loading";

export default function GuestSignUp() {

  const { setUserData } = useUserContext()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loadingAuth, setLoadingAuth] = useState(false)
  const navigate = useNavigate()

  async function signUpGuestUser(email: string, password: string) {
    setLoadingAuth(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
          const docRef = doc(db, "users", value.user.uid)
          const userData = {
            name: name,
            email: email,
            isAdmin: false,
            userUid: value.user.uid,
            role: 'Guest'
          }
          await setDoc(docRef, userData)
            .then(() => {
              localStorage.setItem("@userData", JSON.stringify(userData))
              setUserData(userData)
              navigate("/")
              setLoadingAuth(false)
            })
        })
    } catch (err) {
      console.log(err)
      setLoadingAuth(false)
    }
  }

  function handleOnSubmit(e: FormEvent) {
    e.preventDefault()
    if (name !== '' && email !== '' && password !== '') {
      signUpGuestUser(email, password)
    }
  }

  return (
    <FormPageLayout subheading="Olá Visitante, crie sua conta agora mesmo!">
      <form className="flex flex-col gap-6" onSubmit={handleOnSubmit}>
        <Input placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />

        <div className="flex flex-col gap-2 text-center">
          <button type="submit" className="w-full bg-zinc-950 py-3 text-zinc-50 font-medium md:text-base text-sm flex items-center justify-center">
            {loadingAuth ?
              <Loading /> :
              'Registrar'
            }
          </button>
          <Link to='/employeeSignUp' className="text-sm underline">Trabalha na Bix? Faça seu cadastro de colaborador!</Link>
          <Link className="text-sm underline" to='/SignIn'>Já possui conta? Faça seu login agora mesmo!</Link>
        </div>
      </form>
    </FormPageLayout>
  )
}
