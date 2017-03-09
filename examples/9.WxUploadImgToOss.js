/**
 * Created by dxc on 2016/10/30.
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import  {WxQySign, WxQyUploadImgToOss} from 'wxjs2';
import Clipboard from 'clipboard'
import {WxFlowLayoutImagePicker} from 'react-imagepicker';
import {Loading} from 'fs-loading'
export default class WxQyUploadImgToOssExamples extends Component {
    state = {
        loading: false,
        serverIds: []//serverIds例子中用于复制调试使用实际项目中不需要
    };

    componentDidMount() {
        //复制调试
        new Clipboard('.btn');
    }

    getImageUrl(value) {
        return value;
    }

    uploadImage(serverId, localId, callback) {
        const me = this;
        const {serverIds}=this.state;
        serverIds.push(serverId);
        this.setState({serverIds});
        //serverId = 'C95JdQ-M2V3wrL5B4nOl54cXUmuqDHII4YhstUgWm-5r0G4ospJnSaalymShZric';
        WxQyUploadImgToOss(wxqy_url, serverId).then(function (res) {
            if (res.result) {
                callback(res.data.host + res.data.url);
            } else {
                alert(res);
                callback(false);
            }
        }).catch(function (ex) {
            alert("上传错误,请重试！");
            callback(false);
        });
    }

    onLoading(loading) {
        if (loading) {
            this.setState({loading, serverIds: []})
        } else {
            this.setState({loading})
        }
    }

    render() {
        const me = this;
        const {serverIds}=me.state;
        return (
            <div style={{maxWidth: 400,margin:20}}>
                <Loading isShow={this.state.loading}/>
                <WxFlowLayoutImagePicker
                    max={11}
                    getImageUrl={this.getImageUrl.bind(this)}
                    uploadImage={this.uploadImage.bind(this)}
                    onLoading={this.onLoading.bind(this)}
                />
                <div>
                    <p>serverIds</p>
                    <div>
                        <input id="foo" onChange={()=>{}} value={serverIds.join(',')}/>
                    </div>
                    <button className="btn" data-clipboard-target="#foo">复制serverIds</button>
                </div>
            </div>
        )
    }
}
ReactDOM.render(
    <WxUploadImgToOssExamples />,
    document.getElementById('__react-content')
);