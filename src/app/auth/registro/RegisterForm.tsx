'use client'

import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { registerForm } from "@/actions/auth/register";
import { login } from "@/actions/auth/login";

type FormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterFormComponent = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        const { name, email, password } = data;
        const resp = await registerForm(name, email, password);
        if (!resp.ok) {
            setErrorMessage(resp.message!);
            return;
        }
        await login(email.toLowerCase(), password);
        window.location.replace('/');
    };

    const password = watch("password");

    return (
        <div className="min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
            style={{ backgroundImage: `url(https://static.eldiario.es/clip/a169422c-b292-4c46-9a1d-082f46b9220e_16-9-discover-aspect-ratio_default_0.jpg)` }}>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">Bienvenido</h2>
                    <p className="mt-2 text-sm text-gray-600">Registro</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">

                    <div className="relative">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Nombre</label>
                        <input
                            {...register('name', { required: true })}
                            className={clsx("w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500", {
                                'border-red-500': !!errors.name
                            })}
                            type="text"
                            placeholder="Nombre"
                        />
                        {errors.name?.type === 'required' && (
                            <span className="text-red-600 font-bold">* El nombre es obligatorio</span>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Email</label>
                        <input
                            {...register('email', { required: true })}
                            className={clsx("w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500", {
                                'border-red-500': !!errors.email
                            })}
                            type="email"
                            placeholder="Email"
                        />
                        {errors.email?.type === 'required' && (
                            <span className="text-red-600 font-bold">* El Email es obligatorio</span>
                        )}
                    </div>

                    <div className="mt-8 content-center">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Password</label>
                        <input
                            {...register('password', { required: true, minLength: 6 })}
                            className={clsx("w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500", {
                                'border-red-500': !!errors.password
                            })}
                            type="password"
                            placeholder="Password"
                        />
                        {errors.password?.type === 'required' && (
                            <span className="text-red-600 font-bold">* El Password es obligatorio</span>
                        )}
                        {errors.password?.type === 'minLength' && (
                            <span className="text-red-600 font-bold">* Password mínimo 6 caracteres</span>
                        )}
                    </div>

                    <div className="mt-8 content-center">
                        <label className="text-sm font-bold text-gray-700 tracking-wide">Repetir Password</label>
                        <input
                            {...register('confirmPassword', {
                                required: true,
                                validate: value => value === password || "Las contraseñas no coinciden"
                            })}
                            className={clsx("w-full content-center text-base py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500", {
                                'border-red-500': !!errors.confirmPassword
                            })}
                            type="password"
                            placeholder="Repetir Password"
                        />
                        {errors.confirmPassword && (
                            <span className="text-red-600 font-bold">{errors.confirmPassword.message}</span>
                        )}
                    </div>

                    <span className="text-red-600 font-bold">{errorMessage}</span>

                    <button type="submit" className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Crear cuenta
                    </button>

                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                        <span>¿Ya tienes una cuenta?</span>
                        <Link href="/auth/new-account" className="text-indigo-500 hover:underline cursor-pointer transition ease-in duration-300">Inicia sesión</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
