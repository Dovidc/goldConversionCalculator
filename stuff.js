document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculate');
    calculateButton.addEventListener('click', calculatePrice);

    let pricePerGold = 0;
    let pricePerSilver = 0;
    let pricePerPlatinum = 0;
    let usDebt = 0;

    fetch("https://api.metalpriceapi.com/v1/latest?api_key=d3f9faa7064b3a9ead69359ded2cfeda&base=USD&currencies=XAU,XAG,XPT")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            pricePerGold = data.rates.XAU || 0;
            pricePerSilver = data.rates.XAG || 0;
            pricePerPlatinum = data.rates.XPT || 0;
        })
        .catch(error => console.log('error fetching metal prices', error));

    fetch("https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/rates_of_exchange?fields=country_currency_desc, exchange_rate,record_date&filter=country_currency_desc:in:(Canada-Dollar,Mexico-Peso), record_date:gte:2020-01-01")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            usDebt = parseFloat(data.data[0]?.debtValue) || 0;
        })
        .catch(error => console.log('error fetching US debt data', error));

    function calculatePrice() {
        const metal = document.getElementById('metal').value;
        const weightCategory = document.getElementById('weightCategory').value;
        const weight = parseFloat(document.getElementById('weight').value);

        let pricePerUnit = 0;

        if (metal === 'Gold') {
            pricePerUnit = (weightCategory === 'Grams') ? (1 / pricePerGold) / 31.1035 :
                (weightCategory === 'Kilograms') ? (1 / pricePerGold) * 32.1507 : 1 / pricePerGold;
        } else if (metal === 'Silver') {
            pricePerUnit = (weightCategory === 'Grams') ? (1 / pricePerSilver) / 31.1035 :
                (weightCategory === 'Kilograms') ? (1 / pricePerSilver) * 32.1507 : 1 / pricePerSilver;
        } else if (metal === 'Platinum') {
            pricePerUnit = (weightCategory === 'Grams') ? (1 / pricePerPlatinum) * 31.1035 :
                (weightCategory === 'Kilograms') ? (1 / pricePerPlatinum) * 32.1507 : 1 / pricePerPlatinum;
        }

        const totalPrice = pricePerUnit * weight;
        const knoxResult = (totalPrice / 480840000000) * 100;
        const elonResult = (totalPrice / 257000000000) * 100;
        const CAresult = (totalPrice / 3800000000000) * 100;
        const USdebtResult = (totalPrice / usDebt) * 100;

        const resultElement = document.getElementById('result');
        resultElement.textContent = `Total Price: $ ${formatNumberWithCommas(totalPrice.toFixed(2))}`;

        const knoxResultElement = document.getElementById('knoxResult');
        knoxResultElement.textContent = `US federal gold reserves: ${knoxResult.toFixed(6)}%`;

        const elonResultElement = document.getElementById('elonResult');
        elonResultElement.textContent = `Elon Musk net worth (2023): ${elonResult.toFixed(9)}%`;

        const USdebtElement = document.getElementById('USdebt');
        USdebtElement.textContent = `US Debt (live): ${USdebtResult.toFixed(8)}%`;

        const CAresultElement = document.getElementById('CAresult');
        CAresultElement.textContent = `US GDP (2021): ${CAresult.toFixed(8)}%`;
    }

    function formatNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});
