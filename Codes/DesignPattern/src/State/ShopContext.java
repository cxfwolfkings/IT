package State;

/**
 *  The context for user useing
 *  使用环境角色
 */
public class ShopContext  {
	
    private ShopState currentState;
    
    public ShopContext() { }
    
    public void changeState(ShopState s) {
        currentState = s;
    }
    
    public void shop() {
        currentState.shop();
    }
    
    public void generateBill() {
        currentState.generateBill();
    }
    
    public void pay() {
        currentState.pay();
    }
}