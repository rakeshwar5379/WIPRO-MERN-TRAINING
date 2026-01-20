import java.util.Scanner;
class LoanAccount {
    private double loanAmount;   
    public LoanAccount(double loan) {
        loanAmount = loan;
    }

    public double calculateEMI() {
        return loanAmount / 12;
    }

    public void payEMI(String mode) {
        System.out.println("EMI paid using " + mode);
    }
}

 class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        LoanAccount loan = new LoanAccount(12000);
        double emi = loan.calculateEMI();

        System.out.println("Monthly EMI: " + emi);

        System.out.print("Enter payment mode (Cash/Card): ");
        String mode = sc.next();

        loan.payEMI(mode);
    }
}
