// 作用：单物体同时运动
// 
// 封装两个方法
// 一是：物体运动，宽度，位移，透明度，高度
// 二是：获取物体的style
// 使用JSON，可同时改变物体的属性
// 当物体属性没有达到目标值时，继续运动


// 接收一个函数，作为回调函数循环调用
// 将传入的参数变成JSON键值对的形式
function syncMove(obj,json,fun){
    // 标记
    var flag = null;
    // 清除定时器
    clearInterval(obj.timer);
    // 运行定时器
    obj.timer = setInterval(function(){
        flag = true;
        for(var attr in json){
            // 取值，要放里面，因为每次都需要重新获取div的当前值
            var icu = 0;
            if(attr == "opacity"){
                icu = Math.round(parseFloat(getStyle(obj, attr))*100); //转为数值再计算！
            }else{
                icu = parseInt(getStyle(obj, attr));
            }

            var speed = (json[attr] - icu)/(1.5);
                speed = speed>0? Math.ceil(speed) : Math.floor(speed);
            
            if(icu != json[attr]){
                flag = false;
            }

            // 赋值
            if(attr == "opacity"){
                obj.style[attr]= (icu + speed)/100;
            }else{
                obj.style[attr]= icu + speed +"px";
            }
        }
        if(flag){
                clearInterval(obj.timer);
                // 如果传入了fun，则在程序停止的时候，执行fun()
                if(fun){
                    fun();   
                }
            }
    },50);
}

// 获取样式
function getStyle(obj, attr){
    // IE
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    // Chrome/Firefox
    }else{
        return getComputedStyle(obj, false)[attr]; //getComputedStyle()是Window的方法，所以不需要加前缀。
    }    
}