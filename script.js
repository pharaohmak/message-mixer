// Import the encryptors functions here.
const encryptors = {
    caesarCipher: (str, amount = 0) => {
        if (amount < 0) {
            return caesarCipher(str, amount + 26);
        }
        let output = '';
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            if (char.match(/[a-z]/i)) {
                let code = str.charCodeAt(i);
                if (code >= 65 && code <= 90) {
                    char = String.fromCharCode(((code - 65 + amount) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    char = String.fromCharCode(((code - 97 + amount) % 26) + 97);
                }
            }
            output += char;
        }
        return output;
    },

    symbolCipher: (str) => {
        const symbols = {
            'i': '!',
            '!': 'i',
            'l': '1',
            '1': 'l',
            's': '$',
            '$': 's',
            'o': '0',
            '0': 'o',
            'a': '@',
            '@': 'a',
            'e': '3',
            '3': 'e',
            'b': '6',
            '6': 'b'
        }

        let output = '';
        for (let i = 0; i < str.length; i++) {
            let char = str.toLowerCase()[i];

            if (symbols[char]) {
                output += symbols[char]
            } else {
                output += char;
            }
        }
        return output;
    },

    reverseCipher: (sentence) => {
        let words = sentence.split(' ');
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].split('').reverse().join('');
        }
        return words.join(' ');
    }
};

const caesarCipher = encryptors.caesarCipher;
const symbolCipher = encryptors.symbolCipher;
const reverseCipher = encryptors.reverseCipher;

const encodeMessage = (str, type, amount) => {
    switch (type) {
        case 'caesar':
            return caesarCipher(str, amount);
        case 'symbol':
            return symbolCipher(str);
        case 'reverse':
            return reverseCipher(str);
        default:
            return str;
    }
};

const decodeMessage = (str, type, amount) => {
    switch (type) {
        case 'caesar':
            return caesarCipher(str, -amount);
        case 'symbol':
            return symbolCipher(str);
        case 'reverse':
            return reverseCipher(str);
        default:
            return str;
    }
};

document.getElementById('encodeButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const encryptionType = document.getElementById('encryptionType').value;
    const caesarAmount = parseInt(document.getElementById('caesarAmount').value) || 0;

    const result = encodeMessage(inputText, encryptionType, caesarAmount);
    document.getElementById('result').innerText = `Encoded Message: ${result}`;
});

document.getElementById('decodeButton').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const encryptionType = document.getElementById('encryptionType').value;
    const caesarAmount = parseInt(document.getElementById('caesarAmount').value) || 0;

    const result = decodeMessage(inputText, encryptionType, caesarAmount);
    document.getElementById('result').innerText = `Decoded Message: ${result}`;
});