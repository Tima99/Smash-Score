const dotenv    = require('dotenv')
dotenv.config()

let fetch1      = null
import('node-fetch').then( ({default : fetch})=> {
    fetch1      = fetch
}).catch(err => console.log(err))

const http      = require('http')
const fs        = require('fs')
const path      = require('path')
const url       = require('url')
const PORT      = process.env.PORT || 8000;

const server = http.createServer( (req , res)=>{
    const queryUrl = url.parse(req.url , true).query
    const noQueryUrl = req.url.split('?')[0]

    if(req.url === "/"){
        fs.readFile("./index.html", "UTF-8", function(err, html){
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        });
    }else if(req.url.match("\.css$")){
        var cssPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);

    }else if(req.url.match("\.js$")){
        let jsPath = path.join(__dirname, req.url);
        let fileStream = fs.createReadStream(jsPath);
        res.writeHead(200, {"Content-Type": "application/javascript; charset=UTF-8"});
        fileStream.pipe(res);
    }else if(req.url.match("\.png$") || req.url.match("\.jpg$")){
        var imagePath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(imagePath);
        res.writeHead(200, {"Content-Type": "image/png"});
        fileStream.pipe(res);
    }else if(req.url == "/live-matches")
    {
        LiveMatchesRequest(res)
    }else if(noQueryUrl == "/date-by-matches" ){
        MatchesByDateRequest(queryUrl.date, res)
    }else if(noQueryUrl == "/detail-match"){
        MatchDetailRequest(queryUrl.eid, res)
    }else{
        res.writeHead(404, {"Content-Type": "text/html"});
        res.end("No Page Found");
    }
})

server.listen(PORT , ()=> console.log(`Server started at port ${PORT}`))

function MatchDetailRequest(eid,res,sports='cricket'){

    fetch1(`https://livescore6.p.rapidapi.com/matches/v2/detail?Eid=${eid-0}&Category=${sports}&LiveTable=false`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "livescore6.p.rapidapi.com",
		"x-rapidapi-key": process.env.API_KEY
	}
    })
    .then(response => response.json())
    .then(data =>{
        res.end(JSON.stringify(data));
    })
    .catch(err => {
        res.end(0)
    	console.error(err);
    });
}

function LiveMatchesRequest(res) {

	fetch1("https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=cricket", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "livescore6.p.rapidapi.com",
		"x-rapidapi-key": process.env.API_KEY
	}
	})
	.then(response => response.json() )
	.then(data => { 
        res.end(JSON.stringify(data.Stages));
	})
	.catch(err => {
        res.end(0)
    });
}

function MatchesByDateRequest(date, res){
    
    fetch1(`https://livescore6.p.rapidapi.com/matches/v2/list-by-date?Category=cricket&Date=${date}`, {
    	"method": "GET",
    	"headers": {
    		"x-rapidapi-host": "livescore6.p.rapidapi.com",
    		"x-rapidapi-key": process.env.API_KEY
    	}
    })
    .then(response => response.json())
    .then(data => {
        res.end(JSON.stringify(data.Stages));
    })
    .catch(err => res.end(0));
}
