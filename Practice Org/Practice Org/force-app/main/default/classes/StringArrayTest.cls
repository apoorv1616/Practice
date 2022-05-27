public class StringArrayTest {
    public static List<String> generateStringArray(Integer num) {
        List<String> newList = new List<String>();
        for(Integer i=0;i<num;i++) {
            newList.add('Test '+i);
        }
        return newList;
    }
}