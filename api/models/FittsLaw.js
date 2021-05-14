/**
 * FittsLaw.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	attributes: {
		Subject: {
			model: "Subject"
		},
		Project: {
			model: "Project"
		},
		ProjectDevice: {
			model: "ProjectDevice"
		},
		IsPractice: {
			type: "Boolean",
			defaultsTo: false
		},
		IsFailTrail: {
			type: "Boolean",
			defaultsTo: false
		},
		ID: {
			type: "Float",
			defaultsTo: 0
		},
		ClickOn: {
			type: "String",
			defaultsTo: ""
		},
		ClickTime: {
			type: "String",
			defaultsTo: ""
		},
		Distance: {
			type: "Integer",
			defaultsTo: 0
		},
		Duration: {
			type: "Integer",
			defaultsTo: 0
		},
		Period: {
			type: "Integer",
			defaultsTo: 0
		},
		EndTime: {
			type: "String",
			defaultsTo: ""
		},
		Round: {
			type: "Integer",
			defaultsTo: 0
		},
		StartClicked: {
			type: "Boolean"
		},
		ClickPosition: {
			type: "Json",
			defaultsTo: {}
		},
		StartPointPosition: {
			type: "Json",
			defaultsTo: {}
		},
		StartTime: {
			type: "String",
			defaultsTo: ""
		},
		Success: {
			type: "Boolean"
		},
		TargetPointPosition: {
			type: "Json",
			defaultsTo: {}
		},
		TargetPointWidth: {
			type: "Integer",
			defaultsTo: 0
		},
		Alive: {
			type: "Boolean",
			defaultsTo: true
		},
		Angle: {
			type: "Integer",
			defaultsTo: 0
		},
		Counter: {
			type: "Integer",
			defaultsTo: 1
		}
	}
};
