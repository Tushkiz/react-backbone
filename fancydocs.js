registerProject({"title":"react-backbone","summary":"Connect [React](#link/http%3A%2F%2Ffacebook.github.io%2Freact%2F) to [React](#link/http%3A%2F%2Ffacebook.github.io%2Freact%2F) using a suite of focused mixins.\n\n***Problem:*** [React](#link/http%3A%2F%2Ffacebook.github.io%2Freact%2F) components are unaware of [Backbone](#link/http%3A%2F%2Fbackbonejs.org%2F) models by default which cause some to try to embed [React](#link/http%3A%2F%2Ffacebook.github.io%2Freact%2F) components inside a Backbone.View.\n\n***Solution:*** [React](#link/http%3A%2F%2Ffacebook.github.io%2Freact%2F) components should completely replace Backbone.View.  By including some simple mixins, [React](#link/http%3A%2F%2Ffacebook.github.io%2Freact%2F) components can become model-aware and provide as much or more integration expected with a Backbone.View.","api":{"Input Components":{"methods":{},"description":"Low level backbone model aware input components are provided.  These will\n\n* set the appropriate value if the model and (ref or key) property are defined\n* work with modelPopulate mixin to populate the attributes with the correct UI value\n\nThis simple example shows how to use these components to get and set the model appropriately\n\n```\nvar Text = Backbone.input.Text;\nvar TextArea = Backbone.input.TextArea;\nvar Select = Backbone.input.Select;\nvar CheckBox = Backbone.input.CheckBox;\nvar RadioGroup = Backbone.input.RadioGroup;\n\nmodule.exports = React.createClass({\n  mixins: ['modelPopulate'],\n\n  getDefaultProps: function() {\n    var model = new Backbone.Model({\n      isBoy: true,\n      firstName: 'John',\n      lastName: 'Doe',\n      hairColor: 'blonde',\n      eyeColor: 'brown'\n    });\n    return {\n      model: model\n    };\n  },\n\n  render: function() {\n    var model = this.getModel();\n    return (\n      <form onSubmit={this.onSubmit}>\n        FirstName: <Text ref=\"firstName\" model={model}/>\n        <br/>\n        LastName: <TextArea ref=\"lastName\" model={model}/>\n        <br/>\n        Is a Boy?: <CheckBox ref=\"isBoy\" model={model}/>\n        <br/>\n        Hair Color: <Select ref=\"hairColor\" model={model}>\n                  <option value=\"black\">black</option>\n                  <option value=\"blonde\">blonde</option>\n                  <option value=\"brown\">brown</option>\n                </Select>\n        <br/>\n        Eye Color: <RadioGroup ref=\"eyeColor\" model={model}>\n                      <input type=\"radio\" name=\"eyeColor\" value=\"blue\"/> blue\n                      <input type=\"radio\" name=\"eyeColor\" value=\"brown\"/> brown\n                      <input type=\"radio\" name=\"eyeColor\" value=\"green\"/> green\n                    </RadioGroup>\n        <br/>\n        <button>Submit</button>\n      </form>\n    );\n  },\n\n  onSubmit: function(event) {\n    event.preventDefault();\n    var model = this.getModel();\n    this.modelPopulate(function(model) {\n      console.log(model);\n    });\n  }\n});\n```","packages":{"Backbone.input.Text":{"overview":"A model-aware component that is a very light wrapper around *React.DOM.input*.  The *type* attribute is *text* by default but will be overridden if the *type* property is defined.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.\n\n##### Example\n\n```\nvar Text = Backbone.input.Text;\n...\n// assuming a model attribute \"age\" exists\n<Text type=\"number\" ref=\"age\" model={model}/>\n```","methods":{}},"Backbone.input.TextArea":{"overview":"A model-aware component that is a very light wrapper around *React.DOM.textarea*.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.\n\n##### Example\n```\nvar TextArea = Backbone.input.TextArea;\n...\n// assuming a model attribute \"description\" exists\n<TextArea type=\"number\" ref=\"description\" model={model}/>\n```","methods":{}},"Backbone.input.CheckBox":{"overview":"A model-aware component that is a very light wrapper around *React.DOM.input* (type=checkbox).  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.  The *value* property is not required (true/false) will be used but if the *value* property is specified, that value will be set on the model in the checked case.\n\n##### Example\n```\nvar CheckBox = Backbone.input.CheckBox;\n...\n// assuming a model attribute \"acceptTermsOfService\" exists\n<CheckBox ref=\"acceptTermsOfService\" model={model}/>\n```","methods":{}},"Backbone.input.Select":{"overview":"A model-aware component that is a very light wrapper around *React.DOM.select*.  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.\n\n##### Example\n```\nvar Select = Backbone.input.Select;\n...\n// assuming a model attribute \"eyeColor\" exists\n<Select ref=\"eyeColor\" model={model}>\n  <option value=\"blue\">blue</option>\n  <option value=\"green\">green</option>\n  <option value=\"brown\">brown</option>\n</Select>\n```","methods":{}},"Backbone.input.RadioGroup":{"overview":"A model-aware component that should contain one or *React.DOM.input* (type=radio).  This component will initialize with the correct default value from the provided model as well as participate in the *modelPopulate* mixin.\n\n##### Example\n```\nvar RadioGroup = Backbone.input.RadioGroup;\n...\n// assuming a model attribute \"eyeColor\" exists\n<RadioGroup ref=\"eyeColor\" model={model}>\n  <input type=\"radio\" value=\"blue\"/> blue\n  <input type=\"radio\" value=\"green\"> green\n  <input type=\"radio\" value=\"brown\"> brown\n</RadioGroup>\n```","methods":{}}}},"Mixins":{"methods":{},"description":"The named mixins exists by including [react-mixin-manager](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-mixin-manager).\n\nSee [examples](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-backbone%2Fblob%2Fmaster%2Ftest%2Ftest.js%23L78)","packages":{"modelAware":{"overview":"Utility methods which allows other mixins to depend on ```getModel``` and ```setModel``` methods.  This provides an single overridable mixin should you have non-standard model population requirements.","methods":{"getModel":{"profiles":["()"],"params":{},"summary":"The model can be set using the ```model``` property or by explicitely calling ```setModel```.","dependsOn":[],"overview":"##### Examples\n\n```\nReact.createClass({\n  mixins: ['modelAware']\n});\n...\n<MyClass ref=\"myClass\" model={model} key=\"foo\"/>\n...\nvar model = this.refs.myClass.getModel();\n```","returns":"the model associated with the current React component."},"setModel":{"profiles":["model"],"params":{"model":"the Backbone model to set"},"summary":"Associate the model with the current React component which can be retrieved using ```getModel```","dependsOn":[],"overview":""}}},"modelValueAware":{"overview":"*depends on modelAware*\n\nUtility methods to get and set the model value for a specific attribute key.  This can be used by input components for example so the model attribute key can be abstracted away.\n\nThe ```key``` or ```ref``` attribute are used to specify the model key.  In addition, the component using this mixin can supply the key (see examples).\n\n##### Examples\n\n*allow the parent to set the \"key\" or \"ref\" model key attribute using the *key* or *ref* property\n```\nvar MyComponent = React.createClass({\n  mixins: ['modelValueAware']\n});\n...\nnew MyComponent({ref: 'foo'});\n\n```\n\n*allow the component to provide the model key attribute*\n```\nvar MyComponent = React.createClass({\n  mixins: ['modelValueAware(\"foo\")']\n});\n\n```","methods":{"getModelValue":{"profiles":["()"],"params":{},"summary":"","dependsOn":[],"overview":"","returns":"the value from the model bound to the current React component (see ```modelAware```) using the appropriate attribute key (see ```modelValueAware```)."},"setModelValue":{"profiles":["value"],"params":{"value":"the model value to set"},"summary":"Set the value on the model bound to the current React component (see ```modelAware```) using the appropriate attribute key (see ```modelValueAware```).","dependsOn":[],"overview":"","returns":"true if the model was set successfully and false otherwise"}}},"modelPopulate":{"overview":"*depends on modelAware*\n\nUtility mixin used to iterate child components and have their associated model value be set on the parent component model.","methods":{"modelPopulate":{"profiles":["componentArray[, callback, options]","callback[, options]"],"params":{"componentArray":"the array of components to iterate.  If falsy, all child components that contain a ```ref``` attribute will be used","callback":"the callback that will be executed ***only if*** the model passed validation when the attributes were set.  If provided, the model will be set automatically.","options":"the model set options (Backbone.Model.set options parameter)"},"summary":"Iterate child (or provided) components and have each component set it's ***UI*** input value on the model attributes.\nComponents will only participate in model population if they implement getUIModelValue to return the value that should be set on the model.","dependsOn":[],"overview":"```\n// use this.refs automatically to get the components that will populate the model\nthis.modelPopulate(function(model) {\n  // assuming the model validation passed, this callback will be executed\n});\n\n// or for more control\nvar attributes = this.modelPopulate();\n\n// or for even more control\nvar attributes = this.modelPopulate(specificComponentsToCheck);\n```","returns":"the attribute values"}}},"modelEventAware":{"overview":"*depends on modelAware*\n\nUtility mixin to expose managed model binding functions which are cleaned up when the component is unmounted.\n\n```\nvar MyClass React.createClass({\n  mixins: ['modelEventAware'],\n  getInitialState: function() {\n    this.modelOn('change', this.onChange);\n    return null;\n  },\n  onChange: function() { ... }\n});\n```","methods":{"modelOn":{"profiles":["eventName, callback[, context]"],"params":{"eventName":"the event name","callback":"the event callback function","context":"the callback context"},"summary":"Equivalent to Backbone.Events.on","dependsOn":[],"overview":""},"modelOnce":{"profiles":["eventName, callback[, context]"],"params":{"eventName":"the event name","callback":"the event callback function","context":"the callback context"},"summary":"Equivalent to Backbone.Events.once","dependsOn":[],"overview":""},"modelOff":{"profiles":["eventName, callback[, context]"],"params":{"eventName":"the event name","callback":"the event callback function","context":"the callback context"},"summary":"Equivalent to Backbone.Events.off","dependsOn":[],"overview":""}}},"modelIndexErrors":{"overview":"Utility mixin to allow components to handle model validation error responses (used by the ```modelValidator``` mixin)","methods":{"modelIndexErrors":{"profiles":["errors"],"params":{"errors":"errors returned from the Backbone.Model.set ```invalid``` event"},"summary":"The expected input of the error object is ```[{field1Key: message}, {field2Key: message}, ...]```","dependsOn":[],"overview":"","returns":"errors in the format of ```{ field1Key: errorMessage, field2Key: errorMessage, ... }```"}}},"modelValidator":{"overview":"*depends on modelAware*","methods":{"modelValidate":{"profiles":["attributes, options"],"params":{"attributes":"the model attributes","options":"the set options"},"summary":"Call the associated model's validate method","dependsOn":[],"overview":"","returns":"the response from the model's validate method"}}},"modelInvalidAware":{"overview":"*depends on modelEventAware, modelIndexErrors*\n\nAllow components to be aware of field specific validation errors.\n\nListen for attribute specific model ```invalid``` events.  When these occur, normalize the error payload using the ```modelIndexErrors``` method from the ```modelIndexErrors``` mixin and set the components ```error``` state attribute with the normalized error value.\n\n```\nvar MyClass React.createClass({\n  mixins: ['modelInvalidAware'],\n  render: function() {\n    var error = this.state.error;\n    if (error) {\n      return 'Error: ' + error;\n    } else {\n      return 'No error';\n    }\n  }\n});\n```","methods":{}},"modelChangeAware":{"overview":"*depends on modelEventAware*\n\nWill force a render if the associated model has changed.  The \"change\" events are for models or collections and include\n\n* change\n* reset\n* add\n* remove\n* sort\n\nIf you want to force a render only on specific model events, see *modelUpdateOn*.","methods":{}},"modelUpdateOn":{"overview":"*depends on modelEventAware*\n\nListen to a specific event (or array of events).  When this event is fired, the component will be force updated.  The events to listen for are defined as the ```updateOn``` component property which can be an array or array of strings.  In addition, the declaring component can define the keys using parameters (see examples);\n\n##### Examples\n\n*parent component provides the event names as the ```updateOn``` parameter*\n```\nvar MyComponent = React.createClass({\n  mixins: ['modelUpdateOn'],\n  ...\n});\n...\nnew MyComponent({updateOn: 'foo'});\n// or\nnew MyComponent({updateOn: ['foo', 'bar']});\n```\n\n*declaring component provides the event names as mixin parameters*\n```\nvar MyComponent = React.createClass({\n  mixins: ['modelUpdateOn(\"foo\", \"bar\")'],\n  ...\n});\n```","methods":{}},"modelLoadOn":{"overview":"*depends on [jhudson8/backbone-async-event](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-async-event)*\n\nGives any comonent the ability to listen to a specific async event (or array of events).\n\nSee the docs in [jhudson8/backbone-async-event](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-async-event) for more details on the async events.\n\nWhen this event is fired, the state attribute ```loading``` will be set to ```true```.  state.loading will be set to false when the async event is complete.\n\nUse the ```loadOn``` property to define the specific async event name to bind to.  In addition, the declaring component can define the event names using parameters (see examples).\n\n##### Examples\n\n*parent component provides the event names as the ```modelLoadOn``` parameter*\n```\nvar MyComponent = React.createClass({\n  mixins: ['modelLoadOn'],\n  render: function() {\n    if (this.state.loading) {\n      ...\n    } else {\n      ...\n    }\n  }\n});\n...\nnew MyComponent({loadOn: 'read'});\n// or\nnew MyComponent({updateOn: ['read', 'update']});\n```\n\n*declaring component provides the event names as mixin parameters*\n```\nvar MyComponent = React.createClass({\n  mixins: ['modelUpdateOn(\"read\", \"update\")'],\n  ...\n});\n```","methods":{}},"modelAsyncAware":{"overview":"*depends on [jhudson8/backbone-async-event](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-async-event)*\n\nGives any comonent the ability to listen to ***all*** async events.\n\nSee the docs in [jhudson8/backbone-async-event](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Fbackbone-async-event) for more details on the async events.\n\nWhen ***any*** async event is fired, the state attribute ```loading``` will be set to ```true```.  state.loading will be set to false when the async event is complete.\n\n```\nrender: function() {\n  if (this.state.loading) {\n    // return something if we are loading\n  } else {\n    // return something if we are not loading\n  }\n}\n```","methods":{}}}}},"sections":[{"body":"In addition to providing mixins which give Backbone awareness to React components, declaritive model events are made available similar to the ```events``` hash in Backbone.View.\n\nModel events can be defined using the ```model:``` prefix.\n\nFor example, by including the ```events``` mixin, you can do this:\n\n```\nReact.createClass({\n  mixins: ['events'],\n  events: {\n    'model:some-event': 'onSomeEvent',\n    // will bind to a specific model set as \"foo\" on this.props or this.refs\n    'model[foo]:some-event': 'onFooSomeEvent'\n  },\n  ...\n});\n```\nIn addition, Backbone.Events methods can be used on your component so your component allowing it to trigger events.\n\nThis requires [react-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-events) to be included.","title":"Declaritive Model Event","sections":[]},{"body":"The following event callback wrappers are implemented (see [react-events](#link/https%3A%2F%2Fgithub.com%2Fjhudson8%2Freact-events)  for more details)\n\n* memoize\n* delay\n* defer\n* throttle\n* debounce\n* once\n\nFor example\n```\nevents: {\n  '*throttle(300):window:resize': 'forceUpdate'\n}\n```","title":"Event Callback Wrappers","sections":[]}]});
