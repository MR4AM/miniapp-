class jasonUtil{
    //判断浏览器类型
    static exploreType(key){
        let explorestr={
            'gecko':/rv:([\d.]+)\) like gecko/,
            'msie':/msie ([\d\.]+)/,
            'edge':/edge\/([\d\.]+)/,
            'firefox':/firefox\/([\d\.]+)/,
            'opera':/(?:opera|opr).([\d\.]+)/,
            'chrome':/chrome\/([\d\.]+)/,
            'safari':/version\/([\d\.]+).*safari/,
            'weixin':/MicroMessenger/i,
        }
        let sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
            (s = ua.match(explorestr.gecko)) ? sys.ie = s[1]:
            (s = ua.match(explorestr.msie)) ? sys.ie = s[1] :
            (s = ua.match(explorestr.edge)) ? sys.edge = s[1] :
            (s = ua.match(explorestr.firefox)) ? sys.firefox = s[1] :
            (s = ua.match(explorestr.opera)) ? sys.opera = s[1] :
            (s = ua.match(explorestr.chrome)) ? sys.chrome = s[1] :
            (s = ua.match(explorestr.safari)) ? sys.safari = s[1]:
            (s = ua.match(explorestr.weixin)) ? sys.weixin = s[1] :0;
        // 根据关系进行判断
        if (sys.ie) return ('IE浏览器: ' + sys.ie)
        if (sys.edge) return ('EDGE: ' + sys.edge)
        if (sys.firefox) return ('Firefox: ' + sys.firefox)
        if (sys.chrome) return ('Chrome: ' + sys.chrome)
        if (sys.opera) return ('Opera: ' + sys.opera)
        if (sys.safari) return ('Safari: ' + sys.safari)
        if(sys.weixin) return ('weixin' +sys.weixin)
        return 'Unkonwn'
    }

    //判断设备
   static getOS() {
        let userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
        let vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
        let appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
        if (/mac/i.test(appVersion)) return 'MacOSX'
        if (/win/i.test(appVersion)) return 'windows'
        if (/linux/i.test(appVersion)) return 'linux'
        if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
        if (/android/i.test(userAgent)) return 'android'
        if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
    }

    //判断是否为邮箱
    static isEmail(str){
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
    }

    //判断是否手机号码
    static isPhone(str){
        return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
    }

    //判断是否为身份证号码
    static isIdcard(str){
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
    }
   
    //深复制
    static cloneDeep(str){
        return JSON.parse(JSON.stringify(str));
    }

    //js实现复制内容到粘贴板，因小程序没有window、document对象，因此该方法暂时不兼容小程序
    static jsCopy(txt){
        const input = document.createElement('input');
        //防止ios点击复制时屏幕下方会出现白屏抖动，仔细看是拉起键盘又瞬间收起
         input.setAttribute('readonly', 'readonly');
         input.setAttribute('value',this.txt)
         document.body.appendChild(input);
         let sysMsg=this.getOS();
        
        //input.select() 在ios下并没有选中全部内容，使用以下来选中内容
            if(sysMsg == 'ios'){
                //ios复制
                let obj=this.iosCopy(this.txt);
                this.destoryNode(obj.html,obj.style)
                //input.setSelectionRange(0,input.value.length);  
            }else if(sysMsg == 'android'){
                //android选择复制内容
                input.select(this.txt);    
            }
            document.execCommand('copy',true);
            document.body.removeChild(input);  
    }

    //兼容ios复制
    static iosCopy(){
        let obj=this.renderIos(this.txt);
        
        window.getSelection().removeAllRanges();//这段代码必须放在前面否则无效
        let content = document.querySelector('.jsCopy');
    
        var range = document.createRange();
        // 选中需要复制的节点
        range.selectNode(content);
        // 执行选中元素
        window.getSelection().addRange(range);
        // 执行 copy 操作
        document.execCommand('copy');

        // 移除选中的元素
        window.getSelection().removeAllRanges();
        return obj;
    }

    //兼容ios复制,渲染成ios需要复制的节点并添加样式
    static renderIos(){
        var html=document.createElement('div');
        html.className='jsCopy';
        html.innerText=this.txt;
        document.body.appendChild(html)
        var style=document.createElement('style');
        style.innerHTML='body{-webkit-user-select:text}.jsCopy{position:absolute;top:0;left:-200px;color:transparent;background:transparent}'
        document.head.appendChild(style)
        let nodeObj={
            "html":html,
            "style":style
        }
        return nodeObj;
    }
    //复制方法调用完毕后摧毁节点和多余样式
    static destoryNode(html,style){
        document.body.removeChild(html);
        document.head.removeChild(style);
    }
    //小程序复制内容到粘贴板
    static wxcopy(txt){
        wx.setClipboardData({
            data: JSON.stringify(txt),
            success(res) {
              wx.getClipboardData({
                success(res1) {
                  
                }
              })
            }
        })
    }
    //多层数组扁平化,遍历数组递归,再将扁平化的数组concat合并一下
    static flattenArray(arr){
        var result = [];
        for(var i = 0, len = arr.length; i < len; i++){
            if(Array.isArray(arr[i])){
                result = result.concat(this.flattenArray(arr[i]));
            }else{
                result.push(arr[i]);
            }
        }
        return result;
    }
    //数组转对象
    static objToArray(obj) {
        var arr = []
        for (var i in obj) {
            arr.push(obj[i]); 
        }
        return arr;
    }
     // 数组去重
     static uniqueArray(arr){
        if ( Array.hasOwnProperty('from') ) {
            return Array.from(new Set(arr));
        }else{
            var n = {},r=[];
            for(var i = 0; i < arr.length; i++){
                if (!n[arr[i]]){
                    n[arr[i]] = true;
                    r.push(arr[i]);
                }
            }
            return r;
        }
     }
     /**
     * 去除空格
     * @param  {str}
     * @param  {type}
     *       type:  1-所有空格  2-前后空格  3-前空格 4-后空格
     * @return {String}
     */
    static trim (str, type) {
        type = type || 1
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    }
    /**
     * @param  {str}
     * @param  {type}
     *       type:  1:首字母大写  2：首页母小写  3：大小写转换  4：全部大写  5：全部小写
     * @return {String}
     */
    static changeCase (str, type) {
        type = type || 4
        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    
                });
            case 2:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return str.split('').map( function(word){
                    if (/[a-z]/.test(word)) {
                        return word.toUpperCase();
                    }else{
                        return word.toLowerCase()
                    }
                }).join('')
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    }
    //每个3位添加逗号
    static toThousands(number,symbol){
        return (number || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, `$1${symbol}`)
    }
    /**
     * 格式化时间
     *
     * @param  {time} 时间
     * @param  {cFormat} 格式
     * @return {String} 字符串
     *
     * @example formatTime('2018-1-29', '{y}/{m}/{d} {h}:{i}:{s}') // -> 2018/01/29 00:00:00
     */
    static formatTime(time, cFormat) {
        if (arguments.length === 0) return null
        if ((time + '').length === 10) {
            time = +time * 1000
        }
    
        var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}', date
        if (typeof time === 'object') {
            date = time
        } else {
            date = new Date(time)
        }
    
        var formatObj = {
            y: date.getFullYear(),
            m: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            i: date.getMinutes(),
            s: date.getSeconds(),
            a: date.getDay()
        }
        var time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
            var value = formatObj[key]
            if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
            if (result.length > 0 && value < 10) {
                value = '0' + value
            }
            return value || 0
        })
        return time_str
    }
    //距离消息发送多长时间
    static formatPassTime(startTime) {
        var currentTime = Date.parse(new Date()),
        time = currentTime - startTime,
        day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
        if (year) return year + "年前";
        if (month) return month + "个月前";
        if (day) return day + "天前";
        if (hour) return hour + "小时前";
        if (min) return min + "分钟前";
        else return '刚刚';
    }
}
export default jasonUtil;