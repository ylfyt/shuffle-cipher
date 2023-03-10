export interface ICryptoRequest {
	id: number;
	key: string;
	action: 'encrypt' | 'decrypt';
	text: string;
	file?: File;
}
