// 获取Class，向下兼容
function getClass(parentObjId, cName) {
    var oTag = parentObjId.getElementsByTagName('*'),
        n = [];
    for (var i=0; i<oTag.length; i++) {
        if (oTag[i].className == cName) {
            n.push(oTag[i]);
        }
    }
    return n;
}


// 事件监听-添加事件
function addEvent(obj, type, fn) {
    if (obj.addEventListener) {
        return obj.addEventListener(type, fn);
    } else if (obj.attachEvent) {
        return obj.attachEvent('on' + type, fn);
    } else {
        return obj['on'+type] = fn;
    }
}



// 动画函数
function doMove(obj, json, fn) {
    'use strict';
    
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var onOff = true;
        for (var attr in json) {
            var opa = 0;
            
            if (attr == 'opacity') {
                if (Math.round(parseFloat(getStyle(obj, attr)) * 100) == 0) {
                    opa = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                } else {
                    opa = Math.round(parseFloat(getStyle(obj, attr)) * 100) || 100;
                }
            } else {
                opa = parseInt(getStyle(obj, attr)) || 0;
            }
            
            var speed = (json[attr] - opa) / 5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            
            if (opa != json[attr]) {
                onOff = false;
            }
            
            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity=' + (opa + speed) + ')';
                obj.style.opacity = (opa + speed) / 100;
            } else {
                obj.style[attr] = opa + speed + 'px';
            }
        }
        
        if (onOff) {
            clearInterval(obj.timer);
            if (fn) {
                fn.call(obj);
            }
        }
    }, 30)
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj)[attr];
    }
}