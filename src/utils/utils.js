import wepy from 'wepy';
let audioManger= wepy.$instance.globalData.backgroundManger;
let utils ={
    //路由跳转
    route(routeType,url){
        //关闭当前页面，跳转到应用内的某个页面，但是不允许跳转到 tabbar 页面。
        switch(routeType){
            case 'redirect':
            wx.redirectTo({
                url: url
            });
            break;
            //保留当前页面，跳转到应用内的某个页面，但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。
            case 'navigate':
            wx.navigateTo({
                url: url
            });
            break;
            //关闭所有页面，打开到应用内的某个页面
            case 'reLaunch':
            wx.reLaunch({
                url: url
            });
            break;

        }
    },
    //创建一个全局媒体播放器
    createMedia(mp3src,mp3title){
        audioManger.src=mp3src;
    },
    //监控全局媒体播放器的行为
    watchMedia(manger){
        console.log(manger)
        let audioManger=manger;
        audioManger.onPause(()=>{
            console.log('监控音乐暂停')
        })
        audioManger.onPlay(()=>{
            console.log('监听音乐播放')
        })
        audioManger.onStop(()=>{
            console.log('监听音乐停止')
        })
        audioManger.onEnded((cb)=>{
            console.log('监听音乐自然播放结束')
            cb && cb();
        })
    }
}

module.exports =utils;