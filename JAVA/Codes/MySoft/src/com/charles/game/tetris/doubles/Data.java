/*
 * Created on 2006-5-3
 *
 * TODO To change the template for this generated file go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
package com.charles.game.tetris.doubles;

import java.io.Serializable;

/**
 * @author Administrator
 *
 * TODO To change the template for this generated type comment go to
 * Window - Preferences - Java - Code Style - Code Templates
 */
public class Data implements Serializable{

    /**
     * 
     */
    private int[][] a;
    private int fail;
    private int numLose = 0; 
    public Data (int[][] b ,int fail,int numLose) {
        
         a = new int[b.length][b[0].length];
        for(int i = 0;i<b.length;i++) {
            for(int j = 0;j<b[i].length;j++){
                a[i][j] = b[i][j];
            }
        }        
        this.fail = fail;
        this.numLose = numLose;
    }

    /**
     * @return Returns the a.
     */
    public int[][] getA () {
        return a;
    }
    /**
     * @param a The a to set.
     */
    public void setA (int[][] a) {
        this.a = a;
    }

	public int getFail() {
		return fail;
	}

	public void setFail(int fail) {
		this.fail = fail;
	}

	public int getNumLose() {
		return numLose;
	}

	public void setNumLose(int numLose) {
		this.numLose = numLose;
	}
	
	
	
    
}
