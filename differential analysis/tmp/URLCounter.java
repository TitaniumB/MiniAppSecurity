package com.mini.analysis.tmp;

import com.ibm.wala.examples.MiniJSAnalyser;
import com.ibm.wala.ssa.SSAInstruction;
import com.ibm.wala.ssa.SymbolTable;
import com.ibm.wala.examples.tmp.Entropy;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.util.HashMap;

public class URLCounter {
    private static String domainPattern = "http(s)?(:\\/\\/)?(www.)?[a-zA-Z0-9(-a-zA-Z0-9)?]{1,62}(\\.[a-zA-Z]{2,6})+\\.?";
    private static Pattern pattern = Pattern.compile(domainPattern, Pattern.CASE_INSENSITIVE);
    private static String wssProtocol = "ws(s)?(:\\/\\/)(www.)?[a-zA-Z0-9(-a-zA-Z0-9)?]{1,62}(\\.[a-zA-Z]{2,6})+\\.?";
    private static Pattern wssPattern = Pattern.compile(wssProtocol, Pattern.CASE_INSENSITIVE);

    public static void getConstantUrl(SSAInstruction[] instructions, SymbolTable symbolTable, HashMap<String, Integer> urlCounter, List<String> unSfaeHttpUrls, List<String> unSafeWssUrls, List<String> secrets, List<String> wssURLs) throws MalformedURLException {

        for (int i=0; i<symbolTable.getMaxValueNumber(); i++){
            if (symbolTable.isConstant(i) && symbolTable.isStringConstant(i)){
                String constant = symbolTable.getConstantValue(i).toString();

                // 用常量值判断其是否为密钥
                if (Entropy.isSecret(constant)){
                    secrets.add(constant);
                }

                // 寻找url
                Matcher matcher = pattern.matcher(constant);
                while (matcher.find()) {
                    String domainName = matcher.group(0);
                    URL url = new URL(domainName);
                    if (!urlCounter.containsKey(url.getHost())){
                        urlCounter.put(url.getHost(), 1);
                    }else {
                        int tmp = urlCounter.get(url.getHost()) + 1;
                        urlCounter.put(url.getHost(), tmp);
                    }
                    // 是否存在http不安全协议
                    if (url.getProtocol().equals("http")){
                        unSfaeHttpUrls.add(url.toString());
                        MiniJSAnalyser.httpUnsafe = true;
                    }
                }

                // 是否存在ws不安全协议
                Matcher wssMatcher = wssPattern.matcher(constant);
                while (wssMatcher.find()) {
                    String domainName = wssMatcher.group(0);
                    if (domainName.startsWith("ws://")){
                        unSafeWssUrls.add(domainName);
                        MiniJSAnalyser.wsUnsafe = true;
                    }else {
                        wssURLs.add(domainName);
                    }
                }
            }
        }
    }
}
