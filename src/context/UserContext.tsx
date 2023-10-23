import React, { createContext, useContext, useEffect, useState } from "react";

//Toastfy
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

//Firebase imports
import { auth, db } from "../libs/firebase";
import { signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { format } from "date-fns";

type UserContextProps = {
    user: AppUserProps | null
    employees: EmployeeDocProps[] | null
    companies: CompanyDocProps[] | null
    setUserData: (data: AppUserProps | null) => void
    signOutUser: () => void
    addEmployee: ({ name, startDate, exitDate, vacationDate }: EmployeeDocProps) => void
    updateEmployee: ({ id, name, startDate, exitDate, vacationDate }: EmployeeDocProps) => void
    addCompany: ({ name, startDate, category, status }: CompanyDocProps) => void
    updateCompany: ({ name, startDate, category, status }: CompanyDocProps) => void
    removeDoc: (docCollection: string, docId: string,) => void
}

type AppUserProps = {
    name: string,
    email: string,
    isAdmin: boolean
    userUid: string,
    role?: string
}

export type EmployeeDocProps = {
    id?: string,
    name: string,
    startDate: string,
    exitDate: string,
    vacationDate: string,
}

export type CompanyDocProps = {
    id?: string,
    name: string,
    startDate: string,
    category: string,
    status: string,
}

const UserContext = createContext({} as UserContextProps)

export function UserContextProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<AppUserProps | null>(null)
    const [employees, setEmployees] = useState<EmployeeDocProps[] | null>(null)
    const [companies, setCompanies] = useState<CompanyDocProps[] | null>(null)

    //Set User
    function setUserData(data: AppUserProps | null) {
        setUser(data)
    }

    //Sign Out Function
    async function signOutUser() {
        await signOut(auth)
        toast.info("Logout realizado com sucesso, volte sempre!")
    }

    //Add Employee
    async function addEmployee({ name, startDate, exitDate, vacationDate }: EmployeeDocProps) {
        const docRef = collection(db, "employees")
        try {
            await addDoc(docRef, {
                name,
                startDate: format(new Date(startDate), "dd/MM/yyyy"),
                exitDate: exitDate ? format(new Date(exitDate), "dd/MM/yyyy") : '-----',
                vacationDate: format(new Date(vacationDate), "dd/MM/yyyy"),
                createdAt: new Date()
            })
                .then(() => {
                    toast.success('Funcionário cadastrado com sucesso!')
                    getEmployees()
                })
        } catch (err) {
            console.log(err)
        }
    }

    //UpdateEmployee
    async function updateEmployee({ id, name, startDate, exitDate, vacationDate}: EmployeeDocProps) {
        const docRef = doc(db, "employees", String(id))
        try {
            await setDoc(docRef, {
                name,
                startDate: format(new Date(startDate), "dd/MM/yyyy"),
                exitDate: exitDate !== '' ? format(new Date(exitDate), "dd/MM/yyyy") : '-----',
                vacationDate: format(new Date(vacationDate), "dd/MM/yyyy"),
                createdAt: new Date()
            })
                .then(() => {
                    toast.success("Documento atualizado com sucesso!")
                    getEmployees()
                })
        } catch (err) {
            console.log(err)
        }
    }

    //Add Company
    async function addCompany({ name, startDate, category, status }: CompanyDocProps) {
        const docRef = collection(db, "companies")
        try {
            await addDoc(docRef, {
                name,
                startDate: format(new Date(startDate), "dd/MM/yyyy"),
                category,
                status,
                createdAt: new Date()
            })
                .then(() => {
                    toast.success('Empresa cadastrada com sucesso!')
                    getCompanies()
                })
        } catch (err) {
            console.log(err)
        }
    }

    //UpdateCompany
    async function updateCompany({ id, name, category, startDate, status }: CompanyDocProps) {
        const docRef = doc(db, "companies", String(id))
        try {
            await setDoc(docRef, {
                name,
                startDate: format(new Date(startDate), "dd/MM/yyyy"),
                category,
                status,
                createdAt: new Date()
            })
                .then(() => {
                    toast.success("Documento atualizado com sucesso!")
                    getCompanies()
                })
        } catch (err) {
            console.log(err)
        }
    }

    //Get Employees
    async function getEmployees() {
        const q = query(collection(db, 'employees'), orderBy('createdAt', 'desc'))
        try {
            await getDocs(q)
                .then((snapshot) => {
                    const list: EmployeeDocProps[] = []
                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            name: doc.data().name,
                            startDate: doc.data().startDate,
                            exitDate: doc.data().exitDate,
                            vacationDate: doc.data().vacationDate
                        })
                    })
                    setEmployees(list)
                })
        } catch (err) {
            console.log(err)
        }
    }

    //Remove Doc
    async function removeDoc(docCollection: string, docId: string) {
        const docRef = doc(db, docCollection, docId)
        try {
            await deleteDoc(docRef)
                .then(() => {
                    toast.success('Documento excluído com sucesso!')
                    if (docCollection === 'employees') {
                        getEmployees()
                    } else {
                        getCompanies()
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    //Get Companies
    async function getCompanies() {
        const q = query(collection(db, 'companies'), orderBy('createdAt', 'desc'))
        try {
            await getDocs(q)
                .then((snapshot) => {
                    const list: CompanyDocProps[] = []
                    snapshot.forEach((doc) => {
                        list.push({
                            id: doc.id,
                            name: doc.data().name,
                            startDate: doc.data().startDate,
                            category: doc.data().category,
                            status: doc.data().status
                        })
                    })
                    setCompanies(list)
                })
        } catch (err) {
            console.log(err)
        }
    }



    //Getting Inicial Data
    useEffect(() => {
        getEmployees()
        getCompanies()
    }, [])

    return (
        <UserContext.Provider value={{ user, setUserData, signOutUser, addEmployee, addCompany, employees, companies, removeDoc, updateCompany, updateEmployee }}>
            {children}
        </UserContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
    return useContext(UserContext)
} 
