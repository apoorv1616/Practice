@isTest
public class TestVerifyDate {
    static testmethod void testDate() {
        VerifyDate.CheckDates(Date.today() - 29,Date.today()); 
    }
    
    static testmethod void testDate1() {
         VerifyDate.CheckDates(Date.today() - 255,Date.today());
    }
    
}