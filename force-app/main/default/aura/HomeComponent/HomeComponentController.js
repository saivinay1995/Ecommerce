({
    doInit : function(component, event, helper) {
        component.get('v.RegistrationData');
        console.log(JSON.stringify(component.get('v.RegistrationData')));
    },

    handleSelect: function(component, event){
        
        var selectedMenuItemValue = event.getParam("value");
        if(selectedMenuItemValue == 'Logout'){
            var navigateEvent = $A.get("e.force:navigateToComponent");
            navigateEvent.setParams({
                componentDef: "c:LoginComponent"
            });
            navigateEvent.fire();
        }
        else if(selectedMenuItemValue == 'Registration'){
            var navigateEvent = $A.get("e.force:navigateToComponent");
            navigateEvent.setParams({
                componentDef: "c:Registration",
                componentAttributes :{ RegistrationData : component.get('v.RegistrationData'),
                                        editUserRecor : true}
            });
            navigateEvent.fire();
        }
    }
})