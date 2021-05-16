'use strict';

let attempts = 0;
let maxAttempts = 25;
let attemotEl = document.getElementById('attempts');

let products = [];
function ProductImage(imageName) {
    this.imageName = imageName.split('.')[0];
    this.src = 'image/' + imageName;
    this.click = 0;
    this.views = 0;
    products.push(this);
}
console.log(products);

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

    while (lImgIndex === mImgIndex || lImgIndex === rImgIndex || mImgIndex === lImgIndex || mImgIndex === rImgIndex){
        lImgIndex = randomImages();
        mImgIndex = randomImages();
    }


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
                liEl.textContent = `${products[i].imageName}  had ${products[i].click} votes, and was seen ${products[i].views} times.`
            }
        }
        leftImgEl.removeEventListener('click', imgClick);
        middleImgEl.removeEventListener('click', imgClick);
        rightImgEl.removeEventListener('click', imgClick);
    }
}