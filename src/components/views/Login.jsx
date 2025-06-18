import Input from "../Input"
import Button from "../Button"
import { useState } from "react"
import { useAuth } from "../../context/Auth"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const { login, error} = useAuth()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await login(username, password)
    success && navigate("/home")
    
}

  return (
    <div className="flex flex-col w-screen h-screen items-center bg-teal-50">
      <form onSubmit={handleSubmit} className="flex flex-col items-center bg-teal-100 border-3 border-teal-200 p-3 m-3 rounded-xl">
        <Input type="text" label="Username" value={username} onChange={handleUsernameChange} />
        <Input type="password" label="Password" value={password} onChange={handlePasswordChange} />
        <Button type="submit">Submit</Button>
      </form>
      {error && <p className="m-3 p-3 rounded bg-red-200 border-3 border-red-300">{error}</p>}
    </div>
  )
}

export default Login
