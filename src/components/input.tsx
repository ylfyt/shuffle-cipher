import { FC, useState } from 'react';

interface InputProps {}

const Input: FC<InputProps> = () => {
	const [isFromFile, setIsFromFile] = useState(false);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex rounded h-[40px]">
				<button
					className={`w-full shadow-md rounded-l-lg ${!isFromFile ? 'bg-gray-600' : 'bg-gray-300'}`}
					onClick={() => {
						setIsFromFile(false);
					}}
				>
					Text
				</button>
				<button
					className={`rounded-r-lg shadow-md w-full ${isFromFile ? 'bg-gray-600' : 'bg-gray-300'}`}
					onClick={() => {
						setIsFromFile(true);
					}}
				>
					File
				</button>
			</div>
			<div className="flex flex-col gap-4">
				{!isFromFile ? (
					<textarea className="w-full p-2 rounded-md" rows={8} placeholder="text" />
				) : (
					<input className="bg-white file:rounded-md file:bg-gray-300 hover:file:bg-gray-400 w-full p-2 rounded-md" type="file" />
				)}
			</div>
		</div>
	);
};

export default Input;
