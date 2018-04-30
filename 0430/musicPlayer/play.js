/*
功能实现
[1]播放、暂停
[2]调整定位指示
 */    
var player = document.getElementById('player');
var control = player.getElementsByClassName('box-con')[0];
var rotate =  player.getElementsByClassName('box-in-in')[0];
var hidden =  player.getElementsByClassName('box-in')[0];
//作为歌曲是否加载完毕的标记
var mark = false;
//作为鼠标是否移入控制按钮区域的标记
var enter = false;
//记录按钮的上一个值
var lastBtn = '&#xe61d;';
//当歌曲可以开始不停顿地一直播放时，显示播放按钮
audio.oncanplaythrough = function(){
    mark = true;
    control.innerHTML = '&#xe61d;'
};    
//当歌曲在播放过程中
audio.ontimeupdate = function(){
    //播放按钮记录当前进度百分比
    if(!enter){
        control.innerHTML = Math.floor(audio.currentTime/audio.duration*100) + '%';
    }else{
        control.innerHTML = lastBtn;
    }
    //旋转相应度数
    rotate.style.transform = 'rotate('+ audio.currentTime/audio.duration*360 + 'deg)';
    if((audio.currentTime/audio.duration)<=0.5){
        hidden.style.cssText = 'overflow:hidden;background:transparent';        
    }else{
        hidden.style.cssText = 'overflow:visible;background:black url("img/music.png") 61px 0';
    }    
}
//当鼠标点击光盘时，歌曲进度变化到对应进度，div旋转到对应角度
player.onclick = function(e){
    if(mark){
        var e = e || event;
        var n1 = e.clientX-this.parentNode.offsetLeft; 
        var n2 = e.clientY-this.parentNode.offsetTop;
        var a = 61;
        var b = Math.sqrt(Math.pow(n1-61,2)+Math.pow(n2-61,2));    
        var c = Math.sqrt(Math.pow(n1-61,2)+Math.pow(n2,2));
        var radial = Math.acos((a*a + b*b - c*c)/(2*a*b));
        //记录鼠标点击磁盘时旋转的角度
        var result = 0;
        if(n1 >= 61){
            result = radial*180/Math.PI;
        }else{
            result = 360-radial*180/Math.PI;
        }
        audio.currentTime = audio.duration*result/360;        
    }    
}
//当歌曲播放完毕后
audio.onended = function(){
    //重新加载歌曲
    audio.load();
    //将hidden的样式恢复起始值
    hidden.style.cssText = 'overflow:hidden;background:transparent';
    rotate.style.transform ='rotate(0);';
    //将播放按钮置为'暂停按钮'
    control.innerHTML = '&#xe61d;';
}
//给control添加点击事件
control.onclick = function(e){
    var e = e || event;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
    if(mark){
        if(audio.paused){
            audio.play();
            this.innerHTML = '&#xe662;';
        }else{
            audio.pause();
            this.innerHTML = '&#xe61d;';
        }    
        lastBtn = control.innerHTML;    
    }
};    
//当鼠标移入control时，标记enter为true
control.onmouseover = function(){
    if(mark){
        enter = true;
    }
}    
//当鼠标移出control时，标记enter为false
control.onmouseout = function(){
    if(mark){
        enter = false;
    }
}    