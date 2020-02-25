module.exports = (app) => {
	
	const start = async ()=>{
		let up = [];
		let down = [];
		let upCount = 0;
		let downCount = 0;
		let upRate = [];
		let downRate = [];
		let total = await getTotal();
		//console.log(total);

		for(let t of total){
			if(t.type =='up'){
				up[t.total] = t.count;
				upCount = upCount + t.count;
			}
			else{
				down[t.total] = t.count;
				downCount = downCount + t.count;
			}
		}

		let temp = 0;
		for(let i in down){
			temp += down[i];
			let rate = {
				type: i,
				rate: (downCount - temp)/((downCount - temp) + down[i])
			};
			downRate.push(rate);
		}

		temp = 0;
		for(let i in up){
			temp += up[i];
			let rate = {
				type: i,
				rate: (downCount - temp)/((downCount - temp) + up[i])
			};
			upRate.push(rate);
		}

		console.log(upRate);
		console.log(downRate);
	}

	const getTotal = async ()=>{
		let total = await app.service('huobi-total').find({
			paginate:false
		});

		return total;
	}

  	return function count(req, res, next) {
  		start();
    	next();
  	};
};
