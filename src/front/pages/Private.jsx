import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';

export const Private = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userEmail = localStorage.getItem('email')

    useEffect(() => {
        if (!token) {
            toast.error('Debes iniciar sesión para acceder');
            navigate('/login');
        }
    }, [token, navigate]);

    return (
        <div
            className="d-flex justify-content-center"
            style={{
                backgroundColor: '#204556',
                margin: 0,
                padding: "150px",
                minHeight: '100vh',
            }}
        >
            <div className="card text-center border-1 rounded-4 p-5">
                <h1>🔐 </h1>
                <h1>Área Privada</h1>
                <h4 className="mt-5">Bienvenido: </h4>
                <p className="mt-4"><strong>{userEmail}</strong></p>
                <p>Tu token de acceso es válido ✅</p>

                <button
                    className="btn btn-outline-secondary w-100 mt-5"
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('email');
                        toast.success('Sesión cerrada');
                        navigate('/login');
                    }}
                    style={{ padding: '10px 20px', marginTop: '20px' }}
                >
                    Cerrar Sesión
                </button>
            </div>

        </div>
    )
}