var SetPlugin = Plugin.extend({
    _type: 'set',
    _isContainer: false,
    initPlugin: function(data) {
        this.setParam(data.param, data.value, data.scope);
    },
    setParam: function(param, value, scope) {
        if(scope && scope.toLowerCase() == 'app') {
            GlobalContext.setParam(param, value);
        } else if(scope && scope.toLowerCase() == 'stage') {
            this._stage.setParam(param, value);
        } else {
            this._theme.setParam(param, value);
        } 
    },
    getParam: function(param) {
        var value = GlobalContext.getParam(param);
        if (!value) value = this._theme.getParam(param);
        if (!value) value = this._stage.getParam(param);
        return value;
    }
});
PluginManager.registerPlugin('set', SetPlugin);