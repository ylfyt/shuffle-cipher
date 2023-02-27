import { FC, useState } from 'react';

interface OutputProps {}

const Output: FC<OutputProps> = () => {
	const [isBinary, setIsBinary] = useState(true);

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
			{isBinary ? (
				<div className="border-2 border-slate-500 p-2 min-h-[50px] rounded-md flex items-center">
					<div className="bg-slate-600 rounded-md text-center w-3/4 mx-auto">Output is a binary file. Please download it!</div>
				</div>
			) : (
				<div className="border-2 p-2 min-h-[50px] rounded-md break-words">Test</div>
			)}
		</div>
	);
};

export default Output;
