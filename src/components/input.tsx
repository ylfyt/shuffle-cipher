import { FC, useState } from 'react';

interface InputProps {}

const Input: FC<InputProps> = () => {
	const [isFromFile, setIsFromFile] = useState(false);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex rounded h-[40px]">
				<button
					className={`w-full shadow-md rounded-l-lg ${!isFromFile ? 'bg-slate-700' : 'bg-slate-500 text-slate-900'}`}
					onClick={() => {
						setIsFromFile(false);
					}}
				>
					Text
				</button>
				<button
					className={`rounded-r-lg shadow-md w-full ${isFromFile ? 'bg-slate-700' : 'bg-slate-500 text-slate-900'}`}
					onClick={() => {
						setIsFromFile(true);
					}}
				>
					File
				</button>
			</div>
			<div className="flex flex-col gap-4">
				{!isFromFile ? (
					<textarea className="focus:outline-none focus:outline-slate-500 bg-slate-700 w-full p-2 rounded-md" rows={8} placeholder="Text ..." />
				) : (
					<input className="bg-slate-700 file:rounded-md file:bg-slate-500 file:text-slate-900 hover:file:bg-slate-400 w-full p-2 rounded-md" type="file" />
				)}
			</div>
		</div>
	);
};

export default Input;
