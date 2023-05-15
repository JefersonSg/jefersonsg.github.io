class Slide {
  constructor(slide, wrapper){
    this.slide = document.querySelector(slide)
    this.wrapper = document.querySelector(wrapper)
    this.dist = {
      finalPosition: 0, startX: 0, movement: 0
    }
  }

  transiton(active){
    this.slide.style.transition = active ? 'transform .3s' : ''
  }

  moveSlide(distX){
    this.dist.movePosition = distX
    this.slide.style.transform = `translate3d(${distX}px,0,0)`
  }

  onStart(event){
    let movetype;
    if (event.type === 'mousedown') {
      event.preventDefault()
      this.dist.startX = event.clientX;
      movetype = 'mousemove';
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      movetype = 'touchmove';
    }

    this.wrapper.addEventListener(movetype, this.onMove)
    this.transiton(false)
  }

  updatePosition(clientX) {
    this.dist.movement = (this.dist.startX - clientX) * 1.6
    return this.dist.finalPosition - this.dist.movement
  }

  onMove(event) {
    const pointerPosition = (event.type === 'mousemove') ? event.clientX : event.changedTouches[0].clientX;


     const finalPosition = this.updatePosition(pointerPosition)
     this.moveSlide(finalPosition)
  }


  onEnd(event) {
    let movetype = event.type === 'mouseup' ? 'mousemove' : 'touchmove'
    this.wrapper.removeEventListener(movetype, this.onMove)
    this.dist.finalPosition = this.dist.movePosition;
    this.transiton(true)
    this.changeSlideOnEnd()
  }

  changeSlideOnEnd(){
    if (this.dist.movement) {
      if (this.dist.movement > 50 && this.index.next !== undefined) {
        this.activeNextSlide()
      }else if(this.dist.movement < -50 && this.index.prev !== undefined) {
        this.activePrevSlide()
      }
    }
  }

  addSlideEvents(){
    this.wrapper.addEventListener("mousedown", this.onStart)
    this.wrapper.addEventListener("touchstart", this.onStart)
    this.wrapper.addEventListener("mouseup", this.onEnd)
    this.wrapper.addEventListener("touchend", this.onEnd)
  }

  bindEvents(){
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  slidePosition(slide){
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2
    return -(slide.offsetLeft - margin)
  }

  slidesConfig(){
    this.slideArray = [...slide.slide.children].map((element)=>{
      const position = this.slidePosition(element)
      return { position, element }
    })
  }

  slideIndexNav(index){
    const last = this.slideArray.length - 1
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === last ? undefined : index + 1
    }
  }

  changeSlide(index){
    const activeSlide = this.slideArray[index]
    this.moveSlide(activeSlide.position)
    this.slideIndexNav(index)
    this.dist.finalPosition = activeSlide.position
  }

  activePrevSlide(){
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev)
    }
  }
  activeNextSlide(){
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next)
    }
  }
  
  init() {
    this.bindEvents();
    this.transiton(true)
    this.addSlideEvents();
    this.slidesConfig()
    return this;
  }
}

const slide = new Slide('.slide', '.graficos-container')

slide.init()
slide.changeSlide(0)