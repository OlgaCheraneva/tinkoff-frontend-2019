function formatOperationData(data) {
    if (!Array.isArray(data)) {
        return '';
    }

    const results = data.map((operation) => {
        let result = [];
        const {name, cardNumber, date, amount, currency} = operation;
        result.push(
            `Имя покупателя: ${name}`,
            `Номер карты: ${formatCardNumber(cardNumber)}`,
            `Дата и время операции: ${formatDate(date)}`,
            `Сумма операции: ${currency}${formatAmount(amount)}`
        );

        return result.join('\n');
    });

    return results.join('\n\n');
}

function formatCardNumber(cardNumber) {
    return `${cardNumber.substring(0, 4)} **** **** ${cardNumber.substring(
        12
    )}`;
}

function formatDate(dateString) {
    const dateObject = new Date(dateString);
    const date = formatTwoDigitsDatePiece(dateObject.getDate());
    const month = formatTwoDigitsDatePiece(dateObject.getMonth() + 1);
    const year = dateObject.getFullYear();
    const hours = formatTwoDigitsDatePiece(dateObject.getHours());
    const minutes = formatTwoDigitsDatePiece(dateObject.getMinutes());

    return `${date}.${month}.${year} ${hours}:${minutes}`;
}

function formatTwoDigitsDatePiece(datePart) {
    return datePart < 10 ? `0${datePart}` : datePart;
}

function formatAmount(amount) {
    const amountArr = amount.split('.');
    const integerPartOfAmount = amountArr[0];
    const fractionalPartOfAmount = amountArr[1];
    let parts = [];
    for (let i = integerPartOfAmount.length; i >= 1; i -= 3) {
        parts.push(integerPartOfAmount.substring(Math.max(i - 3, 0), i));
    }

    return `${parts.reverse().join(',')}${
        fractionalPartOfAmount !== undefined ? `.${fractionalPartOfAmount}` : ''
    }`;
}
