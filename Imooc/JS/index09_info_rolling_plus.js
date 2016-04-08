window.onload = function() {
    var box = document.getElementById("box"),
        con1 = document.getElementById("con1"),
        con2 = document.getElementById("con2"),
        timer = null;
    con2.innerHTML = con1.innerHTML;

    function scrollInfo() {
        if (box.scrollTop == con1.offsetHeight) {
            box.scrollTop = 0; //不用加单位
        } else {
            box.scrollTop++;
        }
    }

    timer = setInterval(function() {
        scrollInfo();
    }, 50); //方法也要加引号，nonono，方法直接用匿名方法调用哦

    box.onmouseover = function() {
        clearInterval(timer);
    };

    box.onmouseout = function() {
        clearInterval(timer);
        timer = setInterval(function() {
            scrollInfo();
        }, 50);
    };

    var box2 = document.getElementById("box2"),
        con3 = document.getElementById("con3"),
        con4 = document.getElementById("con4"),
        timer2 = null,
        linehight = 30;

    con4.innerHTML = con3.innerHTML;

    ////////////////////////////////////////////////////
    // function scrollInfo2() {                       //
    //     if (box2.scrollTop == con3.offsetHeight) { //
    //         box2.scrollTop = 0;                    //
    //     } else {                                   //
    //         box2.scrollTop++;                      //
    //     }                                          //
    // }                                              //
    ////////////////////////////////////////////////////

    setTimeout(function() {
        startMove();
    }, 1000);

    function startMove() {
        clearInterval(timer2);
        timer2 = setInterval(function() {
            if (box2.scrollTop == con3.offsetHeight) {
                box2.scrollTop = 0;
            } else {
                box2.scrollTop++;
            }
            if (box2.scrollTop % linehight == 0) {
                clearInterval(timer2);
                setTimeout(function() { startMove(); }, 1000);
            }
        }, 30);

    }

    box2.onmouseover = function() {
        clearInterval(timer2);
    }
    box2.onmouseout = function() {
        startMove();
    }
}
