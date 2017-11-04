const usdButton = document.getElementById('usdButton');
const eurButton = document.getElementById('eurButton');
const plnButton = document.getElementById('plnButton');
const gpbButton = document.getElementById('gpbButton');

let myBTCamount;
usdButton.addEventListener('click', function () {
    showAlert(usdDIV);
    saveDiv(usdDIV);
});
eurButton.addEventListener('click', function () {
    showAlert(eurDIV);
    saveDiv(eurDIV);
});
plnButton.addEventListener('click', function () {
    showAlert(plnDIV); saveDiv(plnDIV);
});
gpbButton.addEventListener('click', function () {
    showAlert(gpbDIV); saveDiv(gpbDIV);
});
document.getElementById('saveAmountButton').addEventListener('click', saveMyAmount);
window.onload = function () {
    loadDiv();
    loadMyAmount();
    downloadData();
};
function showAlert(x) {
    const y = document.getElementsByClassName('resultDiv');

    let i = 0;
    for (i = 0; i < y.length; i++) {
        y[i].style.display = 'none';
    };
    x.style.display = 'block';
};
function saveDiv(x) {
    localStorage.setItem('savedDiv', x.getAttribute('id'));
};
function loadDiv() {
    const x = localStorage.getItem('savedDiv');
    if (x == undefined || x == null) {

    } else {
        showAlert(window[x]);
    }
};

function saveMyAmount() {
    const x = document.getElementById('myBTCamount').value;
    localStorage.setItem('myBTCvalue', x);
    loadMyAmount()
    downloadData();
};

function loadMyAmount() {
    const x = localStorage.getItem('myBTCvalue'); myBTCamount = x;
};
function downloadData() {
    const req = new XMLHttpRequest();
    req.open('GET', 'https://blockchain.info/pl/ticker');
    req.send();
    req.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const x = JSON.parse(req.responseText);
            document.getElementById('pln').innerHTML = '1 BTC = ' + x.PLN.last + ' ' + x.PLN.symbol;
            document.getElementById('usd').innerHTML = '1 BTC = ' + x.USD.last + ' ' + x.USD.symbol;
            document.getElementById('eur').innerHTML = '1 BTC = ' + x.EUR.last + ' ' + x.EUR.symbol;
            document.getElementById('gbp').innerHTML = '1 BTC = ' + x.GBP.last + ' ' + x.GBP.symbol;


            if (myBTCamount === 0 || myBTCamount === null || myBTCamount === undefined) {
                const p = document.getElementsByClassName('rsp');
                let i = 0;
                for (i = 0; i < p.length; i++) {
                    p[i].innerHTML = '';
                };

            } else {
                document.getElementById('plnResult').innerHTML = myBTCamount + ' BTC = ' + (x.PLN.last * myBTCamount).toFixed(2) + ' ' + x.PLN.symbol;
                document.getElementById('usdResult').innerHTML = myBTCamount + ' BTC = ' + (x.USD.last * myBTCamount).toFixed(2) + ' ' + x.USD.symbol;
                document.getElementById('eurResult').innerHTML = myBTCamount + ' BTC = ' + (x.EUR.last * myBTCamount).toFixed(2) + ' ' + x.EUR.symbol;
                document.getElementById('gbpResult').innerHTML = myBTCamount + ' BTC = ' + (x.GBP.last * myBTCamount).toFixed(2) + ' ' + x.GBP.symbol;
            };

        } else if (this.readyState != 4 || this.status != 200) {
            const u = document.getElementsByClassName('rsp');
            let i = 0;
            for (i = 0; i < u.length; i++) {
                u[i].innerHTML = 'No connection to blockchain.info.';
            };
        };
    }


};
