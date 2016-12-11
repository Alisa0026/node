var model = {
    data:[{id:1,age:1},{id:2,age:2},{id:3,age:3},{id:4,age:4},{id:5,age:5},{id:6,age:6},{id:7,age:7},{id:8,age:8},{id:9,age:9},{id:10,age:10}],
    skip(skip){
        this._skip = skip;
        return this;
    },
    limit(limit){
        this._limit = limit;
        return this;
    },
    sort(sortobj){

        var attr = Object.keys(sortobj)[0] || 'age';
        this._sort = function(a,b){

            if(typeof a[attr] == 'number'){
                return (a[attr] - b[attr])*sortobj[attr];
            }else{
                return (a[attr].localeCompare(b[attr]))*sortobj[attr];
            }
        };
        return this;
    },
    exec(callback){
        process.nextTick(()=>{
            var result = this.data.sort(this._sort).slice(this._skip, this._skip + this._limit);
            callback(null,result);
        });

        return this;
    }
};


//每页的条数
var pageSize = 3;
//要取第几页的数据
var pageNum = 3;

model.skip(pageSize*(pageNum-1)).limit(pageSize).sort({
    age:-1
}).exec(function(err,docs){
    console.log(docs);// 4 3 2
});




