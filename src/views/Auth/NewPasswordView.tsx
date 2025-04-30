import NewPasswordToken from "@/components/auth/NewPasswordToken"
import NewPasswordForm from "@/components/auth/NewPasswordForm"

import { useState } from "react"

export default function NewPasswordView() {
  const [isValidToken, setIsValidToken] = useState(false)

  return (
    <>
      <h1 className="text-3xl font-black text-white">Actualizar contraseña</h1>
      <p className="text-xl font-light text-white mt-3">
        Ingresa el token que recibiste en tu  {''}
        <span className=" text-fuchsia-500 font-bold"> Email</span>
      </p>
    {!isValidToken ? <NewPasswordToken/> : <NewPasswordForm/>}
    </>
  )
}
