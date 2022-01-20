
function LiveMatchesRequest(Btn=null){
    fetch(`/live-matches`, {method : "GET"})
    .then(res => res.json())
    .then(data => {
        if( data && Object.keys(data).length)
	        ManifestMatches(data,Btn)
	    else{
            inshortContainer.innerHTML = ''
            const dataHtml =`<div class='center' style='width:100%;height:100%;font-weight:bold;font-size:1.2rem;text-align:center;font-family:var(--font2);'>No Live Matches At this time!<br><br> You can go to Dates section to see matches.</div>`
            inshortContainer.insertAdjacentHTML('beforeend', dataHtml);
        }
    })
    .catch(err => {
        console.log(err);
        alert('Refresh Page.\n Something went wrong')
    })
}

LiveMatchesRequest()
