import { createContext, FC, ReactNode, useContext, useState } from 'react';

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

	return <RootContext.Provider value={{ output, setOutput, setDataFile, dataFile, dataText, setDataText, key, setKey, isFromFile, setIsFromFile }}>{children}</RootContext.Provider>;
};

export default RootProvider;
