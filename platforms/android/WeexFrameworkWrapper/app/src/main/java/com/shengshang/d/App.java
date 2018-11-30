package com.shengshang.d;

import android.app.Application;

import com.eros.framework.BMWXApplication;
import com.johnzhang.erospluginnative.ErosPluginNative;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;

/**
 * Created by Carry on 2017/8/23.
 */

public class App extends BMWXApplication {
    public Application mInstance;

    @Override
    public void onCreate() {
        super.onCreate();
        mInstance = this;

        initWX();


    }
    /**
     * 初始化 Weex
     */
    private void initWX() {
        try {
            WXSDKEngine.registerModule("notification", ErosPluginNative.class);
        } catch (WXException e) {
            e.printStackTrace();
        }
    }
}
