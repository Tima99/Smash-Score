let script=null;

const Playing11Template = function(players){
    // console.log(players);
    const ply11Template = `    
<div class="playing-11-container" >
    <div class="innings">
        <span class="inn-1 inn active-inn" style='display: none;'>Inning 1</span>
        <span class="inn-2 inn" style='display: none;'>Inning 2</span>
    </div>
    <div class="play11-contain active-play-11" id='inn0'>
        
    </div>

    <div class="play11-contain" id='inn1' style='display : none;'>
        
    </div>
    
    <div class="navigate-buttons">
        <button class="left" onclick='left()' >
            <img src="./assets/right-arrow.png" alt="⬅" onclick="left(this)">
        </button>

        <button class="right" onclick='right()' >
            <img src="./assets/right-arrow.png" alt="➡" onclick="right(this)">
        </button>
    </div>
</div>

`
    matchDetailContainer.insertAdjacentHTML('beforeend', ply11Template)
    
    CreatePlay11(players)
    .catch( err => console.log(err))
    .then( data => {
        setTimeout(()=>{
        if(script)
        document.body.removeChild(script)
        
        script = document.createElement('script')
        script.src = './js/UI/playing-11.js'
        script.id= 'playing-11-script'
        document.body.appendChild(script)
        }, 1500)
    })
    
}

function CreatePlay11(players){
    return (new Promise((resolve, reject)=>{
    
        function create(){
            const inn1 = 0; 
    
            const inn1Contain = document.querySelector('.play11-contain#inn0')
            const inn2Contain = document.querySelector('.play11-contain#inn1')

            const innNavigateBtns = document.querySelectorAll('.inn')
            const totalInn = players.length
            let count = -1
            while(count++ < totalInn-1){
                innNavigateBtns[count].style.display = 'inline-block'
                const teamPlayedInn = players[count].bats.length
                let count1 = -1
                while(count1++ < teamPlayedInn - 1){
                    const temp = `<div class="t${count1} inn1 team">
                                    <div class="t1-nm t-nm" style='text-indent: .5rem;'>${players[count].bats[count1].Name} | ${players[count].bats[count1] ? players[count].bats[count1].Tag : ''}</div>

                                    <div class="col-info-section flex">
                                        <span class="ply-nm">Bats(Name)</span>
                                        <span class="run-ball">R(B)</span>
                                        <span class="four">4's</span>
                                        <span class="six">6's</span>
                                        <span class="sr">SR</span>
                                    </div>
                                    <div class="playing-players batsman"></div>

                                    <div class="t1-nm t-nm" style='text-indent: .5rem;'>${players[count].bowl[count1].Name}</div>
                                    <div class="col-info-section flex">
                                        <span class="ply-nm">Bow(Name)</span>
                                        <span class="run-ball">W-R</span>
                                        <span class="four">O</span>
                                        <span class="six">M</span>
                                        <span class="sr">Ec.</span>
                                    </div>
                                    <div class="playing-players bowlers"></div>
                                </div>`
                      if(count >= 1)
                        inn2Contain.insertAdjacentHTML('beforeend', temp)      
                      else
                        inn1Contain.insertAdjacentHTML('beforeend', temp)      
                }
            }

            count = totalInn

            while(count-- > 0){
            const bats  = players[count].bats[0]
            const bats2 = players[count].bats[1]
        
            const playerCounts = bats.length
            const team1batsContainer = document.querySelector(`#inn${count} .t0 .batsman`)
            const inn2batsContainer  = document.querySelector(`#inn${count} .t1 .batsman`)

            let loop = playerCounts
            while(loop-->0){
                const ply = `<div class="ply-info-section ${((bats[loop].LpTx != 'did not bat' && bats[loop].LpTx != 'yet to bat') && bats[loop].LpTx!='not out')? 'outply' : 'notout0'}">
                                <div class="ply-nm">${bats[loop].Pl===1 ? `<span style='color:navy;'>* ${bats[loop].sName}</span>` :bats[loop].sName}
                                </div>
                                <div class='${((bats[loop].LpTx != 'did not bat' && bats[loop].LpTx != 'yet to bat') && bats[loop].LpTx!='not out')? 'outby' : 'notout'}'>${(bats[loop].LpTx != 'did not bat' && bats[loop].LpTx != 'yet to bat' && bats[loop].LpTx!='not out') ? bats[loop].LpTx : ''}</div>
                                <span class="run-ball bat-stats">
                                    <span class="runs">${bats[loop].R ?? ''}</span>
                                    <span class="balls">${bats[loop].B ?? 0 ? `(${bats[loop].B})` : ''}</span>
                                </span>
                                <span class="four bat-stats">${bats[loop].$4 ?? ''}</span>
                                <span class="six bat-stats">${bats[loop].$6 ?? ''}</span>
                                <span class="sr bat-stats">${bats[loop].Sr ?? ''}</span>
                                <span class="ytb ${(bats[loop].LpTx != 'did not bat' && bats[loop].LpTx != 'yet to bat') ? 'bat' : ''}">yet to bat</span>
                            </div>`
                if(bats2){
                const ply2 = `<div class="ply-info-section ${((bats2[loop].LpTx != 'did not bat' && bats2[loop].LpTx != 'yet to bat') && bats2[loop].LpTx!='not out')? 'outply' : 'notout0'}">
                                <div class="ply-nm">${bats2[loop].Pl===1 ? `<span style='color:navy;'>*${bats2[loop].sName}</span>` : bats2[loop].sName}</div>

                                <div class='${((bats2[loop].LpTx != 'did not bat' && bats2[loop].LpTx != 'yet to bat') && bats2[loop].LpTx!='not out')? 'outby' : 'notout'}'>${((bats2[loop].LpTx != 'did not bat') && bats2[loop].LpTx != 'yet to bat' && bats2[loop].LpTx!='not out') ? bats2[loop].LpTx : ''}</div>

                                <span class="run-ball bat-stats">
                                    <span class="runs">${bats2[loop].R ?? ''}</span>
                                    <span class="balls">${bats2[loop].B ?? 0 ? `(${bats2[loop].B})` : ''}</span>
                                </span>
                                <span class="four bat-stats">${bats2[loop].$4 ?? ''}</span>
                                <span class="six bat-stats">${bats2[loop].$6 ?? ''}</span>
                                <span class="sr bat-stats">${bats2[loop].Sr ?? ''}</span>
                                <span class="ytb ${(bats2[loop].LpTx != 'did not bat' && bats2[loop].LpTx != 'yet to bat') ? 'bat' : ''}">yet to bat</span>
                                </div>`
                                inn2batsContainer && inn2batsContainer.insertAdjacentHTML('afterbegin', ply2)
                }
                team1batsContainer && team1batsContainer.insertAdjacentHTML('afterbegin', ply)
            }


            const in1b2 =players[count].bowl[1] && players[inn1].bowl[1].length
            const in1b1 =players[count].bowl[0].length

            const playerCounts2 =  in1b1 >= (in1b2 ?? 0) ? in1b1 : in1b2 
            const bowlContainer0 = document.querySelector(`#inn${count} .t0 .bowlers`)
            const bowlContainer1 = document.querySelector(`#inn${count} .t1 .bowlers`)

            let loop2 = playerCounts2
            let loopinner = players[count].bowl.length

            while(loop2-->0){
                while(loopinner-- > 0){
                    const bowl = players[count].bowl[loopinner];

                    if(!bowl[loop2]) continue;
                    const ply = `<div class="ply-info-section">
                                    <span class="ply-nm">${bowl[loop2].sName || ' '}</span>
                                    <span class="run-ball no-bowl">
                                        <span class="runs">${bowl[loop2].Wk}-</span>
                                        <span class="balls">${bowl[loop2].R}</span>
                                </span>
                                <span class="four no-bowl">${bowl[loop2].Ov}</span>
                                <span class="six no-bowl">${bowl[loop2].Md}</span>
                                <span class="sr no-bowl">${bowl[loop2].Er || 0}</span>
                                <span class="ytbo">yet to bowl</span>
                            </div>`
                loopinner ? bowlContainer1 && bowlContainer1.insertAdjacentHTML('afterbegin', ply) : bowlContainer0 && bowlContainer0.insertAdjacentHTML('afterbegin', ply)
            }
            loopinner = players[count].bowl.length
        }
        }

        return true;
        }

        if(create())
            resolve('done');
        else
            reject('not done')
    })
    )
}


export default Playing11Template;