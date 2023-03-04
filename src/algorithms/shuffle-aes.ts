import { number } from 'prop-types';
import { strToBytes } from '../utils/str-to-bytes';

const hexDigitToNumber = (digit: string): number | undefined => {
	digit = digit[0].toLowerCase();

	const num = parseInt(digit);
	if (!isNaN(num)) {
		return num;
	}

	if (digit == 'a') return 10;
	if (digit == 'b') return 11;
	if (digit == 'c') return 12;
	if (digit == 'd') return 13;
	if (digit == 'e') return 14;
	if (digit == 'f') return 15;
};

const sBox = [
	['63', '7C', '77', '7B', 'F2', '6B', '6F', 'C5', '30', '01', '67', '2B', 'FE', 'D7', 'AB', '76'],
	['CA', '82', 'C9', '7D', 'FA', '59', '47', 'F0', 'AD', 'D4', 'A2', 'AF', '9C', 'A4', '72', 'C0'],
	['B7', 'FD', '93', '26', '36', '3F', 'F7', 'CC', '34', 'A5', 'E5', 'F1', '71', 'D8', '31', '15'],
	['04', 'C7', '23', 'C3', '18', '96', '05', '9A', '07', '12', '80', 'E2', 'EB', '27', 'B2', '75'],
	['09', '83', '2C', '1A', '1B', '6E', '5A', 'A0', '52', '3B', 'D6', 'B3', '29', 'E3', '2F', '84'],
	['53', 'D1', '00', 'ED', '20', 'FC', 'B1', '5B', '6A', 'CB', 'BE', '39', '4A', '4C', '58', 'CF'],
	['D0', 'EF', 'AA', 'FB', '43', '4D', '33', '85', '45', 'F9', '02', '7F', '50', '3C', '9F', 'A8'],
	['51', 'A3', '40', '8F', '92', '9D', '38', 'F5', 'BC', 'B6', 'DA', '21', '10', 'FF', 'F3', 'D2'],
	['CD', '0C', '13', 'EC', '5F', '97', '44', '17', 'C4', 'A7', '7E', '3D', '64', '5D', '19', '73'],
	['60', '81', '4F', 'DC', '22', '2A', '90', '88', '46', 'EE', 'B8', '14', 'DE', '5E', '0B', 'DB'],
	['E0', '32', '3A', '0A', '49', '06', '24', '5C', 'C2', 'D3', 'AC', '62', '91', '95', 'E4', '79'],
	['E7', 'C8', '37', '6D', '8D', 'D5', '4E', 'A9', '6C', '56', 'F4', 'EA', '65', '7A', 'AE', '08'],
	['BA', '78', '25', '2E', '1C', 'A6', 'B4', 'C6', 'E8', 'DD', '74', '1F', '4B', 'BD', '8B', '8A'],
	['70', '3E', 'B5', '66', '48', '03', 'F6', '0E', '61', '35', '57', 'B9', '86', 'C1', '1D', '9E'],
	['E1', 'F8', '98', '11', '69', 'D9', '8E', '94', '9B', '1E', '87', 'E9', 'CE', '55', '28', 'DF'],
	['8C', 'A1', '89', '0D', 'BF', 'E6', '42', '68', '41', '99', '2D', '0F', 'B0', '54', 'BB', '16'],
];

const invSBox = [
	['52', '09', '6a', 'd5', '30', '36', 'a5', '38', 'bf', '40', 'a3', '9e', '81', 'f3', 'd7', 'fb'],
	['7c', 'e3', '39', '82', '9b', '2f', 'ff', '87', '34', '8e', '43', '44', 'c4', 'de', 'e9', 'cb'],
	['54', '7b', '94', '32', 'a6', 'c2', '23', '3d', 'ee', '4c', '95', '0b', '42', 'fa', 'c3', '4e'],
	['08', '2e', 'a1', '66', '28', 'd9', '24', 'b2', '76', '5b', 'a2', '49', '6d', '8b', 'd1', '25'],
	['72', 'f8', 'f6', '64', '86', '68', '98', '16', 'd4', 'a4', '5c', 'cc', '5d', '65', 'b6', '92'],
	['6c', '70', '48', '50', 'fd', 'ed', 'b9', 'da', '5e', '15', '46', '57', 'a7', '8d', '9d', '84'],
	['90', 'd8', 'ab', '00', '8c', 'bc', 'd3', '0a', 'f7', 'e4', '58', '05', 'b8', 'b3', '45', '06'],
	['d0', '2c', '1e', '8f', 'ca', '3f', '0f', '02', 'c1', 'af', 'bd', '03', '01', '13', '8a', '6b'],
	['3a', '91', '11', '41', '4f', '67', 'dc', 'ea', '97', 'f2', 'cf', 'ce', 'f0', 'b4', 'e6', '73'],
	['96', 'ac', '74', '22', 'e7', 'ad', '35', '85', 'e2', 'f9', '37', 'e8', '1c', '75', 'df', '6e'],
	['47', 'f1', '1a', '71', '1d', '29', 'c5', '89', '6f', 'b7', '62', '0e', 'aa', '18', 'be', '1b'],
	['fc', '56', '3e', '4b', 'c6', 'd2', '79', '20', '9a', 'db', 'c0', 'fe', '78', 'cd', '5a', 'f4'],
	['1f', 'dd', 'a8', '33', '88', '07', 'c7', '31', 'b1', '12', '10', '59', '27', '80', 'ec', '5f'],
	['60', '51', '7f', 'a9', '19', 'b5', '4a', '0d', '2d', 'e5', '7a', '9f', '93', 'c9', '9c', 'ef'],
	['a0', 'e0', '3b', '4d', 'ae', '2a', 'f5', 'b0', 'c8', 'eb', 'bb', '3c', '83', '53', '99', '61'],
	['17', '2b', '04', '7e', 'ba', '77', 'd6', '26', 'e1', '69', '14', '63', '55', '21', '0c', '7d'],
];

const rCon = [
	[0x00, 0x00, 0x00, 0x00],
	[0x01, 0x00, 0x00, 0x00],
	[0x02, 0x00, 0x00, 0x00],
	[0x04, 0x00, 0x00, 0x00],
	[0x08, 0x00, 0x00, 0x00],
	[0x10, 0x00, 0x00, 0x00],
	[0x20, 0x00, 0x00, 0x00],
	[0x40, 0x00, 0x00, 0x00],
	[0x80, 0x00, 0x00, 0x00],
	[0x1b, 0x00, 0x00, 0x00],
	[0x36, 0x00, 0x00, 0x00],
];

const decToHex = (dec: number) => {
	const hex = dec.toString(16);
	return hex.length === 2 ? hex : '0' + hex;
};

const hexToDec = (hex: string) => {
	return parseInt(hex, 16);
};

const addRoundKey = (block: number[][], key: number[][]) => {
	const result: number[][] = [];

	for (let i = 0; i < 4; i++) {
		const temp: number[] = [];
		for (let j = 0; j < 4; j++) {
			const result = block[i][j] ^ key[i][j];
			temp.push(result);
		}
		result.push(temp);
	}

	return result;
};

const array2Matrix = (data: number[], size: number): number[][] => {
	const result: number[][] = [];
	for (let i = 0; i < size; i++) {
		const temp: number[] = [];
		for (let y = 0; y < size; y++) {
			const idx = y * size + i;
			const el = data[idx];
			if (typeof el === 'undefined') temp.push(65);
			else temp.push(el);
		}

		result.push(temp);
	}

	return result;
};

const getBlock = (data: Uint8Array, part: number): number[] => {
	const block: number[] = [];

	for (let i = 0; i < 16; i++) {
		const idx = part * 16 + i;
		const el = data[idx];

		if (typeof el === 'undefined') block.push(65);
		else block.push(el);
	}

	return block;
};

const subBytes = (block: number[][]): number[][] => {
	const result: number[][] = [];
	for (let i = 0; i < 4; i++) {
		const temp: number[] = [];
		for (let j = 0; j < 4; j++) {
			const el = block[i][j];
			const sub = subByte(el);
			const dec = hexToDec(sub);
			temp.push(dec);
		}
		result.push(temp);
	}

	return result;
};

const subBytes2d = (data: number[]): number[] => {
	const result: number[] = [];

	for (let i = 0; i < data.length; i++) {
		const el = data[i];
		const sub = subByte(el);
		const dec = hexToDec(sub);
		result.push(dec);
	}

	return result;
};

const matrix2Array = (matrix: number[][]): number[] => {
	const result: number[] = [];
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			result.push(matrix[j][i]);
		}
	}

	return result;
};

const transpose = (matrix: number[][]) => {
	const result: number[][] = [];
	for (let i = 0; i < 4; i++) {
		const temp: number[] = [];
		for (let j = 0; j < 4; j++) {
			const el = matrix[i][j];
			temp.push(el);
		}
		result.push(temp);
	}

	return result;
};

const subByte = (data: number) => {
	const hex = decToHex(data);
	const x = hexDigitToNumber(hex[0])!;
	const y = hexDigitToNumber(hex[1])!;

	const sub = sBox[x][y];
	return sub;
};

const rotate = (data: number[], num: number, right: boolean): number[] => {
	for (let i = 0; i < num; i++) {
		if (right) {
			const last = data[data.length - 1];
			for (let j = data.length - 1; j >= 1; j--) {
				data[j] = data[j - 1];
			}
			data[0] = last;
		} else {
			const first = data[0];
			for (let j = 0; j < data.length; j++) {
				data[j] = data[j + 1];
			}
			data[data.length - 1] = first;
		}
	}

	return data;
};

const expansionKey = (key: number[]): number[][] => {
	const nb = 4;
	const nk = 4;
	const nr = nk + 12;

	const w = new Array<number[]>(nr + 1);
	let temp = new Array<number>(4);

	for (let i = 0; i < nk; i++) {
		const r = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
		w[i] = r;
	}

	for (var i = nk; i < nb * (nr + 1); i++) {
		w[i] = new Array(4);
		for (var t = 0; t < 4; t++) temp[t] = w[i - 1][t];
		// each Nk'th word has extra transformation
		if (i % nk == 0) {
			temp = subBytes2d(rotate(temp, 1, false));
			for (var t = 0; t < 4; t++) {
				temp[t] ^= rCon[(i / nk) % 11][t];
			}
		}
		// 256-bit key has subWord applied every 4th word
		else if (nk > 6 && i % nk == 4) {
			temp = subBytes2d(temp);
		}
		// xor w[i] with w[i-1] and w[i-Nk]
		for (var t = 0; t < 4; t++) w[i][t] = w[i - nk][t] ^ temp[t];
	}

	return w;
};

const getKey = (keys: number[][], part: number): number[][] => {
	const result: number[][] = [];
	for (let i = 0; i < 4; i++) {
		const w = keys[part * 4 + i];
		result.push(w);
	}

	return result;
};

const div = (a: number, b: number) => {
	return Math.floor(a / b);
};

const executeEncrypt = (block: number[][], keys: number[][]) => {
	let key = getKey(keys, 0);

	block = addRoundKey(block, key);

	for (let i = 0; i < 15; i++) {
		key = getKey(keys, i + 1);
		block = subBytes(block);
		//suffleMatrix
		//mixColumns
		block = addRoundKey(block, key);
	}

	key = getKey(keys, 16);
	block = subBytes(block);
	//suffleMatrix
	block = addRoundKey(block, key);

	return block;
};

export const encrypt = (data: Uint8Array, keyStr: string): Uint8Array => {
	const keys = expansionKey(strToBytes(keyStr));
	let block = array2Matrix(getBlock(data, 0), 4);
	console.log(block);
	block = executeEncrypt(block, keys);
	console.log(block);

	return new Uint8Array();
};

export const decrypt = (data: Uint8Array, key: string): Uint8Array => {
	console.log('decrypt', data);

	return new Uint8Array();
};
