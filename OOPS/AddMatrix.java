import java.util.*;
public class AddMatrix {
    public static void main(String[] args){
        Scanner sc=new Scanner (System.in);
        System.out.println("Enter the first array size: ");
        int size1=sc.nextInt();
        System.out.println("Enter the second array size: ");
         int size2=sc.nextInt();
         int[][] arr1=new int[size1][size2];
         int[][] arr2=new int[size1][size2];
         System.out.println("Enter the first array numbers: ");
         for(int i=0;i<size1;i++){
            for(int j=0;j<size2;j++){
                arr1[i][j]=sc.nextInt();

            }
         }
         System.out.println("Enter the second array numbers: ");
          for(int i=0;i<size1;i++){
            for(int j=0;j<size2;j++){
                arr2[i][j]=sc.nextInt();

            }
         }
         System.out.println();
        int[][] res=new int[arr1.length][arr2.length];
          for(int i=0;i<arr1.length;i++){
            for(int j=0;j<arr2.length;j++){
                res[i][j]=arr1[i][j] + arr2[i][j];
                System.out.print(res[i][j]+" ");
            }
            System.out.println();
         }
        //  System.out.println("Enter the first array size: ");
    }
}

