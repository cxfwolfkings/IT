package com.charles.game.chess.sec;

import java.util.Arrays;
import java.util.Comparator;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;

import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.CLabel;
import org.eclipse.swt.events.MouseAdapter;
import org.eclipse.swt.events.MouseEvent;
import org.eclipse.swt.events.PaintEvent;
import org.eclipse.swt.events.PaintListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.GC;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Canvas;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Shell;

/**
 * 五子棋程序主类。。
 *
 * @version 2.0
 * @author baokui
 */
public class Five {

    // 主窗口
    protected Shell shell;

    // 棋盘
    private Canvas canvas;

    // 背景。。。
    protected final Image image = new Image(Display.getDefault(), "src/chess/res/bk.jpg");

    protected Image whitebow = new Image(Display.getDefault(), "src/chess/res/whitebow.bmp");

    protected Image blackbow = new Image(Display.getDefault(), "src/chess/res/blackbow.bmp");

    protected final Image five = new Image(Display.getDefault(), "src/chess/res/fivee.bmp");

    // 当前应该下的棋色，0：黑色， 1：白色。。。
    protected int bw = 0;

    // 玩家棋的颜色， 0：黑色，1:白色。。。
    protected int startbw = -1;

    // 棋盘单元格大小
    protected final int size = 27;

    // 当前棋局，0：黑子，1：白子占据，2：空闲。
    protected int[][] chess = new int[15][15];

    // 电脑和玩家的棋型。。 保存下子后相连的子个数。。最后一维，0，1，2，3表示横、竖、左斜、右斜的连子个数。
    protected int[][][] computer = new int[15][15][4];

    protected int[][][] player = new int[15][15][4];

    protected boolean win = false;

    protected int win_bw;

    // /////////////////////////////////////////
    // 左侧 group 及相关label。。
    // /////////////////////////////////////////
    private Group group;

    private Label label_luozi;

    private static Label label_time;

    private Label label_black_time;

    private Label label_white_time;

    private Label label__wait_bw;

    // 总落子数目。。
    private int chess_num = 0;

    // 相关时间。。单位s
    private int total_time = 0;

    private int white_time = 0;

    private int black_time = 0;

    private Timer time;

    /**
     * 在指定坐标画指定样式的棋子
     *
     * @param gc 用来画图的GC。
     * @param x 放棋子的x坐标。
     * @param y 放棋子的y坐标。
     * @param bw 白棋还是黑棋，0：黑棋，1：白棋。
     * @param r 棋子半径。
     */
    private void draw(GC gc, int x, int y, int bwf, int r) {

        Color wh = new Color(Display.getDefault(), 255, 255, 255);
        Color bk = new Color(Display.getDefault(), 0, 0, 0);
        // if (r == 8)
        // System.out.println(x + ":" + y + "-->" + bwf + " in draw..");
        if (bwf == 0)
            gc.setBackground(bk);
        else
            gc.setBackground(wh);

        gc.fillOval(x - r, y - r, 2 * r, 2 * r);
        wh.dispose();
        bk.dispose();
    }

    /**
     * Launch the application
     *
     * @param args
     */
    public static void main(String[] args) {
        try {
            Five window = new Five();
            window.open();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * Open the window
     */
    public void open() {
        final Display display = Display.getDefault();
        createContents();
        shell.open();
        shell.layout();
        while (!shell.isDisposed()) {
            if (!display.readAndDispatch())
                display.sleep();
        }
        //释放资源。。
        dispose();
    }

    /**
     * Create contents of the window
     */
    protected void createContents() {
        // 初始化窗口。。。
        shell = new Shell(SWT.TITLE | SWT.BORDER | SWT.CLOSE);

        shell.addPaintListener(new PaintListener() {
            public void paintControl(final PaintEvent pe) {
                shell.setBackground(new Color(Display.getDefault(), 100, 55, 255));
                GC gc = pe.gc;
                gc.drawImage(image, 0, 0);
                gc.drawImage(blackbow, 120, 70);
                gc.drawImage(whitebow, 600, 70);
                // Color
                gc.drawText("version 1.0 @Baokui Yang, Wuhan Univ. \n no copyright reserved, copy it free!! ", 250,
                        480, true);

            }
        });
        shell.setSize(800, 545);
        shell.setText("五子棋--无禁手");

        // 五子棋图片。。。
        final CLabel label = new CLabel(shell, SWT.NONE);
        label.addPaintListener(new PaintListener() {
            public void paintControl(final PaintEvent pe) {
                GC gc = pe.gc;
                gc.drawImage(five, 0, 0);
            }
        });
        label.setText("Label");
        label.setBounds(126, 0, 542, 66);
        // chess table size

        // 初始化棋盘， 2：当前位置空闲，0：黑子占据，1：白子占据。。。
        for (int i = 0; i < 15; i++)
            for (int j = 0; j < 15; j++)
                chess[i][j] = 2;

        initCanvas();
        initLeft();
        initRight();
        // 开始计时。。。。。。。。
        startTime();
    }

    /**
     * 初始化右侧 buttons。。。。
     */
    private void initRight() {

        // 开局黑白棋选择group
        final Group group_1 = new Group(shell, SWT.NONE);
        group_1.addPaintListener(new PaintListener() {
            public void paintControl(final PaintEvent pe) {
                GC gc = pe.gc;
                gc.drawImage(image, -620, -155);

            }
        });
        group_1.setBounds(619, 155, 133, 80);

        final Button button_2 = new Button(group_1, SWT.RADIO);
        button_2.setText("黑棋先手");
        button_2.setBounds(35, 25, 70, 20);
        // 默认 黑棋先行。。。·
        button_2.setSelection(true);

        final Button button_3 = new Button(group_1, SWT.RADIO);
        button_3.setText("白棋后手");
        button_3.setBounds(35, 55, 70, 20);

        // ///////////////////////////////////
        // 初始化 右侧 button 们
        // /////////////////////////////////////
        final Button aaButton = new Button(shell, SWT.NONE);
        aaButton.addSelectionListener(new SelectionAdapter() {
            public void widgetSelected(final SelectionEvent arg0) {

                if (button_2.getSelection())
                    startbw = 0;
                else {
                    startbw = 1;
                    putOne(1 - startbw);
                }
                aaButton.setEnabled(false);
                String str = (bw == 0 ? "黑棋" : "白棋");
                label__wait_bw.setText("等待 " + str + " 落子。。。");
            }
        });
        aaButton.setText("开始");
        aaButton.setBounds(653, 267, 76, 34);

        final Button button = new Button(shell, SWT.NONE);
        button.addSelectionListener(new SelectionAdapter() {
            public void widgetSelected(final SelectionEvent se) {
                startbw = -1;
                win = false;
                for (int i = 0; i < 15; i++)
                    for (int j = 0; j < 15; j++) {
                        chess[i][j] = 2;
                        computer[i][j][0] = computer[i][j][1] = computer[i][j][2] = computer[i][j][3] = 0;
                        player[i][j][0] = player[i][j][1] = player[i][j][2] = player[i][j][3] = 0;
                    }
                // 如何让shell 重绘？？？？
                // shell.update();
                // shell.redraw();
                canvas.setVisible(false);
                canvas.setVisible(true);
                aaButton.setEnabled(false);
                bw = 0;
                chess_num = 0;
                total_time = white_time = black_time = 0;
                if (button_2.getSelection())
                    startbw = 0;
                else {
                    startbw = 1;
                    // 计算机先行，随机下一子。
                    // 越靠近中间，落子的概论越大。。
                    int y, x;
                    x = y = 3;
                    for (int i = 3; i < 12; i++)
                        for (int j = 3; j < 12; j++)
                            if (randomTest(20 * (Math.abs(7 - i) + Math.abs(7 - j)) + 2)) {
                                x = i;
                                y = j;
                            }
                    GC gc = new GC(canvas);
                    draw(gc, x * size + 10, y * size + 10, bw, 8);
                    gc.dispose();
                    chess[x][y] = bw;
                    bw = 1 - bw;
                }

            }
        });
        button.setText("重新开始");
        button.setBounds(653, 307, 76, 34);

        final Button helpButton = new Button(shell, SWT.NONE);
        helpButton.addSelectionListener(new SelectionAdapter() {
            public void widgetSelected(final SelectionEvent arg0) {
                new Help().open();
            }
        });
        helpButton.setText("帮助");
        helpButton.setBounds(653, 347, 76, 34);

        final Button button_1 = new Button(shell, SWT.NONE);
        button_1.addSelectionListener(new SelectionAdapter() {
            public void widgetSelected(final SelectionEvent arg0) {
                dispose();
            }
        });
        button_1.setText("退出");
        button_1.setBounds(653, 387, 76, 34);

    }


    /**
     * 初始化左侧group 中的label。。。
     */
    private void initLeft() {
        // /////////////////////////////////////////
        // 初始化左侧 group
        // /////////////////////////////////////////
        group = new Group(shell, SWT.NONE);
        group.addPaintListener(new PaintListener() {
            public void paintControl(final PaintEvent pe) {
                GC gc = pe.gc;
                gc.drawImage(image, -24, -126);
            }
        });
        group.setBounds(26, 126, 133, 206);

        label_luozi = new Label(group, SWT.NONE);
        label_luozi.setText("总落子：");
        label_luozi.setBounds(10, 55, 102, 15);

        label_time = new Label(group, SWT.NONE);
        label_time.setText("总耗时：");
        label_time.setBounds(10, 82, 113, 15);

        label_black_time = new Label(group, SWT.NONE);
        label_black_time.setText("黑子耗时：");
        label_black_time.setBounds(10, 110, 113, 15);

        label_white_time = new Label(group, SWT.NONE);
        label_white_time.setText("白子耗时：");
        label_white_time.setBounds(10, 131, 113, 15);

        label__wait_bw = new Label(group, SWT.NONE);
        label__wait_bw.setText("等待 x 落子...");
        label__wait_bw.setBounds(10, 31, 102, 15);

    }

    /**
     * 启动定时器，开始定时。。。。 每隔一秒触发一次事件。。。。。。
     */
    private void startTime() {

        time = new Timer(false);
        // 每隔一秒更新一次。。。。
        time.schedule(new TimerTask() {
            public void run() {
                if (!win && startbw != -1) {
                    total_time++;
                    if (bw == 0)
                        black_time++;
                    else
                        white_time++;

                    // Note:必须同步执行。。。。否则抛异常。。。：P
                    Display.getDefault().syncExec(new Runnable() {
                        public void run() {
                            label_time.setText("总耗时： " + total_time / 60 + "分 " + total_time % 60 + "秒");
                            label_black_time.setText("黑棋耗时： " + black_time / 60 + "分" + black_time % 60 + "秒");
                            label_white_time.setText("白棋耗时： " + white_time / 60 + "分" + white_time % 60 + "秒");

                        }
                    });
                }
            }
        }, 0, 1000);
    }

    /**
     * 更新左侧相应label
     */
    private void updateChess() {

        chess_num++;
        label_luozi.setText("总落子： " + chess_num);

        String str = (bw == 0 ? "黑棋" : "白棋");
        label__wait_bw.setText("等待 " + str + " 落子。。。");
    }

    /**
     * 初始化Canvas （棋盘）及 消息处理。。
     */
    private void initCanvas() {
        // //////////////////////////////////////////////////
        // 棋盘，及棋盘事件相应
        // //////////////////////////////////////////////////
        canvas = new Canvas(shell, SWT.NONE);
        canvas.addMouseListener(new MouseAdapter() {
            public void mouseDown(final MouseEvent me) {

                // 还没开始||已经结束。。。。
                if (startbw == -1 || win)
                    return;
                // 不该玩家走棋。。。
                if (startbw != bw)
                    return;
                // 计算放棋位置
                int x = me.x + 13;
                int y = me.y + 14;
                x -= 10;
                x /= size;
                y -= 10;
                y /= size;

                // 如果该位置已经放置棋子。。。
                if (chess[x][y] != 2)
                    return;

                // 放&画棋子。。。
                GC gc = new GC(canvas);
                draw(gc, x * size + 10, y * size + 10, startbw, 8);
                chess_num++;
                label_luozi.setText("总落子： " + chess_num);
                // 玩家是否取胜。。
                boolean flag = haveWin(x, y, bw);

                chess[x][y] = bw;
                bw = 1 - bw;
                String str = (bw == 0 ? "黑棋" : "白棋");
                label__wait_bw.setText("等待 " + str + " 落子。。。");

                if (flag) {
                    wined(gc, 1 - bw);
                    return;
                }

                gc.dispose();
                putOne(bw);
            }
        });
        canvas.addPaintListener(new PaintListener() {
            public void paintControl(final PaintEvent pe) {

                canvas.setBackground(new Color(Display.getDefault(), 200, 100, 100));
                GC gc = pe.gc;
                int x, y;
                x = 10;
                y = 10;
                // 画棋盘。。
                Color odd = new Color(Display.getDefault(), 0, 0, 0);
                Color even = new Color(Display.getDefault(), 55, 55, 55);

                // 纵行。。。。
                for (int i = 0; i < 15; i++) {
                    if (i % 2 == 0)
                        gc.setForeground(odd);
                    else
                        gc.setForeground(even);
                    gc.drawLine(i * size + x, 0 + y, i * size + x, 14 * size + y);
                }
                // 横行。。。。
                for (int i = 0; i < 15; i++) {
                    if (i % 2 == 0)
                        gc.setForeground(odd);
                    else
                        gc.setForeground(even);
                    gc.drawLine(0 + x, i * size + y, 14 * size + x, i * size + y);
                }
                // 五个基准点。。。。
                draw(gc, 3 * size + x, 3 * size + y, 0, 3);
                draw(gc, 11 * size + x, 3 * size + y, 0, 3);
                draw(gc, 3 * size + x, 11 * size + y, 0, 3);
                draw(gc, 11 * size + x, 11 * size + y, 0, 3);
                draw(gc, 7 * size + x, 7 * size + y, 0, 3);

                // 放棋子。。。
                for (int i = 0; i < 15; i++)
                    for (int j = 0; j < 15; j++)
                        if (chess[i][j] != 2)
                            draw(gc, i * size + 10, j * size + 10, chess[i][j], 8);

                // 释放颜色资源。。
                odd.dispose();
                even.dispose();
                if (win) {
                    wined(gc, win_bw);
                }
            }
        });
        canvas.setBounds(189, 72, 400, 401);
    }


    /**
     * 计算不同棋型对应分数。。
     *
     * @param k 棋型代号
     * @return 对应的分数
     */
    private int getMark(int k) {
        switch (k) {
        case 1:
            return 100000;
        case 2:
            return 10000;
        case 3:
            return 5000;
        case 4:
            return 1000;
        case 5:
            return 500;
        case 6:
            return 200;
        case 7:
            return 100;
        case 8:
            return 50;
        case 9:
            return 10;
        case 10:
            return 5;
        case 11:
            return 3;
        default:
            return 0;
        }
    }


    /**
     * 随机测试，对分数相同的落子点，随机选取。。
     *
     * @param kt 随机因子。。（越靠近棋盘中间，kt值越小，被选取的概率越大）
     * @return 是否选择该位置。
     */
    private boolean randomTest(int kt) {
        Random rm = new Random();
        return rm.nextInt() % kt == 0;
    }


    /**
     * 计算指定方位的连续并且有意义的棋子个数。
     *
     * @param x,y 方向线基准一点。
     * @param ex，ey 指定方向步进向量。
     * @param k 棋子颜色，0：黑色，1：白色
     * @throws Exception if the position x,y is not empty.
     */
    private int[] count(int x, int y, int ex, int ey, int k) {
        int rt = 1;

        if (chess[x][y] != 2) {
            // System.out.println(x + " in count " + y);
            throw new IllegalArgumentException("position x,y must be empty!..");
        }
        int i;
        for (i = 1; x + i * ex < 15 && x + i * ex >= 0 && y + i * ey < 15 && y + i * ey >= 0; i++)
            if (chess[x + i * ex][y + i * ey] == k)
                rt++;
            else
                break;

        int ok = 0;
        if (x + i * ex < 15 && x + i * ex >= 0 && y + i * ey < 15 && y + i * ey >= 0
                && chess[x + i * ex][y + i * ey] == 2)
            ok++;

        for (i = 1; x - i * ex >= 0 && x - i * ex < 15 && y - i * ey >= 0 && y - i * ey < 15; i++)
            if (chess[x - i * ex][y - i * ey] == k)
                rt++;
            else
                break;
        if (x - i * ex < 15 && x - i * ex >= 0 && y - i * ey < 15 && y - i * ey >= 0
                && chess[x - i * ex][y - i * ey] == 2)
            ok++;

        // 该方向放子无意义，返回0
        if (rt < 5 && !makesence(x, y, ex, ey, k))
            return new int[] {0, 1};

        return new int[] {rt, ok};
    }

    /**
     * 计算在指点放子，在指定方向上是否有意义，如果改方向上连续可放的位置或己方子的个数大于5则有意义，否则无意义。
     *
     * @param x,y 评估的基准点。
     * @param ex,ey 方向向量。。
     * @param k 棋色。
     * @return true:有意义， false：无意义。
     */
    private boolean makesence(int x, int y, int ex, int ey, int bwf) {

        int rt = 1;
        for (int i = 1; x + i * ex < 15 && x + i * ex >= 0 && y + i * ey < 15 && y + i * ey >= 0 && rt < 5; i++)
            if (chess[x + i * ex][y + i * ey] != 1 - bwf)
                rt++;
            else
                break;

        for (int i = 1; x - i * ex >= 0 && x - i * ex < 15 && y - i * ey >= 0 && y - i * ey < 15 && rt < 5; i++)
            if (chess[x - i * ex][y - i * ey] != 1 - bwf)
                rt++;
            else
                break;
        return (rt >= 5);
    }

    /**
     * 胜负已分。。。打印消息。。
     *
     * @param gc 用于draw text 的gc。
     * @param bw 指定胜方棋子颜色。0：黑色，1：白色。
     */
    private void wined(GC gc, int bw) {
        win = true;
        win_bw = bw;
        Font font = new Font(Display.getDefault(), "Arial", 27, SWT.BOLD | SWT.ITALIC);
        gc.setFont(font);
        Color color = new Color(Display.getDefault(), 120, 242, 105);
        gc.setForeground(color);
        String str = (bw == 0 ? "黑棋胜！" : "白棋胜！");
        str = "五子连线。" + str;
        gc.drawText(str, 40, 90, true);
        font.dispose();
        color.dispose();
    }

    /**
     * 判断是否已经赢了。。
     *
     * @param x，y 最后落子点。。
     * @param bwf 棋色 0:黑色， 1：白色。
     * @return ture 如果赢了。
     */
    private boolean haveWin(int x, int y, int bwf) {
        boolean flag = false;

        if (count(x, y, 1, 0, bw)[0] >= 5)
            flag = true;
        if (!flag && count(x, y, 0, 1, bw)[0] >= 5)
            flag = true;
        if (!flag && count(x, y, 1, 0, bw)[0] >= 5)
            flag = true;
        if (!flag && count(x, y, 1, -1, bw)[0] >= 5)
            flag = true;
        if (!flag && count(x, y, 1, 1, bw)[0] >= 5)
            flag = true;
        return flag;
    }

    /**
     * 回收系统资源。。。
     */
    private void dispose() {
        shell.dispose();
        canvas.dispose();
        image.dispose();
        whitebow.dispose();
        blackbow.dispose();
        five.dispose();
        time.cancel();
    }

    /**
     * @param x,y 落子位置。
     * @param bwf 黑棋还是白棋 0：黑子，1：白子
     * @return 对应的棋型： 棋型代码对应如下：
     *
     * <pre>
     *             1：成5,
     *             2：成活4或者是双死4或者是死4活3
     *             3：成双活3
     *             4：成死3活3
     *             5：成死4
     *             6：单活3
     *             7：成双活2
     *             8：成死3
     *             9：成死2活2
     *             10：成活2
     *             11：成死2
     *             0: 其他
     * </pre>
     */
    protected int getType(int x, int y, int bwf) {

        if (chess[x][y] != 2)
            return -1;

        int[][] types = new int[4][2];

        types[0] = count(x, y, 0, 1, bwf);
        types[1] = count(x, y, 1, 0, bwf);
        types[2] = count(x, y, -1, 1, bwf);
        types[3] = count(x, y, 1, 1, bwf);

        // 判断是否属于各个棋型。

        int c5, s4, h4, s3, h3, s2, h2;
        c5 = s4 = h4 = s3 = h3 = s2 = h2 = 0;
        for (int k = 0; k < 4; k++) {
            if (types[k][0] == 5)
                c5++;
            else if (types[k][0] == 4 && types[k][1] == 2)
                h4++;
            else if (types[k][0] == 4 && types[k][1] != 2)
                s4++;
            else if (types[k][0] == 3 && types[k][1] == 2)
                h3++;
            else if (types[k][0] == 3 && types[k][1] != 2)
                s3++;
            else if (types[k][0] == 2 && types[k][1] == 2)
                h2++;
            else if (types[k][0] == 2 && types[k][1] != 2)
                s2++;
            else
                ;
        }
        // 是否属于棋型1
        if (c5 != 0)
            return 1; // 成5
        if (h4 != 0 || s4 >= 2 || s4 != 0 && h3 != 0)
            return 2; // 成活4或者是双死4或者是死4活3
        if (h3 >= 2)
            return 3; // 成双活3
        if (s3 != 0 && h3 != 0)
            return 4; // 成死3活3
        if (s4 != 0)
            return 5;// 成死4
        if (h3 != 0)
            return 6;// 单活3
        if (h2 >= 2)
            return 7;// 成双活2
        if (s3 != 0)
            return 8; // 成死3
        if (h2 != 0 && s2 != 0)
            return 9; // 成死2活2
        if (h2 != 0)
            return 10; // 成活2
        if (s2 != 0)
            return 11; // 成死2
        return 0;
    }

    /**
     * 对当前棋面进行打分。
     *
     * @return 当前棋面分数
     */
    protected int evaluate() {
        int rt = 0;
        for (int i = 0; i < 15; i++)
            for (int j = 0; j < 15; j++)
                if (chess[i][j] == 2) {
                    int type = getType(i, j, 1 - startbw);
                    rt += getMark(type);
                    type = getType(i, j, startbw);
                    rt -= getMark(type);
                }
        // System.out.println("rt.evaluaate: "+rt);
        return rt;
    }

    /**
     * 放下一个给定颜色的子。。。
     *
     * @param bwf 0：黑色，1：白色。。
     */
    private void putOne(int bwf) {
        int it, jt, mx = -100000000;
        it = jt = -1;
        //
        int[][] bests = getBests(bwf);
        for (int k = 0; k < bests.length; k++) {
            int i = bests[k][0];
            int j = bests[k][1];

            if (getType(i, j, bwf) == 1) {
                it = i;
                jt = j;
                break;
            }
            chess[i][j] = bwf;
            // 预测未来三步。。
            int t = findMin(-100000000, 100000000, 3);
            chess[i][j] = 2;
            // 分数相等，随机选取。
            if (t > mx || t == mx && randomTest(3 * (Math.abs(7 - i) + Math.abs(7 - j)) + 2)) {
                it = i;
                jt = j;
                mx = t;
            }
        }

        GC gc = new GC(canvas);
        // it = jt = 3;
        this.draw(gc, it * size + 10, jt * size + 10, bwf, 8);
        // 胜负已分。。。。
        if (haveWin(it, jt, bwf)) {
            wined(gc, bwf);
        }
        chess[it][jt] = bwf;
        bw = 1 - bw;
        // 更新总落子数目。。。。
        updateChess();
        // 和棋。。。没有新的落子点。。
        if (chess_num == 15 * 15) {
            win = true;
            Font font = new Font(Display.getDefault(), "Arial", 27, SWT.BOLD | SWT.ITALIC);
            gc.setFont(font);
            Color color = new Color(Display.getDefault(), 120, 242, 105);
            gc.setForeground(color);

            String str = "无落子点。和棋！！";
            gc.drawText(str, 40, 90, true);
            font.dispose();
            color.dispose();
            return;
        }
        gc.dispose();

    }

    /**
     * 搜索当前搜索状态极大值。。。
     * @param alpha 祖先节点得到的当前最小最大值，用于alpha 剪枝
     * @param beta  祖先节点得到的当前最大最小值，用于beta 剪枝。
     * @param step  还要搜索的步数
     * @return 当前搜索子树极大值
     */
    protected int findMax(int alpha, int beta, int step) {

        int mx = alpha;
        // if(true) return 0;
        if (step == 0) {
            return evaluate();
        }
        for (int i = 3; i < 11; i++)
            for (int j = 3; j < 11; j++)
                if (chess[i][j] == 2) {
                    if (getType(i, j, 1 - startbw) == 1)
                        return 100 * getMark(1);
                    chess[i][j] = 1 - startbw;
                    // System.out.println("error....");
                    int t = findMin(mx, beta, step - 1);
                    chess[i][j] = 2;
                    if (t > mx)
                        mx = t;
                    //beta 剪枝。。。
                    if (mx >= beta) {
                        //System.out.println(i + "," + j);
                        return mx;
                    }
                }
        return mx;
    }
    /**
     * 搜索当前搜索状态极大值。。。
     * @param alpha 祖先节点得到的当前最小最大值，用于alpha 剪枝
     * @param beta  祖先节点得到的当前最大最小值，用于beta 剪枝。
     * @param step  还要搜索的步数
     * @return 当前搜索子树极小值。
     */
    protected int findMin(int alpha, int beta, int step) {

        // System.out.println(alpha + ".." + beta + ".." + step);
        int mn = beta;
        if (step == 0) {
            return evaluate();
        }
        int[][] rt = getBests(startbw);
        for (int i = 0; i < rt.length; i++) {
            int ii = rt[i][0];
            int jj = rt[i][1];
            if (getType(ii, jj, startbw) == 1)
                return -100 * getMark(1);
            chess[ii][jj] = startbw;
            int t = findMax(alpha, mn, step - 1);
            chess[ii][jj] = 2;
            // System.out.println(ii + ":" + jj + ".. ij-->");
            if (t < mn)
                mn = t;
            //alpha 剪枝。。。
            if (mn <= alpha) {
                // System.out.println("i:"+ii+" j:"+jj+"-->");
                return mn;
            }
        }
        return mn;
    }

    /**
     * 选取局部最优的几个落子点作为下一次扩展的节点。。
     * @param bwf 棋色， 0：黑棋， 1：白棋。。。
     * @return 选出来的节点坐标。。
     */
    private int[][] getBests(int bwf) {

        int[][] rt = new int[255][3];
        int n = 0;
        for (int i = 0; i < 15; i++)
            for (int j = 0; j < 15; j++)
                if (chess[i][j] == 2) {
                    rt[n][0] = i;
                    rt[n][1] = j;
                    rt[n][2] = getMark(getType(i, j, bwf)) + getMark(getType(i, j, 1 - bwf));
                    n++;
                }
        //对二维数组排序。。
        Arrays.sort(rt, new ArrComparator());
        // for(int i=0; i<n; i++)
        // System.out.println(rt[i][0]+" : "+rt[i][1]+" : "+rt[i][2]);
        int size = 4 > n? n:4;
        int[][] bests = new int[size][3];
        System.arraycopy(rt, 0, bests, 0, size);
        return bests;
    }
}

/**
 * 排序 Comparator
 *
 * @author baoku
 * @version 1.0
 */
class ArrComparator implements Comparator {
    int column = 2;

    int sortOrder = -1; // 默认递减序。。

    public ArrComparator() {
    }

    public ArrComparator(int cl) {
        column = cl;
    }

    public int compare(Object a, Object b) {
        if (a instanceof int[]) {
            return sortOrder * (((int[]) a)[column] - ((int[]) b)[column]);
        }
        throw new IllegalArgumentException("param a,b must int[].");
    }
}
