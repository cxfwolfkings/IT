package Bridge;

/**
 * The RefinedAbstraction
 * 抽象部分(前端)的精确抽象角色
 * @author Charles
 * @date   2016年1月8日 上午9:35:06
 */
public class TextItalic extends Text {
    private TextImp imp;
    public TextItalic(String type) {
        imp = GetTextImp(type);
    }
    public void DrawText(String text) {
        System.out.println(text);
        System.out.println("The text is italic text!");
        imp.DrawTextImp();
    }
}