import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	const [datosUsuarios, setDatosUsuarios] = useState({
		email: "",
		password: ""
	})

	const handleInputs = (e) => {
		const key = e.target.value.name;
		setDatosUsuarios(
			{
				...datosUsuarios,
				[key]: e.target.value
			});
	}

	const singup = async (e) => {
		e.preventDefault();
		if (!datosUsuarios.email || !datosUsuarios.password) {
			toast.error("Todos los datos son requeridos")
			return;
		}
		
		const backendUrl = import.meta.env.VITE_BACKEND_URL
		const response = await fetch(backendUrl + "/api/singup", {
			method: 'POST',
			headers: {
				"Content-Type": "appliaction/json"
			},
			body: JSON.stringify(datosUsuarios)
		});

		if (response.ok) {
			const data = await response.json();

			dispatch({
				type: 'set_singup',
				payload: datosUsuarios
			});

			localStorage.setItem('nuevoUsuarioName', datosUsuarios.name);

			toast.success('Registro exitoso. Ahora puedes iniciar sesión.')
			navigate('/login')
		} else {
			const error = await response.json();
			toast.error(error.error || 'Error en el registro')
		}
		

	}

	return (
		<div className="text-center mt-5">
			<h1 className="display-4">Hello Rigo!!</h1>
			<p className="lead">
				<img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
			</p>
			<div className="alert alert-info">
				{store.message ? (
					<span>{store.message}</span>
				) : (
					<span className="text-danger">
						Loading message from the backend (make sure your python 🐍 backend is running)...
					</span>
				)}
			</div>
		</div>
	);
}; 