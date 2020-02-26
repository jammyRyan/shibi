const moment = require('moment');
const WebSocket = require('ws');
const pako = require('pako');

module.exports = (app) => {
	const WS_URL = 'wss://api.huobi.pro/ws';
	var ws = new WebSocket(WS_URL);
    init(ws);
	// console.log(app);
	// console.log(moment.unix(from).format());
	// console.log(moment().format('X'));

	const start = async ()=>{
		let from = await getFrom();
		let to = getTo(from);

		console.log("from:"+ from + " to: "+to);
		if(checkFrom(from)){
			subscribe(ws,from,to);
		}
	}

	const checkFrom = (from)=>{
		let now = Number(moment.unix(Date()).format('X'));
		if(now - from < 3600){
			return false;
		}
		return true;
	}

	const getFrom = async ()=>{
		let last = await app.service('kline-real-btc').find({
			query:{
				$limit:1,
				$sort:{
					id:-1
				}
			}
		});
		
		let from = 0;

		if(last.data[0]){
			from = Number(last.data[0].id) + 60;
		}
		else{
			from = 1559318400;
		}

		//console.log("from:"+from +" to "+getTo(from));

		return from;
	}

	const getTo = from =>{
		return Number(moment.unix(from).add(299,'m').format('X'));
		// return from + 432000 - 300;
	}

	const handle =async (kline)=> {
		//console.log(app);
		// console.log(kline);
		const klineSv = app.service('kline-real-btc');
	    for(let candle of kline){
	    	// console.log(candle);
	    	await klineSv.create(candle);
	    }

	    await delay(5000);

	    start();
	}

	const delay = (timeountMS) => new Promise((resolve) => {
		setTimeout(resolve, timeountMS);
	});

	function subscribe(ws,from,to) {
	    var symbols = ['btcusdt'];
	    // 订阅K线
	    let msg1 = JSON.stringify({
	        "req": "market.btcusdt.kline.1min",
	        "id": from,
	        "from":from
	    });
	    // let msg1 = JSON.stringify({
	    //     "sub": "market.BTC_CQ.kline.1min",
	    //     "id": "id1"
	    // });
	    // console.log(msg1);
	    ws.send(msg1);
	}

	function init(ws) {    
	    ws.on('open', () => {
	        console.log('open');
	        // subscribe(ws);
	    });
	    ws.on('message', (data) => {
	        let text = pako.inflate(data, {
	            to: 'string'
	        });
	        let msg = JSON.parse(text);
	        if (msg.ping) {
	            console.log(msg);
	            ws.send(JSON.stringify({
	                pong: msg.ping
	            }));
	            //subscribe(ws);
	        } else if (msg.status == 'ok') {
	            console.log(msg);
	            handle(msg.data);
	        } else {
	            console.log(text);
	        }
	    });
	    ws.on('close', () => {
	        console.log('close');
	        init();
	    });
	    ws.on('error', err => {
	        console.log('error', err);
	        init();
	    });
	}

	return function huobiMin(req, res, next) {
		// let from = getFrom();
		// let from = 1559318400;
		// let to = getTo(from);
		start();
		//更新截止 1577946000
		// subscribe(ws,from,to);

		//console.log(from);
		//console.log(app);
		// init();
    	next();
  	};
};
