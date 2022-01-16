

// Auto refresh switch
let isAutoRefresh = (localStorage.getItem('isAutoRefresh') ?? false) - 0; // type1 convert str to number
let timeToRefresh = Math.floor(localStorage.getItem('timetoRefresh') ?? 10000); // type2 convert str to number
let refreshTimeout = null;

const toggleBtn = document.querySelector('.switch-track')
AutoRefreshToggle(toggleBtn, 0);

toggleBtn.onclick = function(){ AutoRefreshToggle(this) }

function AutoRefreshToggle(btn, isGesture = 1){
    isGesture ? btn.classList.toggle('active-switch') : isAutoRefresh ? btn.classList.add('active-switch') : '';
    isAutoRefresh = isGesture ? true - isAutoRefresh : isAutoRefresh;
    localStorage.setItem('isAutoRefresh', isAutoRefresh)
    if(isAutoRefresh) AutoRefresh()
    else clearTimeout(refreshTimeout)
}

function AutoRefresh(){
    refreshTimeout = setTimeout(()=>{
        location.reload()
    }, timeToRefresh)
}

// drop-down-menu

const dropMenu = document.querySelector('.value')
const drops = document.querySelectorAll('.drop')

dropMenu.innerHTML = `${timeToRefresh/1000}s`

drops.forEach(function(drop){
    drop.onclick = ()=>{
        timeToRefresh = ( drop.innerHTML.slice(0,-1) - 0 ) * 1000;
        dropMenu.innerHTML = drop.innerHTML
    
        localStorage.setItem('timetoRefresh', timeToRefresh);
    
        clearTimeout(refreshTimeout)
        isAutoRefresh-0 ? AutoRefresh() : '';
    }
})


