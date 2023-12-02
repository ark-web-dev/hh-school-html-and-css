class Slider {
    constructor(slider, autoplay = true, autoplayDelay = 5000){
        // элемент div.slider
        this.slider = slider;
        // все кадры (слайды)
        this.allFrames = slider.querySelectorAll(".slider__item");
        // цепочка кадров
        this.frameChain = slider.querySelector(".slider__slides");
        this.index = 0; // индекс кадра, который сейчас в окне просмотра
        this.length = this.allFrames.length; // сколько всего есть кадров
        this.autoplay = autoplay; // включить автоматическую прокрутку?
        this.autoplayDelay = autoplayDelay;
        this.paused = null; // чтобы можно было выключать автопрокрутку
        this.init(); // инициализация слайдера
    }
    init() {
        this.dotButtons = this.dots(); // создать индикатор текущего кадра
        // все кадры должны быть одной ширины, равной ширине окна просмотра;
        // если кадров три, то ширина каждого кадра будет 100/3 = 33.33333%
        // от ширины контейнера .slider__slides, то есть 900 пикселей
        this.allFrames.forEach((frame)=>frame.style.width = 100 / this.length + "%");
        // ширина цепочки кадров должна равна ширине всех кадров, то есть
        // 900*3 = 2700 пикселей; но удобнее задать в процентах от родителя,
        // если кадров три, то ширина контейнера кадров будет 100*3 = 300%
        this.frameChain.style.width = 100 * this.length + "%";
        // клики по кнопкам индикатора текущего кадра
        this.dotButtons.forEach((dot)=>{
            dot.addEventListener("click", (event)=>{
                event.preventDefault();
                const index = this.dotButtons.indexOf(event.target);
                if (index === this.index) return;
                this.goto(index);
            });
        });
        if (this.autoplay) {
            // включить автоматическую прокрутку?
            this.play();
            // когда мышь над слайдером — останавливаем автоматическую прокрутку
            this.slider.addEventListener("mouseenter", ()=>clearInterval(this.paused));
            // когда мышь покидает пределы слайдера — опять запускаем прокрутку
            this.slider.addEventListener("mouseleave", ()=>this.play());
        }
    }
    // перейти к кадру с индексом index
    goto(index) {
        // изменить текущий индекс...
        if (index > this.length - 1) this.index = 0;
        else if (index < 0) this.index = this.length - 1;
        else this.index = index;
        // ...и выполнить смещение
        this.move();
    }
    // перейти к следующему кадру
    next() {
        this.goto(this.index + 1);
    }
    // перейти к предыдущему кадру
    prev() {
        this.goto(this.index - 1);
    }
    // рассчитать и выполнить смещение
    move() {
        // на сколько нужно сместить, чтобы нужный кадр попал в окно
        const offset = 100 / this.length * this.index;
        this.frameChain.style.transform = `translateX(-${offset}%)`;
        this.dotButtons.forEach((dot)=>dot.classList.remove("active"));
        this.dotButtons[this.index].classList.add("active");
    }
    // запустить автоматическую прокрутку
    play() {
        this.paused = setInterval(()=>this.next(), this.autoplayDelay);
    }
    // создать индикатор текущего слайда
    dots() {
        const ol = document.createElement("ol");
        const children = [];
        ol.classList.add("slider__indicators");
        for(let i = 0; i < this.length; i++){
            let li = document.createElement("li");
            if (i === 0) li.classList.add("active");
            ol.append(li);
            children.push(li);
        }
        this.slider.prepend(ol);
        return children;
    }
}

//# sourceMappingURL=index.e10f4d43.js.map
