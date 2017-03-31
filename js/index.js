var banner = document.getElementById('banner'),
    bannerUl = banner.getElementsByTagName('ul')[0],
    bannerLi = bannerUl.getElementsByTagName('li'),
    bannerBar = banner.getElementsByTagName('a'),
    sIcon = getClass(document.getElementById('services'), 's-icon')[0],
    sLi = sIcon.getElementsByTagName('div'),
    sSpan = sIcon.getElementsByTagName('span'),
    sH4 = sIcon.getElementsByTagName('h4'),
    sUl = sIcon.getElementsByTagName('ul'),
    casePic = getClass(document.getElementById('case'), 'case-pic')[0],
    cBtn = casePic.getElementsByTagName('button'),
    cLi = casePic.getElementsByTagName('li'),
    n = 0,
    s = 0;


// 设置bannerUl和bannerLi的宽度及bannerImage的位置
window.onload = window.onresize = function () {
    var bannerImage = bannerUl.getElementsByTagName('img'),
        newW = (Math.floor(parseInt(getStyle(banner, 'width'))) || parseInt(document.body.clientWidth)) + 'px';
        mLeft = (banner.offsetWidth - (parseInt(getStyle(bannerImage[0], 'width')) || 1920) ) / 2;

    for (var i=0,j=bannerLi.length; i<j; i++) {
        bannerLi[i].style.width = newW;
        bannerImage[i].style.left = mLeft + 'px';
    }
    bannerUl.style.width = bannerLi.length * bannerLi[0].offsetWidth + 'px';
}


// bannerUl动画
function bannerRun() {
    n = ++n%bannerLi.length;
    if (n == bannerLi.length - 1) {
        bannerLi[0].style.position = 'relative';
        bannerLi[0].style.left = (getStyle(bannerUl, 'width'));
    }
    
    doMove(bannerUl, {'left': -bannerLi[n].offsetLeft}, function () {
        if (n == 0) {
            bannerLi[0].style.position = 'static';
            bannerLi[0].style.left = 0;
            bannerUl.style.left = 0;
        }
    });
    
    for (var i=0,j=bannerBar.length; i<j; i++) {
        if (bannerBar[i].className == 'active') {
            bannerBar[i].className = '';
            break;
        }
    }
    bannerBar[n].className = 'active';
    setTimeout(bannerRun, 5000);
    
}
setTimeout(bannerRun, 5000);


// bannerBar点击事件
for (var i=0,j=bannerBar.length; i<j; i++) {
    bannerBar[i].index = i;
    addEvent(bannerBar[i], 'click', function () {
        if (this.className == 'active') {
            return;
        }
        for (var i=0; i<bannerBar.length; i++) {
            if (bannerBar[i].className == 'active') {
                bannerBar[i].className = '';
            }
        }
        this.className = 'active';
        doMove(bannerUl, {'left': - bannerLi[this.index].offsetLeft});
    });
}


// 专业服务hover动画
for (var i=0,j=sLi.length; i<j; i++) {
    sLi[i].index = i;
    addEvent(sLi[i], 'mouseover', function () {
        doMove(sSpan[this.index], {'width': '120', 'fontSize': '50', 'lineHeight': '40'});
        doMove(sH4[this.index], {'width': '200', 'top': '30', 'fontSize': '24'});
        doMove(sUl[this.index], {'top': '100'});
    })
    addEvent(sLi[i], 'mouseout', function () {
        doMove(sSpan[this.index], {'width': '248', 'fontSize': '90', 'lineHeight': '120'});
        doMove(sH4[this.index], {'width': '248', 'top': '150', 'fontSize': '28'});
        doMove(sUl[this.index], {'top': '250'});
    })
}


// 案例动画
function caseRun() {
    doMove(cLi[s%cLi.length], {'opacity': '0'});
    doMove(cLi[++s%cLi.length], {'opacity': '100'});
    caseRunLate = setTimeout(caseRun, 4000);
}
var caseRunLate = setTimeout(caseRun, 4000);

for (var i=0; i<2; i++) {
    addEvent(cBtn[i], 'mouseover', function () {
        clearTimeout(caseRunLate);
    })
    addEvent(cBtn[i], 'mouseout', function () {
        setTimeout(caseRun, 4000);
    })
}

addEvent(cBtn[0], 'click', function () {
    doMove(cLi[s%cLi.length], {'opacity': '0'});
    s--;
    if (s == -1 || s >= cLi.length) {
        s = cLi.length - 1;
    }
    doMove(cLi[s], {'opacity': '100'});
})
addEvent(cBtn[1], 'click', function () {
    doMove(cLi[s%cLi.length], {'opacity': '0'});
    doMove(cLi[++s%cLi.length], {'opacity': '100'});
})