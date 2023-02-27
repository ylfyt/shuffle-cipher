import Input from './components/input';

function App() {
	return (
		<div className="App bg-slate-700 min-h-screen flex justify-center">
			<div className="w-3/4 lg:w-1/2">
				<main className="flex flex-col gap-5 mb-10">
					<Input />
				</main>
			</div>
		</div>
	);
}

export default App;
