document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculate');
    calculateButton.addEventListener('click', calculatePrice);
});

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// anything
var pricePerGold = 0; 
var pricePerSilver = 0;
var pricePerPlatinum = 0;

fetch("https://api.metalpriceapi.com/v1/latest?api_key=d3f9faa7064b3a9ead69359ded2cfeda&base=USD&currencies=XAU,XAG,XPT")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        pricePerGold = data.rates.XAU; //0.00053583
        pricePerSilver =  data.rates.XAG; //0.032942842
        pricePerPlatinum = data.rates.XPT;
    })
    .catch(error => console.log('error', error));

function calculatePrice() {
    const metal = document.getElementById('metal').value;
    const weightCategory = document.getElementById('weightCategory').value;
    const weight = parseFloat(document.getElementById('weight').value);

    const GOLD_GRAMS = (1 / pricePerGold) / 31.1035;           // 1 gram of gold
    const GOLD_KILOGRAMS = (1 / pricePerGold) * 32.1507;      // 1 kilogram of gold
    const GOLD_OUNCES = 1 / pricePerGold;                    // 1 ounce of gold

    const SILVER_GRAMS = (1 / pricePerSilver) / 31.1035
    const SILVER_KILOGRAMS = (1/ pricePerSilver) * 32.1507;
    const SILVER_OUNCES = 1 / pricePerSilver;

    const PLATINUM_GRAMS = (1 / pricePerPlatinum) * 31.1035;
    const PLATINUM_KILOGRAMS = (1 / pricePerPlatinum) * 32.1507;
    const PLATINUM_OUNCES = 1 / pricePerPlatinum;

   
    
    if(metal === 'Gold'){
    pricePerUnit = GOLD_OUNCES;
    
    if (weightCategory === 'Grams') {
        pricePerUnit = GOLD_GRAMS;
    } else if (weightCategory === 'Kilograms') {
        pricePerUnit = GOLD_KILOGRAMS;
    }
}
    if(metal === 'Silver') {
        pricePerUnit = SILVER_OUNCES;
    
    if(weightCategory === 'Grams') {
        pricePerUnit = SILVER_GRAMS;
    } else if (weightCategory === 'Kilograms') {
        pricePerUnit = SILVER_KILOGRAMS;
       }
    }
    if (metal === 'Platinum' ) {
        pricePerUnit = PLATINUM_OUNCES;

        if(weightCategory === 'Grams') {
            pricePerUnit = PLATINUM_GRAMS;
    } else if (weightCategory === 'Kilograms') {
         pricePerUnit = PLATINUM_KILOGRAMS;
        }
    }

    

    

            const totalPrice = pricePerUnit * weight;
            const knoxResult = (totalPrice / 480840000000) * 100;
            const elonResult = (totalPrice / 257000000000) * 100;
            const CAresult = (totalPrice /220000000000000) * 100;

            const resultElement = document.getElementById('result');
resultElement.textContent = `Total Price: $${formatNumberWithCommas(totalPrice.toFixed(2))}`;

const knoxResultElement = document.getElementById('knoxResult');
knoxResultElement.textContent = `Compared to US federal gold reserves: ${knoxResult.toFixed(6)}%`;

const elonResultElement = document.getElementById('elonResult');
elonResultElement.textContent = `Compared to Elon Musk net worth (2023): ${elonResult.toFixed(6)}%`;

const CAresultElement = document.getElementById('CAresult');
CAresultElement.textContent = `Compared to US GDP (2021): ${CAresult.toFixed(6)}%`;

            
}

