/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		Name: {
			type: "String",
			defaultsTo: "New Project"
		},
		Creator: {
			model: 'Manager'
		},
		Editor: {
			collection: "Manager",
			via: "ProjectCanEdit"
		},
		CreaterEditorOnly: {
			type: "Boolean",
			defaultsTo: false
		},
		Devices: {
			collection: "ProjectDevice",
			via: "Project"
		},
		TestUrl: {
			type: "Array",
			defaultsTo: []
		},
		TestName: {
			type: "Array",
			defaultsTo: []
		},
		FittsRound: {
			type: "Integer",
			defaultsTo: 12
		},
		FittsPracticeRound: {
			type: "Integer",
			defaultsTo: 6
		},
		FittsID: {
			type: "Array",
			defaultsTo: [3.5, 1.6, 5.7, 3.5]
		},
		FittsW: {
			type: "Array",
			defaultsTo: [4, 20, 4, 20]
		},
		FittsD: {
			type: "Array",
			defaultsTo: [40, 40, 200, 200]
		},
		Subject:{
			collection: "Subject",
			via: "Project"
		},
		// test1: {
		// 	type: "Boolean",
		// 	defaultsTo: true
		// },
		// test2: {
		// 	type: "Boolean",
		// 	defaultsTo: true
		// },
		// test3: {
		// 	type: "Boolean",
		// 	defaultsTo: true
		// },

		// total1Rounds: {
		// 	type: "Integer",
		// 	defaultsTo: 10
		// },
		// test1ID: {
		// 	type: "Array",
		// 	defaultsTo: [3.5, 1.6, 5.7, 3.5]
		// },
		// test1W: {
		// 	type: "Array",
		// 	defaultsTo: [4, 20, 4, 20]
		// },
		// test1D: {
		// 	type: "Array",
		// 	defaultsTo: [40, 40, 200, 200]
		// },
		Alive: {
			type: "Boolean",
			defaultsTo: true
		},

	},
	beforeCreate: function(obj, cb) {
		obj.FittsRound = parseInt(obj.FittsRound);
		obj.FittsPracticeRound = parseInt(obj.FittsPracticeRound);
		for (var i = 0; i < obj.FittsID.length; i++) {
			obj.FittsID[i] = parseFloat(obj.FittsID[i]);
			obj.FittsW[i] = parseFloat(obj.FittsW[i]);
			obj.FittsD[i] = parseFloat(obj.FittsD[i]);
		};
		cb();
	}
};
