/**
 * Subject.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		Name: {
			type: "String",
			defaultsTo: ""
		},
		Project: {
			model: "Project"
		},
		ProjectDevice: {
			model: "ProjectDevice"
		},
		ExperimentData: {
			type: "Json"
		},
	}
};
