# Security Analysis Tool for Miniapp Security Regulations

## 介绍
本项目研究小程序（包括轻应用）是否存在违背标准安全开发规约的行为，旨在加强小程序生态的安全建设。
我们的论文"The Dark Forest: Understanding Security Risks of Cross-Party Delegated Resources in Mobile App-in-App Ecosystems"被收录于TIFS期刊：
```
@ARTICLE{10506090,
  author={Zhang, Zhibo and Zhang, Lei and Yang, Guangliang and Chen, Yanjun and Xu, Jiahao and Yang, Min},
  journal={IEEE Transactions on Information Forensics and Security}, 
  title={The Dark Forest: Understanding Security Risks of Cross-Party Delegated Resources in Mobile App-in-App Ecosystems}, 
  year={2024},
  volume={19},
  number={},
  pages={5434-5448},
  keywords={Security;Ecosystems;Regulation;Servers;Social networking (online);Codes;Mobile applications;App-in-app ecosystem;security regulation;vulnerability analysis},
  doi={10.1109/TIFS.2024.3390553}}
```


## 项目结构
项目由两个独立模块组成：
1. differential analysis是针对小程序源码的静态分析，识别违背小程序开发者安全规约的行为。
2. penetration sample包含了针对框架平台方的安全实现测试用例，通过自己构建的测试小程序或网页代码开展安全测试。

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

## 项目构建

本项目依赖于Uniapp编辑工具HBuilder X和静态分析框架JS-WALA，具体构建和使用方法参考各项目官方文档：
HBuilder X IDE(https://hx.dcloud.net.cn/README)
WALA Starter Kit(https://github.com/wala/WALA-start)