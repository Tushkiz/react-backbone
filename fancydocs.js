registerProject({"title":"react-backbone","summary":"Connect [Backbone](#link/http%3A%2F%2Fbackbonejs.org%2F) to [React](#link/http%3A%2F%2Ffacebook.github.io%2Freact%2F) using a suite of focused mixins.\n\nReact mixins have the ability to add very tight integration between Backbone.Views with React components.\n\nMost other projects of this nature just provide a single mixin which caused the React component to refresh if the associated model or collection has changed.  This project goes *much* further by isolating many different functions into unique plugins giving the developer the ability to include only the appropriate behaviors to their components.\n\nA set of low level input components which are model-aware are included as well.  These components allow you so simply supply a ```ref``` and ```model``` property to show the correct value.\n\nThis project uses [jhudson8/react-mixin-manager](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-mixin-manager) so mixins are referenced their string alias, for example:\n\n```\nReact.createClass({\n  // force update if the model/collection changes\n  mixins: ['modelChangeAware']\n});\n```\n\n[View the fancydocs](#link/http%3A%2F%2Fjhudson8.github.io%2Ffancydocs%2Findex.html%23project%2Fjhudson8%2Freact-backbone) or checkout [backbone-reaction](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-reaction), a project containing *react-backbone* and several other React and Backbone enhancements.","api":{"Input Components":{"methods":{},"description":"Low level backbone model-aware input components are provided.  These will\n\n* set the appropriate value if the model and (ref or key) property are defined\n* work with modelPopulate mixin to populate the attributes with the correct UI value\n\nThis simple example shows how to use these components to get and set the model appropriately\n\n```\n    var Text = Backbone.input.Text;\n    var TextArea = Backbone.input.TextArea;\n    var Select = Backbone.input.Select;\n    var CheckBox = Backbone.input.CheckBox;\n    var RadioGroup = Backbone.input.RadioGroup;\n\n    module.exports = React.createClass({\n      mixins: ['modelPopulate'],\n\n      getDefaultProps: function() {\n        var model = new Backbone.Model({\n          isBoy: true,\n          firstName: 'John',\n          lastName: 'Doe',\n          hairColor: 'blonde',\n          eyeColor: 'brown'\n        });\n        return {\n          model: model\n        };\n      },\n\n      render: function() {\n\n        // the \"getModel\" method exists because the \"modelPopulate\" depends on the \"modelAware\" mixin which contains this method\n        var model = this.getModel();\n\n        return (\n          <form onSubmit={this.onSubmit}>\n            Name:\n            <Text ref=\"name\" model={model}/>\n            <br/>\n\n            Summary:\n            <TextArea ref=\"summary\" model={model}/>\n            <br/>\n\n            Accept Terms and Conditions?:\n            <CheckBox ref=\"acceptTOC\" model={model}/>\n            <br/>\n\n            Hair Color:\n            <Select ref=\"hairColor\" model={model}>\n              <option value=\"black\">black</option>\n              <option value=\"blonde\">blonde</option>\n              <option value=\"brown\">brown</option>\n            </Select>\n            <br/>\n\n            Eye Color:\n            <RadioGroup ref=\"eyeColor\" model={model}>\n              <input type=\"radio\" name=\"eyeColor\" value=\"blue\"/> blue\n              <input type=\"radio\" name=\"eyeColor\" value=\"brown\"/> brown\n              <input type=\"radio\" name=\"eyeColor\" value=\"green\"/> green\n            </RadioGroup>\n            <br/>\n\n            <button>Submit</button>\n          </form>\n        );\n      },\n\n      onSubmit: function(event) {\n        event.preventDefault();\n        var model = this.getModel();\n\n        // the \"modelPopulate\" method exists because we included the \"modelPopulate\" mixin\n        this.modelPopulate(function(model) {\n          // if this callback fires, all inputs (identified with a ref) set the appropriate values on the model,\n          // and the model validation passed\n          console.log(model);\n        });\n      }\n    });\n```\n\n*note: these components can still be set (will override model values) just like their wrapped components (```value``` and ```defaultValue```) and all other properties will be pushed through as well```","packages":{"Backbone.input":{"overview":"","methods":{"Text":{"profiles":[],"params":{},"summary":"A model-aware component that is a very light wrapper around *React.DOM.input*.  The *type* attribute is *text* by default but will be overridden if the *type* property is defined.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.","dependsOn":[],"overview":"Nested content is N/A.\n\n```\n    var Text = Backbone.input.Text;\n    ...\n    // assuming a model attribute \"age\" exists\n    <Text type=\"number\" ref=\"age\" model={model}/>\n```"},"TextArea":{"profiles":[],"params":{},"summary":"A model-aware component that is a very light wrapper around *React.DOM.textarea*.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.","dependsOn":[],"overview":"```\n    var TextArea = Backbone.input.TextArea;\n    ...\n    // assuming a model attribute \"description\" exists\n    <TextArea type=\"number\" ref=\"description\" model={model}/>\n```"},"CheckBox":{"profiles":[],"params":{},"summary":"A model-aware component that is a very light wrapper around *React.DOM.input* (type=checkbox).  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.  The *value* property is not required (true/false) will be used but if the *value* property is specified, that value will be set on the model in the checked case.","dependsOn":[],"overview":"```\n    var CheckBox = Backbone.input.CheckBox;\n    ...\n    // assuming a model attribute \"acceptTermsOfService\" exists\n    <CheckBox ref=\"acceptTermsOfService\" model={model}/>\n```"},"Select":{"profiles":[],"params":{},"summary":"A model-aware component that is a very light wrapper around *React.DOM.select*.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.","dependsOn":[],"overview":"```\n    var Select = Backbone.input.Select;\n    ...\n    // assuming a model attribute \"eyeColor\" exists\n    <Select ref=\"eyeColor\" model={model}>\n      <option value=\"blue\">blue</option>\n      <option value=\"green\">green</option>\n      <option value=\"brown\">brown</option>\n    </Select>\n```"},"RadioGroup":{"profiles":[],"params":{},"summary":"A model-aware component that should contain one or *React.DOM.input* (type=radio).  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.","dependsOn":[],"overview":"*note: this component does not create the radio buttons for you - it is only a wrapper for nested content provided by you to expose the functions necessary for getting and setting model values.*\n\n```\n    var RadioGroup = Backbone.input.RadioGroup;\n    ...\n    // assuming a model attribute \"eyeColor\" exists\n    <RadioGroup ref=\"eyeColor\" model={model}>\n      <input type=\"radio\" value=\"blue\"/> blue\n      <input type=\"radio\" value=\"green\"> green\n      <input type=\"radio\" value=\"brown\"> brown\n    </RadioGroup>\n```"}}}}},"Mixins":{"methods":{},"description":"These mixins can be referenced by their alias (see mixin examples) because they are registered using [jhudson8/react-mixin-manager](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-mixin-manager).","packages":{"modelAware":{"overview":"Utility methods which allows other mixins to depend on ```getModel``` and ```setModel``` methods.  This provides an single overridable mixin should you have non-standard model population requirements.","methods":{"getModel":{"profiles":[""],"params":{},"summary":"The model can be set using the ```model``` or ```collection``` property or by explicitely calling ```setModel```.","dependsOn":[],"overview":"```\n    React.createClass({\n      mixins: ['modelAware']\n    });\n    ...\n    <MyClass ref=\"myClass\" model={model} key=\"foo\"/>\n    ...\n    var model = this.refs.myClass.getModel();\n```","returns":"the model associated with the current React component."},"setModel":{"profiles":["model"],"params":{"model":"the Backbone model to set"},"summary":"Associate the model with the current React component which can be retrieved using ```getModel```","dependsOn":[],"overview":""}}},"modelValueAware":{"overview":"*depends on modelAware*\n\nUtility methods to get and set the model value for a specific attribute key.  This can be used by input components for example so the model attribute key can be abstracted away.\n\nThe ```key``` or ```ref``` attribute are used to specify the model key.  In addition, the component using this mixin can supply the key (see examples).\n\n\n*allow the parent to set the \"key\" or \"ref\" model key attribute using the *key* or *ref* property\n```\n    var MyComponent = React.createClass({\n      mixins: ['modelValueAware']\n    });\n    ...\n    new MyComponent({ref: 'foo'});\n\n```\n\n*allow the component to provide the model key attribute*\n```\n    var MyComponent = React.createClass({\n      mixins: ['modelValueAware(\"foo\")']\n    });\n```","methods":{"getModelValue":{"profiles":[""],"params":{},"summary":"","dependsOn":[],"overview":"","returns":"the value from the model bound to the current React component (see ```modelAware```) using the appropriate attribute key (see ```modelValueAware```)."},"setModelValue":{"profiles":["value"],"params":{"value":"the model value to set"},"summary":"Set the value on the model bound to the current React component (see ```modelAware```) using the appropriate attribute key (see ```modelValueAware```).","dependsOn":[],"overview":"","returns":"true if the model was set successfully and false otherwise"}}},"modelPopulate":{"overview":"*depends on modelAware*\n\nUtility mixin used to iterate child components and have their associated model value be set on the parent component model.","methods":{"modelPopulate":{"profiles":["componentArray[, callback, options]","callback[, options]"],"params":{"componentArray":"the array of components to iterate.  If falsy, all child components that contain a ```ref``` attribute will be used","callback":"the callback that will be executed ***only if*** the model passed validation when the attributes were set.  If provided, the model will be set automatically.","options":"the model set options (Backbone.Model.set options parameter)"},"summary":"Iterate child (or provided) components and have each component set it's ***UI*** input value on the model attributes.\nComponents will only participate in model population if they implement ***getUIModelValue*** to return the value that should be set on the model.","dependsOn":[],"overview":"The difference between ***getModelValue*** and ***getUIModelValue*** is\n\n* ***getModelValue*** is an abstraction so a component can get it's own model value without knowning how it is retrieved\n* ***getUIModelValue*** is a method used by external components to see what value has been set in the UI exposed by the component\n\n```\n    React.create.Class({\n      mixins: ['modelPopulate'],\n      render: function() {\n        // return a form with react-backbone input fields\n      },\n      onFormSubmit: function() {\n        // use this.refs automatically to get the components that will populate the model\n        this.modelPopulate(function(model) {\n          // assuming the model validation passed, this callback will be executed\n        });\n\n        // or for more control\n        var attributes = this.modelPopulate();\n\n        // or for even more control\n        var attributes = this.modelPopulate(specificComponentsToCheck);\n      }\n    });\n```","returns":"the attribute values"}}},"listenTo":{"overview":"Utility mixin to expose managed Backbone.Events binding functions which are cleaned up when the component is unmounted.\nThis is similar to the \"modelEventAware\" mixin but is not model specific.\n\n```\n    var MyClass React.createClass({\n      mixins: ['listenTo'],\n      getInitialState: function() {\n        this.listenTo(this.props.someObject, 'change', this.onChange);\n        return null;\n      },\n      onChange: function() { ... }\n    });\n```","methods":{"listenTo":{"profiles":["target, eventName, callback[, context]"],"params":{"target":"the source object to bind to","eventName":"the event name","callback":"the event callback function","context":"the callback context"},"summary":"Equivalent to Backbone.Events.on but will be unbound when the component is unmounted.","dependsOn":[],"overview":""},"stopListening":{"profiles":["eventName, callback[, context]"],"params":{"target":"the source object to bind to","eventName":"the event name","callback":"the event callback function","context":"the callback context"},"summary":"Equivalent to Backbone.Events.off for events registered using this mixin.","dependsOn":[],"overview":""}}},"modelEventAware":{"overview":"*depends on modelAware*\n\nUtility mixin to expose managed model binding functions which are cleaned up when the component is unmounted.\n\nThis is similar to the \"listenTo\" mixin but will auto rebind if the model is changed by updating the props.\n\nThis can also be achieved using declarative events with [jhudson8/react-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-events)\n\n```\n    var MyClass React.createClass({\n      mixins: ['modelEventAware'],\n      getInitialState: function() {\n        this.modelOn('change', this.onChange);\n        return null;\n      },\n      onChange: function() { ... }\n    });\n```","methods":{"modelOn":{"profiles":["eventName, callback[, context]"],"params":{"eventName":"the event name","callback":"the event callback function","context":"the callback context"},"summary":"Equivalent to Backbone.Events.on but will be unbound when the component is unmounted.","dependsOn":[],"overview":""},"modelOnce":{"profiles":["eventName, callback[, context]"],"params":{"eventName":"the event name","callback":"the event callback function","context":"the callback context"},"summary":"Equivalent to Backbone.Events.once but will be unbound when the component is unmounted.","dependsOn":[],"overview":""},"modelOff":{"profiles":["eventName, callback[, context]"],"params":{"eventName":"the event name","callback":"the event callback function","context":"the callback context"},"summary":"Equivalent to Backbone.Events.off for events registered using this mixin.","dependsOn":[],"overview":""}}},"modelIndexErrors":{"overview":"Utility mixin to allow components to handle model validation error responses (used by the ```modelValidator``` mixin)","methods":{"modelIndexErrors":{"profiles":["errors"],"params":{"errors":"errors returned from the Backbone.Model.set ```invalid``` event"},"summary":"The expected input of the error object is ```[{field1Key: message}, {field2Key: message}, ...]```.","dependsOn":[],"overview":"This mixin only exists to override core functionality if the error structure returned by the Backbone.Model validate method is non-standard.","returns":"errors in the format of ```{ field1Key: errorMessage, field2Key: errorMessage, ... }```"}}},"modelValidator":{"overview":"*depends on modelAware*","methods":{"modelValidate":{"profiles":["attributes, options"],"params":{"attributes":"the model attributes","options":"the set options"},"summary":"Call the associated model's validate method","dependsOn":[],"overview":"","returns":"the response from the model's validate method"}}},"modelInvalidAware":{"overview":"*depends on modelEventAware, modelIndexErrors*\n\nAllow components to be aware of field specific validation errors.\n\nListen for attribute specific model ```invalid``` events.  When these occur, normalize the error payload using the ```modelIndexErrors``` method from the ```modelIndexErrors``` mixin and set the components ```error``` state attribute with the normalized error value.\n\n\n```\n    var MyClass React.createClass({\n      mixins: ['modelInvalidAware'],\n      render: function() {\n        var error = this.state.error;\n        if (error) {\n          return 'Error: ' + error;\n        } else {\n          return 'No error';\n        }\n      }\n    });\n```","methods":{}},"modelChangeAware":{"overview":"*depends on modelEventAware*\n\nWill force a render if the associated model has changed.  The \"change\" events are for models or collections and include\n\n* change\n* reset\n* add\n* remove\n* sort\n\nIf you want to force a render only on specific model events, see *modelUpdateOn*.","methods":{}},"modelUpdateOn":{"overview":"*depends on modelEventAware*\n\nListen to a specific event (or array of events).  When this event is fired, the component will be force updated.  The events to listen for are defined as the ```updateOn``` component property which can be an array or array of strings.  In addition, the declaring component can define the keys using parameters (see examples);\n\n*when a parent component provides the event name(s) as the ```updateOn``` parameter*\n```\n    var MyComponent = React.createClass({\n      mixins: ['modelUpdateOn'],\n      ...\n    });\n    ...\n    new MyComponent({updateOn: 'foo'});\n    // or\n    new MyComponent({updateOn: ['foo', 'bar']});\n```\n\n* when the child/declaring component provides the event name(s) as mixin parameters*\n```\n    var MyComponent = React.createClass({\n      mixins: ['modelUpdateOn(\"foo\", \"bar\")'],\n      ...\n    });\n```","methods":{}},"modelLoadOn":{"overview":"*depends on [jhudson8/backbone-xhr-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-xhr-events)*\n\nGives any comonent the ability to listen to a specific async event(s).\n\nSee the docs in [jhudson8/backbone-xhr-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-xhr-events) for more details on the async events.\n\nWhen this event is fired, the state attribute ```loading``` will be set to ```true```.  state.loading will be set to false when the async event is complete.\n\nUse the ```loadOn``` property to define the specific async event name to bind to.  In addition, the declaring component can define the event names using parameters (see examples).\n\n*when a parent component provides the event names as the ```modelLoadOn``` parameter*\n```\n    var MyComponent = React.createClass({\n      mixins: ['modelLoadOn'],\n      render: function() {\n        if (this.state.loading) {\n          ...\n        } else {\n          ...\n        }\n      }\n    });\n    ...\n    new MyComponent({loadOn: 'read'});\n    // or\n    new MyComponent({updateOn: ['read', 'update']});\n```\n\n*when a child/declaring component provides the event names as mixin parameters*\n```\n    var MyComponent = React.createClass({\n      mixins: ['modelUpdateOn(\"read\", \"update\")'],\n      ...\n    });\n```","methods":{"loadWhile":{"profiles":[") or (options"],"params":{"options":"the Backbone options"},"summary":"Set the state of the component with ```{loading: true}``` when this method is executed.  And wrap the ***success*** and ***error*** callbacks so that when ano one of them are called, the loading state will be set to false again.","dependsOn":[],"overview":"```\n    this.getModel().save(attributes, this.loadWhile());\n    // or\n    this.getModel().save(attributes, this.loadWhile({\n      success: ...,\n      error: ...,\n      ...\n    }));\n```","returns":"the options or a new options object if none was provided"}}},"modelXHRAware":{"overview":"*depends on [jhudson8/backbone-xhr-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-xhr-events)*\n\nGives any comonent the ability to listen to ***all*** async events.\n\nSee the docs in [jhudson8/backbone-xhr-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-xhr-events) for more details on the async events.\n\nWhen ***any*** XHR event is fired, the state attribute ```loading``` will be set to a truthy value.  state.loading will be set to a falsy value when the XHR activity is complete.\n\n```\n    React.createClass({\n      mixins: ['modelAsyncAware'],\n      render: function() {\n        if (this.state.loading) {\n          // return something if we are loading\n        } else {\n          // return something if we are not loading\n        }\n      }\n    });\n```","methods":{}}}}},"sections":[{"body":"* Browser: include *react-backbone[.min].js* after the listed dependencies\n* CommonJS: ```require('react-backbone')(require('react'), require('backbone'));```","title":"Installation","sections":[]},{"body":"In addition to providing mixins which give Backbone awareness to React components, declaritive model events are made available similar to the ```events``` hash in Backbone.View.\n\nModel events can be defined using the ```model:``` prefix.\n\nFor example, by including the ```events``` mixin, you can do this:\n\n```\n    React.createClass({\n      mixins: ['events'],\n      events: {\n        'model:some-event': 'onSomeEvent',\n        // will bind to a specific model set as \"foo\" on this.props or this.refs\n        'model[foo]:some-event': 'onFooSomeEvent'\n      },\n      ...\n    });\n```\nIn addition, Backbone.Events methods can be used on your component so your component allowing it to trigger events.\n\nThis requires [react-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-events) to be included.","title":"Declaritive Model Event","sections":[]},{"body":"The following event callback wrappers are implemented (see [react-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-events)  for more details)\n\n* memoize\n* delay\n* defer\n* throttle\n* debounce\n* once\n\nFor example\n```\n    events: {\n      '*throttle(300):window:resize': 'forceUpdate'\n    }\n```","title":"Event Callback Wrappers","sections":[]}]});
