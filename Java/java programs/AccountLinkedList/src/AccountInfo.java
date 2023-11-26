import java.util.*;



public class AccountInfo {

	public static List<Account> create() {
		Scanner sc=new Scanner(System.in);
		String S;
		List<Account> list=new LinkedList<Account>();
		do {
			System.out.println("Enter account details");

			list.add(new Account(sc.nextInt(),sc.next(),sc.nextDouble()));
			System.out.println("do you want to continue press yes/no");
			S=sc.next();
		}while(S.equalsIgnoreCase("yes"));
		return list;
	}
	public static void display(List<Account> list) {
		for(Account a:list) {
			System.out.println(a.getAccountNo()+"\t"+a.getName()+"\t"+a.getBalance());
		}
	}
	public static void insert(List<Account> list) {
		Scanner sc=new Scanner(System.in);
		String g;
		do {
			System.out.println("enter the account no that you want to update ...");

			list.add(sc.nextInt(),new Account(sc.nextInt(),sc.next(),sc.nextDouble()));
			System.out.println("do you want to continue press yes");
			g=sc.next();

		}while(g.equalsIgnoreCase("yes"));
		display(list);

	}
	public static Account Search(List<Account> list) {
		Scanner sc=new Scanner(System.in);
		System.out.println("enter the account number ");
		int search=sc.nextInt();
		Account temp=null;
		for(Account a:list) {
			if(a.getAccountNo()==search) {
				temp= a;
				System.out.println("Account already exist");


			}

		}
		return temp;	
	}
	public static void Tranctiotion(List<Account> list) {
		Scanner sc=new Scanner(System.in);

		System.out.println("enter the account number ");
		int search=sc.nextInt();
		Account temp=null;
		for(Account a:list) {
			if(a.getAccountNo()==search) {
				temp= a;
				System.out.println("account found...");
				break;
			}
		}
		System.out.println("1-deposite\n2-withdraw");
		int op=sc.nextInt();

		switch(op) {
		case 1:
			System.out.println("enter the amount that you want to Deposte");
			int dmpt=sc.nextInt();
			temp.setBalance(temp.getBalance()+dmpt);
			display(list);
			break;
		case 2:
			System.out.println("enter the amount that you want to withdraw ");
			int withd=sc.nextInt();
			if(temp.getBalance()>withd) {
				temp.setBalance(temp.getBalance()- withd);

			}

			display(list);
			break;


		}

	}
	public static void Delete(List<Account> list) {
		Scanner sc=new Scanner(System.in);

		System.out.println("enter the account no of account that you want to delete");
		int delete=sc.nextInt();
		for(Account a:list) {
			if(delete==a.getAccountNo()) {
				int index=list.indexOf(a);
				list.remove(index);
				break;
			}

		}
		display(list);


	}




}

