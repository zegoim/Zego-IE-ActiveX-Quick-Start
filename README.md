# Zego LiveRoom IE ActiveX Control Quick Start Demo 

## 一、执行以下命令，下载工程源码
```
$ git clone https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start.git
```

## 二、进入`Zego-IE-ActiveX-Quick-Start`目录， 修改填写`IEPluginDemo.js`的第12行的 app_id 和 第15行sign_key。[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L9)
```
// app id，
// 在zego 控制台https://console.zego.im/acount 
// 注册后，获取app id，填写字符串
const app_id = ""; 
// app key，是一个字符串，格式例如 "0x01, 0x03, 0x44, ...."
const sign_key = "";
```

## 三、运行程序，使用IE浏览器打开 index.html 文件
F12 打开日志调试栏，依次点击以下按钮：
初始化sdk-->登录房间-->选择设备-->开始预览-->开始推流-->开始拉流，界面如下：

![工程运行后的界面](demo.bmp)

<div STYLE="page-break-after: always;"></div>

# 在自己项目中集成Zego IE ActiveX SDK的步骤

1. 安装Zego IE ActiveX控件，双击`ActiveX Control`目录下的`setup.exe`文件

2. 在html中，引入Zego IE ActiveX 的Javascript依赖文件。[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/index.html#L70)
```
<script language="javascript" src="./libs/ZegoConstant.js"></script> 
<script language="javascript" src="./libs/ZegoLiveRoomIE.js"></script> 
```
3. 在js文件中，创建zego client，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L17)
```
// 创建zego client
var zegoClient = new ZegoLiveRoom();
```
4. 配置当前环境，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L65)
```
  // 配置设置当前环境为测试环境
  zegoClient.setUseEnv({ use_test_env: true });
```
5. 初始化sdk，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L69)
```
  // 初始化sdk
  var ret = zegoClient.initSDK({
    app_id: app_id,
    sign_key: sign_key,
    user_id: TEST_USER_ID,
    user_name: TEST_USER_NAME
  }, function (rs) {
    if (rs.error_code == 0) {
      console.log("sdk初始化成功");
    } else {
      console.log("sdk初始化失败,错误码为：" + rs.error_code);
      zegoClient.unInitSDK();
    }
  });
  if (ret) {
    console.log("正在初始化...");
  } else {
    console.log("sdk初始化失败");
    zegoClient.unInitSDK();
  }
};
```
6. 登录房间，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L90)
```
// 登录
loginButton.onclick = function () {
  // 登陆房间
  var ret = zegoClient.loginRoom({
    room_id: TEST_ROOM_ID,
    room_name: TEST_ROOM_NAME,
    role: ZEGOCONSTANTS.ZegoRoomRole.Audience
  }, function (rs) {
    console.log("登录结果返回 ", rs);
    if (rs.error_code == 0) {
      console.log("登录成功");
    } else {
      console.log("登录失败，错误码为：" + rs.error_code);
    }
  });
};
```

7. 选择设备，[参考代码](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L110)
```
  // 获取摄像头设备列表
  var video_devices_list = zegoClient.getVideoDeviceList();
  console.log("got video devices list:", video_devices_list);
  if (video_devices_list.length > 0) {
    var cur_sel_index = 0; // 设备索引，选择第一个设备
    zegoClient.setVideoDevice({
      device_id: video_devices_list[cur_sel_index].device_id
    });
  }
```

8. 定义视频显示控件，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/index.html#L36)，预览摄像头，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L128)
```
<!-- 本地视频显示控件 -->
<OBJECT CLASSID="CLSID:e7b5087b-d657-4322-8244-5b63ee1f53ef" id="localVideo" width="360px" height="240px"></OBJECT>
```
```
  // 预览视频
  var set_ret = zegoClient.setPreviewView({
    video_view: document.getElementById("localVideo"),
    channel_index: ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN
  });
  if (set_ret) {
    var preview_ret = zegoClient.startPreview({
      channel_index: ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN
    });
    console.log("预览结果", preview_ret);

    // 开启回音消除
    zegoClient.enableAEC({ enable: true });

    // 开启噪音消除
    zegoClient.enableANS({ enable: true });

    // 开启增益
    zegoClient.enableAGC({ enable: true });
  }
```

9. 开启回音消除、噪音消除和增益，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L139)

```
    // 开启回音消除
    zegoClient.enableAEC({ enable: true });

    // 开启噪音消除
    zegoClient.enableANS({ enable: true });

    // 开启增益
    zegoClient.enableAGC({ enable: true });
```
10. 开始推流，发送音视频数据，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L150)
```
  // 设置采集分辨率
  zegoClient.setVideoCaptureResolution({ width: 1080, height: 720 });

  // 设置编码分辨率
  zegoClient.setVideoEncodeResolution({ width: 1080, height: 720 });

  // 设置帧率fps
  zegoClient.setVideoFPS({ fps: 25 });

  // 设置码率，单位bps
  zegoClient.setVideoBitrate({ bitrate: 1500000 });

  // 开始推流
  var ret = zegoClient.startPublishing({
    title: "zego ie plugin simple test xx",// 流标题
    stream_id: TEST_PUB_STREAM_ID,//流id
    // 推流flag
    publish_flag: ZEGOCONSTANTS.ZegoPublishFlag.ZEGO_JOIN_PUBLISH,
    params: ""
  });
```

11. 开始拉流，播放音视频数据，开发过程中，需要传递的流id参数是对方的流id，这里为了演示，拉取的是自己的流id。[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L169)
```
<!-- 显示对方视频的控件 -->
<OBJECT CLASSID="CLSID:e7b5087b-d657-4322-8244-5b63ee1f53ef" id="remoteVideo" width="360px" height="240px"></OBJECT>
```
```
 // 开始拉流播放
  zegoClient.startPlayingStream({
   stream_id: TEST_PLAY_STREAM_ID,                      // 拉流id
   video_view: document.getElementById("remoteVideo"), // 设置播放视频控件
   params: ""                                           // 拉流参数
  });
```
<div STYLE="page-break-after: always;"></div>

12. 开始录制，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L185)
```
  // 录制分辨率
  var width = 1080*2;
  var height = 720;

  // 设置录制输出分辨率
  zegoClient.setRecordOutput({
    width: width,
    height: height
  });

  // 设置录制码率
  zegoClient.setVideoBitrate({ bitrate: 3000000, channel_index: ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_AUX });
  
  // 添加录制本地视频
  zegoClient.addRecordSource({
      source_type:ZEGOCONSTANTS.RecordSourceType.LocalVideo,
            pos_x:0,       // 本地视频起始位置x
            pos_y:0,       // 本地视频起始位置y
            width:width/2, // 本地视频宽
          height: height, // 本地视频高
          // 缩放模式
          view_mode: ZEGOCONSTANTS.ZegoVideoViewMode.ZegoVideoViewModeScaleAspectFit
        });
  // 添加录制对端视频
  zegoClient.addRecordSource({
              source_type:ZEGOCONSTANTS.RecordSourceType.RemoteVideo,
                    pos_x:width/2,  // 对端视频起始位置x
                    pos_y:0,        // 对端视频起始位置y
                    width:width/2,  // 对端视频宽
                    height: height, // 本地视频高
                    // 缩放模式
                    view_mode: ZEGOCONSTANTS.ZegoVideoViewMode.ZegoVideoViewModeScaleAspectFit
                  });
  // 开始录制
  zegoClient.startRecord({
    savefile:"d:/record.mp4" // 录制文件路径
    }, rs=>{
        if(rs.error_code == 0){
            console.log("正在录制..");
        }else{
            console.log("录制发生错误，错误码为:" + rs.error_code);
        }
    });
```

13. 停止录制，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L232)
```
  // 停止录制 
  zegoClient.stopRecord()
```
<div STYLE="page-break-after: always;"></div>

14. 停止拉流播放音视频数据，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L180)
```
  zegoClient.stopPlayingStream({ 
    stream_id: TEST_PLAY_STREAM_ID  // 流id
  });
```

15. 停止推流发送音视频数据，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L238)
```
  zegoClient.stopPublishing({
       // 通道
       channel_index: ZEGOCONSTANTS.PublishChannelIndex.PUBLISH_CHN_MAIN 
  });
```
16. 退出房间，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L246)
```
  zegoClient.logoutRoom(rs => { });
```
17. 反初始化sdk，[参考代码 ](https://github.com/zegoim/Zego-IE-ActiveX-Quick-Start/blob/master/IEPluginDemo.js#L253)
```
  zegoClient.unInitSDK();
```

20. **注意点说明**
-  推流和拉流：Zego SDK 把采集我方的音视频，编码后发送到 Zego 实时网络，此步骤被称为“推流”。同时，Zego SDK 从 Zego 实时网络中接收对方的音视频数据流，解码得到对方的声音与画面，此步骤被称作“拉流”。通话双方各自推我方流和拉对方流，视频通话就建立起来了。
- 用户id设置：业务保证唯一即可。
- 推流时机：登陆房间成功后，在进行推流操作。
- 拉流时机：在实现过程中，拉取的是对方的流，所以拉流操作传递的流id参数是对方的流id。在onStreamUpdated事件的流新增事件时可以获取到对方的流id。当收到新增流事件时在进行拉流操作。
- 房间登录相关说明，查看官网[房间登录](https://www.zego.im/html/document/#Application_Scenes/FAQ/Login)。
- 视频控件说明，要显示的视频控件为&lt;OBJECT CLASSID="CLSID:e7b5087b-d657-4322-8244-5b63ee1f53ef"&gt;&lt;/OBJECT&gt;，开始视频时调用控件的startVideo方法，结束视频时，调用控件的stopVideo方法，显示黑屏。


