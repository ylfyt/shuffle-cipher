import { FC, useEffect, useState } from 'react';
import { useRootContext } from '../contexts/root';

interface ActionProps {}

const Action: FC<ActionProps> = () => {
	const { isFromFile, dataText, dataFile, key, runCrypto, setOutput, setIsEncrypt } = useRootContext();

	const [isDisabled, setIsDisabled] = useState(false);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setIsDisabled(loading || key.length === 0 || key.length !== 16 || (!isFromFile ? dataText.length === 0 : !dataFile));
	}, [isFromFile, dataText, dataFile, key, loading]);

	const run = async (action: 'encrypt' | 'decrypt') => {
		setOutput(new Uint8Array(0));
		setIsEncrypt(action === 'encrypt');
		setLoading(true);
		setMessage('Loading...');
		const res = await runCrypto(action);
		setMessage('');
		setLoading(false);
		setMessage(res.message);

		if (!res.success) {
			return;
		}

		console.log(res);
		res.data && setOutput(res.data);
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
