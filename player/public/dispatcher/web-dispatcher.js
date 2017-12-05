org.ekstep.contentrenderer.webDispatcher = new(org.ekstep.contentrenderer.IDispatcher.extend({
    type: "webDispatcher",
    initDispatcher: function() {},
    dispatch: function(event) {        
        event = (typeof event === "string") ? event : JSON.stringify(event);
        if ("undefined" != typeof telemetry) {
            EventBus.eventDispatcher('telemetryEvent', event);
            telemetry.send(event).then(function() {
                return event;
            }).catch(function(err) {
                if(event.uid){    // TODO Find the Unknow events from(Jquery/cordova/ionic)
                     TelemetryService.logError(instance.name, err);
                }else{
                    console.warn("uid is not Present",event);
                }
            });
        } else {
            console.log(event);
        }
    }
}));
