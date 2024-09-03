import React, { useState } from 'react'
import './App.css'
import Button from './Components/Button/Button'
import Input from './Components/Input/Input'
import { Link, useNavigate } from 'react-router-dom'
import axios, { formToJSON } from 'axios'
import { toast, ToastContainer } from 'react-toastify'



export default function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)

    const url = 'http://127.0.0.1:8000'

    const formData = new FormData();
    formData.set("email", email)
    formData.set("password", password)

    const form = formToJSON(formData)

    const response = await axios.post(`${url}/api/v1.0.0/login`, formData)

    if (response.data.success) {

      toast.success(response.data)
      setIsLoading(false)

      const authToken = response.data.data[0].token

      localStorage.setItem('token', authToken)      
      setTimeout(function () {
        navigate("/dashboard")
      }, 3000);

    } else {
      toast.error("Identifiants invalides")
      setIsLoading(false)

    }

  }


  return (

    <div id='container'>
      <ToastContainer />
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <p>Renseignez vos informations de connexion pour vous connecter</p>
        <Input
          label={'Email'}
          reference={'email'}
          type={'email'}
          value={email}
          placeHolder={'Saisir l\'adresse e-mail ici... '}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <Input
          label={'Mot de passe'}
          reference={'password'}
          type={'password'}
          value={password}
          placeHolder={'Saisir votre mot de passe ici... '}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <br />
        <div>
          <Button disabled={isLoading} type={'submit'} text={isLoading ? "Chargement" : 'Soumettre'} /><br />
          <Button type={'reset'} text={'Annuler'} />
        </div>
        <div>
          <Link to={'/registration'}>Inscription</Link>
        </div>
      </form>
    </div>

  )
}
