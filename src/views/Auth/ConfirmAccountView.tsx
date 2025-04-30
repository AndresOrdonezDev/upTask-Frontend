import { useState } from "react";
import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { useMutation } from "@tanstack/react-query"
import {toast} from "react-toastify"
import { ConfirmToken } from "@/types/index";
import { confirmAccount } from "@/api/AtuhAPI";

export default function ConfirmAccountView() {

    const [token, setToken] = useState<ConfirmToken['token']>('')

    const {mutate} = useMutation({
        mutationFn:confirmAccount,
        onSuccess: (data) => {
            toast.success(data)
            setToken('')
            setTimeout(() => {
                window.location.href = '/auth/login'
            }, 3000)
        },
        onError: (error) => {
           toast.error(error.message)
        }
    })

    const handleComplete = (token:ConfirmToken['token']) => mutate({token})

  return (
    <>
      <h1 className="text-3xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-400 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-5 p-5 bg-white mt-10"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
            <PinInput value={token} onChange={(value) => setToken(value)} autoFocus onComplete={handleComplete}>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-500 border placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-500 border placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-500 border placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-500 border placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-500 border placeholder-white"/>
                <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-500 border placeholder-white"/>
                
            </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/new-code'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}