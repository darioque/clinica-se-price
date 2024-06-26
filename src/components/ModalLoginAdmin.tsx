import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";
import { AuthContext } from "../context/AuthContext";

// Modal para el login de administradores
const AdminLoginModal = ({ isOpen, onClose }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const handleLogin = async () => {
		// Traemos el usuario con el username y password ingresados
		const { data, error } = await supabase
			.from("users")
			.select("user_id")
			.eq("username", username)
			.eq("password", password)
			.eq("role", "admin")
			.maybeSingle();

		if (error || !data) {
			setError(true);
		} else {
			// Si el usuario existe, lo logueamos y redirigimos al dashboard
			login(data.user_id);
			navigate("/dashboard", { state: { isAdmin: true }, replace: true });
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded shadow-md w-96">
				<h2 className="text-xl font-bold text-black mb-4">
					Admin Login
				</h2>
				<div className="mb-4">
					<p className="text-base text-black mb-4">
						Por favor, ingrese su nombre de usuario y contraseña.
					</p>
					<label className="block text-gray-700 font-semibold">
						Usuario
					</label>
					<input
						type="text"
						className={` text-black mt-1 block w-full px-3 py-2 border ${
							error ? "border-red-500" : "border-gray-300"
						} rounded-md`}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-semibold">
						Contraseña
					</label>
					<input
						type="password"
						className={`text-black mt-1 block w-full px-3 py-2 border ${
							error ? "border-red-500" : "border-gray-300"
						} rounded-md`}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				{error && (
					<span className="text-red-500">
						Credenciales incorrectas
					</span>
				)}
				<div className="flex justify-end mt-4">
					<button
						onClick={handleLogin}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Ingresar
					</button>

					<button
						onClick={() => {
							setUsername("");
							setPassword("");
							onClose();
						}}
						className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
					>
						Cancelar
					</button>
				</div>
			</div>
		</div>
	);
};

export default AdminLoginModal;
