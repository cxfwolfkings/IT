package com.angel.oop;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Vector;
public class CardGame {
	public static void main(String[] args){
		List<Card>cards = new Vector<Card>();
		for(int card=Card.THREE;card<=Card.DEUCE;card++){
			cards.add(new Card(Card.DIAMOND,card));
			cards.add(new Card(Card.CLUB,card));
			cards.add(new Card(Card.HEART,card));
			cards.add(new Card(Card.SPADE,card));
		}
		cards.add(new Card(Card.JOKER,Card.BLACK));
		cards.add(new Card(Card.JOKER,Card.COLOR));
		System.out.println(cards);
		Card king = new Card(Card.HEART,Card.KING);
		System.out.println(cards.contains(king));
		Set<Card> set = new HashSet<Card>(cards);
		System.out.println(set);
		System.out.println(set.contains(king));
	}
}
