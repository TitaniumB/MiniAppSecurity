package com.mini.analysis;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ibm.wala.cast.ir.ssa.AstIRFactory;
import com.ibm.wala.cast.js.ipa.callgraph.JSCallGraphUtil;
import com.ibm.wala.cast.js.translator.CAstRhinoTranslatorFactory;
import com.ibm.wala.cast.types.AstMethodReference;
import com.ibm.wala.classLoader.IClass;
import com.ibm.wala.classLoader.IMethod;
import com.ibm.wala.examples.entity.ResultType;
import com.ibm.wala.ipa.callgraph.impl.Everywhere;
import com.ibm.wala.ipa.cha.ClassHierarchyException;
import com.ibm.wala.ipa.cha.IClassHierarchy;
import com.ibm.wala.ssa.*;
import com.ibm.wala.examples.tmp.FormatorAndRrcorder;
import com.ibm.wala.examples.tmp.InvokePath;
import com.ibm.wala.examples.util.FileUtil;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Paths;
import java.util.*;

import static com.ibm.wala.examples.tmp.FormatorAndRrcorder.dumpData;
import static com.ibm.wala.examples.tmp.FormatorAndRrcorder.getConcatData;
import static com.ibm.wala.examples.tmp.PathGenerator.getPathsFromIR;
import static com.ibm.wala.examples.tmp.TaintAnalyze.*;
import static com.ibm.wala.examples.tmp.URLCounter.*;


public class MiniJSAnalyser {

    public static String platform;

    public HashSet<String> plainKeys = new HashSet<>();
    public HashSet<String> varibleKeys = new HashSet<>();
    public HashSet<String> JSLoaderKeys = new HashSet<>();
    public HashMap<String, Integer> UrlCounter = new HashMap<>();
    public List<String> unSfaeHttpUrls = new ArrayList<>();
    public List<String> unSfaeWssUrls = new ArrayList<>();
    public static boolean httpUnsafe = false;
    public static boolean wsUnsafe = false;
    public List<String> secrets = new ArrayList<>();
    public List<String> wssURLs = new ArrayList<>();


    public MiniJSAnalyser(String js_dir, String map_file_path, String res_dir, String platform) {
        MiniJSAnalyser.platform = platform;
    }

    public void analyzeSinglePage(String pathStr, String targetDataName) throws ClassHierarchyException {
        System.out.println("Begin analyze: " + pathStr + " -> " + targetDataName);
        if (targetDataName.equals("")) {
            System.out.println("No Target Data-field, impossible!");
            return;
        }
        JSCallGraphUtil.setTranslatorFactory(new CAstRhinoTranslatorFactory());
        IClassHierarchy cha = JSCallGraphUtil.makeHierarchyForScripts(pathStr);
        IRFactory<IMethod> factory = AstIRFactory.makeDefaultFactory();
        for (IClass klass : cha) {
            // ignore models of built-in JavaScript methods
            if (!klass.getName().toString().startsWith("Lprologue.js")) {
                String a = klass.getName().toString();
                // get the IMethod representing the code (the do method)
                IMethod m = klass.getMethod(AstMethodReference.fnSelector);
                System.out.println("klass: " + a);
                for (IMethod iMethod: klass.getDeclaredMethods()){
                    System.out.println("imethod: " + iMethod.getSignature());
                }
                // 锁定onLoad函数
                if (m != null && m.getSignature().contains(":test")) {
//                if (m != null && m.getSignature().contains(":test.")) {
                    String b = m.getSignature();
                    System.out.println("Begin analyze " + pathStr);
                    // init
                    IR ir = factory.makeIR(m, Everywhere.EVERYWHERE, new SSAOptions());
                    SSACFG cfg = ir.getControlFlowGraph();
                    SymbolTable symbolTable = ir.getSymbolTable();
                    List<InvokePath> paths = getPathsFromIR(ir, cfg);
                    // 分析每一条路径le
                    HashSet<Integer> allTaintMainVal = new HashSet<>(), allTaintCatVal = new HashSet<>();
                    List<InvokePath> hasTaintPaths = new LinkedList<>(), noTaintPaths = new LinkedList<>();
                    // 拼接变量的相关fieldName，可以直接用的
                    HashSet<String> concatFieldName = new HashSet<>();
                    // 参数的哪些属性是传入sink的
                    HashSet<String> valuableFieldNames = new HashSet<>();
                    for (InvokePath invokePath : paths) {
                        if (hasTaintFlow(invokePath, symbolTable, targetDataName, allTaintMainVal, allTaintCatVal, valuableFieldNames, concatFieldName)) {
                            hasTaintPaths.add(invokePath);
                        } else {
                            noTaintPaths.add(invokePath);
                        }
                    }
//                    // 选一个目标field名称
//                    String valFieldName = null;
//                    if (valuableFieldNames.size() == 1) {
//                        valFieldName = (String) valuableFieldNames.toArray()[0];
//                    } else {
//                        String[] proityNames = new String[]{
//                                "url", "h5url", "h5"
//                        };
//                        for (String t : proityNames) {
//                            if (valuableFieldNames.contains(t)) {
//                                valFieldName = t;
//                                break;
//                            }
//                        }
//                        if (valFieldName == null) {
//                            valFieldName = (String) valuableFieldNames.toArray()[0];
//                        }
//                    }
//                    // 规则
//                    HashSet<String> concatData = new HashSet<>();
//                    ResultType type;
//                    if (noTaintPaths.isEmpty()) {
//                        System.out.println("No-Check for input url");
//                        concatData = getConcatData(symbolTable, allTaintCatVal, concatFieldName);
//                        type = ResultType.NO_CHECK;
//                    } else if (hasTaintPaths.isEmpty()) {
//                        System.out.println("No-Entry for input url");
//                        type = ResultType.NO_ENTRY;
//                    } else {
//                        // 有的路径可以load，有的不行，这说明存在一定的检查
//                        // 查看taintMainVal在condition语句中的存在性
//                        if (hasCheckWithTaintVal(ir, valFieldName, symbolTable)) {
//                            System.out.println("Has Check for input url");
//                            type = ResultType.URL_CHECK;
//                        } else {
//                            System.out.println("No-entry for input url, but has other check");
//                            type = ResultType.OTHER_CHECK;
//                        }
//                        concatData = getConcatData(symbolTable, allTaintCatVal, concatFieldName);
//                    }
//                    dumpData(FormatorAndRrcorder.getFileName(pathStr), type, valFieldName, concatData);
//                    System.out.println("Finish analyze " + pathStr);
//                    return;
                }
            }
        }
    }

    public void analyzePage(String pathStr) throws ClassHierarchyException, MalformedURLException {
        System.out.println("Begin analyzePage: " + pathStr);

        JSCallGraphUtil.setTranslatorFactory(new CAstRhinoTranslatorFactory());
        IClassHierarchy cha = JSCallGraphUtil.makeHierarchyForScripts(pathStr);
        IRFactory<IMethod> factory = AstIRFactory.makeDefaultFactory();


        // 对storage存储的key值进行分析
        findStorageKey(cha, factory);

        // 对文件中的url进行频次统计
        findUrl(cha, factory);
    }

    public void findStorageKey(IClassHierarchy cha, IRFactory<IMethod> factory){
        // 第一遍静态分析，找到所有在本函数体中进行赋值的key的值,存储到常量数组中；找到所有在本函数中属于AstLexicalRead的变量，存入数组，等待二次静态分析时去其他method的symbolTable中寻找
        for (IClass klass : cha) {
            // ignore models of built-in JavaScript methods
            if (!klass.getName().toString().startsWith("Lprologue.js")) {
                String a = klass.getName().toString();
                // get the IMethod representing the code (the do method)
                IMethod m = klass.getMethod(AstMethodReference.fnSelector);

                if (m != null) {
//                if (m != null && m.getSignature().contains("onLoad")) {
//                    System.out.println("Begin First analyze method: " + m.getSignature());
                    // init
                    IR ir = factory.makeIR(m, Everywhere.EVERYWHERE, new SSAOptions());
//                    SSACFG cfg = ir.getControlFlowGraph();
                    SymbolTable symbolTable = ir.getSymbolTable();
//                    List<InvokePath> paths = getPathsFromIR(ir, cfg);

                    // 对当前method当中每一条路径进行分析
                    findTarget(ir.getInstructions(), symbolTable, plainKeys, varibleKeys, platform, JSLoaderKeys);
                }
            }
        }
        System.out.println("**************Fisrt Analysis**************");
        System.out.println("1_1: " + plainKeys.toString());
        System.out.println("1_2: "+ varibleKeys.toString());
        System.out.println("1_3: " + JSLoaderKeys);

        System.out.println("\n==============Second Analysis===============");
        // 第二遍扫描，去寻找在函数外部进行赋值的变量对应的常量值
        for (IClass klass : cha) {
            // ignore models of built-in JavaScript methods
            if (!klass.getName().toString().startsWith("Lprologue.js")) {
                String a = klass.getName().toString();
                // get the IMethod representing the code (the do method)
                IMethod m = klass.getMethod(AstMethodReference.fnSelector);

                if (m != null) {
//                if (m != null && m.getSignature().contains("cityInfoPage.js/cityInfoPage.js@58/cityInfoPage.js@134")) {
//                    System.out.println("Begin Second analyze method: " + m.getSignature());
                    // init
                    IR ir = factory.makeIR(m, Everywhere.EVERYWHERE, new SSAOptions());
//                    SSACFG cfg = ir.getControlFlowGraph();
                    SymbolTable symbolTable = ir.getSymbolTable();
//                    List<InvokePath> paths = getPathsFromIR(ir, cfg);

                    if (varibleKeys.size() > 0 || JSLoaderKeys.size() > 0){
                        matchLexical(ir.getInstructions(), symbolTable, plainKeys, varibleKeys, JSLoaderKeys);
                    }else {
                        break;
                    }
                }
            }
        }
        System.out.println("2_1: " + plainKeys.toString());
        System.out.println("2_2: " + varibleKeys);
        System.out.println("2_3: " + JSLoaderKeys);
    }

    public void findUrl(IClassHierarchy cha, IRFactory<IMethod> factory) throws MalformedURLException {
        for (IClass klass : cha) {
            // ignore models of built-in JavaScript methods
            if (!klass.getName().toString().startsWith("Lprologue.js")) {
                String a = klass.getName().toString();
                // get the IMethod representing the code (the do method)
                IMethod m = klass.getMethod(AstMethodReference.fnSelector);

                if (m != null) {
//                if (m != null && m.getSignature().contains("index.worker_alipay.js.index.worker_alipay.js@70807.index.worker_alipay.js@253071.index.worker_alipay.js@253114.index.worker_alipay.js@253359:setStorage.do()LRoot;")) {
//                    System.out.println("Begin First analyze method: " + m.getSignature());
                    // init
                    IR ir = factory.makeIR(m, Everywhere.EVERYWHERE, new SSAOptions());
//                    SSACFG cfg = ir.getControlFlowGraph();
                    SymbolTable symbolTable = ir.getSymbolTable();
//                    List<InvokePath> paths = getPathsFromIR(ir, cfg);

                    getConstantUrl(ir.getInstructions(), symbolTable,UrlCounter, unSfaeHttpUrls, unSfaeWssUrls, secrets, wssURLs);
                }
            }
        }
        System.out.println("UrlCounter: " + UrlCounter.toString());
        System.out.println("http protocol is used: " + httpUnsafe);
        System.out.println("unSfaeHttpUrls: " + unSfaeHttpUrls.toString());
        System.out.println("ws protocal is used: " + wsUnsafe);
        System.out.println("unSafeWssUrls: " + unSfaeWssUrls);
        System.out.println("secrets: " + secrets);
    }
}
