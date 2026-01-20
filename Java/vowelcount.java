public class vowelcount {
    public static void main(String[] args) {

        String input = "Here is my java program";
        int count = 0;

        input = input.toLowerCase(); 

        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);

            if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                count++;
            }
        }

        System.out.println("Number of vowels: " + count);
    }
}
