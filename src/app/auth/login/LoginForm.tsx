'use client'

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from "react";
import clsx from "clsx";
import { authenticate } from "@/actions/auth/login";
import { IoInformationOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
export default function LoginFormComponent() {
   const router = useRouter()
    const [state, dispatch] = useFormState(authenticate, undefined);
    useEffect(() => {
        if (state == 'Success') {
            window.location.replace('/') //TODO : CON ESTA LINEAD E CODIGO EVITO QUE SE REFRESQUE EL "/" EN VES DE PONER PROVIDERS AL LAYOUT
        }
    },)
    return (
        <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
            style={{ backgroundImage: `url(https://static.eldiario.es/clip/a169422c-b292-4c46-9a1d-082f46b9220e_16-9-discover-aspect-ratio_default_0.jpg)` }}>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Bienvenido
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">Login</p>
                </div>
                <form action={dispatch} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="relative">
                        <div className="absolute right-0 mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
                        <input
                            name='email'
                            className="w-full text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mt-8 content-center">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">
                            Password
                        </label>
                        <input
                            name='password'
                            className="w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Recordar sesión
                            </label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-500 hover:text-indigo-500">
                                ¿Olvidaste tu password?
                            </a>
                        </div>
                    </div>
                    <div>
                        <LoginButton />
                    </div>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                        <span>¿No tienes una cuenta?</span>
                        <Link href={`/auth/registro`} className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300">Regístrate</Link>
                    </p>
                    {state === "CredentialsSignin" && (
                        <div className='flex gap-2'>
                            <IoInformationOutline className="h-5 w-5 text-red-500" />
                            <p className="text-sm text-red-500">Las credenciales no son correctas</p>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}
function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={
                clsx({ "w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300": !pending, "bg-slate-400": pending })
            }
            disabled={pending}
        >
            Ingresar
        </button>
    );
}