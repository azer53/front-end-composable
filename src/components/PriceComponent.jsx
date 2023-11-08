import React from 'react';

const PriceComponent = ({ totalPrice }) => {
    // Extracting properties from totalPrice
    const { centAmount, currencyCode, fractionDigits } = totalPrice;

    // Calculating the actual price by dividing centAmount by 100
    const actualPrice = centAmount / 100;

    // Formatting the price using Intl.NumberFormat
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: fractionDigits,
    }).format(actualPrice);

    return (
        <div>
            <p>{formattedPrice}</p>
        </div>
    );
};

export default PriceComponent;
