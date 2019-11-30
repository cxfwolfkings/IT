package State;

/**
 * The parent class of state 
 * 具体状态角色
 */
public class ShopState implements IShopState {
	public ShopState() { }

	public void shop() { }

	public void generateBill() { }

	public void pay() { }

	protected void changeState(ShopContext c, ShopState s) {
		c.changeState(s);
	}
}