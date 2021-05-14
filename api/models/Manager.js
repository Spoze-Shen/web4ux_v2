/**
 * Manager.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		Name: {
			type: "String",
			defaultsTo: ""
			//required: true
		},
		Email: {
			type: "String",
			defaultsTo: "",
			//required: true,
			unique: true
		},
		Pwd: {
			type: "String",
			defaultsTo: ""
			//required: true
		},
		Invited: {
			type: "Boolean",
			defaultsTo: true
		},
		Alive:{
			type: "Boolean",
			defaultsTo: true
		},
		ProjectCreated: {
			collection: "Project",
			via: "Creator"
		},
		ProjectCanEdit:{
			collection: "Project",
			via: "Editor"
		},
		IsAdmin:{
			type: "Boolean",
			defaultsTo: false
		},
		// toJSON: function() {
		// 	var obj = this.toObject();
		// 	delete obj.Pwd;
		// 	return obj;
		// }
		// Language: {
		// 	type: "String",
		// 	defaultsTo: ""
		// }
	}
};
