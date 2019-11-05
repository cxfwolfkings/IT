package com.angel.oop;
import java.util.Arrays;
import java.util.Random;
public class CardDemo {
	public static void main(String[] args){
		Card[] cards = new Card[54];
		int i=0;
		for(int rank=Card.THREE;rank<=Card.DEUCE;rank++){
			cards[i++] = new Card(Card.DIAMOND,rank);
			cards[i++] = new Card(Card.CLUB,rank);
			cards[i++] = new Card(Card.HEART,rank);
			cards[i++] = new Card(Card.SPADE,rank);
		}
		cards[i++] = new Card(Card.JOKER,Card.BLACK);
		cards[i++] = new Card(Card.JOKER,Card.COLOR);
		System.out.println(Arrays.toString(cards));
	    //洗牌(打乱算法) 
	    // 算法策略: 1 最后一张牌与前面某张牌交换, 洗完一张牌
	    //          2 倒数第2张牌与前面某张牌交换, 洗完2张牌
	    //          3 ...
	    // i 代表最后一张的位置, j代表前面某张的位置
	    /*Random random = new Random();
	      for(i=cards.length-1; i>0; i--){
	      int j = random.nextInt(i);
	      Card t = cards[i];
	      cards[i] = cards[j];
	      cards[j] = t; */
		cards = washCards(cards);
		System.out.println(Arrays.toString(cards));
		Player[] players = new Player[3];
		players[0] = new Player(1,"漩涡鸣人");
		players[1] = new Player(2,"蒙奇D路飞");
		players[2] = new Player(3,"黑崎一护");
		int index = 0;
		for(int n=0;n<cards.length;n++){
			players[index++%3].add(cards[n]);
		}
		System.out.println(players[0]);
		System.out.println(players[1]);
		System.out.println(players[2]);
	}
	public static Card[] washCards(Card[] cards){
		Random random = new Random();
		for(int i=0;i<cards.length;i++){
			int n = random.nextInt(cards.length-i)+i;
			Card card = cards[i];
			cards[i] = cards[n];
			cards[n] = card;
		}
		return cards;
	}
}
