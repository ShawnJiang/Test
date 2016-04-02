window.onload=function(){
    var loginState = document.getElementById("loginState");
    var ul = document.getElementById("ul");
    var lis = ul.getElementsByTagName("li");
    var statetxt = document.getElementById("statetxt");
    // console.log(statetxt.innerHTML);
    statetxt.onclick=function(){
        ul.style.display="block";
        for (var i = 0; i < lis.length; i++) {
            lis[i].onmouseover=function(){
                this.style.backgroundColor="#CCC";
            }
            lis[i].onmouseout=function(){
                this.style.backgroundColor="#FFF";
            }
            lis[i].onclick=function(){
               var id = this.id;
               statetxt.innerHTML = this.getElementsByTagName("div")[1].innerHTML;
               loginState.getElementsByTagName("div")[0].className = "loginshow "+ id;
               ul.style.display="none";
            }
        }

    }
}