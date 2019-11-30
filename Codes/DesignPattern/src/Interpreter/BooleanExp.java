package Interpreter;

/**
 *  The interface of our BooleanExp Interpreter
 *  BooleanExp definition is:
 *      BooleanExp ::= VariableExp | Constant | OrExp | AndExp
 *                               | NotExp | '(' BooleanExp ')'
 *      AndExp ::= BooleanExp 'and' BooleanExp
 *      OrExp ::= BooleanExp 'or' BooleanExp
 *      NotExp ::= BooleanExp 'not' BooleanExp
 *      Constant ::= 'true' | 'false'
 *      VariableExp ::= 'A' | 'B' | ... | 'Z'
 *  抽象表达式角色
 */
public interface BooleanExp {
    public abstract boolean Evaluate(Context c);
    public abstract BooleanExp Replace(String var, BooleanExp exp);
    public abstract BooleanExp Copy();
}