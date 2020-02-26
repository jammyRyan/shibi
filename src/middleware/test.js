module.exports = (app) => {

	const delay = (timeountMS) => new Promise((resolve) => {
		setTimeout(resolve, timeountMS);
	});

    const mytest = async ()=>{
    	console.log("start");
    	
    		await delay(2000);
    	
    	console.log("end");
    }


  return function test(req, res, next) {
  	mytest();
    next();
  };
};
