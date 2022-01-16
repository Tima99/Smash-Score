window.MatchDetailRequest = function(eid=542379,sports='cricket'){
    
    fetch(`/detail-match?eid=${eid}&sports=${sports}`, 
    {
        method : "GET",
    })
    .then(res => res.json())
    .then(data => {
        if( data && Object.keys(data).length)
        {
            import('../templates/detail-mining.js')
            .catch( err => console.log(err))
            .then(( {default : MatchDetailMining} )=>{
                MatchDetailMining(data)
            })
        }
	    else
	        alert('Refresh Page.\n Something went wrong')
    })
    .catch(err => alert('Refresh Page.\n Something went wrong'))

}





// MatchDetailRequest()

// Start of New Zealand Innings. Hello everyone, welcome to the second and the series decider game between New Zealand and Bangladesh live from Hagley Oval, Christchurch. Bangladesh have won the first game and will be confident with their victory. On the other side a must-win game for New Zealand, so they will come up with different game plans to seal this game. Bangladesh have won the toss and elected to bowl. Here we go.