import { FC, useEffect, useState } from 'react';
import { useRootContext } from '../contexts/root';

interface OutputProps {}

const Output: FC<OutputProps> = () => {
	const { output } = useRootContext();
	const [text, setText] = useState('');

	useEffect(() => {
		// console.log(output);
	}, [output]);

	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<div className="text-xl font-semibold">Output</div>
				<div className="flex items-center gap-4">
					<button onClick={() => {}} className="bg-slate-600 px-4 py-1 rounded-2xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
						Download as File
					</button>
					<button onClick={() => {}} className="bg-slate-600 px-4 py-1 rounded-2xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
						Copy to Clipboard
					</button>
				</div>
			</div>
			<div className="border-slate-500 border-2 p-2 min-h-[50px] rounded-md break-words">{text}</div>
		</div>
	);
};

export default Output;
