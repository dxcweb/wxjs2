/**
 * Created by guowei on 17/4/24.
 */
import browser from "../utils/browser";
function _initWX(obj) {
  const wx = window.wx;
  //分享到朋友圈
  wx.updateTimelineShareData({
    title: obj.titleTimeline || obj.title,
    link: obj.link,
    imgUrl: obj.imgUrl,
    success() {
      // 用户确认分享后执行的回调函数
      obj.onSuccess.apply(this, ["updateTimelineShareData", "分享到朋友圈"]);
    },
  });
  //分享给朋友
  wx.updateAppMessageShareData({
    title: obj.title,
    desc: obj.desc,
    link: obj.link,
    imgUrl: obj.imgUrl,
    success() {
      // 用户确认分享后执行的回调函数
      obj.onSuccess.apply(this, ["updateAppMessageShareData", "分享给朋友"]);
    },
  });

  //分享到腾讯微博
  wx.onMenuShareWeibo({
    title: obj.title,
    desc: obj.desc,
    link: obj.link,
    imgUrl: obj.imgUrl,
    success() {
      // 用户确认分享后执行的回调函数
      obj.onSuccess.apply(this, ["onMenuShareQQ", "分享到腾讯微博"]);
    },
    cancel() {
      // 用户取消分享后执行的回调函数
      obj.onCancel.apply(this, ["onMenuShareQQ", "分享到腾讯微博"]);
    },
  });
}
function _initQQ(obj) {
  mqq.invoke("data", "setShareInfo", {
    share_url: obj.link,
    title: obj.title,
    desc: obj.desc,
    image_url: obj.imgUrl,
    callback: function(ret) {},
  });
}
export default (obj) => {
  const defaultObj = {
    link: location.href,
    share_url: "",
    title: "",
    desc: "",
    imgUrl: "",
    onSuccess: () => {},
    onCancel: () => {},
  };
  const newObj = { ...defaultObj, ...obj };
  if (newObj.titleTimeline == null || newObj.titleTimeline == "") {
    newObj.titleTimeline = newObj.title;
  }
  //   newObj.link = Url(newObj.link)
  //     .addQuery("isappinstalled", 0)
  //     .toString();
  if (browser.name == "wechat") {
    _initWX(newObj);
  } else if (browser.name == "qq") {
    _initQQ(newObj);
  }
};
