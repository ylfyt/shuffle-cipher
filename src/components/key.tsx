import { FC } from 'react';

interface KeyProps {}

const Key: FC<KeyProps> = () => {
	return (
		<div className="flex flex-col gap-2">
			<label>Secret Key</label>
			<input className="p-2 rounded-md" placeholder="Key..." type="text" />
		</div>
	);
};

export default Key;
