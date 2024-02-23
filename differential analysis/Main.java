// package com.ibm.wala.examples;
package com.mini.analysis;

import com.ibm.wala.util.WalaException;

import java.net.MalformedURLException;

public class Main {

    public static void main(String[] args) throws IllegalArgumentException, WalaException, MalformedURLException {

        String platform = args[0]; // 目标分析平台：alipay, baidu, huawei, wechat, xiaomi 
        String filePath = args[1]; // 目标小程序源码js文件
        
        new MiniJSAnalyser(jsDirPath, mapFilePath, resDirPath, platform).analyzePage(filePath);

    }

}
