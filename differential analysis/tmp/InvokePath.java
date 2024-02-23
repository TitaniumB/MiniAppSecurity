package com.mini.analysis.tmp;

import com.ibm.wala.ssa.SSAInstruction;

import java.util.LinkedList;
import java.util.List;

public class InvokePath {

    public List<SSAInstruction> instructions;

    InvokePath(){
        instructions = new LinkedList<>();
    }

    InvokePath(InvokePath path){
        instructions = new LinkedList<>(path.instructions);
    }

    public void add(SSAInstruction instruction){
        instructions.add(instruction);
    }

    public void removeLast(){
        instructions.remove(instructions.size() - 1);
    }

}
