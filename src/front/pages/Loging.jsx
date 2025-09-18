import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Loging = () => {

    const navigate = useNavigate();
    const [credenciales, setCredenciales] = useState({});

    const { dispatch } = useGlobalReducer();

    const handleInputs = (e) => {
        const key = e.target.id;

        setCredenciales({
            ...credenciales,
            [key]: e.target.value
        });
    }

    const autoriar = async (e) => {
        e.preventDefault();

        if (!credenciales.email || !credenciales.password){
            toast.error('Por favor complete todos los campos.');
            return;
        }
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(credenciales)
        })
        if(response.ok){
            const data = await response.json();

            dispatch({
                type: 'set_profile',
                payload:{ 
                    token: data.access_token,
                }  
            })

            localStorage.setItem('token', data.access_token);
            localStorage.setItem('email', credenciales.email);

            toast.success('!Bienvenido¡, Acceso concedido ')
            navigate('/private')

            return data;
        } else {
            if(response.status === 401){
                toast.error("Credenciales incorrectas: Verifique su usuario y contraseña")
            }
        }

    }


    return(
       <div className="d-flex justify-content-center" 
		style={{
        backgroundColor: '#204556',
        margin: 0,
        padding: "150px",
        minHeight: '100vh'
      }}>
			<form className=" card text-black border rounded-4 p-5">
				<h2 className="text-center">Loging my friend</h2>
				<div className="mb-3 mt-5">
					<label htmlFor="email" className="form-label">Email address</label>
					<input 
						type="email" 
						className="form-control" 
						placeholder="email@email.com"
						id="email" 
						aria-describedby="emailHelp"
						onChange={handleInputs}
						required
					/>
						<div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input 
						type="password" 
						className="form-control" 
						id="password"
						onChange={handleInputs}
						required
					/>
				</div>
				<button 
					type="submit" 
					className="btn btn-outline-secondary w-100 mt-5"
					onClick={autoriar}
				>
					LoginMyFriend
					</button>
			</form>
		</div>
	);
}