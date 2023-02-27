import { useEffect } from 'react';
import Action from './components/action';
import Input from './components/input';
import Key from './components/key';
import Output from './components/output';

function App() {
	useEffect(() => {
		document.body.classList.add('bg-slate-800');
	}, []);

	return (
		<div className="App min-h-screen flex justify-center text-white">
			<div className="w-3/4 lg:w-1/2">
				<main className="flex flex-col gap-5 mb-10">
					<h1 className="text-3xl text-center mt-5">Block Cipher</h1>
					<Key />
					<Input />
					<Action />
					<Output />
				</main>
			</div>
		</div>
	);
}

export default App;
