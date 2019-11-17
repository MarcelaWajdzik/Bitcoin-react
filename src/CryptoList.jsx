import React from 'react';

const CryptoList = props => {
    /*  console.log(props.cryptoArray) */
    /* zwroci jeden klucz o nazwie taka jak nadalismy propsowi w Crypto -cryptoArray */

    let cryptoListArray = props.cryptoArray.map(crypto => {
        return <li key={crypto.current}>Last rate: <span className={crypto.class}>{crypto.last} </span>{crypto.current}{crypto.symbol}

        </li>
    });


    return (
        <ul className='crypto-list'>
            {cryptoListArray}

        </ul>

    );

}



export default CryptoList;