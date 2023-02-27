import { FC, useState } from 'react';

interface ActionProps {}

const Action: FC<ActionProps> = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [message, setMessage] = useState('');

	const run = () => {};

	return (
		<div className="flex gap-4 px-4 py-2 border-2 border-slate-500 rounded-md items-center">
			<button
				disabled={isDisabled}
				onClick={run}
				className={`disabled:cursor-not-allowed p-2 bg-slate-600 hover:bg-slate-500 font-semibold disabled:hover:bg-slate-600 shadow-md rounded-md ${isDisabled ? 'opacity-50' : ''}
    `}
			>
				Encrypt
			</button>
			<button
				disabled={isDisabled}
				onClick={run}
				className={`disabled:cursor-not-allowed p-2 bg-slate-600 hover:bg-slate-500 font-semibold disabled:hover:bg-slate-600 shadow-md rounded-md ${isDisabled ? 'opacity-50' : ''}
    `}
			>
				Decrypt
			</button>
			<div className="font-semibold">{message}</div>
		</div>
	);
};

export default Action;
