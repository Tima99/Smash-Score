// const matchDetailContainer = document.querySelector('.content .full-match-card-container')
let refreshClick = 1;
const MatchDetailTemplate = function (data, eid , whichTeamBat) {
  const MatchId = eid;
  matchDetailContainer.innerHTML = "";
  if (!data || data.length == 0 || typeof data != "object") {
    const noResultMsg = `
        <div class='center' style='width:100%;height:100%;font-size:1.1rem;background:whitesmoke;font-family:var(--font1)'>No Result Found!</div>
        `;
    matchDetailContainer.innerHTML = noResultMsg;
    return;
  }

  const template = `
  <div class='scr-comentary-box'>
    
    <div class='match-summary-container'>
        <div class="match-head spc-btw head">
            <span class="match-type">${data[0].head}</span>
            <span class="venue-name">${data[0].venuenm}
            <div class="refresh-detail">
                <img src="./assets/refresh.png" alt="🔃" class="src" />
            </div>
            </span>
        </div>
        <div class="match-btw-container sub-head">${data[1]}</div>
        <div class="toss-detail sub-head3">
            ${data[2]}
        </div>
        <div class="match-status sub-head3">${data[3]}</div>
        <div class="match-main">
            <div class="scores sub-head1 flex-col ${whichTeamBat != data[4].nm ? 'flex-col-rev' : ''}">
                <span class="team t1-name sub-head1">
                    <div class='teamnm'>${data[4].nm}</div>   
                    <span class="seperator">:</span>
                    <div class="scr">
                        <span class="t1-s1 ${
                            data[4].inn2[0] ? 's1-low' : 's1'
                          }">
                            ${ (data[4].inn1[0] ?? 0) ?  `${data[4].inn1[0]}-${data[4].inn1[1]} (${data[4].inn1[2]})`: '- -'} 
                        </span>                                    
                        <span class="t1-s2 s2">
                            ${ (data[4].inn2[0] ?? 0) ?  ` & ${data[4].inn2[0]}-${data[4].inn2[1]} (${data[4].inn2[2]})`: (data[4].inn2[3] ?? 0 ? ' & Declared' : '')}  
                        </span>
                    </div>
                </span>

                <span class="team t2-name sub-head1">
                    <div class='teamnm'>${data[5].nm}</div>  
                    <span class="seperator">:</span>
                    <div class="scr">
                        <span class="t2-s1 s1 ${
                            data[5].inn2[0] ? 's1-low' : 's1'
                          }">
                            ${ (data[5].inn1[0] ?? 0) ?  `${data[5].inn1[0]}-${data[5].inn1[1]} (${data[5].inn1[2]})`: '- -'}     
                        </span>
                        <span class="t2-s2 s2">
                        ${ (data[5].inn2[0] ?? 0) ?  ` & ${data[5].inn2[0]}-${data[5].inn2[1]} (${data[5].inn2[2]})`: (data[5].inn2[3] ?? 0 ? ' & Declared' : '')} 
                        </span>
                    </div>
                </span>
            </div>
            <div class="strike-player-detail sub-head2 center">
                <span class="strike-batsman">
                    <span class="strike">*</span>
                        ${data[6].batsOnCrease[0] && data[6].batsOnCrease[0].Name}
                        ${data[6].batsOnCrease[0] && (data[6].batsOnCrease[0].R || 0)}<span class="ball-play">(${data[6].batsOnCrease[0] && (data[6].batsOnCrease[0].B || 0)})</span>
                    </span>

                <span class="strike-bowler">
                ${data[6].strikeBowler ? `*${data[6].strikeBowler.Name || ''}
                <span class="wkn">${data[6].strikeBowler.Wk ?? '0'}</span>-<span class="runb">${data[6].strikeBowler.R ?? '0'}(${data[6].strikeBowler.Ov})</span></span>`
                : ''}
            </div>
            <div class="recent-ovr-container sub-head1">
                <span class="recent-ovr center">

                </span>
            </div>
        </div>
        <div class="last-wk-container sub-head3">
            <span class="last-wk-tag">Last Wicket : </span>
            <span className="lstwk">${data[6].lstWk.length ? `${data[6].lstWk[0].Name} ${data[6].lstWk[0].R}(${data[6].lstWk[0].B}) ${data[6].lstWk[0].LpTx}` : ''}</span>
        </div>
        <div class="match-submation sub-head4">${data[8]}</div>
    </div>

    <div class="commentary-container">
        <div class="over-com-contain 89.6">
            <span class="over-ball sub-head1">${data[data.length-1].Ov}</span>
            <span class="bowTobat sub-head2">
                ${data[data.length-1].Oid || ''} to ${data[data.length-1].Aid || ''}
            </span>
            <div class="sumary sub-head4">${data[data.length-1].S || ''}
                <span class="comentary sub-head4">
                    ${data[data.length-1].T || ''}
                </span>        
            </div>
        </div>    
    </div>
</div>
    `;

  matchDetailContainer.innerHTML = template;

  
  let balls = data[7][1].length > 6 ? data[7][1].length : 6;
  let rctBox = document.querySelector('.recent-ovr-container .recent-ovr')
  while(balls-->0){
      let rctBallEle = `<span class="rpb b${balls} ${ data[7][0][balls] || (balls == data[7][0].length ? 'play-ball' : '') }">${data[7][1][balls] ?? ''}</span>`
      
      rctBox.insertAdjacentHTML( 'afterbegin',rctBallEle)
  }

  refreshClick = 1
  document.querySelector('.refresh-detail').addEventListener('click', function(data){
    if(refreshClick){
        this.style.filter = 'hue-rotate(120deg)'
        MatchDetailRequest(MatchId);
        refreshClick = 0;
    }
  })
};
export default MatchDetailTemplate;
// MatchDetailTemplate([0])
