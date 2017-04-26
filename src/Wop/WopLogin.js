/**
 * Created by dxc on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import Base64 from 'wxjs2/lib/utils/Base64'
import JsonP from 'wxjs2/lib/utils/JsonP'
import Q from 'q'
import Url from 'urijs'
export default class WxQyLogin extends Component {
    static defaultProps = {
        error: 'false',
        cookie_name: 'wop2',
        is_get_user_info: false,
        userInfoCB: (user)=> {
        }
    };
    state = {
        isLogin: false,
        manualLogin: false,
        manualLoginUrl: '',
        url: ''
    };
    //渲染前调用一次，这个时候DOM结构还没有渲染。fv
    componentWillMount() {
        const {url, app_id, userInfo,cookie_name}=this.props;
        if (url == null || app_id == null) {
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

    setCookie(c_name, value, expiredays) {
        var uri = new Url();
        var domain = uri.domain();
        var exdate = new Date();
        if (domain == null || domain == '') {
            domain = location.hostname;
        }
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + encodeURIComponent(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/" + ";domain=" + domain;
    }

    getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return arr[2];
        else
            return '';
    }

    jsonp() {
        const {url, is_get_user_info, app_id,cookie_name}=this.props;
        const fullUrl = url + 'wx-base/login?' +
            'app_id=' + app_id +
            '&is_user_info=' + is_get_user_info +
            '&url=' + encodeURIComponent(Base64.encode(location.href)) +
            '&cookie=' + this.getCookie(cookie_name);
        const promise = Q.defer();
        const timed = setTimeout(function () {
            alert('登录超时！');
        }, 10000);
        JsonP(fullUrl, 'WopUserInfo' + Math.floor(Math.random() * 10000));
        window.WopUserInfo = function (res) {
            clearTimeout(timed);
            window.WopUserInfo = null;
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
                <div style={{textAlign:'center',marginTop:'50px'}}>
                    <a href={manualLoginUrl}>点击手动登录</a>
                </div>
            )
        }
        const {app_id, url}=this.props;
        if (app_id == null) {
            return <div>请设置app_id</div>;
        }
        if (url == null) {
            return <div>请设置wop的url</div>;
        }
        if (!isLogin) {
            return <div></div>
        }
        return this.props.children;
    }
}
