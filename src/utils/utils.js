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
    },
    //获取assess_tocken
    getAt(openid){
        wx.login({
            success:res=>{
                console.log(res.code,'获取用户登录凭证');
                let APPID='wxc8ee2be24346f5d8';
                let APPSECRET='11fffcc718b1ca93fcf58d4a3f66b7c8';
                wx.request({
                    url:`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
                    method:"GET",
                    header: {
                        'Content-Type': 'json'
                    },
                    success:((res2)=>{
                        return res2.data.access_token;
                        console.log(res2,'检测获取access_token')
                    })
                })
            }
        })
        // let APPID='wxc8ee2be24346f5d8';
        // let APPSECRET='11fffcc718b1ca93fcf58d4a3f66b7c8';
        // wx.request({
        //     url:`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
        //     method:"GET",
        //     header: {
        //         'Content-Type': 'json'
        //     },
        //     success:((res2)=>{
        //         return res2.data.access_token;
        //         console.log(res2,'检测获取access_token')
        //     })
        // })
    },
    getOpenid(tocken){
        wx.login({
            success:res=>{
                let APPID='wxc8ee2be24346f5d8';
                let APPSECRET='11fffcc718b1ca93fcf58d4a3f66b7c8';
                wx.request({
                    url:`https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${res.code}&grant_type=authorization_code`,
                    method:"GET",
                    header: {
                        'Content-Type': 'json'
                    },
                    success:((res1)=>{
                        console.log(res1.data.openid,'检测获取openid')
                        return res1.data.openid;
    
                    })
                })
                if(tocken){
                    wx.request({
                        url:`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`,
                        method:"GET",
                        header: {
                            'Content-Type': 'json'
                        },
                        success:((res2)=>{
                            return res2.data.access_token;
                            console.log(res2,'检测获取access_token')
                        })
                    })
                }
            }
        })
    },
    vpush(formID){
        setTimeout(()=>{
            let openid=this.getOpenid();
            console.log(openid,'openid')
            let tocken=`16_gFulvt1JzNXJijWIXvWjWLn52USIbNJG9k7yFMZ04YR4yPQDIXhBEFxsA2GQlfkM7xim77mcH0qkipSiG3ZBFnSglOFYSqtG61eo6NVyxS1YDAFx8Bi97v2pmcECLPeAFAHQU`
            let url=`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${tocken}`
            wx.request({
                url: url,
                data: {
                    touser: "oipRc5ZpSRwR_dkCADYMhnhT-S5A",//openId
                    template_id: 'Uvm6DOudBIdxlElkVnM8OhAhB4CxBmKhmkbBGAM0S44',//模板消息id，  
                    page: 'pages/index',//点击详情时跳转的主页
                    form_id: formID,//formID
                    data: {//下面的keyword*是设置的模板消息的关键词变量  
                 
                      "keyword1": {
                        "value": "keyword1",
                        "color": "#4a4a4a"
                      },
                      "keyword2": {
                        "value": "keyword2",
                        "color": "#9b9b9b"
                      },
                      "keyword3": {
                        "value": "keyword3",
                        "color": "red"
                      }
                    }, access_token:tocken},
                method: 'POST',
                success: function (res) {
                  console.log("push msg");
                  console.log(res);
                },
                fail: function (err) { 
                  console.log("push err")
                  console.log(err);
                }
              });
        },5000)
    }
}

module.exports =utils;