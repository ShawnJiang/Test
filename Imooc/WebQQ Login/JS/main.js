window.onload=function(){
    // 切换登陆状态
    switc();

    // 鼠标移动登录框
    var logo = document.getElementById("logo");
    // 给LOGO添加鼠标按下事件
    logo.onmousedown=fndown;
}


function switc(){
    var currentState = document.getElementById("currentState");
    var otherstate = document.getElementById("otherstate");
    var olis = document.getElementsByTagName("li");
    // 给currentState添加 onclick
    currentState.onclick=function(e){
        // 显示 otherstate 并且阻止冒泡
        if(e.stopPropagation){
            // Chrome/Firefox
            e.stopPropagation();
        }else{
            // IE
            e.cancelBubble=true;
        }
        otherstate.style.display="block";
        // for
        for (var i = 0; i < olis.length; i++) {
            // bg
            olis[i].onmouseover=function(){
                this.style.backgroundColor="#CCC";
            }
            olis[i].onmouseout=function(){
                this.style.backgroundColor="#FFF";
            }
            // onclick
            olis[i].onclick=function(e){
                e.stopPropagation();
                var id = this.id;
                currentState.getElementsByTagName("span")[0].className = "currentState_icon " +id;
                currentState.getElementsByTagName("span")[2].innerHTML = this.getElementsByTagName("span")[0].innerHTML;
                otherstate.style.display="none";
            }
        }
    }
    // 点击文档其他处，关闭切换列表
    document.onclick=function(){
        otherstate.style.display="none";
    }

    // 点击X，关闭登陆面板
    var closeimg = document.getElementById("closeimg");
    closeimg.onclick=function(){
        main.style.display="none";
    }
}


function fndown(event){
    // 获取鼠标按下去的坐标:event.clientX, clientY
    // 获取登录框的坐标: offersWidth,offHeight
    // 将鼠标按下的坐标，减去登录框的坐标，就是登录框到鼠标按下的距离
    var main = document.getElementById("main"),
        mainToMouseWidth = event.clientX - main.offsetLeft,
        mainToMouseHeight = event.clientY - main.offsetTop;
    document.onmousemove=function(event){
        fnMove(event,mainToMouseWidth,mainToMouseHeight);
    }

    document.onmouseup=function(){
        document.onmousemove=null;
    }
}

function fnMove(e,X,Y){
    var main = document.getElementById("main"),
    // 将登录框实时的坐标，加上上述的坐标，登录框就不会飘了
        l = e.clientX - X,
        t = e.clientY - Y,
        maxW = document.documentElement.clientWidth - main.offsetWidth - 10,
        maxH = document.documentElement.clientHeight - main.offsetHeight-10,
        marLeft = getComputedStyle(main,false).marginLeft;
    if(l<10){
        l=10;
    }else if(l>maxW){
        l=maxW;
    }
    if(t<10){
        t=10;
    }else if(t>maxH){
        t=maxH;
    }

    main.style.top=t+"px";
    main.style.left=l+"px";
}