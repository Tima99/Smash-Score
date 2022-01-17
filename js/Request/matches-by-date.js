
function MatchesByDateRequest(date , Btn){
    
    fetch(`/date-by-matches?date=${date}`, {method : "GET"})
    .then(res => res.json())
    .then(data => {
        if( data && Object.keys(data).length)
	        ManifestMatches(data,Btn)
	    else
	        alert('Refresh Page.\n Something went wrong')
    })
    .catch(err => alert('Refresh Page.\n Something went wrong'))
}

