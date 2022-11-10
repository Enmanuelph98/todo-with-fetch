import React, {useState,useEffect} from "react";
const Home = () => {


	const [tasks, setTasks] = useState([])

	const [input, setInput] = useState("")
	const backendUrl= "https://assets.breatheco.de/apis/fake/todos/user/enmanuelph98"
	const getCurrentList = ()=> {
		fetch (backendUrl)
		.then (resp=> resp.json() )
		.then (data => setTasks(data))}

	useEffect(() => {
			getCurrentList()
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault()
		if (input != ""){
			let newTask = {
				label:input,
				done: false
			}

			let newList = [...tasks, newTask]
			setTasks(newList)
			setInput("")

			fetch(backendUrl,{
				method:"PUT",
				headers: {"Content-type":"application/json"},
				body: JSON.stringify(newList)
			}).then (resp=>console.log(resp.ok))
			.catch(error=> console.log("this an error from the backend",error))
		}
	}

	const deleteTask = (index) => {
		let filteredTasks = tasks.filter( (task,idx) => index !== idx)
		setTasks(filteredTasks)

		fetch(backendUrl,{
			method:"PUT",
			headers: {"Content-type":"application/json"},
			body: JSON.stringify(filteredTasks)
		}).then (resp=>console.log(resp.ok))
		.catch(error=> console.log("this an error from the backend",error))
	}

	return (
		<div className="text-center">
			<h1 className=''>Todos</h1>
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
					{tasks.map((task,index) => (
						<div className="todo navbar mx-auto" key={task.id}>
							{task.label}
						
								<i class="fa-solid fa-trash-can" onClick={ () => deleteTask(index)}></i>	
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