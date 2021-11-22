import TodoList from "./components";

const App = () => {

	return (
		<div
			style={{
				margin: '30px 200px'
			}}
		>
			<h1>Todo List Demo App</h1>
			<p>Do it now</p>

			<TodoList/>
		</div>
	)
}

export default App