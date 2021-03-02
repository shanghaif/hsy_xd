document.addEventListener('plusready', function() {
  var BackFirst = null;
  plus.key.addEventListener('backbutton', function() {
    (window.location.pathname != '/home/index')?history.back(-1):(
        (!BackFirst)?(
            BackFirst = new Date().getTime(), //记录第一次按下回退键的时间
            plus.nativeUI.toast( "再按一次返回键退出好食源应用"),
            setTimeout(()=>{
                //0.5s中后清除，因为1s的间隔相对于太长，这样连续按两次就退出去，效果不好
                BackFirst = null;
            }, 500)
        ):(
            (new Date().getTime() - BackFirst < 500)?(
                //如果两次按下的时间小于0.5s，同上
                plus.runtime.quit() //那么就退出app
            ):''
        )
    )
    
  });
})