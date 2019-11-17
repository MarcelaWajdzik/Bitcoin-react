import React from 'react';
import axios from 'axios';
import CryptoList from './CryptoList';


class Crypto extends React.Component {
    constructor() {
        super();
        this.state = {
            cryptoArray: [],
            newFiltereCryptoArray: [],
            /* chcemy miec tablice zebey moc wykrzystac metode map */
        }

    }


    getCryptoData = () => {
        axios.get('https://blockchain.info/pl/ticker')
            .then(res => {
                const crypto = res.data;
                let converteetCryptoArray = [];
                let i = 0;
                /*   console.log(res) rest.data - bo w data dostajemy jason. jak wyconosiulejy w conosli to to widac */
                for (let key in crypto) {
                    let newCryptoObj = crypto[key];
                    let prevCryptoObj = this.state.cryptoArray[i]

                    if (prevCryptoObj !== undefined) {
                        if (prevCryptoObj.last > newCryptoObj.last) {
                            newCryptoObj.class = 'red';
                        } else if (prevCryptoObj.last < newCryptoObj.last) {
                            newCryptoObj.class = 'green';
                        } else newCryptoObj.class = 'blue'

                    } else { newCryptoObj.class = 'green'; }
                    newCryptoObj.current = key;
                    converteetCryptoArray.push(newCryptoObj);
                    i++; /* Zwiekszamy i o 1 pokazdej  iteracji */
                }
                this.setState({ cryptoArray: converteetCryptoArray, newFiltereCryptoArray: converteetCryptoArray })
                this.filterenCrypto();
            });
    };



    changeValueCryptoArray = () => {
        let trimValue = this.filterInput.value.trim().toUpperCase();
        console.log(trimValue)
        let currentCrypto = this.state.cryptoArray;
        let filterenCrypto = currentCrypto.filter(crypto => {
            return crypto.current.includes(trimValue)
        })
        this.setState({ newFiltereCryptoArray: filterenCrypto })
    }


    componentDidMount() {
        this.getCryptoData();
        /* metodde wywołujemy przez obiekt. w naszym wypadku to jest this */
        setInterval(() => { this.getCryptoData() }, 5000);
    }

    /*  Object.keys() - metoda ktora z kluczy obiektu zamienia na tablice. ale tylko klucze */


    render() {
        return (
            <div className='cryptoName'>
                <input type="text" onChange={this.changeValueCryptoArray} ref={input => this.filterInput = input} />
                {/*  1 parametrem ref jest obiekt w ktorym jestesmy ? */}
                < CryptoList cryptoArray={this.state.newFiltereCryptoArray} />
            </div>
        )
    }
}

export default Crypto;