window.onload=function(){
	alert("你来了啊！买假货，就来假东！少慢差贵，一个让您不剁手的购物商城！JOKE~ : )");
	var banners = document.getElementById('banner').getElementsByTagName("div"),
		lis = document.getElementById("bul").getElementsByTagName("li"),
		i = 0;//全局变量，用于自动切换banner图，这样就不会找不到timer了
	startMove();
	for (var j = 0, len=banners.length; j <len; j++) {
		lis[j].index=j;
		banners[j].onmouseover=function() {
			clearInterval(timer);
		}
		banners[j].onmouseout=function() {
			startMove();
		}
		lis[j].onmouseover=function(){
			clearInterval(timer);
			lis[i].className = "bli";
			move(banners[i],{"opacity":0},50,6);
			this.className="bliss";
			move(banners[this.index],{"opacity":100},50,6);
			i=this.index;
		}
		lis[j].onmouseout=function(){
			startMove();
		}
	}
	function startMove() {
		timer = setInterval(function() {
			move(banners[i],{"opacity":0},50,6);
			lis[i].className = "bli";
			if(i==banners.length-1){
				i=-1;
			}
			move(banners[i+1],{"opacity":100},50,6);
			lis[i+1].className="bliss";
			i++;
		},2000);
	}
	var ignore = document.getElementById("ignore");
	var ignore1 = document.getElementById("ignore1");
	ignore.onmouseover=function(){
		move(ignore, {"left": 0},50,8);
	}
	ignore.onmouseout=function(){
		move(ignore, {"left": -1873},50,8);
	}
	ignore1.onmouseover=function(){
		// ignore.style.display="none";
		move(ignore1, {"right": 0},50,8);
	}
	ignore1.onmouseout=function(){
		move(ignore1, {"right": -1873},50,8);
	}
}
// 运动函数
function move(obj,json,tim,spe, fun){
	// 标记
	var flag = null;
	// 避免重复触发定时器
	clearInterval(obj.timer);
	// 开始定时器，多对键值要同时进行，所以放在for循环外面
	obj.timer = setInterval(function() {
		flag = true;
		// 遍历json
		for(attr in json){
			// 定义当前值，当前值要每次获取，所以放在里面
			var cur = 0;
			// 判断，如果属性是透明度，那当前值就乘以100
			if(attr =="opacity"){
				// 使用样式方法获取属性值
				// 获取的值不能直接用，要转换为数值进行计算
				// 小数用parseFloat转换
				// 不能直接乘以，因为浮点数会丢失精度，用Math.round
				cur = Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			// 如果不是就直接赋值
			else{
				cur = parseInt(getStyle(obj, attr));
			}
			// 计算速度
			// 速度等于目标值减去当前值
			var speed = (json[attr] - cur)/spe;
			// 判断速度是不是小于0，大于0向上取整，小于0，向下取整
			speed = speed > 0 ? Math.ceil(speed):Math.floor(speed);
			
			// 判断是否都到达了目标值
			if(cur != json[attr]){
				flag=false;
			}

			// 如果不等于，就继续赋值

				// 如果是透明度
				if(attr == "opacity"){
					// 属性值相加
					obj.style[attr] = (cur + speed)/100;
				}
				// 如果不是透明度
				else{
					obj.style[attr] = cur + speed +"px";
				}
			}
		// 如果flag，则关闭定时器
		if(flag){
			clearInterval(obj.timer);
            // 如果传入了fun，则在程序停止的时候，执行fun()
			if(fun){
				fun();
			}
		}
	},tim);
}
// 获取样式函数
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}