// import 
let iconBtn = {
    backBtn : false,
}
let firstTime = 1;
// console.log(MatchDetailRequest);
function ManifestMatches(matches, btn=liveIcon) {
    if(btn == null)
        btn = liveIcon

    inshortContainer.innerHTML = ''
    // if(iconBtn.backBtn){
    //     matchDetailContainer.classList.remove('active-content-dis')
    //     inshortContainer.classList.add('active-content-dis')
    //     DefaultIcon(btn)
    // }
    if(matches.length == 0){
        const dataHtml =`
        <div class='center' style='width:100%;height:100%;font-weight:bold;font-size:1.1rem;text-align:center;font-family:var(--font2);'>No Result Found!</div>
        `
        inshortContainer.insertAdjacentHTML('beforeend', dataHtml);
        return;
    }
    matches.forEach((match , index) => {
        let eventsCount = match.Events.length
        while(eventsCount-- > 0){
        const events = match.Events[eventsCount]
        const dataHtml = `
        <div id='${events.Eid}' class='match-box'>
            <div class='head type'>${match.Cnm}</div>
            <div class='head series-sumary'>
                <span>${match.Snm}</span>  
                ${(events.ErnInf || events.EtTx)? '|' : ''}
                <span>${events.ErnInf || events.EtTx || ''}</span>
            </div>
            <div class='sub-head day'>${events.EpsL}</div>

            <div style='opacity:${events.Tr1C1 ? 1 : 0.5}'>
                <span class='team-name'>${events.T1[0].Nm}</span> : 
                <span class='score'>
                    ${events.Tr1C1 ?? '-'}-${events.Tr1CW1 ?? '-'}
                    ${ events.Tr1C2 ? '& ' +events.Tr1C2 + '-' + events.Tr1CW2 : ''} </span>  
                <span class='overs'>${ (events.Tr1CO1 || events.Tr1CO2) ? '( ' + (events.Tr1CO2 ?? events.Tr1CO1) +' )' : ''}</span> 
            </div>

            <div style='opacity:${events.Tr2C1 ? 1 : 0.5}'>
                <span class='team-name'>${events.T2[0].Nm}</span> : 
                <span class='score'>
                    ${events.Tr2C1 ?? '-'}-${events.Tr2CW1 ?? '-'}  
                    ${ events.Tr2C2 ? '& ' +events.Tr2C2 + '-' + events.Tr2CW2 : ''} 
                </span>  
                <span class='overs'>${ (events.Tr2CO1 || events.Tr2CO2) ? '( ' + (events.Tr2CO2 ?? events.Tr2CO1) +' )' : ''}</span> 
            </div>

            <div class='match-summary'>${events.ECo ? events.ECo : ''}</div>
   
        </div>
        `
        inshortContainer.insertAdjacentHTML('beforeend', dataHtml);

        document.getElementById(`${events.Eid}`).addEventListener('click', ()=>{
            ShowMatchDetail(btn, events.Eid)
        })
        }
    });

}

function ShowMatchDetail(btn, eid){
    Skeleton1()
    MatchDetailRequest(eid)
    if(document.body.clientWidth < 1200){
        matchDetailContainer.classList.toggle('active-content-dis')
        inshortContainer.classList.toggle('active-content-dis')
    }
    else{
        matchDetailContainer.style.display = 'flex'
    }
    if(!btn) return;
    if(document.body.clientWidth < 1200){
        iconBtn.backBtn = 1
        btn.firstElementChild.src = './assets/left-turn-arrow.png'
        btn.firstElementChild.classList.add('back-btn')
        btn.addEventListener('click', function(){
            if(iconBtn.backBtn){
                inshortContainer.classList.add('active-content-dis')
                matchDetailContainer.classList.remove('active-content-dis')
                DefaultIcon(this)

                iconBtn.backBtn = false
            }
        })
    }
}

function DefaultIcon(btn){
    if(!btn) return;
        liveIcon.firstElementChild.src = './assets/live-streaming.png'
    if(!btn.className.includes('live-match-icon')){
            btn.firstElementChild.src = './assets/calendar.png'
    }
}