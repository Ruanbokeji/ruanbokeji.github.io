var aBan = document.getElementById('banner'),
    aImg = aBan.getElementsByTagName('img')[0];

window.onload = window.onresize = function () {
    var oLeft = (aBan.offsetWidth - aImg.offsetWidth) / 2;
    aImg.style.left = oLeft + 'px';
};
