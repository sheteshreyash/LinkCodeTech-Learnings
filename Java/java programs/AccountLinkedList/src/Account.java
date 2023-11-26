
	public class Account {
		private int AccountNo;
		private String Name;
		private double Balance;
		public Account(int accountNo, String name, double balance) {
			super();
			AccountNo = accountNo;
			Name = name;
			Balance = balance;
		}
		public int getAccountNo() {
			return AccountNo;
		}
		public void setAccountNo(int accountNo) {
			AccountNo = accountNo;
		}
		public String getName() {
			return Name;
		}
		public void setName(String name) {
			Name = name;
		}
		public double getBalance() {
			return Balance;
		}
		public void setBalance(double balance) {
			Balance = balance;
		}
		

	}
