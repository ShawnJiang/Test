// 获取结点
// 点击开始，随机获取结点，随机给BGC
// 每隔0.2秒执行一次
// 点击关闭，停止执行
var timer = null;
var ul = document.getElementById('ul');
var lis = ul.getElementsByTagName('li');

function start() {
    // 获取结点

    var arrs = ["red", "blue", "yellow", "green"];
    // timer = setInterval(function() {
    //     // var a=[];
    //     var b = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    //     for (var j=0;j<b.length;j++) {
    //         for (i = 0; i < 4; i++) {
    //             var a = Math.floor(Math.random() * b.length);
    //             console.log(a);
    //             lis[a].style.backgroundColor = arrs[i];
    //             if(b[j]==a){
    //             	b.splice(j,1);
    //             }
    //         }
    //     }
    // }, 400);
    var b = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // console.log(b[a]);
    // var c=[];
    // for (var j=0;j<b.length;j++) {
    //        var a = Math.floor(Math.random() * b.length);
    //        // console.log(a);
    //        // lis[a].style.backgroundColor = arrs[i];    
    //        if(b[j]==b[a]){
    //        	c.push(b[a]);
    //        	b.splice(j,1);
    //        	console.log(b.length);
    //        }else{
    //        	continue;
    //        }
    // //    for(var k = 0; k < b.length; k++){
    // // 	console.log(b[k]);

    // // }

    //    if(c.length >= 4){
    //    	break;
    //    }
    // console.log(b.length);
    // for(var i = 0; i < c.length; i++){
    // 	console.log(c[i]);
    // }
    // console.log(getRandomArrayElements(b, 4););
    timer = setInterval(function() {
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.backgroundColor = "#b6b6b6";
        }
        var arrarys = getRandomArrayElements(b, 9);

        lis[arrarys[0]].style.backgroundColor = arrs[0];
        lis[arrarys[1]].style.backgroundColor = arrs[1];
        lis[arrarys[2]].style.backgroundColor = arrs[2];
        lis[arrarys[3]].style.backgroundColor = arrs[3];
    }, 500)

}

function getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0),
        i = arr.length,//9
        min = i - count,//9-4=5
        temp, index;
    while (i-- > min) { //i=8(8>5)
        index = Math.floor((i + 1) * Math.random()); //产生随机数
        temp = shuffled[index];  //临时保存随机的数组中的数
        shuffled[index] = shuffled[i]; // 
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}




function clos1e() {
    clearInterval(timer);
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.backgroundColor = "#b6b6b6";
    }
}