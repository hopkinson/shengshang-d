package com.johnzhang.erospluginnative;

import android.app.Service;
import android.content.Context;
import android.graphics.BlurMaskFilter;
import android.os.Handler;
import android.os.Message;
import android.os.Vibrator;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.PopupWindow;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.bumptech.glide.Glide;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.ref.WeakReference;
import java.util.Map;

/**
 * 创建时间：2018/10/3
 * 作者：johnzhang
 * 描述：
 */
public class ErosPluginNative extends WXModule {

    private static final int MSG_SHOW = 100;
    private static final int MSG_HIDE = 101;
    private static final int MSG_INVOKE = 102;

    private static int DURATION;
    private static JSCallback JSCALLBACK;

    private static PopupWindow pw;// 弹窗

    private MyHandler handler;

    private static Vibrator vibrator;// 振动器
    /////////// 固定参数 //////////
    private final String ARGS_DURATION = "duration";
    private final String ARGS_AVATAR = "avatar";
    private final String ARGS_TITLE = "title";
    private final String ARGS_CONTENT = "content";
    private final String ARGS_TIME = "time";


    /**
     * 弹窗控件
     */
    private RelativeLayout rlRoot;
    private ImageView ivAvatar;
    private TextView tvTitle;
    private TextView tvContent;
    private TextView tvTime;

    /**
     * 弹个吐司
     */
    @JSMethod(uiThread = true)
    public void wxToast(String str) {
        Toast.makeText(mWXSDKInstance.getContext(), str, Toast.LENGTH_SHORT).show();
    }


    //notification.show({
    //   duration:3000,
    //   avatar: “Xx.png”,
    //   title:”Titile”,
    //   content: “Aaaaaaaa”,
    //   time: “2017-02-12”,
    //   success: function() {}
    //})


    /**
     * 顶部弹窗
     */
    @JSMethod(uiThread = true)
    public void show(Map<String, Object> params, JSCallback jsCallback) {
        Log.i("show", params.toString());
        String duration = null;
        String avatar = null;
        String title = null;
        String content = null;
        String time = null;
        duration = (String) params.get(ARGS_DURATION);
        avatar = (String) params.get(ARGS_AVATAR);
        title = (String) params.get(ARGS_TITLE);
        content = (String) params.get(ARGS_CONTENT);
        time = (String) params.get(ARGS_TIME);

        Log.i("show", "duration = " + duration);
        Log.i("show", "avatar = " + avatar);
        Log.i("show", "title = " + title);
        Log.i("show", "content = " + content);
        Log.i("show", "time = " + time);

        // 设置停留时间
        DURATION = Integer.parseInt(duration);
        JSCALLBACK = jsCallback;

        // 初始化弹窗
        initPopupWindow(avatar, title, content, time);

        if (handler == null) {
            handler = new MyHandler(mWXSDKInstance.getContext());
        } else {
            Log.w("show", "handler != null");
        }
        handler.sendEmptyMessage(MSG_SHOW);
    }

    /**
     * 初始化弹窗
     */
    private void initPopupWindow(String avatar, String title, String content, String time) {
        View root = LayoutInflater.from(mWXSDKInstance.getContext()).inflate(R.layout.pw_top, null);
        rlRoot = (RelativeLayout) root.findViewById(R.id.rl_root);
        ivAvatar = (ImageView) root.findViewById(R.id.iv_avatar);
        tvTitle = (TextView) root.findViewById(R.id.tv_title);
        tvContent = (TextView) root.findViewById(R.id.tv_content);
        tvTime = (TextView) root.findViewById(R.id.tv_time);
        Glide.with(mWXSDKInstance.getContext())
                .load(avatar)
                .into(ivAvatar);
        tvTitle.setText(title);
        tvContent.setText(content);
        tvTime.setText(time);

        rlRoot.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.w("rlRoot", "rlRoot 被点击了");
                handler.sendEmptyMessage(MSG_INVOKE);
            }
        });

        if (pw == null) {
            pw = new PopupWindow(root, ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);
            pw.setAnimationStyle(R.style.TopPopTheme);

            pw.setOnDismissListener(new PopupWindow.OnDismissListener() {
                @Override
                public void onDismiss() {
                    // TODO-reset
                    rlRoot = null;
                    tvTitle = null;
                    tvContent = null;
                    handler.removeCallbacksAndMessages(null);
                    handler = null;
                }
            });
        }
    }

    /**
     * 隐藏弹窗
     */
    private static void hidePopupWindow() {
        if (pw != null && pw.isShowing()) {
            Log.i("MyHandler", "MSG_HIDE");
            pw.dismiss();

        } else {
            Log.w("MyHandler", "弹窗已经关闭");
        }
    }

    private static class MyHandler extends Handler {
        /**
         * 持有弱引用，GC 的时候会被回收掉
         */
        private final WeakReference<Context> mContext;

        MyHandler(Context context) {
            mContext = new WeakReference<Context>(context);
        }

        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            Context context = mContext.get();
            if (context != null) {
                // 执行任务逻辑
                switch (msg.what) {
                    case MSG_SHOW:
                        if (pw != null && !pw.isShowing()) {
                            Log.i("MyHandler", "MSG_SHOW");
                            pw.showAtLocation(pw.getContentView(), Gravity.TOP, 0, 0);
                            vibrator = (Vibrator) context.getSystemService(Service.VIBRATOR_SERVICE);
                            vibrator.vibrate(30);
                            // 延时 3000 ms，发送隐藏命令
                            sendEmptyMessageDelayed(MSG_HIDE, DURATION);
                        } else {
                            Log.w("MyHandler", "弹窗正在显示");
                        }
                        break;
                    case MSG_HIDE:
                        hidePopupWindow();
                        break;
                    case MSG_INVOKE:
                        hidePopupWindow();
                        JSCALLBACK.invoke("Weex 真是垃圾");
                        break;
                    default:
                        break;
                }
            } else {
                Log.e("MyHandler", "context == null");
            }
        }
    }
}
