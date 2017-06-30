/**
 * Created by dxc on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import Base64 from '../utils/Base64'
import JsonP from '../utils/JsonP'
import Q from 'q'
import Cookie from '../utils/Cookie'
export default class QyWxLogin extends Component {
    static defaultProps = {
        cookie_name: 'qy_wx',
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
        const {url,app_id, userInfo,cookie_name}=this.props;
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
                    Cookie.setCookie(cookie_name, json.cookie, 7);
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

    jsonp() {
        const {url,cookie_name,app_id}=this.props;
        const fullUrl = url + 'login?' +
            '&url=' + encodeURIComponent(Base64.encode(location.href)) +
            '&cookie=' + Cookie.getCookie(cookie_name) +
            '&app_id=' + app_id;
        const promise = Q.defer();
        JsonP(fullUrl, 'QyWxUserInfo' + Math.floor(Math.random() * 10000));
        const timed = setTimeout(function () {
            alert('登录超时！');
        }, 10000);
        window.QyWxUserInfo = function (res) {
            clearTimeout(timed);
            window.QyWxUserInfo = null;
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
        const {url,app_id}=this.props;
        if (url == null) {
            return <div style={{textAlign:'center',margin:'1rem 0.3rem',fontSize:'0.32rem'}}>
                请设置url
            </div>;
        }
        if (app_id == null) {
            return <div style={{textAlign:'center',margin:'1rem 0.3rem',fontSize:'0.32rem'}}>
                请设置app_id
            </div>;
        }
        if (!isLogin) {
            return <div></div>
        }
        return this.props.children;
    }
}
