# Security Analysis Tool for Miniapp Security Regulations

Our corresponding paper was accepted by TIFS xxxx:

给出Bibe Reference。

## Project Structure

```
├── differential analysis   # Static analysis of sub-app source code
│   ├── Main.java   # project entry
│   ├── MiniJSAnalyser.java   # analyze single page of one sub-app
│   ├── Test   # sub-app code js file samples
│   │   ├── app_guge.js
│   │   ├── cityInfoPage.js
│   │   ├── index.worker_alipay.js
│   │   ├── index_hw.js
│   │   ├── js
│   │   └── login_wx_yonganxing.js
│   ├── core
│   │   ├── PICFG.java
│   │   └── entity
│   │       └── MethodNode.java
│   ├── entity
│   │   └── ResultType.java
│   ├── test.java
│   ├── tmp
│   │   ├── Entropy.java
│   │   ├── FormatorAndRrcorder.java
│   │   ├── InvokePath.java
│   │   ├── PathGenerator.java
│   │   ├── TaintAnalyze.java
│   │   └── URLCounter.java
│   └── util
│       └── FileUtil.java
└── penetration sample  # test cases for host apps
    └── Simplified
        ├── App.vue
        ├── index.html
        ├── main.js
        ├── manifest.json
        ├── pages
        │   ├── index
        │   │   └── index.vue  # trigger in sub-app code
        │   └── webview
        │       └── webview.vue # trigger in web content code
        ├── pages.json
        ├── static
        │   ├── logo.png
        │   └── web-view.html
        ├── uni.promisify.adaptor.js
        └── uni.scss
```



### Differential Analysis  
说明：

* 扫描小程序是如何使用storage的

* 前端解密识别：基于信息熵的硬编码识别、常用解密算法函数识别

* 扫描onLoad和onMessage中是否有identity check

## Project Setup

本项目依赖于Uniapp编辑工具HBuilder X和静态分析框架JS-WALA，具体构建和使用方法参考各项目官方文档：
HBuilder X IDE(https://hx.dcloud.net.cn/README)
WALA Starter Kit(https://github.com/wala/WALA-start)

## Data Set Access
具体数据集可联系xxx获取