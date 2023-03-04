import { useEffect } from 'react';
import Action from './components/action';
import Input from './components/input';
import Key from './components/key';
import Output from './components/output';
import { useRootContext } from './contexts/root';

function App() {
	useEffect(() => {
		document.body.classList.add('bg-slate-800');
	}, []);

	const { runCrypto } = useRootContext();
	useEffect(() => {
		setTimeout(() => {
			runCrypto({
				action: 'encrypt',
				algorithm: 'sda',
				data: new Uint8Array(),
				key: 'blabla',
			})
				.then((res) => {
					console.log('res', res);
				})
				.catch((err) => {
					console.log(err);
				});
		}, 2000);
	}, []);

	return (
		<div className="App min-h-screen flex justify-center text-slate-300">
			<div className="w-3/4 lg:w-2/5">
				<main className="flex flex-col gap-6 mb-10">
					<h1 className="text-3xl text-center mt-5 font-semibold">Block Cipher</h1>
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
