import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../Components/Input/Input'
import Button from '../../Components/Button/Button'
import Alert from '../../Components/Alert/Alert'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios, { formToJSON } from 'axios'


export default function Registration() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setpasswordConfirm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault()

        localStorage.setItem("email", email)

        /* Insertion dans la base de données */

        const url = 'http://127.0.0.1:8000'

        const formData = new FormData();
        formData.set("name", name)
        formData.set("email", email)
        formData.set("password", password)
        formData.set("password_confirm", passwordConfirm)

        const form = formToJSON(formData)


        const response = await axios.post(`${url}/api/v1.0.0/registration`, form)

        if (response.data.success) {

            const authToken = response.data.data[0].token

            localStorage.setItem('token', authToken)
            
            setTimeout(function () {
                navigate("/dashboard")
            }, 3000);

            toast.success(response.data.message)

            setTimeout(function () {
                navigate("/otp-code/" + email)
            }, 3000);

            setIsLoading(false)

        } else {

            if (response.data.data.name !== undefined) {
                toast.error(response.data.data.name[0])

            } else if (response.data.data.email !== undefined) {
                toast.error(response.data.data.email[0])

            } else if (response.data.data.password !== undefined) {
                toast.error(response.data.data.password[0])

            } else if (response.data.data.password_confirm !== undefined) {
                toast.error(response.data.data.password_confirm[0])
            }

            setIsLoading(false)

        }

        /* Fin de l'insertion dans la base de données */


    }



    return (
        <div>
            <ToastContainer stacked />

            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <p>Renseignez le formulaire suivant pour vous inscrire</p>
                <Input
                    label={'Nom complet'}
                    reference={'name'}
                    type={'text'}
                    value={name}
                    name={'name'}
                    placeHolder={'Saisir votre nom ici... '}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
                <Input
                    label={'Email'}
                    reference={'email'}
                    type={'email'}
                    value={email}
                    name={'email'}
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
                    name={'password'}
                    placeHolder={'Saisir votre mot de passe ici... '}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                />
                <Input
                    label={'Confirmer le Mot de passe'}
                    reference={'passwordConfirm'}
                    type={'password'}
                    value={passwordConfirm}
                    name={'password_confirm'}
                    placeHolder={'Confirmer  votre mot de passe ici... '}
                    onChange={(e) => {
                        setpasswordConfirm(e.target.value)
                    }}
                />
                <br />
                <div>
                    <Button disabled={isLoading} type={'submit'} text={isLoading ? "Chargement" : 'Soumettre'} /><br />
                    <Button type={'reset'} text={'Annuler'} />
                </div>
                <div>
                    <Link to={'/'}>Connexion</Link>
                </div>
            </form>
        </div>
    )
}
