var play11Container = document.querySelector('.playing-11-container')
var colsHeaders     = document.querySelectorAll('.col-info-section')

// play11Container.addEventListener('scroll', (e)=>{
    
// })
function PreventScroll(e){
    e.stopPropagation();
    e.preventDefault()
    console.log('Prevent');
}
colsHeaders.forEach( header => {
    header.addEventListener('click', function(){
        this.nextElementSibling.classList.toggle('show-player')
    })
})

// navigate buttons
var leftArr = document.querySelector('.navigate-buttons .left img')
var rghtArr = document.querySelector('.navigate-buttons .right img')
leftArr.onclick = left
rghtArr.onclick = right

var playContainer =  play11Container.querySelectorAll('.play11-contain')
function left(){
    let playScroll = playContainer[0].className.includes('active-play-11') ? playContainer[0] : playContainer[1]
    playScroll.scrollTo(0,0)
}

function right(){
    let playScroll = playContainer[0].className.includes('active-play-11') ? playContainer[0] : playContainer[1]
    let scrollLeft = playScroll.scrollWidth - playScroll.clientWidth
    playScroll.scrollTo(scrollLeft,0)
}

// show inings through navigation
var inns = document.querySelectorAll('.innings')
var inn1Container = document.querySelector('#inn0')
var inn2Container = document.querySelector('#inn1')

inns.forEach((inn , index )=> {
    inn.addEventListener('click', (e)=>{
        if(e.target.className.includes('inn-1')){
            inn1Container.style.display = 'flex'
            inn1Container.classList.add('active-play-11')
            inn2Container.classList.remove('active-play-11')

            inn2Container.style.display = 'none'

            e.target.classList.add('active-inn')
            e.target.nextElementSibling.classList.remove('active-inn')
        }
        else if(e.target.className.includes('inn-2')){
            inn2Container.style.display = 'flex'
            inn2Container.classList.add('active-play-11')
            inn1Container.classList.remove('active-play-11')

            inn1Container.style.display = 'none'

            e.target.classList.add('active-inn')
            e.target.previousElementSibling.classList.remove('active-inn')
        }

    })    
})






