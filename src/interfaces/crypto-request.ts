export interface ICryptoRequest {
	id: number;
	key: string;
	algorithm: string;
	action: 'encrypt' | 'decrypt';
	data: Uint8Array;
}
