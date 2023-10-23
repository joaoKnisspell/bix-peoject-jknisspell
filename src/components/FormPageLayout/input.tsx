import { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> 

export default function Input({...props}: InputProps) {
  return (
    <input className="w-full rounded-lg py-3 bg-zinc-100 px-4 md:text-base text-sm" {...props} />
  )
}
