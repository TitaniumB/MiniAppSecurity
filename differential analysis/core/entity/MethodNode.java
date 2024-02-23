package com.mini.analysis.core.entity;

import com.ibm.wala.classLoader.IMethod;
import com.ibm.wala.ssa.IR;
import com.ibm.wala.ssa.IRFactory;
import com.ibm.wala.ssa.SSACFG;
import com.ibm.wala.ssa.SymbolTable;

public class MethodNode {

    private IMethod iMethod;
    private String sig;
    private IR ir;
    private SSACFG cfg;
    private SymbolTable symbolTable;
    private boolean isEntryMethod;

    public MethodNode(IRFactory<IMethod> factory, IMethod iMethod){


    }

}
