/**
 * Created by guowei on 17/4/24.
 */
import browser from '../utils/browser'

function _initWX(obj) {
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: obj.titleTimeline,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
            // 用户确认分享后执行的回调函数
            obj.onSuccess.apply(this, arguments);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            obj.onCancel.apply(this, arguments);
        },
        error: function () {
            obj.onError.apply(this, arguments);
        }
    });
    //分享给朋友
    wx.onMenuShareAppMessage({
        title: obj.title,
        desc: obj.desc,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
            // 用户确认分享后执行的回调函数
            obj.onSuccess.apply(this, arguments);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            obj.onCancel.apply(this, arguments);
        },
        error: function () {
            obj.onError.apply(this, arguments);
        }
    });

    //获取“分享到QQ”按钮点击状态及自定义分享内容接口
    wx.onMenuShareQQ({
        title: obj.title,
        desc: obj.desc,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
            // 用户确认分享后执行的回调函数
            obj.onSuccess.apply(this, arguments);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            obj.onCancel.apply(this, arguments);
        },
        error: function () {
            obj.onError.apply(this, arguments);
        }
    });
    wx.onMenuShareQZone({
        title: obj.title,
        desc: obj.desc,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
            // 用户确认分享后执行的回调函数
            obj.onSuccess.apply(this, arguments);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            obj.onCancel.apply(this, arguments);
        },
        error: function () {
            obj.onError.apply(this, arguments);
        }
    });
    //分享到腾讯微博
    wx.onMenuShareWeibo({
        title: obj.title,
        desc: obj.desc,
        link: obj.link,
        imgUrl: obj.imgUrl,
        success: function () {
            // 用户确认分享后执行的回调函数
            obj.onSuccess.apply(this, arguments);
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
            obj.onCancel.apply(this, arguments);
        },
        error: function () {
            obj.onError.apply(this, arguments);
        }
    });
}
function _initQQ(obj) {
    mqq.invoke("data", "setShareInfo", {
        share_url: obj.link,
        title: obj.title,
        desc: obj.desc,
        image_url: obj.imgUrl
    });
}
export default(obj)=> {
    const defaultObj = {
        link: location.href,
        share_url: '',
        title: '',
        desc: '',
        imgUrl: '',
        onSuccess:()=>{},
        cancel:()=>{},
        error:()=>{}
    };
    const newObj = {...defaultObj, ...obj};
    if (newObj.titleTimeline == null || newObj.titleTimeline == '') {
        newObj.titleTimeline = newObj.title
    }
    if (browser.name == 'wechat') {
        _initWX(newObj);
    } else if (browser.name == 'qq') {
        _initQQ(newObj);
    }
}