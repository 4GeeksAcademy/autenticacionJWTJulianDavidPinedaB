

export const Loging = () => {


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
						// value={datosUsuarios.email}
						// onChange={handleInputs}
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
						// value={datosUsuarios.password}
						// onChange={handleInputs}
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
					// onClick={singup}
				>
					SingUpMyFriend
					</button>
			</form>
		</div>
	);
}