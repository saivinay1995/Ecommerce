({
    doInit : function(component, event, helper) {
        helper.helperMethod(component,event,helper);
    },

    getToggleButtonValue:function(component,event,helper){
        var checkCmp = component.find("tglbtn").get("v.checked");
        console.log(checkCmp);
        if(checkCmp == true){
            component.set('v.toggleCategory','Veg');
            helper.helperMethod(component,event,helper);
        }
        else{
            component.set('v.toggleCategory','');
            helper.helperMethod(component,event,helper);
        }
    },
    showSpinner : function(component,event,helper){
        component.set("v.toggleSpinner", true);  
    },
    hideSpinner : function(component,event,helper){
        component.set("v.toggleSpinner", false);
    },

})
