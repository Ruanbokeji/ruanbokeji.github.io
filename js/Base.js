var navLi = document.getElementsByTagName('nav')[0].getElementsByTagName('li');

// 导航栏菜单鼠标动画
for (var i=0, j=navLi.length; i<j; i++) {
    navLi[i].index = i;
    addEvent(navLi[i], 'mouseover', function () {
        doMove(navLi[this.index], {'top': '-80'})
    });
    addEvent(navLi[i], 'mouseout', function () {
        doMove(navLi[this.index], {'top': '0'})
    });
}
