let slider = document.getElementsByClassName('slider')[0];
let header = document.getElementsByClassName('slider__header')[0];
let description = document.getElementsByClassName('slider__description')[0];
let button = document.getElementsByClassName('slider__btn')[0];
let indicators = [...document.getElementsByClassName('slider__indicators')[0].children];

let slides = [
    {
        photo: 'slider-img-1.png',
        header: 'Офисная мебель',
        description: 'Новый каталог 2018-2019',
        buttonText: 'Подробнее о каталоге'
    },
    {
        photo: 'slider-img-2.png',
        header: 'Скидки!',
        description: 'Скидки на всё!',
        buttonText: 'Получить персональную скидку 146%'
    },
    {
        photo: 'slider-img-3.png',
        header: 'Товары на любой вкус',
        description: 'Вы найдете что-то для себя!',
        buttonText: 'Найти что-то для себя!'
    },
    {
        photo: 'slider-img-4.png',
        header: 'Акция на кресла-качалки',
        description: 'Пенсионерам скидки!',
        buttonText: 'Узнать подробности'
    },
    {
        photo: 'slider-img-5.png',
        header: 'Приводи друзей',
        description: 'За каждого друга - скидка!',
        buttonText: 'Подробности акции'
    },
]

let slideIdx = 0;
let mainIndicatorCass = 'indicators__item-main';

let timer = setInterval(() => {    
    slideIdx = (slideIdx + 1) % slides.length;
    changeSlide(slideIdx);    
}, 3000);

indicators.forEach(indicator => {
    indicator.onclick = function() {
        clearInterval(timer);
        let curSlideIdx = indicators.indexOf(this);
        changeSlide(curSlideIdx);
    };
});

function changeSlide(curSlideIdx) {
    indicators.forEach(e => {
        e.classList.remove(mainIndicatorCass);
    });
    indicators[curSlideIdx].classList.add(mainIndicatorCass);
    slider.style.background = `url("img/${slides[curSlideIdx].photo}") no-repeat right, url("img/slider-bg.png")`
    header.textContent = slides[curSlideIdx].header;
    description.textContent = slides[curSlideIdx].description;
    button.textContent = slides[curSlideIdx].buttonText;
}