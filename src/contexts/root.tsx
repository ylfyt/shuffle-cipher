import { createContext, FC, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ICryptoPayload } from '../interfaces/crypto-payload';
import { ICryptoResponse } from '../interfaces/crypto-response';

interface IRootContext {
	key: string;
	setKey: React.Dispatch<React.SetStateAction<string>>;
	isFromFile: boolean;
	setIsFromFile: React.Dispatch<React.SetStateAction<boolean>>;
	dataText: string;
	setDataText: React.Dispatch<React.SetStateAction<string>>;
	dataFile?: File;
	setDataFile: React.Dispatch<React.SetStateAction<File | undefined>>;
	output: Uint8Array;
	setOutput: React.Dispatch<React.SetStateAction<Uint8Array>>;
	runCrypto: (payload: ICryptoPayload) => Promise<ICryptoResponse>;
}

const RootContext = createContext<IRootContext>({
	key: '',
	setKey: () => {},
	isFromFile: false,
	setIsFromFile: () => {},
	dataText: '',
	setDataText: () => {},
	dataFile: undefined,
	setDataFile: () => {},
	output: new Uint8Array(),
	setOutput: () => {},
	runCrypto: () => {
		throw new Error('Not implemented yet');
	},
});

export const useRootContext = () => {
	return useContext(RootContext);
};

interface Props {
	children: ReactNode;
}
const RootProvider: FC<Props> = ({ children }) => {
	const [key, setKey] = useState('');
	const [isFromFile, setIsFromFile] = useState(false);
	const [dataText, setDataText] = useState('');
	const [dataFile, setDataFile] = useState<File>();
	const [output, setOutput] = useState<Uint8Array>(new Uint8Array());

	const resolvers: Map<number, (res: ICryptoResponse) => void> = useMemo(() => new Map(), []);
	let tmpResponse: ICryptoResponse | null = useMemo(() => null, []);

	const worker: Worker = useMemo(() => new Worker(new URL('../workers/crypto.ts', import.meta.url), { type: 'module' }), []);

	useEffect(() => {
		worker.onmessage = (e: MessageEvent<ICryptoResponse | Uint8Array>) => {
			const res = e.data;
			if (res instanceof Uint8Array) {
				console.log(`Get response data for ${tmpResponse!.id} with length: ${res.length}`);
				tmpResponse!.data = res;
				const resolve = resolvers.get(tmpResponse!.id)!;
				resolve(tmpResponse!);
				resolvers.delete(tmpResponse!.id);
				tmpResponse = null;
				return;
			}
			if (res.success) {
				tmpResponse = res;
				console.log(`New response ${res.id}, waiting for data...`);
				return;
			}

			console.log(`Get response ${res.id}`);
			const resolve = resolvers.get(res.id)!;
			resolve(res);
			resolvers.delete(res.id);
		};
	}, []);

	const runCrypto = (payload: ICryptoPayload): Promise<ICryptoResponse> => {
		return new Promise((resolve) => {
			const id = new Date().getTime();
			resolvers.set(id, resolve);

			const data = payload.data;
			// Send request information
			try {
				worker.postMessage({
					...payload,
					id,
				});
				// Send request data
				worker.postMessage(data, [data.buffer]);
			} catch (error) {
				console.log(error);
			}
		});
	};

	return <RootContext.Provider value={{ runCrypto, output, setOutput, setDataFile, dataFile, dataText, setDataText, key, setKey, isFromFile, setIsFromFile }}>{children}</RootContext.Provider>;
};

export default RootProvider;
