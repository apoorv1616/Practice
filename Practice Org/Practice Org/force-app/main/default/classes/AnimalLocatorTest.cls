@isTest
public class AnimalLocatorTest{
    static testmethod void AnimalLocatorMock() {
        Test.setMock(HttpCalloutMock.class, new AnimalLocatorMock());
        AnimalLocator.getAnimalNameById(1);
    }
}