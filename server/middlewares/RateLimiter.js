module.exports = (options)=> async (req, res, next)=>{
    try{
        redisclient = options.redisclient;
        limitNumber = options.limitNumber;
        limitTime = options.limitTime;
        method = options.method;
        errMessage = options.errMessage;
        reqList = JSON.parse(await redisclient.getAsync(req.ip+method))
        if(reqList !== null){
            const cur = Date.now();
            reqList = Object.values(reqList);
            while(reqList.length>0 && cur-reqList[reqList.length-1]>limitTime){
                reqList.pop();
            }
            if(reqList.length< limitNumber){
                reqList=[cur, ...reqList];
                await redisclient.setAsync(req.ip+method,JSON.stringify(reqList));
            } 
            else{
                return res.status(429).send({errMessage:errMessage});
            }
            
        }else{
            await redisclient.setAsync(req.ip+method,JSON.stringify([Date.now()]))
        }
        next();
    }catch(error){
        next(error);
    }
}