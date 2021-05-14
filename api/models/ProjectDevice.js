/**
 * ProjectDevice.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		Project: {
			model: "Project"
		},
		ModelName: {
			type: "String",
			defaultsTo: ""
		},
		DeviceName: {
			type: "String",
			defaultsTo: ""
		},
		Rang: {
			type: "Float",
			defaultsTo: 1
		}
	},
	beforeCreate: function(obj, cb) {
		obj.Rang = parseFloat(obj.Rang);
		cb();
	}
};
