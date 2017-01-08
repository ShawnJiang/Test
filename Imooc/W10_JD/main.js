window.onload = function() {
        var banners = document.getElementById('banner').getElementsByTagName("div"), //拿到Id为banner下的所有div标签，返回一个div数组
            lis = document.getElementById("bul").getElementsByTagName("li"), //拿到Id为bul下的所有li标签，返回一个li数组
            i = 0, //用于指定当前的图片
            timer = null, //用于关闭当前的定时器
            bannerArr = ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "b10", "b11", "b12", "b13", "b14", "b15", "b16", "b17"]; //数组，存放背景图名称，不含后缀

        // 随机不重复取出背景图片，css中设置了透明度为0，所以一开始不会显示出来。
        for (var m = 0; m < banners.length; m++) {
            var a = Math.floor(Math.random() * bannerArr.length); //随机拿到0-15的整数
            banners[m].className = bannerArr[a]; //将背景图片数组中随机拿到的一项名称赋值给div数组第一项的class名字，并在css中设置b1 - b17的背景图片，然后依次类推
            bannerArr.splice(a, 1); //将背景图片数组中随机拿到的元素从数组中删除，保证不重复
        }

        move(banners[i], { "opacity": 100 }, 50, 6); // 将第一张banner图片显示  
        startMove(); // 按照给定的间隔时间，依次显示其他图片，但每次只显示一张

        //给所有图片及图片序号添加鼠标移入、鼠标移出事件，鼠标移入：停止banner图动画，鼠标移出：继续banner图动画
        for (var j = 0, len = banners.length; j < len; j++) {
            lis[j].index = j; //给每个数组的元素添加index索引，用于全局变量

            // 鼠标移入到banner图div：停止动画
            banners[j].onmouseover = function() {
                clearInterval(timer);
            }

            // 鼠标移入到banner图div：开始动画
            banners[j].onmouseout = function() {
                startMove();
            }

            // 鼠标移入到图片序号li：停止动画
            lis[j].onmouseover = function() {
                clearInterval(timer); //当前图片停止动画
                lis[i].className = "bli"; //将当前的图片序号的className改成bli，也就是未选中时的背景颜色跟透明度
                move(banners[i], { "opacity": 0 }, 50, 6); //将当前图片的透明度改为0，也就是隐藏起来
                this.className = "bliss"; //将鼠标指定的图片序号的className改成bliss，也就是选中时的背景颜色跟透明度
                move(banners[this.index], { "opacity": 100 }, 50, 6); //将当前图片的透明度改为0，也就是显示出来
                i = this.index; //把i的序列号设置为当前鼠标移入的图片or图片序号的大小
            }

            // 鼠标移出图片序号li：开始动画
            lis[j].onmouseout = function() {
                startMove();
            }
        }

        function startMove() {
            timer = setInterval(function() {
                move(banners[i], { "opacity": 0 }, 50, 6);
                lis[i].className = "bli";
                if (i == banners.length - 1) {
                    i = -1;
                }
                move(banners[i + 1], { "opacity": 100 }, 50, 6);
                lis[i + 1].className = "bliss";
                i++;
            }, 2000);
        }
        var ignore = document.getElementById("ignore");
        var ignore1 = document.getElementById("ignore1");
        ignore.onmouseover = function() {
            move(ignore, { "left": 0 }, 50, 8);
        }
        ignore.onmouseout = function() {
            move(ignore, { "left": -150 }, 50, 8);
        }
        ignore1.onmouseover = function() {
            // ignore.style.display="none";
            move(ignore1, { "right": 0 }, 50, 8);
        }
        ignore1.onmouseout = function() {
            move(ignore1, { "right": -150 }, 50, 8);
        }
    }
    // 运动函数
function move(obj, json, tim, spe, fun) {
    var flag = null; // 标记，用于关闭定时器
    clearInterval(obj.timer); // 先关闭定时器，避免重复触发定时器

    // 将定时器的返回结果赋值给变量timer,用于关闭定时器
    obj.timer = setInterval(function() {
        flag = true; //赋值为true，下面的循环退出时，若flag为true，则关闭定时器
        // 遍历json，用键attr找值
        for (attr in json) {
            var cur = 0; // 定义变量，用于每次循环获取当前attr对应的值
            // 如果变量attr是opacity(透明度)，则要进行处理才能使用
            if (attr == "opacity") {
                // 使用getStyle函数（浏览器兼容性，根据属性，获取对应的值）获取变量attr对应的值
                // 获取的值不能直接用，要转换为数值进行计算，小数用parseFloat转换
                // *100转换为整数，但因为浮点数运算会丢失精度，用Math.round()四舍五入，舍去小数即可
                cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            }
            // 如果变量attr不是opacity(透明度)，则直接赋值
            else {
                cur = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - cur) / spe; // 计算运动的速度，等于目标值减去当前值，除以给定的初始速度
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); // 判断速度大小，大于0向上取整，小于0，向下取整
            // 如果当前值不等于目标值，则将flag赋值为false，退出循环时继续下一次的循环
            if (cur != json[attr]) {
                flag = false;
            }
            //赋值操作，如果是透明度
            if (attr == "opacity") {
                obj.style[attr] = (cur + speed) / 100; // 当前值加上速度，除以前面乘以的100
            }
            // 如果不是透明度
            else {
                obj.style[attr] = cur + speed + "px"; //当前值加上速度，同时加上单位
            }
        }
        // 如果flag为true，则关闭定时器
        if (flag) {
            clearInterval(obj.timer);
            // 如果传入了参数fun，则在程序停止的时候，执行fun()
            if (fun) {
                fun();
            }
        }
    }, tim);
}
// 获取样式函数
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}
