/**
 * Created by dxc on 2016/10/28.
 */
import React, {Component, PropTypes} from 'react';
import Base64 from '../utils/Base64'
import Q from 'q'
import JsonP from '../utils/JsonP'
const openUrl = location.origin + location.pathname + location.search;
import browser from '../utils/browser'
import requireJs from '../utils/requireJs'
import Url from 'urijs'
export default class QyWxSign extends Component {
    state = {
        init: false
    };
    static defaultProps = {
        debug: false,
        ready: (wx)=> {
        },
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
    };

    //渲染前调用一次，这个时候DOM结构还没有渲染。fv
    componentWillMount() {
        const {debug, jsApiList, ready}=this.props;
        if (browser['name'] == 'wechat') {
            this.jsonp().then((response)=> {
                const data = JSON.parse(response);
                data.debug = debug;
                data.jsApiList = jsApiList;
                this.initWx(data);
            })
        }
    }
    initWx(data) {
        if (typeof wx == 'object') {
            const {ready}=this.props;
            this.wxConfig(data);
            wx.ready(()=> {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                ready();
                this.setState({init: true});
            });
        } else {
            setTimeout(()=> {
                this.initWx(data);
            }, 50)
        }
    }

    wxConfig(data) {
        const me = this;
        wx.config(data);
        this.timeout = setTimeout(function () {
            me.wxConfig(data);
        }, 2000);
    }

    jsonp() {
        const {url, app_id}=this.props;
        const fullUrl = url + 'sign?' +
            'app_id=' + app_id +
            '&url=' + encodeURIComponent(Base64.encode(openUrl));
        const promise = Q.defer();
        JsonP(fullUrl, 'QyWxSignPackage' + Math.floor(Math.random() * 10000));
        const timed = setTimeout(function () {
            alert('签名超时！');
        }, 10000);
        window.QyWxSignPackage = function (res) {
            clearTimeout(timed);
            window.QyWxSignPackage = null;
            promise.resolve(res);
        };
        return promise.promise;
    }

    render() {
        const {init}=this.state;
        const {app_id, url}=this.props;
        if (app_id == null) {
            return <div>请设置app_id</div>;
        }
        if (url == null) {
            return <div>请设置wop的url</div>;
        }
        if (browser['name'] != 'wechat') {
            return this.props.children;
        }
        if (!init) {
            return <div></div>
        }
        return this.props.children;
    }
}
