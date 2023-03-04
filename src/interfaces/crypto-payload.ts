export interface ICryptoPayload {
	key: string;
	data: Uint8Array;
	action: 'encrypt' | 'decrypt';
}
