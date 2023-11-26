import java.util.*;
import java.util.Scanner;
public class AccountMain {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		AccountInfo ainfo=new AccountInfo();
		List<Account> list=null;
		String s;
		do {
		System.out.println("1-Create\n2-Display\n3-Insert new Account\n4-Search your Account\n5-TRanction\n6-Delete");
		int option=sc.nextInt();
		switch(option) {
		
		case 1:
		list=ainfo.create();
		break;
		case 2:
		ainfo.display(list);
		break;
		case 3:
		ainfo.insert(list);
		break;
		case 4:
		ainfo.Search(list);
		break;
		case 5:
		ainfo.Tranctiotion(list);
		break;
		case 6:
		ainfo.Delete(list);
		break;
		}
		System.out.println("Do you want to continue yes/no");
		s=sc.next();

	}while(s.equalsIgnoreCase("yes"));
	

}
}

