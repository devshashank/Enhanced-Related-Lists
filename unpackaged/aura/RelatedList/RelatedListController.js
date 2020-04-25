({
    doInit : function(component, event, helper) {
        if(component.get("v.ObjectQuery")!='' && component.get("v.recordId")!=''){
            component.set("v.loaded",true);
            helper.fetchRelatedList(component, event, helper,component.get("v.showList"))
        }
    },
    handleUpdateEvent : function(component, event, helper) {
        component.set("v.loaded",true);
        helper.fetchRelatedList(component, event, helper,true);
        component.set("v.showList",false);
        
    },
    createRecord : function(component, event, helper) {  
        console.log('objname'+component.get("v.relatedObjName"));
        var bool = component.get("v.showList");
        component.set("v.showList",!bool);
        var createRecordEvent = $A.get("e.force:createRecord");
        if(createRecordEvent){
            createRecordEvent.setParams({
                "entityApiName": component.get("v.relatedObjName"),
                "navigationLocation" : "LOOKUP",                
                "panelOnDestroyCallback": function(event) {
                    var compEvent = component.getEvent("relatedListcmp");
                    compEvent.fire();
                }
                
            });
            createRecordEvent.fire();   
        }else{
            alert('Record Creation not allowed here');
        }        
    },
    toggle: function(component, event, helper) { 
        var bool = component.get("v.showList");
        component.set("v.showList",!bool);        
        var cmpTarget = component.find('changeIt');
        $A.util.toggleClass(cmpTarget, 'isDisabled');
    },
    
    showAllList: function(component, event, helper) { 
        var fullList = component.get("v.fullRelatedList");
        component.set("v.RelatedList",fullList);
        var cmpTarget = component.find('changeIt');
        $A.util.toggleClass(cmpTarget, 'isDisabled');
        
    }
})