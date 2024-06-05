package com.mini.analysis.tmp;

import com.ibm.wala.cast.ir.ssa.AstGlobalRead;
import com.ibm.wala.cast.ir.ssa.AstGlobalWrite;
import com.ibm.wala.cast.ir.ssa.AstLexicalRead;
import com.ibm.wala.cast.ir.ssa.AstLexicalWrite;
import com.ibm.wala.cast.js.loader.JavaScriptLoader;
import com.ibm.wala.cast.js.ssa.JavaScriptCheckReference;
import com.ibm.wala.cast.js.ssa.JavaScriptInvoke;
import com.ibm.wala.cast.js.ssa.JavaScriptPropertyWrite;
import com.ibm.wala.cast.js.ssa.PrototypeLookup;
import com.ibm.wala.dalvik.dex.instructions.Invoke;
import com.ibm.wala.ssa.*;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;

public class TaintAnalyze {

    /*
        反向污点分析，获取参数
        污染传播规则: 污染量 = 污染量 + 拼接量 / 污染量 = 污染量.concat(拼接量...) / 污染量 = 污染量
     */
    public static boolean hasTaintFlow(InvokePath path, SymbolTable symbolTable, String targetDataName,
                                       HashSet<Integer> allTaintVal, HashSet<Integer> allTaintCatVal,
                                       HashSet<String> valuableFieldNames, HashSet<String> concatFieldName) {
        // 反向污点分析
        HashSet<Integer> taintedMainVal = new HashSet<>(), taintedConcatVal = new HashSet<>();
        HashSet<String> trackNamesForMain = new HashSet<>(), trackNamesForConcat = new HashSet<>(); // 在Global中特殊的需要track的名称
        // 定义source和sink
        int sink = 3; // 参数1和2没有用
        int source = -100;
        // 记录污点量field访问情况
        HashMap<Integer, String> taintedValToField = new HashMap<>();
        for (int i = path.instructions.size() - 1; i >= 0; i--) {
            // todo more instruction type???
            SSAInstruction instruction = path.instructions.get(i);
            // 先确定逆向污点分析的起点
            if (instruction instanceof JavaScriptInvoke
                    && (symbolTable.isConstant(((JavaScriptInvoke) instruction).getFunction()))
                    && (symbolTable.getConstantValue(((JavaScriptInvoke) instruction).getFunction())).equals("getStorage")) {
                // 污点分析的起点
                int target = ((JavaScriptInvoke) instruction).getUse(1);
//                String key = (String) symbolTable.getConstantValue(target);
                taintedMainVal.add(target);
                source = target;
                continue;
            }
        }
        allTaintVal.addAll(taintedMainVal);
        allTaintCatVal.addAll(taintedConcatVal);
        // 判断是否存在source到sink的路径
        return taintedMainVal.contains(sink);
    }


    /*
    正向的污点分析，判断某个field是否会出现在if检查中
     */
    public static boolean hasCheckWithTaintVal(IR ir, String fieldName, SymbolTable symbolTable) {
        int source = 3;
        HashSet<Integer> topLevelValFromParam = new HashSet<>();
        HashSet<Integer> taintedVal = new HashSet<>();
        taintedVal.add(source);
        HashSet<String> taintedName = new HashSet<>();
        HashSet<Integer> excludeTaintVal = new HashSet<>(); // 有些val如果直接出现在if里，可能是一个判空检查，这些不算
        for (SSAInstruction instruction : ir.getInstructions()) {
            if (instruction == null){
                continue;
            }
            // 对每种语句进行正向的污点传播
            if (instruction instanceof JavaScriptInvoke) {
                // 0-函数名，1-函数所属主体，2开始-参数
                // constructor与名称不是常量的处理
                if (!(symbolTable.isConstant(((JavaScriptInvoke) instruction).getFunction()))) {
                    if (instruction.toString().contains("construct")) {
                        // 向前追溯
                        if (instruction.getNumberOfUses() > 1) {
                            int param = instruction.getUse(1);
                            if (taintedVal.contains(param)){
                                taintedVal.add(instruction.getDef());
                            }
                        }
                    } else {
                        System.out.println("Invoke Ins but name is not Constant: " + instruction.toString());
                    }
                    continue;
                }
                // 其他函数调用的处理
                // 如果函数调用主体被污染，那么一定污点
                if (taintedVal.contains(instruction.getUse(1))){
                    taintedVal.add(instruction.getDef());
                    excludeTaintVal.add(instruction.getDef());
                    continue;
                }
                // 如果函数出现在调用参数中，那么也污染上吧
                for (int p = 2; p < instruction.getNumberOfUses(); p++) {
                    if (taintedVal.contains(instruction.getUse(p))){
                        taintedVal.add(instruction.getDef());
                        String funcName = (String) symbolTable.getConstantValue(((JavaScriptInvoke) instruction).getFunction());
                        if (funcName.toLowerCase().contains("empty") || funcName.toLowerCase().contains("format") || funcName.toLowerCase().contains("encode") || funcName.toLowerCase().contains("decode")){
                            excludeTaintVal.add(instruction.getDef());
                        }
                    }
                }
            } else if (instruction instanceof SSAGotoInstruction) {
                // 啥也不干
            } else if (instruction instanceof PrototypeLookup) {
                int base = instruction.getUse(0);
                int res = instruction.getDef();
                if (taintedVal.contains(base)){
                    taintedVal.add(res);
                    excludeTaintVal.add(instruction.getDef());
                    if (base == source){
                        topLevelValFromParam.add(res);
                    }
                }
            } else if (instruction instanceof JavaScriptPropertyWrite) {
                int leftVal = instruction.getUse(0);
                int target = instruction.getUse(2);
                if (taintedVal.contains(target)){
                    taintedVal.add(leftVal);
                }
            } else if (instruction instanceof JavaScriptCheckReference) {
                // 啥也不做
            } else if (instruction instanceof AstGlobalRead) {
                String name = ((AstGlobalRead) instruction).getGlobalName();
                if (taintedName.contains(name)) {
                    taintedVal.add(instruction.getDef());
                }
            } else if (instruction instanceof AstGlobalWrite) {
                String name = ((AstGlobalWrite) instruction).getGlobalName();
                int ta = ((AstGlobalWrite) instruction).getUse(1);
                if (taintedVal.contains(ta)){
                    taintedName.add(name);
                }
            } else if (instruction instanceof SSAConditionalBranchInstruction) {
                int base = instruction.getUse(0);
                int compare = instruction.getUse(1);
                if (taintedVal.contains(base) && !excludeTaintVal.contains(base)){
                    return true;
                }
                if (taintedVal.contains(compare) && !excludeTaintVal.contains(compare)){
                    return true;
                }
            } else if (instruction.getClass().getName().startsWith("com.ibm.wala.cast.js.loader.JavaScriptLoader$")) {
                // 特殊的loader语句
                String ins = instruction.toString();
                if (ins.contains("binaryop")) {
                    if (taintedVal.contains(instruction.getUse(0)) || taintedVal.contains(instruction.getUse(1))){
                        taintedVal.add(instruction.getDef());
                    }
                } else if (ins.contains("getfield")) {
                    // 求field的名称
                    String name = instruction.toString().split(",")[2];
                    if (taintedVal.contains(instruction.getUse(0))){
                        if (topLevelValFromParam.contains(instruction.getUse(0))){
                            if (name.equals(fieldName)){
                                taintedVal.add(instruction.getDef());
                                excludeTaintVal.add(instruction.getDef());
                            }
                        } else {
                            taintedVal.add(instruction.getDef());
                            excludeTaintVal.add(instruction.getDef());
                        }
                    }
                } else if (ins.contains("new <JavaScriptLoader,LArray>")) {
                    // 啥也不做
                } else {

                }
            } else {

            }

        }
        return false;
    }

    // 找到storage调用API的instruction, for first analysis
    public static void findTarget(SSAInstruction[] instructions, SymbolTable symbolTable, HashSet<String> plainKeys, HashSet<String> variableKeys, String platform, HashSet<String> JSLoaderKeys){
        for (int i = instructions.length - 1; i >= 0; i--) {
            SSAInstruction instruction = instructions[i];

            // 找到function为getStorage或setStorage的instruction
            if (instruction instanceof JavaScriptInvoke
                    && (symbolTable.isConstant(((JavaScriptInvoke) instruction).getFunction())))
            {
                Object cv = symbolTable.getConstantValue(((JavaScriptInvoke)instruction).getFunction());
                if (cv != null){
                    String functionName = cv.toString();
                    if (platform.equals("huawei") && (functionName.equals("get") || functionName.equals("set"))){
                        // 观察下来set和get都是只有一个参数的形式 set({key:e, value:v})
                        try {
                            int target = ((JavaScriptInvoke) instruction).getUse(2);
                            backwardAnalyze(instructions, symbolTable, i, target, plainKeys, variableKeys, JSLoaderKeys);
                        }catch (UnsupportedOperationException exception){
                            System.out.println(exception.toString());
                        }
                    }
                    if (functionName.equals("getStorage") || functionName.equals("setStorage") || functionName.equals("setStorageSync") || functionName.equals("getStorageSync")){
                        // 根据参数个数来对不同的参数索引打taint
                        int parameterCount = ((JavaScriptInvoke) instruction).getNumberOfPositionalParameters();

                        // 对应set/getStorage有两个参数的情况
                        if (parameterCount == 4) {
                            int target = ((JavaScriptInvoke) instruction).getUse(2);
                            backwardAnalyze(instructions, symbolTable, i, target, plainKeys, variableKeys, JSLoaderKeys);
                        }
                        // 对应getStorage只有一个参数的情况,分为两种表现形式如下
                        // 1.getStorageSync("_OPENID") 2.getStorageSync({key:"_OPENID",success:{}})
                        else if (parameterCount == 3){
                            int target = ((JavaScriptInvoke) instruction).getUse(2);
                            // 在当前调用路径中逆向分析，尝试找到key的常量值
                            backwardAnalyze(instructions, symbolTable, i, target, plainKeys, variableKeys, JSLoaderKeys);
                        }
                    }
                }
            }
        }
    }

    public static void backwardAnalyze(SSAInstruction[] instructions, SymbolTable symbolTable, int i, int source, HashSet<String> plainKeys, HashSet<String> varibleKeys, HashSet<String> JSLoaderKeys){
        // 对应这种形式getStorageSync("_OPENID")
        if (symbolTable.isConstant(source) && symbolTable.getConstantValue(source)!=null && !symbolTable.getConstantValue(source).equals("")){
            plainKeys.add(symbolTable.getConstantValue(source).toString());
        }
        // 对应getStorageSync({key:"_OPENID",success:{}})这种形式
        else {
            for (int ci = i; ci >= 0; ci--) {
                SSAInstruction instruction = instructions[ci];

                // 对应 fieldref 28.17 = 33 = 33这种instruction形式
                if (instruction instanceof JavaScriptPropertyWrite){
                    int object = instruction.getUse(0);
                    int field = instruction.getUse(1);
                    int target = instruction.getUse(2);

                    // taint逆向转移
                    if (object == source){
                        if (symbolTable.isConstant(field) && symbolTable.getConstantValue(field).equals("key")){
                            // 如果target变量已经在symbol table中，则找到此次key的常量值，结束本轮分析
                            if (symbolTable.isConstant(target) && symbolTable.getConstantValue(target)!=null && !symbolTable.getConstantValue(target).equals("")){
                                plainKeys.add(symbolTable.getConstantValue(target).toString());
                                break;
                            }
                            // target变量不在symbol table中，则转移taint继续往上回溯，直至到达当前path的第一条instruction
                            else {
                                source = target;
                            }
                        }
                    }
                }
                // 对应 32 = lexical:@LcityInfoPage.js/cityInfoPage.js@58/cityInfoPage.js@134 形式
                // 等待去别的方法中寻找相应的赋值常量
                else if(instruction instanceof AstLexicalRead){
                    int left = instruction.getDef(0);
                    if (left == source){
                        String right = instruction.toString(symbolTable).split("=")[1].trim();
                        varibleKeys.add(right);
                        break;
                    }
                }
                // 对应 57 = getfield <JavaScriptLoader, LRoot, OPENID, <JavaScriptLoader, LRoot>> 34
                else if(instruction!=null && instruction.getClass().getName().startsWith("com.ibm.wala.cast.js.loader.JavaScriptLoader$") && instruction.getDef()==source){
                    String tmpIns = instruction.toString();
                    String[] tmpStrings = tmpIns.split(",");
                    String field;
                    // 寻找field的名称
                    for (String s: tmpStrings){
                        if (s!=null && !s.contains("Root") && !s.contains("JavaScriptLoader")){
                            field = s.trim();
                            JSLoaderKeys.add(field);
                            break;
                        }
                    }
                }
            }
        }
    }

    // for the second analysis,匹配函数外部的变量赋值寻找与storage操作相关的key值
    public static void matchLexical(SSAInstruction[] instructions, SymbolTable symbolTable, HashSet<String> plainKeys, HashSet<String> variableKeys, HashSet<String> JSLoaderKeys){
        HashMap<Integer, String> keyMap = new HashMap<>();
        int target;

        // 尝试寻找field是否在symbol table中
        for (String field: JSLoaderKeys){
            int maxValueNumber = symbolTable.getMaxValueNumber(); // 当前函数中的使用到的最大的int值
            int stringValueNumber = symbolTable.getConstant(field);  // 对应字符串在symbol table的数值，如果原本不存在于该symbol table中，则 stringValueNumber > maxValueNumber
            if (stringValueNumber <= maxValueNumber && symbolTable.isConstant(stringValueNumber)){
                // field确实存在于当前函数的symbol table中，接下来需要查找field对应的常量值
                keyMap.put(stringValueNumber, field);
            }
        }

        for (int ci=instructions.length-1; ci>=0; ci--){
            if (variableKeys.size() == 0 && JSLoaderKeys.size() == 0)
                return;

            SSAInstruction instruction = instructions[ci];
            // 对应 lexical:l@xxxxx = 21, 21存在于symbol table中的形式
            if (variableKeys.size() > 0 && instruction instanceof AstLexicalWrite){
                String left = instruction.toString().split("=")[0].trim();
                if (variableKeys.contains(left)){
                    target = instruction.getUse(0);
                    if (symbolTable.isConstant(target) && !symbolTable.isNullConstant(target) &&!symbolTable.getConstantValue(target).equals("")){
                        plainKeys.add(symbolTable.getConstantValue(target).toString());
                        variableKeys.remove(left);
                    }
                }
            }
            // 对应l.UNIONID形式
            else if (JSLoaderKeys.size()>0 && instruction instanceof JavaScriptPropertyWrite){
                int field = instruction.getUse(1);
                int value = instruction.getUse(2);
                if (keyMap.containsKey(field) && symbolTable.isConstant(value) && symbolTable.getConstantValue(value)!=null && !symbolTable.getConstantValue(value).equals("")){
                    plainKeys.add(symbolTable.getConstantValue(value).toString());
                    JSLoaderKeys.remove(keyMap.get(field));
                }
            }
        }
    }
}
