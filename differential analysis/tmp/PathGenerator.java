package com.mini.analysis.tmp;

import com.ibm.wala.ssa.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;

public class PathGenerator {

    public static List<InvokePath> getPathsFromIR(IR ir, SSACFG cfg) {
        List<InvokePath> paths = new LinkedList<>();
        InvokePath tmpPath = new InvokePath();
        HashMap<Integer, SSAInstruction> activeIns = new LinkedHashMap<>();
        List<Integer> activeInsIndex = new LinkedList<>();
        for (SSAInstruction ssaInstruction : ir.getInstructions()) {
            if (ssaInstruction != null) {
                activeIns.put(ssaInstruction.iIndex(), ssaInstruction);
                activeInsIndex.add(ssaInstruction.iIndex());
            }
        }
        generatePaths(activeInsIndex, activeIns, activeInsIndex.get(0), paths, tmpPath);
        return paths;
    }

    public static void generatePaths(List<Integer> activeInsIndex, HashMap<Integer, SSAInstruction> activeIns, int curInsIndex, List<InvokePath> paths, InvokePath tmpPath) {
        // no back !!!
        if (curInsIndex > activeInsIndex.get(activeInsIndex.size() - 1)) {
            paths.add(new InvokePath(tmpPath));
            return;
        }
        SSAInstruction curIns = activeIns.get(curInsIndex);
        tmpPath.add(curIns);
        // do next step
        // todo more branch instruction???
        if (curIns instanceof SSAConditionalBranchInstruction) {
            int targetInsIndex = ((SSAConditionalBranchInstruction) curIns).getTarget();
            generatePaths(activeInsIndex, activeIns, findIndexIndexes(activeInsIndex, targetInsIndex), paths, tmpPath);
            generatePaths(activeInsIndex, activeIns, findNextInIndexes(activeInsIndex, curInsIndex), paths, tmpPath);
        } else if (curIns instanceof SSAGotoInstruction) {
            int to = ((SSAGotoInstruction) curIns).getTarget();
            if (to > curInsIndex) {
                generatePaths(activeInsIndex, activeIns, findIndexIndexes(activeInsIndex, to), paths, tmpPath);
            } else {
                // no back!!!!!
                generatePaths(activeInsIndex, activeIns, findNextInIndexes(activeInsIndex, curInsIndex), paths, tmpPath);
            }
        } else {
            generatePaths(activeInsIndex, activeIns, findNextInIndexes(activeInsIndex, curInsIndex), paths, tmpPath);
        }
        tmpPath.removeLast();
    }

    public static int findNextInIndexes(List<Integer> activeInsIndex, int curIndex) {
        int base = activeInsIndex.indexOf(curIndex);
        if (base == activeInsIndex.size() - 1) {
            return activeInsIndex.get(base) + 1;
        } else {
            return activeInsIndex.get(base + 1);
        }
    }

    public static int findIndexIndexes(List<Integer> activeInsIndex, int tagetIndex) {
        if (tagetIndex < 0) {
            return activeInsIndex.get(activeInsIndex.size() - 1) + 1;
        }
        if (activeInsIndex.contains(tagetIndex)) {
            return tagetIndex;
        }
        for (Integer index : activeInsIndex) {
            if (index > tagetIndex) {
                return index;
            }
        }
        return tagetIndex;
    }


}
