
var kLiveRoomErrorBase = 0x01000000;
var SEG_PUBLISH_FATAL_ERROR = 0x0001 << 16;   ///< 推流严重错误段
var SEG_PUBLISH_NORMAL_ERROR = 0x0002 << 16;  ///< 推流普通错误段
var SEG_PLAY_FATAL_ERROR = 0x0003 << 16;      ///< 拉流严重错误段
var SEG_PLAY_NORMAL_ERROR = 0x0004 << 16;     ///< 拉流普通错误段

ZEGOCONSTANTS = {
    ZegoLogLevel:
    {
        Grievous: 0,
        Error: 1,
        Warning: 2,
        Generic: 3,    ///< 通常在发布产品中使用
        Debug: 4       ///< 调试阶段使用
    },
    ZegoRoomRole:
    {
        Anchor: 1,     /**< 主播 */
        Audience: 2   /**< 观众 */
    },
    /** 用户更新类型 */
    ZegoUserUpdateType:
    {
        UPDATE_TOTAL: 1,   /**< 全量更新 */
        UPDATE_INCREASE: 2/**< 增量更新 */
    },
    /** 用户更新属性 */
    ZegoUserUpdateFlag:
    {
        USER_ADDED: 1,     /**< 新增 */
        USER_DELETED: 2   /**< 删除 */
    },
    /** 消息类型 */
    ZegoMessageType:
    {
        Text: 1,           /**< 文字 */
        Picture: 2,        /**< 图片 */
        File: 3,           /**< 文件 */
        OtherType: 100    /**< 其他 */
    },
    /** 消息优先级 */
    ZegoMessagePriority:
    {
        Default: 2,        /**< 默认优先级 */
        High: 3           /**< 高优先级 */
    },
    /** 消息类别 */
    ZegoMessageCategory:
    {
        Chat: 1,               /**< 聊天 */
        System: 2,             /**< 系统 */
        Like: 3,               /**< 点赞 */
        Gift: 4,               /**< 送礼物 */
        OtherCategory: 100    /**< 其他 */
    },
    PublishChannelIndex:
    {
        PUBLISH_CHN_MAIN: 0,                       /**< 主推流通道，默认 */
        PUBLISH_CHN_AUX: 1                        /**< 第二路推流通道，无法推出声音 */
    },
    RemoteViewIndex:
    {
        RemoteViewIndex_First: 0,
        RemoteViewIndex_Second: 1,
        RemoteViewIndex_Third: 2
    },
    ZegoVideoViewMode:
    {
        ZegoVideoViewModeScaleAspectFit: 0,    ///< 等比缩放，可能有黑边
        ZegoVideoViewModeScaleAspectFill: 1,   ///< 等比缩放填充整View，可能有部分被裁减
        ZegoVideoViewModeScaleToFill: 2       ///< 填充整个View
    },
    ZegoPublishFlag:
    {
        ZEGO_JOIN_PUBLISH: 0,         ///< 连麦
        ZEGO_MIX_STREAM: 1 << 1,      ///< 混流，如果推出的流需要作为混流输入，请用这个模式
        ZEGO_SINGLE_ANCHOR: 1 << 2   ///< 单主播
    },
    /** 音频设备类型 */
    AudioDeviceType:
    {
        AudioDevice_Input: 0,      /**< 输入设备 */
        AudioDevice_Output: 1     /**< 输出设备 */
    },
    /** 设备状态 */
    DeviceState:
    {
        Device_Added: 0,           /**< 添加设备 */
        Device_Deleted: 1         /**< 删除设备 */
    },
    /** 音量类型 */
    VolumeType:
    {
        Volume_EndPoint: 0,        /**< 设备音量 */
        Volume_Simple: 1             /**< App 音量 */
    },
    ZegoAVAPIState:
    {
        AVStateBegin: 0,               ///< 直播开始
        AVStateEnd: 1,                 ///< 直播正常停止
        TempBroken: 2,                 ///< 直播异常中断
        FatalError: 3,                 ///< 直播遇到严重的问题（如出现，请联系 ZEGO 技术支持）

        CreateStreamError: 4,          ///< 创建直播流失败
        FetchStreamError: 5,           ///< 获取流信息失败
        NoStreamError: 6,              ///< 无流信息
        MediaServerNetWorkError: 7,    ///< 媒体服务器连接失败
        DNSResolveError: 8,            ///< DNS 解释失败

        NotLoginError: 9,              ///< 未登陆
        LogicServerNetWrokError: 10,   ///< 逻辑服务器网络错误

        PublishBadNameError: 105,
        HttpDNSResolveError: 106,

        PublishForbidError: (SEG_PUBLISH_FATAL_ERROR | 0x03f3),             ///< 禁止推流, 低8位为服务端返回错误码：1011

        PublishDeniedError: (SEG_PUBLISH_NORMAL_ERROR | 0x1),              ///< 推流被拒绝

        PlayStreamNotExistError: (SEG_PLAY_FATAL_ERROR | 0x03ec),          ///< 拉的流不存在, 低8位为服务端返回错误码：1004
        PlayForbidError: (SEG_PLAY_FATAL_ERROR | 0x03f3),                  ///< 禁止拉流, 低8位为服务端返回错误码：1011

        PlayDeniedError: (SEG_PLAY_NORMAL_ERROR | 0x1)                   ///< 拉流被拒绝
    },
    EventType:
    {
        Play_BeginRetry: 1,        /**< 开始重试拉流 */
        Play_RetrySuccess: 2,      /**< 重试拉流成功 */

        Publish_BeginRetry: 3,     /**< 开始重试推流 */
        Publish_RetrySuccess: 4,   /**< 重试推流成功 */

        Play_TempDisconnected: 5,     /**< 拉流临时中断 */
        Publish_TempDisconnected: 6,  /**< 推流临时中断 */

        Play_VideoBreak: 7           /**< 拉流卡顿(视频) */
    },
    /** 音频设备模式 */
    ZegoAVAPIAudioDeviceMode:
    {
        ZEGO_AUDIO_DEVICE_MODE_COMMUNICATION: 1,    /**< 开启硬件回声消除 */
        ZEGO_AUDIO_DEVICE_MODE_GENERAL: 2,          /**< 关闭硬件回声消除 */
        ZEGO_AUDIO_DEVICE_MODE_AUTO: 3              /**< 根据场景自动选择是否开启硬件回声消除 */
    },
    /** 流量控制属性 */
    ZegoTrafficControlProperty:
    {
        ZEGO_TRAFFIC_NONE: 0,                      /**< 无 */
        ZEGO_TRAFFIC_FPS: 1,                       /**< 帧率 */
        ZEGO_TRAFFIC_RESOLUTION: 1 << 1           /**< 分辨率 */
    },
    ZEGONetType:
    {
        ZEGO_NT_NONE: 0,       /**< 无网络 */
        ZEGO_NT_LINE: 1,       /**< 有线网络 */
        ZEGO_NT_WIFI: 2,       /**< 无线网络 */
        ZEGO_NT_2G: 3,         /**< 2G网络 */
        ZEGO_NT_3G: 4,         /**< 3G网络 */
        ZEGO_NT_4G: 5,         /**< 4G网络 */
        ZEGO_NT_UNKNOWN: 32    /**< 未知网络 */
    },
    ZegoStreamUpdateType:
    {
        StreamAdded: 2001,     /**< 新增流 */
        StreamDeleted: 2002   /**< 删除流 */
    },
    LiveRoomState:
    {
        Begin: 0,                      /**< 开始 */

        FatalError: 3,                 /**< 直播遇到严重的问题（如出现，请联系 ZEGO 技术支持 */

        CreateStreamError: 4,          /**< 创建直播流失败 */
        FetchStreamError: 5,           /**< 获取流信息失败 */
        NoStreamError: 6,              /**< 无流信息 */
        MediaServerNetWorkError: 7,    /**< 媒体服务器连接失败 */
        DNSResolveError: 8,            /**< DNS 解释失败 */

        NotLoginError: 9,              /**< 未登陆 */
        LogicServerNetWrokError: 10,   /**< 逻辑服务器网络错误 */

        PublishBadNameError: 105,      /**< 推流名称错误 */
        AddStreamError: 0x1 | kLiveRoomErrorBase,
        ParameterError: 0x2 | kLiveRoomErrorBase,
        MultiLoginError: 0x3 | kLiveRoomErrorBase
    },
    /** Relay类别 */
    ZegoRelayType:
    {
        RelayTypeNone: 1,
        RelayTypeDati: 2
    },
    /** 本地预览视频视图的模式 */
    ZegoVideoViewMode:
    {
        ZegoVideoViewModeScaleAspectFit: 0,    /**< 等比缩放，可能有黑边 */
        ZegoVideoViewModeScaleAspectFill: 1,   /**< 等比缩放填充整View，可能有部分被裁减 */
        ZegoVideoViewModeScaleToFill: 2       /**< 填充整个View */
    },
    /** 录制源类型 */
    RecordSourceType:
    {
        LocalVideo:0,
        RemoteVideo:1,
        Image:2
    }
}


