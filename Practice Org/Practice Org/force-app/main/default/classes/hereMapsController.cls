public class hereMapsController {
	public static final String apiKey = 'Ijz8AISBakntfsz6jaY3_lrNIfSPNDJtYmAJFso2Hhk';
    @AuraEnabled  
    public static List<locationWrapper> getLocations() {
        List<Object> sections ;
        List<locationWrapper> returnResponse = new List<locationWrapper>();
        Map<String, Object> tokenResponse = new  Map<String, Object>();
        HttpRequest req = new HttpRequest();
        String baseUrl = URL.getSalesforceBaseUrl().toExternalForm();
        System.debug('baseUrl >>>'+baseUrl);
        String endPointURL = 'https://router.hereapi.com/v8/routes?';
        endPointURL += 'origin=44.4759,73.2121&destination=43.1637,73.0723&via=43.6242,72.5185';
        endPointURL += '&transportMode=truck&truck[grossWeight]=4000&departureTime=2020-10-28T00:01:00+01:00';
        endPointURL += '&apiKey='+apiKey;
        req.setEndpoint(endPointURL);
        req.setMethod('GET');
        //req.setHeader('Authorization', 'Bearer token');
        
        System.debug('UserInfo.getSessionId() >>>'+UserInfo.getSessionId());
        Http http = new Http();
        HttpResponse response = http.send(req);
        if( response.getStatusCode() == 200 ) {
            System.debug('JSON.deserializeUntyped(response.getBody() >>>'+JSON.deserializeUntyped(response.getBody()));
            //  tokenResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            /*  JSONParser parser =  JSON.createParser(JSON.serialize(JSON.deserializeUntyped(response.getBody())));

while (parser.nextToken() != null) {
System.debug('Current token: ' +
parser.getCurrentToken()+'name >>>'+
parser.getCurrentName());
}*/
            tokenResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            List<Object> res = (List<Object>)tokenResponse.get('routes');
            Map<String,Object> routeMap = (Map<String,Object>) res[0];
            sections = (List<Object>) routeMap.get('sections');
            System.debug('sections length >>>'+sections.size());
            List<Map<String,Object>> allSectionMap = new List<Map<String,Object>>();
            for(Integer i = 0; i< sections.size() ; i++){
                Map<String,Object> sectionMap = (Map<String,Object>)sections[i];
                allSectionMap.add(sectionMap);
                System.debug('sectionMap >> '+sectionMap);
                Map<String,Object> departureMap = (Map<String,Object>)sectionMap.get('departure');
                Map<String,Object> placeMap =  ( Map<String,Object> ) departureMap.get('place');
                Map<String,Object> locationMap =  ( Map<String,Object> ) placeMap.get('location');
                locationWrapper locationWrap = new locationWrapper ();
                locationWrap.Latitude = String.valueOf(locationMap.get('lat'));
                locationWrap.Longitude = String.valueOf(locationMap.get('lng'));
                returnResponse.add(locationWrap);
                System.debug('departureMap >>>'+departureMap);
                if( i == sections.size()-1){
                    Map<String,Object> section2Map = (Map<String,Object>)sections[i];
                    allSectionMap.add(sectionMap);
                    System.debug('sectionMap >> '+sectionMap);
                    Map<String,Object> arrivalMap = (Map<String,Object>)sectionMap.get('arrival');
                    Map<String,Object> place2Map =  ( Map<String,Object> ) arrivalMap.get('place');
                    Map<String,Object> location2Map =  ( Map<String,Object> ) place2Map.get('location');
                    locationWrapper location2Wrap = new locationWrapper ();
                    location2Wrap.Latitude = String.valueOf(location2Map.get('lat'));
                    location2Wrap.Longitude = String.valueOf(location2Map.get('lng'));
                    returnResponse.add(location2Wrap);
                    System.debug('location2Wrap >>>'+location2Wrap);
                }
            }
           /* for(Object section : sections){
                Map<String,Object> sectionMap = (Map<String,Object>)section;
                allSectionMap.add(sectionMap);
                System.debug('sectionMap >> '+sectionMap);
                Map<String,Object> arrivalMap = (Map<String,Object>)sectionMap.get('arrival');
                Map<String,Object> placeMap =  ( Map<String,Object> ) arrivalMap.get('place');
                Map<String,Object> locationMap =  ( Map<String,Object> ) placeMap.get('location');
                locationWrapper locationWrap = new locationWrapper ();
                // System.debug('lat >>>'+(String )locationMap.get('lat'));
                locationWrap.Latitude = String.valueOf(locationMap.get('lat'));
                locationWrap.Longitude  = String.valueOf(locationMap.get('lng'));
                // returnResponse.add(locationWrap);
                System.debug('arrivalMap >>>'+arrivalMap);
            }*/
            Map<String,Object> sectionMap = (Map<String,Object>)sections[0];
            Map<String,Object> sectionMap2 = (Map<String,Object>)sections[1];
            
            System.debug('sectionMap >>'+sectionMap);
            System.debug('sectionMap2 >>'+sectionMap2);
        }
        System.debug('returnResponse >>>'+returnResponse);
        return returnResponse;
    }
    
    public class locationWrapper{
        @AuraEnabled public String Latitude {get;set;}
        @AuraEnabled public String Longitude {get;set;}
    }
}