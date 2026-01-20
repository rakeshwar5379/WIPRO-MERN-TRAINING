public class wordcount {
    public static void main(String[] args) {

        String input = "Here is my java program";

        String[] words = input.split("\\s+");

        System.out.println("Total words: " + words.length);
    }
}
