/**
 * Typing.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		Subject:{
			model: "Subject"
		},
		Project:{
			model: "Project"
		},
		ProjectDevice:{
			model: "ProjectDevice"
		},
		EventStartTime: {
			type: "String",
			defaultsTo: ""
		},
		EventEndTime: {
			type: "String",
			defaultsTo: ""
		},
		EventStartPosition: { //事件產生的位置
			type: "Json",
			defaultsTo: {}
		},
		EventEndPosition: { //事件產生的位置
			type: "Json",
			defaultsTo: {}
		},
		StartTestTime: {
			type: "String",
			defaultsTo: ""
		},
		EndTestTime: {
			type: "String",
			defaultsTo: ""
		},
		Typing: {
			type: "Boolean"
		},
		EventType: {
			type: "String",
			defaultsTo: ""
		},
		ClickOnTollbar: {
			type: "Boolean"
		},
		TypingContent: {
			type: "String",
			defaultsTo: ""
		},
		TotalDuration: {
			type: "String",
			defaultsTo: ""
		},
		EventDuration: {
			type: "Integer",
			defaultsTo: 0
		},
		Counter: {
			type: "Integer",
			defaultsTo: 0
		},
		Alive: {
			type: "Boolean",
			defaultsTo: true
		}
	}
};
