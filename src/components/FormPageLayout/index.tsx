import { ComponentProps } from "react"

type DefaultFormProps = ComponentProps<'main'> & {
    subheading?: string,
}

export default function FormPageLayout({ subheading, ...props }: DefaultFormProps) {
  return (
    <main { ...props } className='min-h-screen w-full bg-gradient-to-t from-indigo-200 via-sky-200 to-stone-100 flex items-center justify-center antialiased p-4'>
    <div className="max-w-[500px] w-full bg-zinc-50 rounded-lg p-4 md:px-8 md:py-6 shadow-2xl">
        <div className="mb-6 flex flex-col">
          <h1 className="text-7xl text-center">Bix</h1>
          <span className="text-sm text-center">{subheading}</span>
        </div>
          {props.children}
    </div>
</main>
  )
}
