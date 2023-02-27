import { FC } from 'react';
import { useRootContext } from '../contexts/root';

interface KeyProps {}

const Key: FC<KeyProps> = () => {
	const { key, setKey } = useRootContext();

	return (
		<div className="flex flex-col gap-2">
			<label className="text-xl font-semibold">Secret Key</label>
			<input
				value={key}
				onChange={(e) => {
					if (e.target.value.length > 16) return;
					setKey(e.target.value);
				}}
				className="focus:outline-none focus:outline-slate-500 p-2 rounded-md bg-slate-700 font-semibold"
				placeholder="Key ..."
				type="text"
			/>
		</div>
	);
};

export default Key;
