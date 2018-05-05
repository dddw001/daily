export function scrollActive(){
    window.onload=function(){
        $('.nav dl dt').eq(0).addClass('active');
    }
    window.onscroll=function(){
        var obj=document.getElementsByClassName('singer')[0];
        var scrollH = $(window).scrollTop(),
                winH = $(window).height(),
                 top = obj.offsetTop;
        var cur=0;
        $('.group').each(function(index){
            var $cur = $(this);
            var scrollH = $(window).scrollTop(),
                winH = $(window).height(),
                top = $cur.offset().top;
            if (top-scrollH<winH) {
               cur=index;
            }
        })
        $('.nav dl dt').removeClass('active');
        $('.nav dl dt').eq(cur).addClass('active');
    }
}