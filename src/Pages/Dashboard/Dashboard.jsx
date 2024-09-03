import React, { useState } from 'react'
import Button from '../../Components/Button/Button'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const token = localStorage.getItem('token') ;

    const handleSubmit = async (e) => {

        setIsLoading(true)

        const response = await axios.get(
            "http://127.0.0.1:8000/api/v1.0.0/logout",
            {headers: {'Authorization': 'Bearer ' + token }}
        );
        

        if (response.data.success) {
            navigate("/");
            setIsLoading(false)
        } else {
            toast.error(response.data.message);
            setIsLoading(false)
        }
    }

    return (
        <div>
            <ToastContainer />
            <h1>Dashboard</h1>
            <Button text={isLoading ? "Chargement ..." : "Se déconnecter"} onClick={handleSubmit} />
        </div>
    )
}
