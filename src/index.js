/**
 * Created by dxc on 2016/10/29.
 */
import Base64 from './utils/Base64'
import Cookie from './utils/Cookie'
import WopLogin from './Wop/WopLogin'
import WopSign from './Wop/WopSign'
import WopShare from './Wop/WopShare'
import WopUploadImgToOss from './Wop/WopUploadImgToOss'
import QyWxLogin from './QyWx/QyWxLogin'
import QyWxSign from './QyWx/QyWxSign'
import QyWxUploadImgToOss from './QyWx/QyWxUploadImgToOss'
import WxLogin from './Wx/WxLogin'
import WxSign from './Wx/WxSign'
import WxUploadImgToOss from './Wx/WxUploadImgToOss'
import Url from 'urijs'
export default  {
    Base64,
    WopLogin,
    WopSign,
    WopUploadImgToOss,
    WxQyLogin,
    WxQySign,
    WxQyUploadImgToOss,
    WxLogin,
    WxSign,
    WxUploadImgToOss,
    Url,
    WopShare,
    Cookie
}