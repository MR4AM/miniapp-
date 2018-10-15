import wepy from 'wepy';
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
    createMedia(){
        let testmp3 ='https://img.shuixindk.cn/mp3/012d0fc11e405d6b01908b846336db07.mp3';
        let audioManger= wepy.$instance.globalData.backgroundManger;
        audioManger.src=testmp3;
    }
}

module.exports =utils;