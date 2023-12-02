class t{constructor(t,e=!0,s=5e3){// элемент div.slider
this.slider=t,// все кадры (слайды)
this.allFrames=t.querySelectorAll(".slider__item"),// цепочка кадров
this.frameChain=t.querySelector(".slider__slides"),this.index=0,this.length=this.allFrames.length,this.autoplay=e,this.autoplayDelay=s,this.paused=null,this.init()}init(){this.dotButtons=this.dots(),// все кадры должны быть одной ширины, равной ширине окна просмотра;
// если кадров три, то ширина каждого кадра будет 100/3 = 33.33333%
// от ширины контейнера .slider__slides, то есть 900 пикселей
this.allFrames.forEach(t=>t.style.width=100/this.length+"%"),// ширина цепочки кадров должна равна ширине всех кадров, то есть
// 900*3 = 2700 пикселей; но удобнее задать в процентах от родителя,
// если кадров три, то ширина контейнера кадров будет 100*3 = 300%
this.frameChain.style.width=100*this.length+"%",// клики по кнопкам индикатора текущего кадра
this.dotButtons.forEach(t=>{t.addEventListener("click",t=>{t.preventDefault();let e=this.dotButtons.indexOf(t.target);e!==this.index&&this.goto(e)})}),this.autoplay&&(// включить автоматическую прокрутку?
this.play(),// когда мышь над слайдером — останавливаем автоматическую прокрутку
this.slider.addEventListener("mouseenter",()=>clearInterval(this.paused)),// когда мышь покидает пределы слайдера — опять запускаем прокрутку
this.slider.addEventListener("mouseleave",()=>this.play()))}// перейти к кадру с индексом index
goto(t){t>this.length-1?this.index=0:t<0?this.index=this.length-1:this.index=t,// ...и выполнить смещение
this.move()}// перейти к следующему кадру
next(){this.goto(this.index+1)}// перейти к предыдущему кадру
prev(){this.goto(this.index-1)}// рассчитать и выполнить смещение
move(){// на сколько нужно сместить, чтобы нужный кадр попал в окно
let t=100/this.length*this.index;this.frameChain.style.transform=`translateX(-${t}%)`,this.dotButtons.forEach(t=>t.classList.remove("active")),this.dotButtons[this.index].classList.add("active")}// запустить автоматическую прокрутку
play(){this.paused=setInterval(()=>this.next(),this.autoplayDelay)}// создать индикатор текущего слайда
dots(){let t=document.createElement("ol"),e=[];t.classList.add("slider__indicators");for(let s=0;s<this.length;s++){let i=document.createElement("li");0===s&&i.classList.add("active"),t.append(i),e.push(i)}return this.slider.prepend(t),e}}document.addEventListener("DOMContentLoaded",function(){new t(document.querySelector(".slider"),8e3)});//# sourceMappingURL=index.eedba7fc.js.map

//# sourceMappingURL=index.eedba7fc.js.map
