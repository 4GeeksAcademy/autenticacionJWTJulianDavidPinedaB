import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export const Home = () => {

	const { dispatch } = useGlobalReducer()
	const navigate = useNavigate();

	const [datosUsuarios, setDatosUsuarios] = useState({
		email: "",
		password: ""
	})

	const handleInputs = (e) => {
		const key = e.target.id;
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

		try {
			const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(datosUsuarios)
			});		
			const data = await response.json();


			if (response.ok) {

				dispatch({
					type: 'set_singup',
					payload: datosUsuarios
				});

				localStorage.setItem('nuevoUsuarioEmail', datosUsuarios.email);

				 const successMessage = data.mensaje || 'Registro exitoso. Ahora puedes iniciar sesión.';
            
            
           
            toast.success(successMessage);
			setDatosUsuarios({email: "", password: ""})
				

				setTimeout(() => {
                navigate('/login');
            }, 1000);

			} else {
			const errorMessage = data.error || data.msg || 'Error en el registro';
				toast.error(errorMessage)
			}
		} catch(fetcherror){
			toast.error("Error de conexión. Verifica tu internet y vuelve a intentar")
		}

	} 

	return (
		<div className="d-flex justify-content-center" 
		style={{
        backgroundColor: '#204556',
        margin: 0,
        padding: "150px",
        minHeight: '100vh'
      }}>
			<form className="text-white border rounded-4 p-5">
				<h2 className="text-center">SingUp my friend</h2>
				<div className="mb-3 mt-5">
					<label htmlFor="email" className="form-label">Email address</label>
					<input 
						type="email" 
						className="form-control" 
						placeholder="jwt@email.com"
						id="email" 
						aria-describedby="emailHelp"
						value={datosUsuarios.email}
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
						value={datosUsuarios.password}
						onChange={handleInputs}
						required
					/>
				</div>
				<button 
					type="submit" 
					className="btn btn-light w-100 mt-5"
					onClick={singup}
				>
					SingUpMyFriend
					</button>
				<Link to="/login">
					<button 
						type="submit" 
						className="btn btn-outline-secondary w-75 mt-5 mx-auto" 
						id="exampleCheck1"
					>
						¿Ya tienes cuenta ? 
					</button>
				</Link>
			</form>
		</div>
	);
}; 