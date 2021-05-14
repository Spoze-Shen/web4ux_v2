/**
 * DragAndDrop.js
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
		EventType: {
			type: "String",
			defaultsTo: ""
		},
		ClickNoneFile: {
			type: "Boolean"
		},
		DragPoint: {
			type: "Json",
			defaultsTo: {}
		},
		DropPoint: {
			type: "Json",
			defaultsTo: {}
		},
		Duration: {
			type: "Integer",
			defaultsTo: 0
		},
		TotalDuration: {
			type: "Integer",
			defaultsTo: 0
		},
		EndTime: {
			type: "String",
			defaultsTo: ""
		},
		FailClick: {
			type: "Json",
			defaultsTo: {}
		},
		FileIndex: {
			type: "String",
			defaultsTo: ""
		},
		Round: {
			type: "Integer",
			defaultsTo: 0
		},
		Side: {
			type: "String",
			defaultsTo: ""
		},
		StartTime: {
			type: "String",
			defaultsTo: ""
		},
		Success: {
			type: "Boolean"
		},
		Counter: {
			type: "Integer",
			defaultsTo: 1
		},
		Alive: {
			type: "Boolean",
			defaultsTo: true
		}
	}
};
