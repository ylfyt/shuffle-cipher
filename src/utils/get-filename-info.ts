export const getFileNameInfo = (
	filename: string
): {
	filename: string;
	extension: string;
} => {
	const data = filename.split('.');
	if (data.length < 2)
		return {
			filename: data[0] ?? '',
			extension: '',
		};

	const ext = data.pop();
	return {
		extension: '.' + ext,
		filename: data.join('.'),
	};
};
