const liveIcon         = document.querySelector('.nav2 .live-match-icon')
const calendarIcon     = document.querySelector('.nav2 .drop-dates-btn')
// const starredIcon      = document.querySelector('.nav2 .starred-icon')


//* On Date Click
let prevActiveDate = null; // previous click date block
let prevActiveIcon = liveIcon;

function ClickDate(btn){
    if(btn == prevActiveDate) return;
    btn.classList.add('active-click');
    prevActiveDate && prevActiveDate.classList.remove('active-click')
    prevActiveDate = btn;

    prevActiveIcon.classList.remove('active-icon')

    // request to api by date
    let date = new Date(btn.innerText).toLocaleDateString().toString().split('/');
    let dateRequireFormat = date[2] + date[0].padStart(2,'0') + date[1].padStart(2 ,'0')
    // require format is yyyymmdd
    Skeleton()
    MatchesByDateRequest(dateRequireFormat, calendarIcon.firstElementChild)
}

/// skeleton

function Skeleton(){
    inshortContainer.innerHTML = ''
    const skeleton = `
        <div class="skeleton">
            <div class="scale"><span class="loader"></span></div>
            <div class="scale scale-20"><span class="loader"></span></div>
            <div class="scale scale-35"><span class="loader"></span></div>
            <div class="scale scale-35"><span class="loader"></span></div>
            <div class="scale scale-75"><span class="loader"></span></div>
        </div>
    `
    let count = 2
    while(count--> 0)
        inshortContainer.insertAdjacentHTML('afterbegin', skeleton);
}
function Skeleton1(){
    matchDetailContainer.innerHTML = ''
    const skeleton = `
        <div class="skeleton">
            <div class="scale"><span class="loader"></span></div>
            <div class="scale scale-20"><span class="loader"></span></div>
            <div class="scale scale-35"><span class="loader"></span></div>
            <div class="scale scale-35"><span class="loader"></span></div>
            <div class="scale scale-75"><span class="loader"></span></div>
        </div>
    `
    let count = 2
    while(count--> 0)
        matchDetailContainer.insertAdjacentHTML('afterbegin', skeleton);
}
//* On Calendar Icon Click 

calendarIcon.onclick = function(){
    if(dateBar.className.includes('horizontal-dates-bar'))
        MobileDesign(calendarIcon)
    else
        DesktopDesign(calendarIcon)

}

function MobileDesign(ele){
    prevActiveDate && prevActiveDate.scrollIntoView(false)

    dateBar.classList.toggle('active-nav-container')
    iconContainer.classList.toggle('active-nav-container')

    ele.classList.toggle('move-calendar-icon')
    if(ele.className.includes('move-calendar-icon'))
        iconContainer.style.visibility='hidden'
    else
        iconContainer.style.visibility='visible'

    ele.firstElementChild.classList.add('active-icon')
    prevActiveIcon !== ele.firstElementChild && prevActiveIcon.classList.remove('active-icon')
    prevActiveIcon = ele.firstElementChild
}

function DesktopDesign(ele){
    prevActiveDate && prevActiveDate.scrollIntoView(true)

    dateBar.classList.toggle('show-vertical-dates-bar')

    ele.classList.add('active-icon')
    prevActiveIcon !== ele && prevActiveIcon.classList.remove('active-icon')
    prevActiveIcon = ele
}

// * On Live Icon Btn click
liveIcon.addEventListener('click', function(){
    if(this.className.includes('active-icon')) return;

    this.classList.add('active-icon')
    prevActiveIcon.classList.remove('active-icon')
    dateBar.classList.remove('show-vertical-dates-bar')

    prevActiveIcon = this;

    prevActiveDate && prevActiveDate.classList.remove('active-click')
    prevActiveDate = this
    // console.log('Click live');
    Skeleton();
    LiveMatchesRequest(liveIcon)
})

// * starred click
// starredIcon.addEventListener('click', function(){
//     this.classList.add('active-icon')
//     prevActiveIcon !== this && prevActiveIcon.classList.remove('active-icon')
//     prevActiveIcon = this
//     dateBar.classList.remove('show-vertical-dates-bar')
// })

// *back button click
