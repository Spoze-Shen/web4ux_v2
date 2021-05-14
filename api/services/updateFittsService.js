module.exports = {
    updateFitts:function(obj){
        FittsLaw.update({
            id : obj.id
        },obj).exec(function(err, updated){
            if(err){
                console.log(err);
            }
        });
    }
};