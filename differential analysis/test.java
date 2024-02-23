package com.mini.analysis;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.ibm.wala.ssa.SSAInstruction;
import com.ibm.wala.ssa.SymbolTable;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import java.util.HashMap;

public class test {
    public static void main(String[] args) {
        String domainPattern = "ws(s)?(:\\/\\/)?(www.)?[a-zA-Z0-9(-a-zA-Z0-9)?]{1,62}(\\.[a-zA-Z]{2,6})+\\.?";
        Pattern pattern = Pattern.compile(domainPattern, Pattern.CASE_INSENSITIVE);

        String s = "wss://defef.fefefe/dfefwfee/ed3we3w";
        Matcher matcher = pattern.matcher(s);

        while (matcher.find()) {
            String domainName = matcher.group(0);
            System.out.println(domainName);
        }
    }

}
