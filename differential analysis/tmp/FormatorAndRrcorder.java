package com.mini.analysis.tmp;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ibm.wala.ssa.SymbolTable;
import com.ibm.wala.examples.MiniJSAnalyser;
import com.ibm.wala.examples.entity.ResultType;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashSet;

public class FormatorAndRrcorder {

    public static HashSet<String> getConcatData(SymbolTable symbolTable, HashSet<Integer> taintVal, HashSet<String> concatFieldName) {
        for (int i : taintVal){
            if (symbolTable.isStringConstant(i)){
                for (String t : symbolTable.getStringValue(i).split("[&]|\\?")){
                    if (!t.equals("")){
                        concatFieldName.add(t);
                    }
                }
            }
        }
        return concatFieldName;
    }

    public static void dumpData(String name, ResultType type, String paramValuableField, HashSet<String> concatData) {
        JSONObject jsonContainer =new JSONObject(true);
        jsonContainer.put("id", name);
        jsonContainer.put("type", type.toString());
        jsonContainer.put("field", paramValuableField);
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(concatData);
        jsonContainer.put("concat", jsonArray);
        String jsonStr = jsonContainer.toJSONString();
        // 写文件
        try (FileWriter fileWriter = new FileWriter(new File(MiniJSAnalyser.res_dir, name + ".json"))){
            fileWriter.append(jsonStr);
        } catch (IOException e){
            e.printStackTrace();
        }
    }

    public static String getFileName(String path){
        return new File(path).getName().replace(".js", "");
    }
}
