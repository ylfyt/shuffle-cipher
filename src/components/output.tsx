import { FC, useEffect, useState } from 'react';
import { useRootContext } from '../contexts/root';
import { getFileNameInfo } from '../utils/get-filename-info';
import { bytesToStr } from '../utils/bytes-to-str';

interface OutputProps {}

const Output: FC<OutputProps> = () => {
	const { output, isEncrypt, isFromFile, dataFile } = useRootContext();
	const [text, setText] = useState('');
	const [isBinary, setIsBinary] = useState(false);

	useEffect(() => {
		if (output.length === 0) {
			setIsBinary(false);
			return;
		}

		for (const byte of output) {
			if (byte > 127) {
				setIsBinary(true);
				return;
			}
		}
		setIsBinary(false);
	}, [output]);

	useEffect(() => {
		if (output.length === 0) {
			setText('');
			return;
		}

		if (isBinary) {
			setText('Output is a binary file. Please download it!');
			return;
		}

		let strOutput = '';
		let i = 0;
		while (strOutput.length < 10000 && i < output.length) {
			strOutput += String.fromCharCode(output[i++]);
		}
		if (strOutput.length < output.length) {
			strOutput += '..........................................................';
		}
		setText(strOutput);
	}, [output, isBinary]);

	const downloadURL = function (data: string, fileName: string) {
		const a = document.createElement('a');
		a.href = data;
		a.download = fileName;
		document.body.appendChild(a);
		a.style.display = 'none';
		a.click();
		a.remove();
	};

	const download = () => {
		let filename = `suffle-aes-${!isEncrypt ? 'decrypted' : 'encrypted'}.txt`;
		if (isFromFile) {
			const fileInfo = getFileNameInfo(dataFile?.name ?? 'test.txt');
			filename = `${fileInfo.filename}-${!isEncrypt ? 'decrypted' : 'encrypted'}${fileInfo.extension}`;
		}
		const blob = new Blob([output as BlobPart], {});
		const url = window.URL.createObjectURL(blob);
		downloadURL(url, filename);
		setTimeout(function () {
			return window.URL.revokeObjectURL(url);
		}, 1000);
	};

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(bytesToStr(output))
			.then(() => {
				alert('Success');
			})
			.catch((e) => {
				console.log('err', e);
			});
	};

	return (
		<div>
			<div className="flex items-center justify-between mb-2">
				<div className="text-xl font-semibold">Output</div>
				<div className="flex items-center gap-4">
					<button
						disabled={output.length === 0}
						onClick={() => {
							download();
						}}
						className="bg-slate-600 px-4 py-1 rounded-2xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Download as File
					</button>
					<button
						disabled={output.length === 0}
						onClick={() => {
							copyToClipboard();
						}}
						className="bg-slate-600 px-4 py-1 rounded-2xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Copy to Clipboard
					</button>
				</div>
			</div>
			<div className={`border-slate-500 border-2 p-2 min-h-[50px] rounded-md break-words ${!isBinary ? '' : 'flex items-center justify-center'}`}>
				{!isBinary ? text : <div className="bg-slate-700 px-28 rounded-md text-center font-medium">Output is a binary file. Please download it!</div>}
			</div>
		</div>
	);
};

export default Output;
