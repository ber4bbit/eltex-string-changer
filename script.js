const input = document.getElementById('stringLengthInput');
const btn = document.getElementById('generateStringBtn');
const generatedStringSpan = document.getElementById('generatedString');
const newSymbolInput = document.getElementById('newSymbol');
const newSymbolBtn = document.getElementById('newSymbolBtn');
const secondSymbolInput = document.getElementById('secondSymbol');
const secondSymbolBtn = document.getElementById('secondSymbolBtn');

const alphabet = ['A', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Q', 'R', 'T', 'U', 'V', 'W', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '+', '-', '_', '$', '~'];

const generateRandomNumber = (min, max) => {
    const bottom = Math.ceil(min);
    const upper = Math.floor(max);

    return Math.floor(Math.random() * (upper - bottom + 1)) + bottom;
}

const generateString = (stringLength, step, currentString) => {
    let generatedString = [];
    let currString = currentString;

    switch (step) {
        case 'first-step':
            if (Number(stringLength) === 0) {
                return 'Введите строку длиной как минимум 1 символ'
            }

            for (let i = 0; i < stringLength; i++) {
                const index = generateRandomNumber(0, alphabet.length - 1);
                generatedString.push(alphabet[index]);
            }
            return generatedString.join('');
        case 'second-step':
            let secondStepSymbolCount = 0;
            for (let i = 0; i < stringLength; i++) {
                if (isNaN(Number(currString[i])) && currString[i] !== '+' && currString[i] !== '-' && currString[i] !== '_' && currString[i] !== '$' && currString[i] !== '~') {
                    secondStepSymbolCount += 1;
                    currString[i] = newSymbolInput.value;
                }
            }
            document.getElementById('newSymbolCount').innerText = `Количество повторов нового символа: ${secondStepSymbolCount}`
            return currString.join('');
        case 'third-step':
            let thirdStepSymbolCount = 0;
            for (let i = 0; i < stringLength; i++) {
                if (!isNaN(Number(currString[i]))) {
                    thirdStepSymbolCount += 1;
                    currString[i] = secondSymbolInput.value;
                }
            }
            document.getElementById('secondSymbolCount').innerText = `Количество повторов второго символа: ${thirdStepSymbolCount}`
            return currString.join('');
    }

    return generatedString.join('');
}

btn.addEventListener('click', () => {
    const string = generateString(input.value, 'first-step');

    generatedStringSpan.innerText = string;

    newSymbolInput.removeAttribute('disabled');
    newSymbolBtn.removeAttribute('disabled');
})

newSymbolBtn.addEventListener('click', () => {
    const string = generateString(generatedStringSpan.innerText.split('').length, 'second-step', generatedStringSpan.innerText.split(''));

    generatedStringSpan.innerText = string;

    secondSymbolInput.removeAttribute('disabled');
    secondSymbolBtn.removeAttribute('disabled');

})

secondSymbolBtn.addEventListener('click', () => {
    const string = generateString(generatedStringSpan.innerText.split('').length, 'third-step', generatedStringSpan.innerText.split(''));

    generatedStringSpan.innerText = string;
})