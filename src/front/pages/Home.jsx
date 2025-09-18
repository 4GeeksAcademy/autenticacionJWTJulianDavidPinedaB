import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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

		console.log("=== DEBUG ===");
        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);
        console.log("Data recibida:", data);
        console.log("data.message:", data.message);


			if (response.ok) {

				 console.log("Entrando en bloque de éxito");

				dispatch({
					type: 'set_singup',
					payload: datosUsuarios
				});

				localStorage.setItem('nuevoUsuarioEmail', datosUsuarios.email);

				 const successMessage = data.mensaje || 'Registro exitoso. Ahora puedes iniciar sesión.';
            console.log("Mensaje a mostrar:", successMessage);
            
            // Probar toast directamente
            toast.success(successMessage);
            
            // También probar con un mensaje simple para descartar problemas
            console.log("Toast llamado");

				// toast.success(data.message || 'Registro exitoso. Ahora puedes iniciar sesión.')
				setDatosUsuarios({email: "", password: ""})
				

				setTimeout(() => {
                navigate('/login');
            }, 1000);

			} else {
				
				console.log("Entrando en bloque de error");
            console.log("data.error:", data.error);
			const errorMessage = data.error || data.msg || 'Error en el registro';
				toast.error(errorMessage)
			}
		} catch(fetcherror){
			 console.error("Error de conexión:", fetchError);
			console.error("Error de conexión:", fetcherror);
			toast.error("Error de conexión. Verifica tu internet y vuelve a intentar")
		}

	} 

	return (
		<div className="d-flex justify-content-center" 
		style={{
        backgroundColor: 'black',
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
						placeholder="email@email.com"
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
				<div className="mb-3 form-check">
					<input type="checkbox" className="form-check-input" id="exampleCheck1"/>
						<label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
				</div>
				<button 
					type="submit" 
					className="btn btn-outline-secondary w-100"
					onClick={singup}
				>
					SingUpMyFriend
					</button>
			</form>
		</div>
	);
}; 