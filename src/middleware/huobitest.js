module.exports = (app) => {
	let result = {
		skip:0,
		run:{
			type:'up',
			count:0,
			avg:0
		}
	};

	const startCount = async ()=>{
		while(await getResult()){
			console.log(result.skip);
		}
	}

	const getKline = async (skip)=>{
		let limit =1000;
		skip = limit * skip;

		let kline = await app.service('kline-btc').find({
			query:{
				$limit: limit,
				$skip: skip,
				$sort:{id:1}
			},
			paginate: false
		});

		return kline;
	}

	const getResult = async ()=>{
		let kline = await getKline(result.skip);

		// console.log(kline.length);
		if(kline[0]){
			await dealData(kline);
		}
		else{
			console.log(result);
			return false;
		}

		result.skip = result.skip + 1;
		return true;
		//getResult();
	}

	const dealData = async (kline) =>{
		let type = 'up';
		for(let candle of kline){
			if(candle.close - candle.open > 0){
				type = 'up'
			}
			else{
				type = 'down';
			}

			if(result.run.type == type){
				result.run.count = result.run.count + 1;

				if(!result.run.start) result.run.start = candle.id;
				if(!result.run.open) result.run.open = candle.open;

				//result.run.avg = result.run.avg * result.run.count + (candle.close - candle.open)/candle.open
			}
			else{
				let totalSev = app.service('huobi-total');
				let detailSev = app.service('huobi-detail');

				let total = await totalSev.find({
					query:{
						type:result.run.type,
						total:result.run.count
					}
				}).then(res=>{
					return res.data[0];
				});

				if(total){
					// console.log(total);
					await totalSev.patch(total._id,{
						count:total.count + 1
					});
				}
				else{
					total = await totalSev.create({
						type:result.run.type,
						total:result.run.count,
						count:1
					});
				}

				let range = (candle.open - result.run.open)/result.run.open;
				let avg = range / result.run.count;

				await detailSev.create({
					totalId: total._id,
					start: result.run.start,
					end: candle.id - 60,
					type: result.run.type,
					count: result.run.count,
					open: result.run.open,
					close: candle.open,
					range: range,
					avg: avg
				});


				result.run.type = type;
				result.run.count = 1;
				result.run.open = candle.open;
				result.run.start = candle.id;
			}
		}
	}

  	return function huobitest(req, res, next) {
  		result.skip = 0;
  		startCount();
    	next();
  	};
};
