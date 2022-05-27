trigger AccountAddressTrigger on Account (before insert , before update) {
    AccountHandler.insertAccount(Trigger.new , Trigger.oldMap);
    
}