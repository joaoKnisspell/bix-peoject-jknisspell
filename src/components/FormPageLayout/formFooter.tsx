import { ComponentProps } from "react"
import { Link } from "react-router-dom"

type FormFooterProps = ComponentProps<'footer'> & {
    btnTitle: string,
    linkPath: string,
    linkText: string,
    isSignUp: boolean
}

export default function FormFooter({ btnTitle, linkPath, linkText, isSignUp }: FormFooterProps) {
  return (
    <div className="flex flex-col gap-2 text-center">
        <button className="w-full bg-zinc-950 py-3 text-zinc-50 font-medium md:text-base text-sm">{btnTitle}</button>
        <Link to={linkPath} className="text-sm underline">{linkText}</Link>
        {isSignUp && <Link className="text-sm underline" to='/SignIn'>Já possui conta? Faça seu login agora mesmo!</Link>}
    </div>
  )
}
