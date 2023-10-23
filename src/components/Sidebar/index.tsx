import { Eye, LogOut, Menu, UserCheck, X } from "lucide-react";
import NavItem from "./navItem";
import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {

    const { user, setUserData ,signOutUser } = useUserContext()
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    function handleOnSignOut(){
        try{
            signOutUser()
            setUserData(null)
            localStorage.removeItem("@userData")
            navigate("/SignIn")
        }catch(err){
            console.log(err)
        }
    }

    return (
        <aside data-open={isOpen} className="bg-white h-screen p-6 py-3 lg:py-6 border-r border-gray-300 w-screen fixed lg:w-[20rem] lg:relative data-[open=false]:h-auto">
            <div className="h-full flex flex-col">
                <div className="flex items-center justify-between">
                    <span className="lg:text-6xl text-4xl text-gray-700 text-center">Bix</span>
                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">{isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}</button>
                </div>
                <nav data-open={isOpen} className="flex pt-11 flex-col justify-between h-full lg:h-full lg:flex data-[open=false]:hidden lg:data-[open=false]:flex">
                    <section className="flex flex-col gap-11">
                        <ul className="flex flex-col gap-6">
                            <NavItem onClick={() => setIsOpen(false)} linkPath="/" linkText="Resumo" />
                            <NavItem onClick={() => setIsOpen(false)} linkPath="/employees" linkText="Funcionários" />
                            <NavItem onClick={() => setIsOpen(false)} linkPath="/companies" linkText="Empresas" />
                        </ul>
                    </section>
                    <footer className="flex flex-col gap-6">
                        <button onClick={handleOnSignOut} className="text-lg flex items-center gap-2 w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold">
                            <LogOut className="w-5 h-5" />
                            Sair
                        </button>
                        <div className="flex items-center w-full gap-4">

                            {user?.isAdmin === true ? (
                                <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-full text-white">
                                    <UserCheck className="h-5 w-5 ml-0.5" />
                                </div>
                            ) : (
                                <div className="flex items-center justify-center w-10 h-10 bg-gray-600 rounded-full text-white">
                                    <Eye className="h-5 w-5" />
                                </div>

                            )}

                            <div className="flex flex-col">
                                <span className="text-sm text-gray-700 font-medium">{user?.name}</span>
                                <span className="text-xs text-gray-500 font-medium">{user?.email}</span>
                            </div>
                        </div>
                    </footer>
                </nav>
            </div>
        </aside>
    )
}
