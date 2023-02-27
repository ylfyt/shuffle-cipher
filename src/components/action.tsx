import { FC, useState } from 'react';

interface ActionProps {}

const Action: FC<ActionProps> = () => {
	const [isDisabled, setIsDisabled] = useState(true);
	const [message, setMessage] = useState('');

	const run = () => {};

	return (
		<div className="flex gap-4 px-4 py-2 border-2 rounded-md items-center">
			<button
				disabled={isDisabled}
				onClick={run}
				className={`disabled:cursor-not-allowed p-2 bg-gray-400 hover:bg-gray-500 disabled:hover:bg-gray-400 shadow-md rounded-md text-black
      ${isDisabled ? 'opacity-50' : ''}
    `}
			>
				RUN
			</button>
			<div className="text-lg">{message}</div>
		</div>
	);
};

export default Action;
