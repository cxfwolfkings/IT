import java.applet.*;
import java.awt.*;

public class JumpChess extends Applet {
	private Button bStart = new Button("开始玩");
	public BoardCanvas boardArea;

	public void init() {
		setBackground(Color.blue);
		bStart.setFont(new Font("Dialog", Font.PLAIN, 16));
		add(bStart);
	}

	public boolean action(Event e, Object o) {
		if (e.target == bStart) {
			new SolitaireFrame();
			return true;
		} else
			return false;
	}

}

class SolitaireFrame extends Frame {
	public BoardCanvas boardArea;
	public CheckboxMenuItem showEmptyHoles;
	public MenuItem undoLastMove;

	public SolitaireFrame() {
		super("JumpChess");
		setResizable(false);

		MenuBar menu = new MenuBar();
		setMenuBar(menu);

		Menu gameMenu = new Menu("档案");
		menu.add(gameMenu);
		gameMenu.add(new MenuItem("新游戏"));
		gameMenu.addSeparator();
		gameMenu.add(new MenuItem("结束"));

		Menu optionsMenu = new Menu("选项");
		menu.add(optionsMenu);
		showEmptyHoles = new CheckboxMenuItem("显示空的棋子");
		optionsMenu.add(showEmptyHoles);
		showEmptyHoles.setState(true);
		optionsMenu.addSeparator();
		undoLastMove = new MenuItem("反悔");
		optionsMenu.add(undoLastMove);

		undoLastMove.disable();

		setLayout(new BorderLayout());
		boardArea = new BoardCanvas(this);
		add("Center", boardArea);

		Dimension screenSize = getToolkit().getScreenSize();
		resize(screenSize.width, screenSize.height);
		pack();
		Dimension frameSize = size();
		move((screenSize.width - frameSize.width) / 2, (screenSize.height - frameSize.height) / 2);

		show();
	}

	public boolean action(Event e, Object arg) {
		if (e.target instanceof MenuItem) {
			if ("新游戏".equals(arg.toString())) {
				boardArea.boardData = new BoardMap();
				boardArea.moveData = new MoveRecord();
				undoLastMove.disable();
				boardArea.repaint();

				return true;
			} else if ("结束".equals(arg.toString())) {
				dispose();
				return true;
			} else if ("显示空的旗子".equals(arg.toString())) {
				boardArea.repaint();
				return true;
			} else if ("反悔".equals(arg.toString())) {
				boardArea.moveData.takeBackMove(undoLastMove, boardArea);
				return true;
			}

			else
				return false;
		} else
			return false;
	}

	public boolean handleEvent(Event e) {
		if (e.id == Event.WINDOW_DESTROY) {
			dispose();
			return true;
		} else
			return super.handleEvent(e);
	}
}

class GameOverDialog extends Dialog {
	private Button playAgainButton = new Button("再玩一次");
	private Button exitButton = new Button("离开");
	private Button cancelButton = new Button("取消");

	private SolitaireFrame parentFrame;

	public GameOverDialog(SolitaireFrame parentFrame, int pegs) {
		super(parentFrame, "JumpChess", true);
		this.parentFrame = parentFrame;
		setResizable(false);

		setForeground(new Color(0xffffff));
		setBackground(new Color(0x800000));

		Panel textPanel = new Panel();
		textPanel.setLayout(new GridLayout(0, 1));
		String gameOverMessage = "You finished the game with " + pegs + " peg";
		if (pegs != 1)
			gameOverMessage += "s";
		gameOverMessage += " remaining.";
		textPanel.add(new Label(gameOverMessage, Label.CENTER));
		Panel buttonPanel = new Panel();
		buttonPanel.setForeground(new Color(0x000000));
		buttonPanel.add(playAgainButton);
		buttonPanel.add(exitButton);
		buttonPanel.add(cancelButton);
		setLayout(new BorderLayout());
		add("Center", textPanel);
		add("South", buttonPanel);

		pack();
		Dimension screenSize = getToolkit().getScreenSize();
		Dimension dialogSize = size();
		move((screenSize.width - dialogSize.width) / 2, (screenSize.height - dialogSize.height) / 2);

		show();
	}

	public boolean action(Event e, Object arg) {
		if (e.target == playAgainButton) {
			dispose();
			parentFrame.boardArea.boardData = new BoardMap();
			parentFrame.boardArea.moveData = new MoveRecord();
			parentFrame.undoLastMove.disable();
			parentFrame.boardArea.repaint();

			return true;
		}
		if (e.target == exitButton) {
			dispose();
			parentFrame.dispose();

			return true;
		}
		if (e.target == cancelButton) {
			dispose();

			return true;
		} else
			return false;
	}

	public boolean handleEvent(Event e) {
		if (e.id == Event.WINDOW_DESTROY) {
			dispose();
			return true;
		} else
			return super.handleEvent(e);
	}
}

class BoardCanvas extends Canvas {
	private final int SQUARE_SIZE = 20;
	private final int SPACE_SIZE = 10;
	private final int BOARD_SIZE = SQUARE_SIZE * 7 + SPACE_SIZE * 8;

	private final Color BACKGROUND_COLOR = Color.yellow;
	private final Color OCCUPIED_COLOR = Color.blue;
	private final Color VACANT_COLOR = Color.black;
	private final Color DRAG_COLOR = Color.blue;

	private SolitaireFrame parentFrame;

	public BoardMap boardData = new BoardMap();
	public MoveRecord moveData = new MoveRecord();

	private boolean pegDragging = false;
	private Coordinates startCoordinates;
	private Point pegPoint;
	private Point mousePoint;

	public BoardCanvas(SolitaireFrame parentFrame) {
		this.parentFrame = parentFrame;
		setBackground(BACKGROUND_COLOR);
		resize(BOARD_SIZE, BOARD_SIZE);
	}

	public void update(Graphics g) {
		Image sketchImage = createImage(BOARD_SIZE, BOARD_SIZE);
		Graphics sketchGraphics = sketchImage.getGraphics();

		sketchGraphics.setColor(BACKGROUND_COLOR);
		sketchGraphics.fillRect(0, 0, BOARD_SIZE, BOARD_SIZE);

		Point pegTopLeft;
		for (int col = 0; col <= 6; col++)
			for (int row = 0; row <= 6; row++) {
				Coordinates pegCoordinates = new Coordinates(col, row);
				pegTopLeft = convertCoordinatesToPoint(pegCoordinates);

				if (boardData.getIsOccupied(pegCoordinates)) {
					sketchGraphics.setColor(OCCUPIED_COLOR);
					sketchGraphics.fillOval(pegTopLeft.x, pegTopLeft.y, SQUARE_SIZE, SQUARE_SIZE);
				} else
					if (boardData.getCanBeOccupied(pegCoordinates) && parentFrame.showEmptyHoles.getState() == true) {
					sketchGraphics.setColor(VACANT_COLOR);
					sketchGraphics.fillOval(pegTopLeft.x, pegTopLeft.y, SQUARE_SIZE, SQUARE_SIZE);
				}
			}

		if (pegDragging) {
			sketchGraphics.setColor(DRAG_COLOR);
			sketchGraphics.fillOval(pegPoint.x, pegPoint.y, SQUARE_SIZE, SQUARE_SIZE);
		}

		g.drawImage(sketchImage, 0, 0, this);
	}

	public void paint(Graphics g) {
		update(g);
	}

	public boolean mouseDown(Event e, int x, int y) {
		startCoordinates = convertPointToCoordinates(new Point(x, y));
		if (startCoordinates.col != -1 && startCoordinates.row != -1)
			if ((Math.abs(3 - startCoordinates.col) + Math.abs(3 - startCoordinates.row)) <= 4)
				if (boardData.getIsOccupied(startCoordinates)) {
					pegPoint = convertCoordinatesToPoint(startCoordinates);
					mousePoint = new Point(x, y);
					boardData.vacate(startCoordinates);
					pegDragging = true;
					repaint();
				}
		return true;
	}

	public boolean mouseDrag(Event e, int x, int y) {
		if (pegDragging) {
			Point oldPegPoint = new Point(pegPoint.x, pegPoint.y);
			pegPoint.x += (x - mousePoint.x);
			pegPoint.y += (y - mousePoint.y);
			if (pegPoint.x < 0 || pegPoint.x > (BOARD_SIZE - SQUARE_SIZE) || pegPoint.y < 0
					|| pegPoint.y > (BOARD_SIZE - SQUARE_SIZE)) {
				boardData.occupy(startCoordinates);
				pegDragging = false;
			} else
				mousePoint = new Point(x, y);

			repaint();
		}
		return true;
	}

	public boolean mouseUp(Event e, int x, int y) {
		if (pegDragging) {
			Coordinates endCoordinates = convertPointToCoordinates(
					new Point(pegPoint.x + SQUARE_SIZE / 2, pegPoint.y + SQUARE_SIZE / 2));
			if ((endCoordinates.col == -1 || endCoordinates.row == -1)
					|| ((Math.abs(3 - endCoordinates.col) + Math.abs(3 - endCoordinates.row)) > 4)
					|| (!boardData.jumpAndRemove(startCoordinates, endCoordinates)))
				boardData.occupy(startCoordinates);
			else
				moveData.addMove(parentFrame.undoLastMove, startCoordinates, endCoordinates);

			pegDragging = false;
			repaint();

			if (boardData.gameIsOver())
				new GameOverDialog(parentFrame, boardData.countRemainingPegs());
		}
		return true;
	}

	public Point convertCoordinatesToPoint(Coordinates coordinates) {
		return new Point((coordinates.col + 1) * SPACE_SIZE + coordinates.col * SQUARE_SIZE,
				(coordinates.row + 1) * SPACE_SIZE + coordinates.row * SQUARE_SIZE);
	}

	public Coordinates convertPointToCoordinates(Point point) {
		int col;
		int row;

		if (point.x % (SQUARE_SIZE + SPACE_SIZE) >= SPACE_SIZE)
			col = point.x / (SQUARE_SIZE + SPACE_SIZE);
		else
			col = -1;

		if (point.y % (SQUARE_SIZE + SPACE_SIZE) >= SPACE_SIZE)
			row = point.y / (SQUARE_SIZE + SPACE_SIZE);
		else
			row = -1;

		return new Coordinates(col, row);
	}
}

class Coordinates {
	public int col;
	public int row;

	public Coordinates(int col, int row) {
		this.col = col;
		this.row = row;
	}
}

class Square {
	public boolean canBeOccupied;
	public boolean occupied;

	public Square(boolean beginOccupied) {
		if (beginOccupied) {
			canBeOccupied = true;
			occupied = true;
		} else {
			canBeOccupied = false;
			occupied = false;
		}
	}
}

class BoardMap {
	private Square[][] matrix = new Square[9][9];

	public BoardMap() {
		for (int col = 0; col <= 6; col++)
			for (int row = 0; row <= 6; row++)
				if ((Math.abs(3 - col) + Math.abs(3 - row)) > 4)
					matrix[col][row] = new Square(false);
				else
					matrix[col][row] = new Square(true);

		vacate(new Coordinates(3, 3));
	}

	public void occupy(Coordinates square) {
		matrix[square.col][square.row].occupied = true;
	}

	public void vacate(Coordinates square) {
		matrix[square.col][square.row].occupied = false;
	}

	public boolean getCanBeOccupied(Coordinates square) {
		return matrix[square.col][square.row].canBeOccupied;
	}

	public boolean getIsOccupied(Coordinates square) {
		return matrix[square.col][square.row].occupied;
	}

	public boolean canJump(Coordinates startCoordinates, Coordinates endCoordinates) {
		if (getCanBeOccupied(endCoordinates) && !getIsOccupied(endCoordinates))
			if (startCoordinates.col == endCoordinates.col ^ startCoordinates.row == endCoordinates.row)
				if (Math.abs(endCoordinates.col - startCoordinates.col) == 2
						^ Math.abs(endCoordinates.row - startCoordinates.row) == 2)
					if (getIsOccupied(
							new Coordinates(startCoordinates.col + (endCoordinates.col - startCoordinates.col) / 2,
									startCoordinates.row + (endCoordinates.row - startCoordinates.row) / 2)))
						return true;

		return false;
	}

	public boolean jumpAndRemove(Coordinates startCoordinates, Coordinates endCoordinates) {
		if (canJump(startCoordinates, endCoordinates)) {
			occupy(endCoordinates);
			vacate(new Coordinates(startCoordinates.col + (endCoordinates.col - startCoordinates.col) / 2,
					startCoordinates.row + (endCoordinates.row - startCoordinates.row) / 2));
			return true;
		} else
			return false;
	}

	public boolean gameIsOver() {
		for (int col = 0; col <= 6; col++)
			for (int row = 0; row <= 6; row++) {
				Coordinates startCoordinates = new Coordinates(col, row);

				if (getIsOccupied(startCoordinates))
					if ((col >= 2 && canJump(startCoordinates, new Coordinates(col - 2, row)))
							|| (col <= 4 && canJump(startCoordinates, new Coordinates(col + 2, row)))
							|| (row >= 2 && canJump(startCoordinates, new Coordinates(col, row - 2)))
							|| (row <= 4 && canJump(startCoordinates, new Coordinates(col, row + 2))))
						return false;
			}

		return true;
	}

	public int countRemainingPegs() {
		int pegs = 0;
		for (int col = 0; col <= 6; col++)
			for (int row = 0; row <= 6; row++)
				if (getIsOccupied(new Coordinates(col, row)))
					pegs++;

		return pegs;
	}
}

class Move {
	public Coordinates startCoordinates;
	public Coordinates endCoordinates;

	public Move(Coordinates startCoordinates, Coordinates endCoordinates) {
		this.startCoordinates = new Coordinates(startCoordinates.col, startCoordinates.row);
		this.endCoordinates = new Coordinates(endCoordinates.col, endCoordinates.row);
	}
}

class MoveRecord {
	public int movesMade = 0;
	private Move[] moves = new Move[36];

	public void addMove(MenuItem undoLastMove, Coordinates startCoordinates, Coordinates endCoordinates) {
		moves[movesMade] = new Move(startCoordinates, endCoordinates);
		movesMade++;
		if (movesMade == 1)
			undoLastMove.enable();
	}

	public void takeBackMove(MenuItem undoLastMove, BoardCanvas boardArea) {
		if (movesMade > 0) {
			movesMade--;
			boardArea.boardData.vacate(moves[movesMade].endCoordinates);
			boardArea.boardData.occupy(moves[movesMade].startCoordinates);
			boardArea.boardData.occupy(new Coordinates(
					moves[movesMade].startCoordinates.col
							+ (moves[movesMade].endCoordinates.col - moves[movesMade].startCoordinates.col) / 2,
					moves[movesMade].startCoordinates.row
							+ (moves[movesMade].endCoordinates.row - moves[movesMade].startCoordinates.row) / 2));

			boardArea.repaint();
		}

		if (movesMade == 0)
			undoLastMove.disable();
	}
}
