import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AtuhAPI";
import { toast } from "react-toastify";

export default function LoginView() {
  const navigate = useNavigate()
  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onSuccess: () => {
      navigate('/')
    },
    onError: (error) => {
      toast.error(error.message)
    }

  })


  const handleLogin = (formData: UserLoginForm) => mutate(formData)


  return (
    <>
      <h1 className="text-3xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-xl font-light text-white mt-3">
        Llena el formulario para {''}
        <span className=" text-fuchsia-500 font-bold"> acceder</span>
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-4 p-10 bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
          >Password</label>

          <input
            type="password"
            placeholder="Password de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav>
        <Link to={'/auth/register'} className="block text-center mt-5 text-gray-100">
          ¿No tienes cuenta? Crear cuenta
        </Link>
        <Link to={'/auth/forgot-password'} className="block text-center mt-5 text-gray-100">
          ¿olvidaste tu contraseña? Restablecer
        </Link>
      </nav>
    </>
  )
}