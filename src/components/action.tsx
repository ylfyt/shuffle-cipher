import { FC, useEffect, useState } from 'react';
import { useRootContext } from '../contexts/root';

interface ActionProps {}

const Action: FC<ActionProps> = () => {
	const { isFromFile, dataText, dataFile, key } = useRootContext();

	const [isDisabled, setIsDisabled] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		setIsDisabled(key.length === 0 || (!isFromFile ? dataText.length === 0 : !dataFile));
	}, [isFromFile, dataText, dataFile, key]);

	const run = (action: 'encrypt' | 'decrypt') => {
		console.log(action);
	};

	return (
		<div className="flex gap-4 px-4 py-2 border-2 border-slate-500 rounded-md items-center">
			<button
				disabled={isDisabled}
				onClick={() => run('encrypt')}
				className={`disabled:cursor-not-allowed p-2 bg-slate-600 hover:bg-slate-500 font-medium disabled:hover:bg-slate-600 shadow-md rounded-md ${isDisabled ? 'opacity-50' : ''}
    `}
			>
				Encrypt
			</button>
			<button
				disabled={isDisabled}
				onClick={() => run('decrypt')}
				className={`disabled:cursor-not-allowed p-2 bg-slate-600 hover:bg-slate-500 font-medium disabled:hover:bg-slate-600 shadow-md rounded-md ${isDisabled ? 'opacity-50' : ''}
    `}
			>
				Decrypt
			</button>
			<div className="font-semibold">{message}</div>
		</div>
	);
};

export default Action;
