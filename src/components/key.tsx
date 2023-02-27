import { FC } from 'react';

interface KeyProps {}

const Key: FC<KeyProps> = () => {
	return (
		<div className="flex flex-col gap-2">
			<label className='text-xl font-semibold'>Secret Key</label>
			<input className="focus:outline-none focus:outline-slate-500 p-2 rounded-md bg-slate-700 font-semibold" placeholder="Key ..." type="text" />
		</div>
	);
};

export default Key;
