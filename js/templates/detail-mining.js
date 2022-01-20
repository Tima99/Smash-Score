// let {MatchDetailTemplate : DetailTemplate}= require('./match-detail.js')

let match = [
    {head : '', venuenm : ''}, // head
    null, //matchbtw
    null, //toss
    null, //mtch status
    {
        id : 'T1',
        nm : '',
        inn1 : [ ], // [r , w , o, declared]
        inn2 : [ ]
    },
    {
        id : 'T2',
        nm : '',
        inn1 : [ ], // [r , w , o, dec]
        inn2 : [ ]
    },
    {
        batsOnCrease : '', 
        strikeBowler : '',
        lstWk        : ''
    },
    [], // recent over
    '',  // match sum  in one line
    ''
];

let players = [];

let data = null;
export default function MatchDetailMining(matchdata){
    data = matchdata;
    if(!(data.Lu && data.Prns)) {
        const noResultMsg = `
        <div class='center' style='width:100%;height:100%;font-size:1.1rem;background:whitesmoke;font-family:var(--font1);padding:1rem;text-align:center;'>Sorry , May be match not started yet. <br><br> This match have not complete data, we are not able  to show it.</div>
        `;
        matchDetailContainer.innerHTML = noResultMsg;
        return;
    }

    Mine()

    import('./match-detail-template.js')
    .catch(err => console.log(err))
    .then( ({default : DetailTemplate })=>{
        DetailTemplate(match, data.Eid, teamBat)
    })

    import('./playing-11-template.js')
    .catch(err => console.log(err))
    .then( ({default : Playing11Template })=>{
        Playing11Template(players)
    })
}
let teamBat;
function Mine(){

    const team1Name = data.T1[0].Nm
    const team2Name = data.T2[0].Nm

    teamBat = data.SDInn[data.SDInn.length-1].Tn == 1 ? team1Name : team2Name
    /** Team 1 Run */

    match[4] = {
        nm : team1Name,
        inn1 : [data.Tr1C1, data.Tr1CW1, data.Tr1CO1 , data.Tr1CD1 || null],
        inn2 : [data.Tr1C2, data.Tr1CW2, data.Tr1CO2 , data.Tr1CD1 || null]
    } 

    /** Team 2 Run */
    match[5] = {
        nm : team2Name,
        inn1 : [data.Tr2C1, data.Tr2CW1, data.Tr2CO1 , data.Tr2CD1 || null],
        inn2 : [data.Tr2C2, data.Tr2CW2, data.Tr2CO2 , data.Tr2CD1 || null]
    }
    match[0].head = data.Stg.Cnm // match type
    match[0].venuenm = data.Vnm + ', ' + data.VCnm
    match[1] = (data.Stg.Snm || data.Stg.Sdn).concat(` | ${data.ErnInf || data.EtTx || ''}`); // match between

    const toss = data.TPa == 1 || data.Tpa == 1 ? `${team1Name} won the toss and ${data.TCho==1 ? 'bat' : 'bowl'} first` :  `${team2Name} won the toss and ${data.TCho==1 ? 'bat' : 'bowl'} first` 
    match[2] = toss;

    // recent inings
    const recentInn = data.SDInn.length - 1
    const inn  = recentInn

    // Match Status
    match[3] = data.EpsL.concat(' | ',data.SDInn[inn].Ti )// match status
    
    match[8] = data.ECo //match sum

    // Recent Over
    let recentOvr = data.SDInn[inn].Ovr && data.SDInn[inn].Ovr[0].OvT 
    let ovr = ['dot', 'run', 'run','run', 'four', 'run' ,'six']
    let rctover = [[],[]]
    recentOvr && recentOvr.forEach(ball => {
        let key = isNaN(ball-0) ? ball :  ovr[ball] || 'run'
        rctover[0].push(key)
        rctover[1].push(ball)
    })

    match[7] = rctover[0].length ? rctover : null

    //TODO : Team batting and bowling recent

    const bats = data.SDInn[inn].Bat.map((bat) =>{
        const ply = data.Prns.find( ({Pid}) => Pid == bat.Pid);
        bat.Name = ply.Fn.concat(' ',ply.Ln)
        return bat;
    });
    
    const bowl = data.SDInn[inn].Bow.map((bowl) =>{
        const ply = data.Prns.find( ({Pid}) => Pid == bowl.Pid);
        bowl.Name = ply.Fn.concat(' ',ply.Ln)
        return bowl;
    });
    
    // TODO : Team Innings batting bowling 
    //******** Mine PLayers  ******//
    let inns1 = data.SDInn.filter( ({Inn}) => Inn == 1)
    let inns2 = data.SDInn.filter( ({Inn}) => Inn == 2)

    let batsInns = []
    let bowsInns = []

    let batsInns2 = []
    let bowsInns2 = []


    let inns1Count = inns1.length
    while(inns1Count-- > 0){
        const tbN = inns1[inns1Count].Tn
        let indexoftbN = data.Lu.findIndex(({Tnb}) => Tnb == tbN)


        let batInn = inns1[inns1Count].Bat.map((bat) =>{
            const ply = data.Lu[indexoftbN].Ps.find( ({Pid}) => Pid == bat.Pid);
            bat.Name = ply.Snm || ply.Shnm
            bat.sName = ply.Fn[0].concat(' ', ply.Ln)
            
            let field = data.Lu[1-indexoftbN].Ps.find( ({Pid}) => Pid == bat.Fid)
            bat.Fid = field && (field.Snm || field.Shnm)
    
            let bowler = data.Lu[1-indexoftbN].Ps.find( ({Pid}) => Pid == bat.Bid)
            bat.Bid = bowler && (bowler.Snm || bowler.Shnm)
    
            bat.LpTx = bat.LpTx.replace('[F]', bat.Fid)
            bat.LpTx = bat.LpTx.replace('[B]', bat.Bid)
            return bat;
        });
        batsInns.unshift(batInn)
        batsInns[0].Name = inns1[inns1Count].Tn == 1 ? team1Name : team2Name;
        batsInns[0].Tag  = inns1[inns1Count].Ti

        let bowInn = inns1[inns1Count].Bow.map((bowl) =>{
            const ply = data.Lu[1 - indexoftbN].Ps.find( ({Pid}) => Pid == bowl.Pid);
            bowl.Name = ply.Snm || ply.Shnm
            bowl.sName = ply.Fn[0].concat(' ', ply.Ln)
            return bowl;
        });
        bowsInns.unshift(bowInn)
        bowsInns[0].Name = inns1[inns1Count].Tn != 1 ? team1Name : team2Name;
    }

    let inns2Count = inns2.length
    // console.log(inns2Count);
    while(inns2Count-- > 0){

        const tbN = inns2[inns2Count].Tn
        let indexoftbN = data.Lu.findIndex(({Tnb}) => Tnb == tbN)

        let batInn = inns2[inns2Count].Bat.map((bat) =>{
            const ply = data.Lu[indexoftbN].Ps.find( ({Pid}) => Pid == bat.Pid);
            bat.Name = ply.Snm || ply.Shnm
            bat.sName = ply.Fn[0].concat(' ', ply.Ln)

            let field = data.Lu[1-indexoftbN].Ps.find( ({Pid}) => Pid == bat.Fid)
            bat.Fid = field && (field.Snm || field.Shnm)
    
            let bowler = data.Lu[1-indexoftbN].Ps.find( ({Pid}) => Pid == bat.Bid)
            bat.Bid = bowler && (bowler.Snm || bowler.Shnm)
    
            bat.LpTx = bat.LpTx.replace('[F]', bat.Fid)
            bat.LpTx = bat.LpTx.replace('[B]', bat.Bid)
            return bat;
        });
        batsInns2.unshift(batInn)
        batsInns2[0].Name = inns2[inns2Count].Tn == 1 ? team1Name : team2Name;
        batsInns2[0].Tag  = inns2[inns2Count].Ti

        let bowInn = inns2[inns2Count].Bow.map((bowl) =>{
            const ply = data.Lu[1 - indexoftbN].Ps.find( ({Pid}) => Pid == bowl.Pid);
            bowl.Name = ply.Snm || ply.Shnm
            bowl.sName = ply.Fn[0].concat(' ', ply.Ln)

            return bowl;
        });
        bowsInns2.unshift(bowInn)
        bowsInns2[0].Name = inns2[inns2Count].Tn != 1 ? team1Name : team2Name;

    }
    

    // const teamNumber = data.SDInn[0].Tn // for 1st inn index 0
    let playing11  = [ {Inn : 1,  bats : batsInns, bowl : bowsInns }, {Inn : 2,  bats : batsInns2, bowl : bowsInns2 }]
    Object.keys(playing11[1].bats).length == 0 ? playing11.pop() : '' 
    Object.keys(playing11[0].bats).length == 0 ? playing11 = [] : '' 
    // playing11 = []
    players = playing11
    // console.log(players)

    
    // recent bowler
    const rBowlId = data.SDInn[inn].Com && data.SDInn[inn].Com[0].Oid - 1 && data.SDInn[inn].Com[1].Oid
    const rBowl   = bowl.find( ({Pid}) => Pid == rBowlId)
    // let ovrBallCount = (data.SDInn[inn].Ov * 10 % 10) 
    // if(rBowl)
    // rBowl.Ov = rBowl.Ov + ovrBallCount/10 
    // console.log(rBowl);

    match[6].strikeBowler = rBowl;


    // how to gets strike batsman and crease batsman
    const batsOnCrease = bats.filter( ({LpTx}) => LpTx == 'not out')

    match[6].batsOnCrease = batsOnCrease

    // last wicket 
    const lstWk = data.SDInn[inn].FoW && data.SDInn[inn].FoW[0]
    const batsOut = lstWk && [bats.find(({Pid}) => Pid == lstWk.Pid)]
    batsOut && batsOut.map( (obj)=>{
        let field = data.Prns.find( ({Pid}) => Pid == obj.Fid)
        obj.Fid = field && field.Fn[0].concat(' ', field.Ln)
        // console.log(field , obj , field);

        let bowler = data.Prns.find( ({Pid}) => Pid == obj.Bid)
        obj.Bid = bowler && bowler.Fn[0].concat(' ', bowler.Ln)

        obj.LpTx = obj.LpTx.replace('[F]', obj.Fid)
        obj.LpTx = obj.LpTx.replace('[B]', obj.Bid)

    })


    match[6].lstWk= batsOut 

    // commentary
    const comentary = data.SDInn[inn].Com && [data.SDInn[inn].Com[1]]
    comentary && comentary.map( obj => {
        let bowler  = data.Prns.find(({Pid}) => Pid == obj.Oid)
        bowler = bowler && bowler.Fn.concat(' ', bowler.Ln)
        let batsman = data.Prns.find(({Pid}) => Pid == obj.Aid)
        batsman = bowler && batsman.Fn.concat(' ', batsman.Ln)

        obj.Oid = bowler  || null
        obj.Aid = batsman || null
    })
    if(comentary)
    match.push(comentary[0])
    else
    match.push(null)
}
