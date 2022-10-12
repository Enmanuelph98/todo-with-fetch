import React, {useState} from "react";
const Home = () => {


	const [tasks, setTasks] = useState([])

	const [input, setInput] = useState("")

	const handleSubmit = (event) => {
		event.preventDefault()
		if (input != ""){
			let addTask = {
				id: Math.floor(Math.random() * 1000),
				text:input,
				completed: false
			}
			setTasks([...tasks, addTask])
			setInput("")
		}
	}

	const deleteTask = (id) => {
		let filteredTasks = tasks.filter( task => task.id !== id )
		setTasks(filteredTasks)
	}

	return (
		<div className="text-center">
			<h1 className="todo">Todos</h1>
			<div className="list-card">
				<form onSubmit={handleSubmit}>
					<input 
						type="text" 
						value={input}
						onChange={event => setInput(event.target.value)}
						className="input-box"
						placeholder="Anything in mind?"
					/>
				</form>
				<div className="list-items">
					{tasks.map((task) => (
						<div className="todo" key={task.id}>
							<p>{task.text}
								<button 
									className="button" 
									onClick={ () => deleteTask(task.id)}>
										&#10060;
								</button>
							</p>
						</div>
					  )
					)}
					<p className="counter">{ tasks.length > 0 ? '' : "Please add a to do" }</p>
				</div>
			</div>
		</div>
	);
};

export default Home;