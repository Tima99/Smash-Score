
const header                  = document.querySelectorAll('.header-bar')
const layoutContainer         = document.querySelector('.layout-container')
const inshortContainer        = document.querySelector('.content .inshort-matches-container')
const matchDetailContainer    = document.querySelector('.content .full-match-card-container')

const navigation       = document.querySelector('.navigation')
const iconContainer    = document.querySelector('.nav2.icons-container')

let themeSelect = 0;
let saveTheme = localStorage.getItem('theme') ? localStorage.getItem('theme').toString() - 0 : false;
themeSelect = saveTheme ? saveTheme : localStorage.setItem('theme', 0)

const setTheme =  ()=>{
    document.body.classList.toggle('black-theme')
    document.getElementById('theme-change').checked = 1;
} 

themeSelect ? setTheme() : ''

function ChangeTheme(btn){
    document.body.classList.toggle('black-theme')
    if(btn.checked)
        localStorage.setItem('theme', 1) // if black theme 1 and for light theme its 0
    else
        localStorage.setItem('theme', 0) // if black theme 1 and for light theme its 0
}

let isLockBar = 0
function LockOn(btn){
        isLockBar = 1
        document.querySelector('.lock-on').style.display = 'block'
        ScrollUp()
}
function LockOff(btn){
        isLockBar = 0
        document.querySelector('.lock-on').style.display = 'none'
        ScrollDown()
}


let prevTouch = null;
inshortContainer.addEventListener('touchstart', function(e){
    prevTouch = e.changedTouches[0].clientY;
})
matchDetailContainer.addEventListener('touchstart', function(e){
    prevTouch = e.changedTouches[0].clientY;
})

inshortContainer.addEventListener('touchmove', function(e){
    // return;
    let moveTouch = e.changedTouches[0].clientY
    let deltaTouch = moveTouch-prevTouch
    let scroll = deltaTouch < 1 ? 'up' : 'down' 

    if(scroll === 'up'){
        ScrollUp()
    }
    else{
        if(!isLockBar)
        ScrollDown()
    }
})

matchDetailContainer.addEventListener('touchmove', function(e){
    // return;
    let moveTouch = e.changedTouches[0].clientY
    let deltaTouch = moveTouch-prevTouch
    let scroll = deltaTouch < 1 ? 'up' : 'down' 

    if(scroll === 'up'){
        ScrollUp()
    }
    else{
        if(!isLockBar)
        ScrollDown()
    }
})


inshortContainer.addEventListener('touchend', function(e){
    prevTouch = 0
})


function ScrollUp(){
        layoutContainer.style.gridTemplateRows = '0% 100vh 0%'
        calendarIcon.classList.add('move-calendar-icon-hide')
        navigation.classList.remove('navigation-m') // remove navigation
        header[0].classList.remove('header-m') // remove header 
        header[1].classList.remove('header-m') // remove header 


        document.querySelector('.sub-header').style.overflow = 'hidden'
}

function ScrollDown() {
    layoutContainer.style.gridTemplateRows = '8% 92%'
        calendarIcon.classList.remove('move-calendar-icon-hide')
        navigation.classList.add('navigation-m') // add border to navigation container
        header[0].classList.add('header-m') // remove header 
        header[1].classList.add('header-m') // remove header 


        document.querySelector('.sub-header').style.overflow = 'visible'
}

