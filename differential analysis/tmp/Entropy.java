package com.mini.analysis.tmp;


import java.util.*;

public class Entropy {
    static String[] map = {"0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","+","/","="};
    static String[] tmp = {"sessionkey", "session_key", "encryptkey"};
    private static List<String> maps = new ArrayList<>(Arrays.asList(map));
    private static List<String> whiteList = new ArrayList<>(Arrays.asList(tmp));

    public static void main(String[] args) {
        String s = "zra+j0F/kChHs2dFt4Gh2g==";
        System.out.println(isSecret(s));
    }
    public static boolean isSecret(String candidate){
        if (whiteList.contains(candidate.toLowerCase(Locale.ROOT))){
            return true;
        }
        if (candidate.toLowerCase(Locale.ROOT).startsWith("abcdefg") || candidate.toLowerCase(Locale.ROOT).toLowerCase(Locale.ROOT).startsWith("0123456789")){
            return false;
        }

        if (isBase64(candidate) && candidate.length()==24){
            return getEntropy(candidate);
        }
        return false;

    }
    private static boolean getEntropy(String str) {
        int uppercase = 0;

        int lowercase = 0;

        int num = 0;
        int symbol = 0;

        int len = str.length();//计算字符串总长度

        for (int i = 0; i < len; i++) {
            if(str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') {
                uppercase++; //统计大写字母个数

            }else if(str.charAt(i) >= 'a' && str.charAt(i) <= 'z') {
                lowercase++; //统计小写字母个数

            }else if(str.charAt(i) >= '0' && str.charAt(i) <= '9') {
                num++; //统计数字出现个数

            }else {
                symbol++; // 统计符号出现的个数
            }

        }

        double p1 = 1.0*uppercase / len; //大写字母出现的概率p1

        double p2 = 1.0*lowercase / len; //小写字母出现的概率p2

        double p3 = 1.0*num / len; //数字出现的概率p3
        double p4 = 1.0*symbol/len;

        double []p = {p1, p2, p3, p4};

        double H = 0;

        for (double v : p) {
            if (v > 0)
                H += -v * (Math.log(v) / Math.log(2));
        }
//        System.out.println(H);
        return H > 1.5;
    }

    private static boolean isBase64(String str){
        // 如果candidate中出现非base64编码的字符，则不是密钥
        for (int i=0; i<str.length(); i++){
            if (!maps.contains(String.valueOf(str.charAt(i)))){
                return false;
            }
        }
        return true;
    }

}