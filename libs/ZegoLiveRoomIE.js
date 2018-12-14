'use strict';

/**
 * @file ZegoLiveRoomIE.js 
 * @classdesc Zego IE ActiveX 控件使用接口文档
 * @copyright Zego @ 2018
 */
function ZegoLiveRoom() {

    var zego_api_ = null;
    var local_main_video_view_ = null;
    var local_aux_video_view_ = null;

    if (!document.getElementById('ZegoLiveRoom')) {
        var pluginObj = document.createElement('object');
        pluginObj.setAttribute('id', 'ZegoLiveRoom');
        if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
            pluginObj.setAttribute('classid', 'CLSID:4b60e490-4a44-430e-bd58-0cad128ee21e');
        } else {
            pluginObj.setAttribute('type', 'application/zego-liveroom');
        }
        document.body.appendChild(pluginObj);
        pluginObj.setAttribute('width', '0');
        pluginObj.setAttribute('height', '0');
        zego_api_ = pluginObj;
    }
    if (!zego_api_) {
        console.log("load zego liveroom api sdk failed.");
    }

    /**
     * 注册事件监听
     * @param {string} event_name - 事件名称
     * @param {function} cb 可以注册的事件有： 
     * @param {onAVKitEvent}  cb.cb SDK 引擎事件通知
     * @param {onPlayStateUpdate}  cb.cb 拉流状态通知
     * @param {onPlayQualityUpdate}  cb.cb 拉流质量更新事件通知
     * @param {onPublishStateUpdate}  cb.cb 推流状态更新返回
     * @param {onStreamUpdated}  cb.cb 流更新事件通知添加或者删除流的事件
     * @param {onPublishQualityUpdate}  cb.cb 推流质量通知
     * @param {onUserUpdate}  cb.cb 房间用户信息更新
     * @param {onUpdateOnlineCount}  cb.cb 房间在线人数更新
     * @param {onSendRoomMessage}  cb.cb 发送房间消息结果返回
     * @param {onRecvRoomMessage}  cb.cb 收到房间消息通知
     * @param {onSendBigRoomMessage}  cb.cb 发送大房间消息结果返回
     * @param {onRecvBigRoomMessage}  cb.cb 收到大房间消息通知
     * @param {onCustomCommand}  cb.cb 发送自定义消息结果返回
     * @param {onRecvCustomCommand}  cb.cb 收到自定义消息通知
     * @param {onStreamExtraInfoUpdated}  cb.cb 流额外信息更新通知
     * @param {onAudioDeviceStateChanged}  cb.cb 音频设备状态更新通知
     * @param {onVideoDeviceStateChanged}  cb.cb 视频设备状态更新通知
     * @param {onAudioVolumeChanged}  cb.cb 音量变更事件通知
     * @param {onDeviceError}  cb.cb 设备状态错误事件通知
     * @param {onKickOut}  cb.cb 被挤掉线通知
     * @param {onDisconnect}  cb.cb 已从房间断开连接
     * @param {onReconnect}  cb.cb 正在重连通知
     * @param {onTempBroken}  cb.cb 临时中断通知
     * @param {onAVEngineStop}  cb.cb 引擎结束停止通知
     * @return {boolean} - 是否注册成功
    */
    this.onEventHandler = function (event_name, cb) {
        return zego_api_.registerEventHandler(event_name, cb);
    };

    /**
     * 初始化sdk
     * @param {object} option - 初始化对象参数
     * @param {string} option.app_id - app id ，需要向zego申请获取
     * @param {string} option.sign_key - sign key , 需要向zego申请获取
     * @param {string} option.user_id - 唯一用户id
     * @param {string} option.user_name - 用户名
     * @param {onInitSDK} cb - 初始化结果回调
     * @return {boolean} 返回true表示正在初始化，false初始化失败
     */
    this.initSDK = function (_ref, cb) {
        var app_id = _ref.app_id,
            sign_key = _ref.sign_key,
            user_id = _ref.user_id,
            user_name = _ref.user_name;


        var ret = zego_api_.setUser(user_id, user_name);
        if (ret) {
            ret = zego_api_.initSDK(app_id, sign_key, cb);
        }
        return ret;
    };
    /**
     * 反初始化sdk
     */
    this.unInitSDK = function () {
        return zego_api_.unInitSDK();
    };
    /**
     * 获取sdk版本信息
     * @return {string} sdk 版本信息
     */
    this.getSDKVersion = function () {
        return zego_api_.getSDKVersion();
    };
    /**
     * 获取引擎版本信息
     * @return {string} 引擎版本信息
     */
    this.getEngineVersion = function () {
        return zego_api_.getEngineVersion();
    };
    /**
     * 配置sdk环境，测试环境、正式环境
     * @param {object} option 参数对象
     * @param {boolean} option.use_test_env - 是否使用测试环境
     * @param {boolean} option.use_alpha_env - 是否使用alpha环境 
     */
    this.setUseEnv = function (_ref2) {
        var use_test_env = _ref2.use_test_env,
            use_alpha_env = _ref2.use_alpha_env;

        zego_api_.setUseEnv(use_test_env, use_alpha_env);
    };
    /**
     * 设置日志存储路径
     * @param {object} option - 参数对象
     * @param {string} option.log_dir - 配置sdk日志存储路径
     * @return {boolean} 设置结果是否成功
     */
    this.setLogDir = function (_ref3) {
        var log_dir = _ref3.log_dir;

        zego_api_.setLogDir(log_dir);
    };
    /**
     * 配置日志最大文件大小
     * @param {object} option - 参数对象
     * @param {number} option.log_size - 日志文件最大大小值
     */
    this.setLogSize = function (_ref4) {
        var log_size = _ref4.log_size;

        zego_api_.setLogSize(log_size);
    };
    /**
     * 上传sdk日志
     */
    this.uploadLog = function () {
        zego_api_.uploadLog();
    };

    this.enableAddonLog = function (_ref5) {
        var enable = _ref5.enable;

        zego_api_.enableAddonLog(enable);
    };

    /**
     * 开始录制
     * @param {object} option - 参数对象
     * @param {string} option.savefile - 录制文件保存路径
     * @return {boolean} true 成功， false 失败
     */
    this.startRecord = function (_ref6, cb) {
        var savefile = _ref6.savefile;

        zego_api_.startRecord(savefile, cb);
    };

    /**
     * 停止录制
     */
    this.stopRecord = function () {
        zego_api_.stopRecord();
    };

    /**
     * 初始化录制文件显示时间戳字体
     * @param {object} option - 参数对象
     * @param {string} option.fontPath - 字体路径
     * @ignore
     */
    this.initFontPath = function (_ref7) {
        var fontPath = _ref7.fontPath;

        zego_api_.initFontPath(fontPath);
    };

    /**
     * 更新ppt图像路径，双录录制ppt更新
     * @param {object} option - 参数对象
     * @param {string} option.pptPath - 图像路径 
     * @ignore
     */
    this.updatePPTPath = function (_ref8) {
        var pptPath = _ref8.pptPath;

        zego_api_.updateRecordPPTPath(pptPath);
    };

    /**
     * 播放音频
     * @param {object} option - 参数对象
     * @param {string} option.audioFilePath - 音频文件路径
     */
    this.playAudioFile = function (_ref9) {
        var audioFilePath = _ref9.audioFilePath;

        zego_api_.playAudioFile(audioFilePath);
    };

    /**
     * 设置录制输出分辨率
     * @param {object} option - 参数对象
     * @param {number} option.width - 宽
     * @param {number} option.height - 高
     */
    this.setRecordOutput = function (_ref10) {
        var width = _ref10.width,
            height = _ref10.height;

        zego_api_.setRecordOutput(width, height);
    };
    /**
     * 添加录制源
     * @param {object} option - 参数对象
     * @param {number} option.source_type - 录制源类型，取值查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.RecordSourceType</a>
     * @param {number} option.pos_x - 录制源的起始位置x，(0,0)为左上角
     * @param {number} option.pos_y - 录制源的起始位置y，(0,0)为左上角
     * @param {number} option.width - 宽
     * @param {number} option.height - 高
     * @param {number} option.view_mode - 设置录制区域的缩放模式，0 - 等比缩放，可能有黑边，1 - 等比缩放填充整View，可能有部分被裁减，2 - 填充整个View     
     */
    this.addRecordSource = function (_ref11) {
        var source_type = _ref11.source_type,
            pos_x = _ref11.pos_x,
            pos_y = _ref11.pos_y,
            width = _ref11.width,
            height = _ref11.height,
            _ref11$view_mode = _ref11.view_mode,
            view_mode = _ref11$view_mode === undefined ? 0 : _ref11$view_mode;

        zego_api_.addRecordSource(source_type, pos_x, pos_y, width, height, view_mode);
    };
    /**
     * 录制过程中对图片源进行更新的函数
     * @param {object} option - 参数对象
     * @param {string} option.image_path - 图片本地路径
     */
    this.updateRecordImagePath = function (_ref12) {
        var image_path = _ref12.image_path;

        zego_api_.updateRecordImagePath(image_path);
    };

    // ZegoRoom
    /**
     * 登录房间
     * @param {object} option - 参数对象
     * @param {string} option.room_id - 房间id
     * @param {string} option.room_name - 房间名字
     * @param {number} option.role - 角色，取值查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.ZegoRoomRole</a>
     * @param {onLoginRoom} cb - 登录房间结果回调
     * @return {boolean} true-正在异步登陆，false-失败
     */
    this.loginRoom = function (_ref13, cb) {
        var room_id = _ref13.room_id,
            room_name = _ref13.room_name,
            role = _ref13.role;

        return zego_api_.loginRoom(room_id, room_name, role, cb);
    };
    /**
     * 登出房间
     * @param {onLogoutRoom} cb - 登出房间结果回调
     * @return {boolean} true-正在异步退出，false-失败
     */
    this.logoutRoom = function (cb) {
        return zego_api_.logoutRoom(cb);
    };

    // ZegoPublishStream
    /**
     * 设置本地摄像头预览目标
     * @param {object} option - 参数对象
     * @param {video-view-object} option.video_view - 要显示的对象,VideView对象，使用如下：&lt;OBJECT CLASSID="CLSID:e7b5087b-d657-4322-8244-5b63ee1f53ef" id="localVideo" width="360px" height="240px"&gt;&lt;/OBJECT&gt;。传递：document.getElementById("localVideo")的值即可。
     * @param {number} option.channel_index - 摄像头通道索引，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     * @return {boolean} true-成功，false-失败
     */
    this.setPreviewView = function (_ref14) {
        var video_view = _ref14.video_view,
            _ref14$channel_index = _ref14.channel_index,
            channel_index = _ref14$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref14$channel_index;

        var hwnd = video_view.HWND;
        if (!hwnd) {
            return false;
        }
        if (channel_index == 0) {
            local_main_video_view_ = video_view;
        } else if (channel_index == 1) {
            local_aux_video_view_ = video_view;
        }
        return zego_api_.setPreviewView(hwnd, channel_index);
    };
    /**
     * 开始预览
     * @param {object} option - 参数对象
     * @param {number} option.channel_index - 摄像头通道索引，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     * @return {boolean} true-成功，false-失败
     */
    this.startPreview = function (_ref15) {
        var _ref15$channel_index = _ref15.channel_index,
            channel_index = _ref15$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref15$channel_index;

        var ret = zego_api_.startPreview(channel_index);
        if (ret) {
            if (channel_index == 0) {
                if (local_main_video_view_) {
                    local_main_video_view_.startVideo();
                }
            } else if (channel_index == 1) {
                if (local_aux_video_view_) {
                    local_aux_video_view_.startVideo();
                }
            }
        }
        return ret;
    };
    /**
     * 停止预览
     * @param {object} option - 参数对象
     * @param {number} option.channel_index - 摄像头通道索引，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     * @return {boolean} true-成功， false-失败
     */
    this.stopPreview = function (_ref16) {
        var _ref16$channel_index = _ref16.channel_index,
            channel_index = _ref16$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref16$channel_index;

        var ret = zego_api_.stopPreview(channel_index);
        if (channel_index == 0) {
            if (local_main_video_view_) {
                local_main_video_view_.stopVideo();
            }
        } else if (channel_index == 1) {
            if (local_aux_video_view_) {
                local_aux_video_view_.stopVideo();
            }
        }
        return ret;
    };
    /**
     * 开始推流
     * @param {object} option - 参数对象
     * @param {string} option.title - 推流标题
     * @param {string} option.stream_id - 推流流id
     * @param {number} option.publish_flag - 推流flag，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.ZegoPublishFlag</a>
     * @param {string} option.params - 推流附带参数,不能带空格
     * @return {boolean} true - 开始异步推流， false - 失败
     */
    this.startPublishing = function (_ref17) {
        var title = _ref17.title,
            stream_id = _ref17.stream_id,
            publish_flag = _ref17.publish_flag,
            params = _ref17.params;

        return zego_api_.startPublishing(title, stream_id, publish_flag, params);
    };
    /**
     * 停止推流
     * @param {object} option - 参数对象
     * @param {string} option.msg 停止推流额外信息
     * @param {number} option.channel_index 推流通道，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.stopPublishing = function (_ref18) {
        var _ref18$msg = _ref18.msg,
            msg = _ref18$msg === undefined ? 0 : _ref18$msg,
            _ref18$channel_index = _ref18.channel_index,
            channel_index = _ref18$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref18$channel_index;

        return zego_api_.stopPublishing(msg, channel_index);
    };
    /**
     * 是否使用摄像头
     * @param {object} option - 参数对象
     * @param {boolean} option.enable - true-开启， false-关闭
     * @param {number} option.channel_index - 摄像头通道索引，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.enableCamera = function (_ref19) {
        var _ref19$enable = _ref19.enable,
            enable = _ref19$enable === undefined ? true : _ref19$enable,
            _ref19$channel_index = _ref19.channel_index,
            channel_index = _ref19$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref19$channel_index;

        return zego_api_.enableCamera(enable, channel_index);
    };
    /**
     * 是否开启本地摄像头镜像模式
     * @param {object} option -  参数对象
     * @param {boolean} option.enable - true-使用镜像， false-不使用镜像模式
     * @param {number} option.channel_index - 摄像头通道索引，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.enableCaptureMirror = function (_ref20) {
        var _ref20$enable = _ref20.enable,
            enable = _ref20$enable === undefined ? true : _ref20$enable,
            _ref20$channel_index = _ref20.channel_index,
            channel_index = _ref20$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref20$channel_index;

        return zego_api_.enableCaptureMirror(enable, channel_index);
    };
    /**
     * 设置摄像头采集分辨率
     * @param {object} option - 参数对象
     * @param {number} option.width - 宽 
     * @param {number} option.height - 高
     * @param {number} option.channel_index - 通道索引，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.setVideoCaptureResolution = function (_ref21) {
        var width = _ref21.width,
            height = _ref21.height,
            _ref21$channel_index = _ref21.channel_index,
            channel_index = _ref21$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref21$channel_index;

        return zego_api_.setVideoCaptureResolution(width, height, channel_index);
    };
    /**
     * 设置音频设备模式，确保在 initSDK 前调用
     * @param {object} option  - 参数对象
     * @param {number} option.device_mode - 模式，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.ZegoAVAPIAudioDeviceMode</a>
     */
    this.setAudioDeviceMode = function (_ref22) {
        var device_mode = _ref22.device_mode;

        zego_api_.setAudioDeviceMode(device_mode);
    };
    /**
     * 回声消除开关，建议在推流前调用设置
     * @param {object} option - 参数对象 
     * @param {boolean} option.enable - true 开启，false 关闭
     */
    this.enableAEC = function (_ref23) {
        var enable = _ref23.enable;

        return zego_api_.enableAEC(enable);
    };
    /**
     * 音频采集自动增益开关
     * @param {object} option - 参数对象 
     * @param {boolean} option.enable - true 开启，false 关闭
     */
    this.enableAGC = function (_ref24) {
        var enable = _ref24.enable;

        return zego_api_.enableAGC(enable);
    };
    /**
     * 音频采集噪声抑制开关
     * @param {object} option - 参数对象 
     * @param {boolean} option.enable - true 开启，false 关闭
     */
    this.enableANS = function (_ref25) {
        var enable = _ref25.enable;

        return zego_api_.enableANS(enable);
    };
    /**
     * 开启采集监听
     * @param {object} option - 参数对象
     * @param {boolean} option.enable - true 开启，false 关闭
     * @return {boolean} true 成功，false 失败
     */
    this.enableLoopback = function (_ref26) {
        var enable = _ref26.enable;

        return zego_api_.enableLoopback(enable);
    };
    /**
     * 设置监听音量,推流时可调用本 API 进行参数配置
     * @param {object} option - 参数对象
     * @param {number} option.volume - 音量大小，取值（0, 100）。默认 100
     */
    this.setLoopbackVolume = function (_ref27) {
        var volume = _ref27.volume;

        return zego_api_.setLoopbackVolume(volume);
    };
    /**
     * 硬件编码开关,如果要打开，需要在推流前设置,打开硬编硬解开关需后台可控，避免碰到版本升级或者硬件升级时出现硬编硬解失败的问题
     * @param {object} option - 参数对象
     * @param {boolean} option.enable - true 开启，false 关闭。默认 false
     */
    this.requireHardwareEncoder = function (_ref28) {
        var enable = _ref28.enable;

        return zego_api_.requireHardwareEncoder(enable);
    };
    /**
     * 设置视频带宽比特率
     * @param {object} option - 参数对象
     * @param {number} option.bitrate - 比特率
     * @param {number} option.channel_index - 通道索引 , 查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.setVideoBitrate = function (_ref29) {
        var bitrate = _ref29.bitrate,
            _ref29$channel_index = _ref29.channel_index,
            channel_index = _ref29$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref29$channel_index;

        return zego_api_.setVideoBitrate(bitrate, channel_index);
    };
    /**
     * 设置视频帧率
     * @param {object} option - 参数对象
     * @param {number} option.fps - 帧率
     * @param {number} option.channel_index - 通道索引 , 查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.setVideoFPS = function (_ref30) {
        var fps = _ref30.fps,
            _ref30$channel_index = _ref30.channel_index,
            channel_index = _ref30$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref30$channel_index;

        return zego_api_.setVideoFPS(fps, channel_index);
    };
    /**
     * 设置视频编码分辨率
     * @param {object} option - 参数对象
     * @param {number} option.width - 宽
     * @param {number} option.height - 高
     * @param {number} option.channel_index - 通道索引, 查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.setVideoEncodeResolution = function (_ref31) {
        var width = _ref31.width,
            height = _ref31.height,
            _ref31$channel_index = _ref31.channel_index,
            channel_index = _ref31$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref31$channel_index;

        return zego_api_.setVideoEncodeResolution(width, height, channel_index);
    };
    /**
     * 设置音频比特率
     * @param {object} option - 参数对象
     * @param {number} option.bitrate - 比特率值
     */
    this.setAudioBitrate = function (_ref32) {
        var bitrate = _ref32.bitrate;

        return zego_api_.setAudioBitrate(bitrate);
    };
    /**
     * 设置配置信息
     * @param {object} option - 参数对象
     * @param {string} option.config - 配置信息
     *   配置项的写法，例如 "keep_audio_session_active=true", 等号后面值的类型要看下面每一项的定义
     *   "prefer_play_ultra_source", int value, 确保在 InitSDK 前调用，但开启拉流加速(config为“prefer_play_ultra_source=1”)可在 InitSDK 之后，拉流之前调用
     *   "camera_orientation_mode", string value: auto/hardcode/0/90/180/270. for Android, Windows。
     *   "alsa_capture_device_name" string value: plughw:[card_id],[device_id], eg: plughw:1,0, default is plug:default. view the device list with arecord. for Linux。
     *   "alsa_playback_device_name" string value: plughw:[card_id],[device_id], eg: plughw:1,0, default is plug:default. view the device list with aplay. for Linux。
     */
    this.setGeneralConfig = function (_ref33) {
        var config = _ref33.config;

        return zego_api_.setGeneralConfig(config);
    };
    /**
     * 设置或更新推流的附加信息,更新流附加信息成功后，同一房间内的其他人会收到 onStreamExtraInfoUpdated 通知
     * @param {object} option - 参数对象
     * @param {string} option.extra_info - 流附加信息
     * @param {number} option.channel_index - 推流 channel Index, 查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.setPublishStreamExtraInfo = function (_ref34) {
        var extra_info = _ref34.extra_info,
            _ref34$channel_index = _ref34.channel_index,
            channel_index = _ref34$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref34$channel_index;

        return zego_api_.setPublishStreamExtraInfo(extra_info, channel_index);
    };
    /**
     * 自定义转推目的地
     * @param {object} option - 参数对象
     * @param {string} option.target_addr - 目的 rmtp 推流地址
     * @param {number} option.channel_index - 推流 channel Index, 查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.setCustomPublishTarget = function (_ref35) {
        var target_addr = _ref35.target_addr,
            channel_index = _ref35.channel_index;

        return zego_api_.setCustomPublishTarget(target_addr, channel_index);
    };
    /**
     * 设置推流音频声道数,必须在推流前设置
     * @param {object} option - 参数对象
     * @param {number} option.channel_count - 声道数，1 或 2，默认为 1（单声道）
     */
    this.setAudioChannelCount = function (_ref36) {
        var channel_count = _ref36.channel_count;

        return zego_api_.setAudioChannelCount(channel_count);
    };
    /**
     * 是否开启离散音频包发送,确保在推流前调用，只有纯 UDP 方案才可以调用此接口
     * @param {object} option - 参数对象
     * @param {boolean} option.enable - true 开启，此时关闭麦克风后，不会发送静音包；false 关闭，此时关闭麦克风后会发送静音包
     */
    this.enableDTX = function (_ref37) {
        var enable = _ref37.enable;

        return zego_api_.enableDTX(enable);
    };
    /**
     * 是否开启流量控制,确保在推流前调用，在纯 UDP 方案才可以调用此接口
     * @param {object} option - 参数对象
     * @param {number} option.control_property - 流量控制属性 (帧率，分辨率）
     * @param {boolean} option.enable - true 开启，false 关闭。默认开启
     */
    this.enableTrafficControl = function (_ref38) {
        var control_property = _ref38.control_property,
            enable = _ref38.enable;

        return zego_api_.enableTrafficControl(control_property, enable);
    };
    /**
     * 帧顺序检测开关
     * @param {object} option - 参数对象
     * @param {boolean} option.enable true 检测帧顺序，不支持B帧； false 不检测帧顺序，支持B帧，可能出现短暂花屏
     */
    this.enableCheckPoc = function (_ref39) {
        var enable = _ref39.enable;

        return zego_api_.enableCheckPoc(enable);
    };

    // ZegoPlayStream
    /**
     * 拉流播放
     * @param {object} option - 参数对象
     * @param {string} option.stream_id - 流id
     * @param {video-view-object} option.video_view - 要显示的对象,VideView对象，使用如下：&lt;OBJECT CLASSID="CLSID:e7b5087b-d657-4322-8244-5b63ee1f53ef" id="remoteVideo" width="360px" height="240px"&gt;&lt;/OBJECT&gt;。传递：document.getElementById("remoteVideo")的值即可。
     * @param {string} option.param - 拉流参数，要与推流参数一致
     */
    this.startPlayingStream = function (_ref40) {
        var stream_id = _ref40.stream_id,
            video_view = _ref40.video_view,
            param = _ref40.param;

        var hwnd = video_view.HWND;
        if (!hwnd) {
            return false;
        }
        var ret = zego_api_.startPlayingStream(stream_id, hwnd, param);
        if (ret) {
            video_view.startVideo();
        }
    };
    /**
     * 停止拉流
     * @param {object} option - 参数对象
     * @param {string} option.stream_id - 流id 
     */
    this.stopPlayingStream = function (_ref41) {
        var stream_id = _ref41.stream_id;

        return zego_api_.stopPlayingStream(stream_id);
    };
    /**
     * 硬件解码,如果要打开，需要在拉流前设置,打开硬编硬解开关需后台可控，避免碰到版本升级或者硬件升级时出现硬编硬解失败的问题
     * @param {object} option - 参数对象
     * @param {boolean} option.required - true 打开，false 关闭。默认 false
     */
    this.requireHardwareDecoder = function (_ref42) {
        var required = _ref42.required;

        return zego_api_.requireHardwareDecoder(required);
    };
    /**
     * （声音输出）静音开关, 设置为关闭后，默认扬声器和耳机均无声音输出
     * @param {object} option - 参数对象
     * @param {boolean} option.enable - true 不静音，false 静音。默认 true
     * @return {boolean} true 成功，false 失败
     */
    this.enableSpeaker = function (_ref43) {
        var enable = _ref43.enable;

        return zego_api_.enableSpeaker(enable);
    };
    /**
     * 设置播放音量
     * @param {object} option - 参数对象
     * @param {number} option.volume - 音量取值范围为(0, 100)，数值越大，音量越大。默认 100
     */
    this.setPlayVolume = function (_ref44) {
        var volume = _ref44.volume;

        return zego_api_.setPlayVolume(volume);
    };
    /**
     * 获取 SDK 支持的最大同时播放流数
     * @return {number} 最大支持播放流数
     */
    this.getMaxPlayChannelCount = function () {
        return zego_api_.getMaxPlayChannelCount();
    };
    /**
     * 设置拉流质量监控周期
     * @param {object} option - 参数对象
     * @param {number} option.cycle_ms - 时间周期，单位为毫秒，取值范围为(500, 60000)。默认为 3000
     * @return {boolean} true 成功，false 失败 
     */
    this.setPlayQualityMonitorCycle = function (_ref45) {
        var cycle_ms = _ref45.cycle_ms;

        return zego_api_.setPlayQualityMonitorCycle(cycle_ms);
    };

    // ZegoIM
    /**
     * 发送聊天室消息
     * @param {object} option - 参数对象
     * @param {number} option.msg_type - 消息类型，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.ZegoMessageType</a>
     * @param {number} option.msg_category - 消息分类， 查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.ZegoMessageCategory</a>
     * @param {string} option.msg_content - 消息内容
     * @return {number} 返回消息的seq
     */
    this.sendRoomMessage = function (_ref46) {
        var msg_type = _ref46.msg_type,
            msg_category = _ref46.msg_category,
            msg_content = _ref46.msg_content;

        return zego_api_.sendRoomMessage(msg_type, msg_category, msg_content);
    };
    /**
     * 发送不可靠信道消息，主要用于大并发的场景，发送一些非必须到达的消息
     * @param {object} option - 参数对象
     * @param {number} option.msg_type - 消息类型，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.ZegoMessageType</a>
     * @param {number} option.msg_category - 消息分类， 查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.ZegoMessageCategory</a>
     * @param {string} option.msg_content - 消息内容
     * @return {number} 返回消息的seq
     */
    this.sendBigRoomMessage = function (_ref47) {
        var msg_type = _ref47.msg_type,
            msg_category = _ref47.msg_category,
            msg_content = _ref47.msg_content;

        return zego_api_.sendBigRoomMessage(msg_type, msg_category, msg_content);
    };
    /**
     * 发送自定义消息
     * @param {object} option - 参数对象
     * @param {object|array}  option.member_list - 发送目标列表，数据格式为：[{user_id:'1', user_name:'1'},{user_id:'2', user_name:'3'}]
     * @param {string} option.msg_content - 消息内容
     * @return {number} 返回消息的seq
     */
    this.sendCustomCommand = function (_ref48) {
        var member_list = _ref48.member_list,
            msg_content = _ref48.msg_content;

        return zego_api_.sendCustomCommand(member_list, msg_content);
    };

    // ZegoDevice
    /**
     * 获取音频设备列表
     * @param {object} option - 参数对象
     * @param {number} option.device_type - 设备类型，查看<a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.AudioDeviceType</a>
     * @return {object|array} 返回音频设备id和名字的对象列表
     */
    this.getAudioDeviceList = function (_ref49) {
        var device_type = _ref49.device_type;

        return zego_api_.getAudioDeviceList(device_type);
    };
    /**
     * 选择音频设备
     * @param {object} option - 参数对象
     * @param {number} option.device_type - 设备类型，输入设备或者输出设备，查看<a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.AudioDeviceType</a>
     * @param {string} option.device_id - 设备id
     */
    this.setAudioDevice = function (_ref50) {
        var device_type = _ref50.device_type,
            device_id = _ref50.device_id;

        return zego_api_.setAudioDevice(device_type, device_id);
    };
    /**
     * 获取视频设备列表
     * @return {object | array} - 返回视频设备id和名字的对象列表
     */
    this.getVideoDeviceList = function () {
        return zego_api_.getVideoDeviceList();
    };
    /**
     * 设置选用视频设备
     * @param {object} option - 参数对象
     * @param {string} option.device_id - 设备id
     * @param {number} option.channel_index - 通道索引，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.PublishChannelIndex</a>
     */
    this.setVideoDevice = function (_ref51) {
        var device_id = _ref51.device_id,
            _ref51$channel_index = _ref51.channel_index,
            channel_index = _ref51$channel_index === undefined ? ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN : _ref51$channel_index;

        return zego_api_.setVideoDevice(device_id, channel_index);
    };
    /**
     * 开启系统声卡声音采集
     * @param {object} option - 参数对象
     * @param {string} option.enable - true-开启，false-关闭
     */
    this.enableMixSystemPlayout = function (_ref52) {
        var enable = _ref52.enable;

        zego_api_.enableMixSystemPlayout(enable);
    };
    /**
     * 获取麦克风音量，切换麦克风后需要重新获取麦克风音量
     * @param {object} option - 参数对像
     * @param {string} option.device_id - 设备id 
     * @return {number} -1: 获取失败，0~100 麦克风音量
     */
    this.getMicDeviceVolume = function (_ref53) {
        var device_id = _ref53.device_id;

        return zego_api_.getMicDeviceVolume(device_id);
    };
    /**
     * 设置麦克风音量
     * @param {object} option - 参数对像
     * @param {string} option.device_id - 麦克风 deviceId
     * @param {number} option.volume - 音量，取值(0,100)
     */
    this.setMicDeviceVolume = function (_ref54) {
        var device_id = _ref54.device_id,
            volume = _ref54.volume;

        return zego_api_.setMicDeviceVolume(device_id, volume);
    };
    /**
     * 获取麦克风是否静音
     * @param {object} option - 参数对像
     * @param {string} option.device_id - 麦克风 deviceId
     */
    this.getMicDeviceMute = function (_ref55) {
        var device_id = _ref55.device_id;

        return zego_api_.getMicDeviceMute(device_id);
    };
    /**
     * 设置麦克风静音
     * @param {object} option - 参数对像
     * @param {string} option.device_id - 麦克风 deviceId
     * @param {boolean} option.is_mute - true 静音，false 不静音
     */
    this.setMicDeviceMute = function (_ref56) {
        var device_id = _ref56.device_id,
            is_mute = _ref56.is_mute;

        return zego_api_.setMicDeviceMute(device_id, is_mute);
    };
    /**
     * 获取扬声器音量
     * @param {object} option - 参数对像
     * @param {string} option.device_id - 扬声器 deviceId
     * @return {number} - -1: 获取失败，0~100 麦克风音量
     */
    this.getSpeakerDeviceVolume = function (_ref57) {
        var device_id = _ref57.device_id;

        return zego_api_.getSpeakerDeviceVolume(device_id);
    };
    /**
     * 设置扬声器音量
     * @param {object} option - 参数对象
     * @param {string} option.device_id - 扬声器 deviceId
     * @param {number} option.volume - 音量，取值 (0，100)
     */
    this.setSpeakerDeviceVolume = function (_ref58) {
        var device_id = _ref58.device_id,
            volume = _ref58.volume;

        return zego_api_.setSpeakerDeviceVolume(device_id, volume);
    };
    /**
     * 获取 App 中扬声器音量
     * @param {object} option - 参数对象
     * @param {string} option.device_id - 扬声器 deviceId
     * @return {number} -1: 获取失败，0~100 扬声器音量
     */
    this.getSpeakerSimpleVolume = function (_ref59) {
        var device_id = _ref59.device_id;

        return zego_api_.getSpeakerSimpleVolume(device_id);
    };
    /**
     * 设置 App 中扬声器音量
     * @param {object} option - 参数对象
     * @param {string} option.device_id - 扬声器 deviceId
     * @param {number} option.volume - 音量，取值 (0，100)
     */
    this.setSpeakerSimpleVolume = function (_ref60) {
        var device_id = _ref60.device_id,
            volume = _ref60.volume;

        return zego_api_.setSpeakerSimpleVolume(device_id, volume);
    };
    /**
     * 获取扬声器是否静音
     * @param {object} option - 参数对象
     * @param {string} option.device_id - 扬声器 deviceId
     * @return {boolean} - true 静音，false 不静音
     */
    this.getSpeakerDeviceMute = function (_ref61) {
        var device_id = _ref61.device_id;

        return zego_api_.getSpeakerDeviceMute(device_id);
    };
    /**
     * 设置扬声器静音
     * @param {object} option - 参数对象
     * @param {string} option.device_id - 扬声器 deviceId
     * @param {boolean} option.is_mute - 静音，false 不静音
     */
    this.setSpeakerDeviceMute = function (_ref62) {
        var device_id = _ref62.device_id,
            is_mute = _ref62.is_mute;

        return zego_api_.setSpeakerDeviceMute(device_id, is_mute);
    };
    /**
     * 获取 App 中扬声器是否静音
     * @param {object} option - 参数对象
     * @param {string} option.device_id - 扬声器 deviceId
     * @return {boolean} true - 静音，false 不静音
     */
    this.getSpeakerSimpleMute = function (_ref63) {
        var device_id = _ref63.device_id;

        return zego_api_.getSpeakerSimpleMute(device_id);
    };
    /**
     * 设置 App 中扬声器静音
     * @param {object} option - 参数对象
     * @param {string} option.device_id - 扬声器 deviceId
     * @param {boolean} option.is_mute - 静音，false 不静音
     */
    this.setSpeakerSimpleMute = function (_ref64) {
        var device_id = _ref64.device_id,
            is_mute = _ref64.is_mute;

        return zego_api_.setSpeakerSimpleMute(device_id, is_mute);
    };
    /**
     * 获取默认的音频设备
     * @param {object} option - 参数对象
     * @param {number} option.device_type - 设备类型，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.AudioDeviceType</a>
     * @param {string} - 设备id
     */
    this.getDefaultAudioDeviceId = function (_ref65) {
        var device_type = _ref65.device_type;

        return zego_api_.getDefaultAudioDeviceId(device_type);
    };
    /**
     * 监听设备的音量变化，设置后如果有音量变化（包括 app 音量）通过 onAudioVolumeChanged 事件通知
     * @param {object} option - 参数对象
     * @param {number} option.device_type - 设备类型，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.AudioDeviceType</a>
     * @param {string} option.device_id - 设备id
     */
    this.setAudioVolumeNotify = function (_ref66) {
        var device_type = _ref66.device_type,
            device_id = _ref66.device_id;

        return zego_api_.setAudioVolumeNotify(device_type, device_id);
    };
    /**
     * 停止监听设备的音量变化
     * @param {object} option - 参数对象
     * @param {number} option.device_type - 设备类型，查看 <a href="./ZegoConstant.js.html" target="_blank">ZEGOCONSTANTS.AudioDeviceType</a>
     * @param {string} option.device_id - 设备id
     */
    this.stopAudioVolumeNotify = function (_ref67) {
        var device_type = _ref67.device_type,
            device_id = _ref67.device_id;

        return zego_api_.stopAudioVolumeNotify(device_type, device_id);
    };
}

/**
 * 初始化sdk回调
 * @callback onInitSDK
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码,0-成功，其它值，查看<a href="https://www.zego.im/html/document/#Audio_Room/Error_Code" target="_blank">官网错误码列表</a>
 */

/**
 * 登陆房间返回
 * @callback onLoginRoom
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码，0-成功，其它值，查看<a href="https://www.zego.im/html/document/#Audio_Room/Error_Code" target="_blank">官网错误码列表</a>
 * @param {string} result.room_id - 房间id
 * @param {number} result.stream_count - 房间媒体流的数量
 * @param {string} result.stream_list - 流信息对象数组，流信息对象属性如下：
 * @param {string} result.stream_list.stream_id - 流id
 * @param {string} result.stream_list.user_name - 用户名
 * @param {string} result.stream_list.user_id - 用户id
 * @param {string} result.stream_list.extra_info - 流额外信息
 */

/**
 * 登出房间返回
 * @callback onLogoutRoom
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码,0-成功
 * @param {string} result.room_id - 房间id
 */

/**
 * SDK 引擎事件通知
 * @callback onAVKitEvent
 * @param {object} result - 结果数据对象
 * @param {number} result.event_code - 事件码
 * @param {object|array} result.event_info - 事件信息对象数组，事件信息对象属性如下：
 * @param {string} result.event_info.event_key - 事件名称
 * @param {string} result.event_info.event_value - 事件值
 */

/**
 * 拉流状态通知
 * @callback onPlayStateUpdate
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码，0-成功，其它值查看官网<a href="https://www.zego.im/html/document/#Audio_Room/Error_Code" target="_blank">3 onPlayStateUpdate的错误码说明</a>
 * @param {string} result.stream_id - 流id
 */

/**
 * 拉流质量更新事件通知
 * @callback onPlayQualityUpdate
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 事件码
 * @param {string} result.stream_id - 流id
 * @param {number} result.fps - 拉流帧率
 * @param {number} result.kbps - 视频码流大小
 * @param {number} result.akbps - 音频码流大小
 * @param {number} result.audio_break_rate - 音频卡顿率
 * @param {number} result.rtt - rtt 值
 * @param {number} result.pkt_lost_rate - 丢包率
 * @param {number} result.quality - 质量等级
 */

/**
 * 推流状态更新
 * @callback onPublishStateUpdate
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码，0-成功，其它值查看官网<a href="https://www.zego.im/html/document/#Audio_Room/Error_Code" target="_blank">2 onPublishStateUpdate的错误码说明</a>
 * @param {string} result.stream_id - 流id
 * @param {string|array} result.rtmp_urls - rtmp url数组
 * @param {string|array} result.flv_urls - flv url 数组
 * @param {string|array} result.hls_urls - hls url 数组
 */

/**
 * 推流质量通知
 * @callback onPublishQualityUpdate
 * @param {object} result - 结果数据对象
 * @param {string} result.stream_id - 流id
 * @param {number} result.fps - 拉流帧率
 * @param {number} result.kbps - 视频码流大小
 * @param {number} result.akbps - 音频码流大小
 * @param {number} result.rtt - rtt 值
 * @param {number} result.pkt_lost_rate - 丢包率
 * @param {number} result.quality - 质量等级
 */

/**
 * 流更新事件通知
 * @callback onStreamUpdated
 * @param {object} result - 结果数据对象
 * @param {string} result.room_id - 房间id
 * @param {number} result.stream_update_type - 2001-新增流，2002-删除流
 * @param {number} result.stream_count - 流数量
 * @param {object|array} result.stream_list - 流信息对象数组，流信息对象属性如下：
 * @param {string} result.stream_list.user_id - 用户id 
 * @param {string} result.stream_list.user_name - 用户名字 
 * @param {string} result.stream_list.stream_id - 流id 
 * @param {string} result.stream_list.extra_info - 流额外信息
 */

/**
 * 房间用户信息更新
 * @callback onUserUpdate
 * @param {object} result - 结果数据对象
 * @param {number} result.update_type - 更新类型，1-全量更新，2-增量更新
 * @param {object|array} result.users - 用户信息对象数组，用户信息对象属性如下：
 * @param {string} result.users.user_id - 用户id
 * @param {string} result.users.user_name - 用户名字
 * @param {number} result.users.update_flag - 更新属性，1-新增，2-删除
 * @param {number} result.users.role - 成员角色，1-主播，2-观众
 */

/**
 * 房间在线人数更新
 * @callback onUpdateOnlineCount
 * @param {object} result - 结果数据对象
 * @param {string} result.room_id - 房间id
 * @param {number} result.online_count - 在线人数
 */

/**
 * 发送房间消息结果返回
 * @callback onSendRoomMessage
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码
 * @param {string} result.room_id - 房间id
 * @param {number} result.send_seq - 发送的消息序号
 * @param {number} result.msg_id - 消息id
 */

/**
 * 收到房间消息通知
 * @callback onRecvRoomMessage
 * @param {object} result - 结果数据对象
 * @param {string} result.room_id - 房间id
 * @param {object|array} result.msg_list - 消息信息对象数组，消息信息对象属性如下：
 * @param {string} result.msg_list.user_id - 用户id
 * @param {string} result.msg_list.user_name - 用户名字
 * @param {number} result.msg_list.role - 成员角色，1-主播，2-观众
 * @param {string} result.msg_list.content - 消息内容
 * @param {string} result.msg_list.msg_id - 消息id
 * @param {string} result.msg_list.msg_type - 消息类型
 * @param {number} result.msg_list.msg_priority - 消息优先级，2-默认优先级，3-高优先级
 * @param {number} result.msg_list.msg_category - 消息类别，1-聊天，2-系统，3-点赞，4-送礼物，100-其它
 * @param {number} result.msg_list.send_time - 消息发送时间 
 * 
 */

/**
 * 发送大房间消息结果返回
 * @callback onSendBigRoomMessage
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码
 * @param {string} result.room_id - 房间id
 * @param {number} result.send_seq - 消息序号
 * @param {string} result.msg_id - 消息id
 */

/**
 * 收到大房间消息通知
 * @callback onRecvBigRoomMessage
 * @param {object} result - 结果数据对象
 * @param {string} result.room_id - 房间id
 * @param {object|array} result.msg_list - 消息信息对象数组，消息信息对象属性如下：
 * @param {string} result.msg_list.user_id - 用户id
 * @param {string} result.msg_list.user_name - 用户名字
 * @param {number} result.msg_list.role - 成员角色，1-主播，2-观众
 * @param {string} result.msg_list.content - 消息内容
 * @param {string} result.msg_list.msg_id - 消息id
 * @param {string} result.msg_list.msg_type - 消息类型
 * @param {number} result.msg_list.msg_category - 消息类别，1-聊天，2-系统，3-点赞，4-送礼物，100-其它
 * @param {number} result.msg_list.send_time - 消息发送时间 
 * 
 */

/**
 * 发送自定义消息结果返回
 * @callback onCustomCommand
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码
 * @param {string} result.room_id - 字符串
 * @param {number} result.request_seq - 序号 
 */

/**
 * 收到自定义消息
 * @callback onRecvCustomCommand
 * @param {object} result - 结果数据对象
 * @param {string} result.user_id - 用户id
 * @param {string} result.user_name - 用户名字
 * @param {string} result.room_id - 房间id
 * @param {string} result.content - 消息内容
 */

/**
 * 流额外信息更新通知
 * @callback onStreamExtraInfoUpdated
 * @param {object} result - 结果数据对象
 * @param {string} result.room_id - 房间id
 * @param {number} result.stream_count - 流数量
 * @param {object | array} result.stream_list - 流信息对象数组，流信息对象属性如下：
 * @param {string} result.stream_list.user_id - 用户id
 * @param {string} result.stream_list.user_name - 用户名字
 * @param {string} result.stream_list.stream_id - 流id
 * @param {string} result.stream_list.extra_info - extra_info信息
 * 
 */

/**
 * 音频设备状态更新通知
 * @callback onAudioDeviceStateChanged
 * @param {object} result - 结果数据对象
 * @param {number} result.device_type - 0-输入设备，1-输出设备
 * @param {number} result.device_state - 0-添加设备，1-删除设备
 * @param {string} result.device_id - 设备id
 * @param {string} result.device_name - 设备名字
 */

/**
 * 视频设备状态更新通知
 * @callback onVideoDeviceStateChanged
 * @param {object} result - 结果数据对象
 * @param {number} result.device_state - 0-添加设备，1-删除设备
 * @param {string} result.device_id - 设备id
 * @param {string} result.device_name - 设备名字
 */

/**
 * 音量变更事件通知
 * @callback onAudioVolumeChanged
 * @param {object} result - 结果数据对象
 * @param {number} result.device_type - 0-输入设备，1-输出设备
 * @param {string} result.device_id - 设备id
 * @param {number} result.volume_type - 音量类型，0-设备音量，1-App音量
 * @param {number} result.volume - 音量值
 * @param {boolean} result.is_mute - 是否静音，true-静音，false-非静音
 * 
 */

/**
 * 设备状态错误事件通知，
 * @callback onDeviceError
 * @param {object} result - 结果数据对象
 * @param {number} result.error_code - 错误码
 * @param {string} result.device_name - 设备名字
 */

/**
 * 被挤掉线通知
 * @callback onKickOut
 * @param {object} result - 结果数据对象 
 * @param {number} result.reason - 掉线原因 
 * @param {string} result.room_id - 房间id
 */

/**
 * 已从房间断开连接的通知
 * @callback onDisconnect
 * @param {object} result - 结果数据对象 
 * @param {number} result.error_code - 错误码
 * @param {string} result.room_id - 房间id
 */

/**
 * 正在重连通知
 * @callback onReconnect
 * @param {object} result - 结果数据对象 
 * @param {number} result.error_code - 错误码
 * @param {string} result.room_id - 房间id
 */

/**
 * 临时中断通知
 * @callback onTempBroken
 * @param {object} result - 结果数据对象 
 * @param {number} result.error_code - 错误码
 * @param {string} result.room_id - 房间id
 */

/**
 * 引擎结束停止通知
 * @callback onAVEngineStop
 */

//module.exports = exports = ZegoLiveRoom;
