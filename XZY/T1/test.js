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
