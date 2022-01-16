/** Infinite Dates */
const dateBar   = document.querySelector('.dates-container')
// if width is less than 600 add class horizontal-dates-bar for mobile version
if(document.body.clientWidth < 600)
dateBar.classList.add('horizontal-dates-bar')

// append date Block in date bar such that its fullfil 
let uuid = -1; // unique for each date block
// returns date element|block
const dateBlock = (date)=>{
    const dateELe = document.createElement('div')
    if(dateBar.className.includes('horizontal-dates-bar'))
    dateELe.classList.add('date')
    else
    dateELe.classList.add('date', 'date-vertical')

    dateELe.setAttribute('id', uuid++)
    const dateNode = `<span class='date-text'>${date}</span>`
    dateELe.innerHTML = dateNode

    dateELe.onclick = function(){
        ClickDate(this)
    };
    return dateELe;
}


let dateBehindFromToday = 2;
let upcomingDate = new Date()
upcomingDate = upcomingDate.setDate(upcomingDate.getDate() - dateBehindFromToday - 1)
upcomingDate = new Date(upcomingDate);

let prevDate = new Date(); // previous date
prevDate = prevDate.setDate(prevDate.getDate() - (dateBehindFromToday ))
prevDate = new Date(prevDate);

let loop = 1 , isScrollByGesture = true , prevScroll = null;

function PreviousDate() {
    prevScroll = dateBar.scrollWidth
    
    while(dateBar.scrollWidth <= dateBar.clientWidth*loop*3) dateBar.insertBefore(DateCreate(prevDate ,-1) ,dateBar.firstElementChild)
    loop++;
    
    isScrollByGesture = false;
    dateBar.scrollTo(dateBar.scrollWidth - prevScroll - dateBar.scrollLeft,0)
    setTimeout(()=>{ isScrollByGesture = true }, 100) 
}

function UpcomingDate() {
    let count =0
    while(dateBar.scrollWidth <= dateBar.clientWidth*loop*3) {
        // debugger;
        dateBar.append(DateCreate(upcomingDate, 1))
        // alert(count++)
    }
    loop++;
}

function PreviousDateVertical() {
    prevScroll = dateBar.scrollHeight
    
    while(dateBar.scrollHeight <= dateBar.clientHeight*loop*3) dateBar.insertBefore(DateCreate(prevDate ,-1) ,dateBar.firstElementChild)
    loop++;
    
    isScrollByGesture = false;
    dateBar.scrollTo(0, dateBar.scrollHeight - prevScroll - dateBar.scrollTop)
    setTimeout(()=>{ isScrollByGesture = true }, 100) 
}


function UpcomingDateVertical() {
    while(dateBar.scrollHeight <= dateBar.clientHeight*loop) dateBar.append(DateCreate(upcomingDate, 1))
    loop++;
}

// returns date block assign with date
function DateCreate(date,type=null){
    if(!type && !date) {
        // type = 1, date increase and -1 then decrease
        console.error(`Please provide valid data : date and 1 or -1`);
        return;
    };
    date = date.setDate(date.getDate()+parseInt(type)) // return previous date milliseconds
    date = new Date(date) // convert ms to date
    let shiftDate = date.toDateString().toString().slice(3,Infinity);
    return dateBlock(shiftDate);
}

// runs as soon as window loads and append initial date blocks  
!function CallFirst(){
    if(dateBar.className.includes('horizontal-dates-bar'))
    UpcomingDate()
    else if(dateBar.className.includes('vertical-dates-bar'))
    UpcomingDateVertical()

    let scrolled ;
    if(dateBar.className.includes('horizontal-dates-bar')){
        scrolled = dateBar.scrollWidth - dateBar.clientWidth
        dateBar.scrollTo(scrolled/4,0)
    }
    else{
        scrolled = dateBar.scrollHeight - dateBar.clientHeight
        dateBar.scrollTo(0,scrolled/2);
    }

}();

dateBar.addEventListener('scroll', function(e){
    if(dateBar.className.includes('horizontal-dates-bar')){

        if(dateBar.scrollLeft >= dateBar.scrollWidth - dateBar.clientWidth - 120 )
        UpcomingDate()
        else if(isScrollByGesture && dateBar.scrollLeft <= 35)
        PreviousDate ()
    }
    else{

        if(dateBar.scrollTop >= dateBar.scrollHeight - dateBar.clientHeight - 150 )
        UpcomingDateVertical()
        else if(isScrollByGesture && dateBar.scrollTop <= 35)
        PreviousDateVertical()
    }
})