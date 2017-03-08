/**
 * Created by dxc on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import Base64 from '../utils/Base64'
import JsonP from '../utils/JsonP'
import Q from 'q'
import url from '../utils/url'
export default class WxQyLogin extends Component {
    static defaultProps = {
        cookie_name: 'wxjs2_wxqy',
        is_get_user_info: false,
        userInfoCB: (user)=> {
        }
    };
    state = {
        error: false,
        msg: "",
        isLogin: false,
        manualLogin: false,
        manualLoginUrl: '',
        url: ''
    };
    //渲染前调用一次，这个时候DOM结构还没有渲染。fv
    componentWillMount() {
        const {url, userInfo,cookie_name}=this.props;
        if (url == null) {
            return false;
        }
        if (!this.state.isLogin) {
            this.jsonp().then((response)=> {
                const json = JSON.parse(response);
                if (!json.ok) {
                    this.setState({error: true, msg: json.msg});
                    return false;
                }
                if (json.url) {
                    this.setCookie(cookie_name, json.cookie, 7);
                    this.login(json.url);
                } else {
                    this.setState({isLogin: true});
                    userInfo.call(this, json);
                }
            })
        }
    }

    setCookie(c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + encodeURIComponent(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/" + ";domain=" + url('domain');
    }

    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return arr[2];
        else
            return '';
    }


    login(url) {
        const me = this;
        var wx_login = document.createElement('a');
        wx_login.href = url;
        if (typeof wx_login.click == 'undefined') {
            location.href = url;
        }
        else {
            wx_login.click();
        }
        this.setTimeout = setTimeout(function () {
            me.setState({manualLogin: true, manualLoginUrl: url});
        }, 5000);
    }

    jsonp() {
        const {url,cookie_name}=this.props;
        const fullUrl = url + 'wx-base/login/json-p-get-my-info?' +
            '&url=' + encodeURIComponent(Base64.encode(location.href)) +
            '&cookie=' + this.getCookie(cookie_name);
        const promise = Q.defer();
        JsonP(fullUrl, 'WxQyUserInfo' + Math.floor(Math.random() * 10000));
        const timed = setTimeout(function () {
            alert('登录超时！');
        }, 10000);
        window.WxQyUserInfo = function (res) {
            clearTimeout(timed);
            window.WxQyUserInfo = null;
            promise.resolve(res);
        };
        return promise.promise;
    }

    render() {

        const {isLogin, manualLoginUrl, manualLogin,error,msg}=this.state;
        if (error) {
            return <div style={{textAlign:'center',margin:'1rem 0.3rem',fontSize:'0.32rem'}}>
                {msg}
            </div>;
        }
        if (manualLogin) {
            return (
                <div style={{textAlign:'center',margin:'1rem 0.3rem',fontSize:'0.32rem'}}>
                    <a href={manualLoginUrl}>点击手动登录</a>
                </div>
            )
        }
        const {url}=this.props;
        if (url == null) {
            return <div style={{textAlign:'center',margin:'1rem 0.3rem',fontSize:'0.32rem'}}>
                请设置wxqy的url
            </div>;
        }
        if (!isLogin) {
            return <div></div>
        }
        return this.props.children;
    }
}
