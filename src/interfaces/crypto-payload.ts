export interface ICryptoPayload {
	key: string;
	algorithm: string;
	data: Uint8Array;
	action: 'encrypt' | 'decrypt';
}
