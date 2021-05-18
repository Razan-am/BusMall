'use strict';

let attempts = 0;
let maxAttempts = 25;
let attemotEl = document.getElementById('attempts');
let productsNames = [];
let viewArray = [];
let clickArray = [];
let firstArray = [];

let products = [];
function ProductImage(imageName) {
    this.imageName = imageName.split('.')[0];
    this.src = 'image/' + imageName;
    this.click = 0;
    this.views = 0;
    products.push(this);
    productsNames.push(this.imageName);
}
console.log(products);
console.log(firstArray);

let images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let index = 0; index < images.length; index++) {
    new ProductImage(images[index]);
}

function randomImages() {
    return Math.floor(Math.random() * products.length);
}


let leftImgEl = document.getElementById('leftImage');
let middleImgEl = document.getElementById('middleImage');
let rightImgEl = document.getElementById('rightImage');

let lImgIndex;
let mImgIndex;
let rImgIndex;


function render() {
    lImgIndex = randomImages();
    mImgIndex = randomImages();
    rImgIndex = randomImages();

    attemotEl.textContent = attempts;


    while (lImgIndex === rImgIndex || lImgIndex === mImgIndex || mImgIndex === rImgIndex || firstArray.includes(lImgIndex) || firstArray.includes(mImgIndex) || firstArray.includes(rImgIndex)) {
        lImgIndex = randomImages();
        mImgIndex = randomImages();
        rImgIndex = randomImages();
    }
    firstArray = [];
    firstArray.push(lImgIndex);
    firstArray.push(mImgIndex);
    firstArray.push(rImgIndex);

    leftImgEl.setAttribute('src', products[lImgIndex].src);
    leftImgEl.setAttribute('title', products[lImgIndex].src);
    products[lImgIndex].views++;


    middleImgEl.setAttribute('src', products[mImgIndex].src);
    middleImgEl.setAttribute('title', products[mImgIndex].src);
    products[mImgIndex].views++;

    rightImgEl.setAttribute('src', products[rImgIndex].src);
    rightImgEl.setAttribute('title', products[rImgIndex].src);
    products[rImgIndex].views++;

}
render();

leftImgEl.addEventListener('click', imgClick);
middleImgEl.addEventListener('click', imgClick);
rightImgEl.addEventListener('click', imgClick);

function settingIteams (){
    let data = JSON.stringify(products);
    localStorage.setItem ('Images',data);

    // let att = JSON.stringify(attempts);
    // localStorage.setItem('Attempts' , att);
}

function gettingIteam (){
    let stringObj = localStorage.getItem ('Images');
    let normalObj = JSON.parse (stringObj);
    if (normalObj !== null){
        products = normalObj;
    }

    // let newAtt = localStorage.getItem ('Attempts');
    // let finalAtt = JSON.parse (newAtt);
    // if (finalAtt !== null){
    //     attempts = finalAtt;
    // }
}

function imgClick(event) {
    attempts++;
    if (attempts <= maxAttempts) {
        if (event.target.id === 'leftImage') {
            products[lImgIndex].click++;
        } else if (event.target.id === 'middleImage') {
            products[mImgIndex].click++;
        } else if (event.target.id === 'rightImage') {
            products[rImgIndex].click++;
        }
        render();
        settingIteams();
    } else {
        let contaner = document.getElementById('imgContainer');
        let btnEl = document.createElement('button');
        contaner.appendChild(btnEl);
        btnEl.textContent = 'View Results';

        btnEl.addEventListener('click', btnClick);

        function btnClick(event) {
            let ulEl = document.getElementById('result');
            let liEl;

            for (let i = 0; i < products.length; i++) {
                liEl = document.createElement('li');
                ulEl.appendChild(liEl);
                liEl.textContent = `${products[i].imageName}  had ${products[i].click} votes, and was seen ${products[i].views} times.`;

            }
        }       
        leftImgEl.removeEventListener('click', imgClick);
        middleImgEl.removeEventListener('click', imgClick);
        rightImgEl.removeEventListener('click', imgClick);
        chartRender();
    }
}
gettingIteam ();
gettingIteam.clear ;

function chartRender() {
    for (let index = 0; index < products.length; index++) {
        viewArray.push(products[index].views);
        clickArray.push(products[index].click);
    }
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productsNames,
            datasets: [{
                label: '# of views',
                data: viewArray,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 3
            }, {
                label: '# of votes',
                data: clickArray,
                backgroundColor: [
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 3
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
// console.log(viewArray);
// console.log(clickArray);