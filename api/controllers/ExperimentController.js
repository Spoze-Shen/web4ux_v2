/**
 * ExperimentController
 *
 * @description :: Server-side logic for managing managers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	finishAllTest: function (req, res) {
		res.clearCookie("subjectAuth");
		return res.view("client/finishAllTestPage", {
			layout: ''
		});
	},
	finishOneTest: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
			let experimentData = data.ExperimentData;
			let projectData = data.Project;
			if (experimentData.hasNextTest) {
				experimentData.thisTestIndex += 1;
				experimentData.thisTestUrl = experimentData.nextTestUrl;
				experimentData.thisTestName = experimentData.nextTestName;
				let checkNextIndex = experimentData.thisTestIndex + 1;
				if (checkNextIndex >= projectData.TestUrl.length) {
					experimentData.hasNextTest = false;
					experimentData.nextTestUrl = "";
					experimentData.nextTestName = "";
					Subject.update({
						id: subjectId	
					},{
						ExperimentData : experimentData
					}).exec(function(updated){
						return res.redirect("/experimentHome?subjectId="+subjectId);
					});
					
				} else if (checkNextIndex < projectData.TestUrl.length) {
					experimentData.hasNextTest = true;
					experimentData.nextTestUrl = projectData.TestUrl[checkNextIndex];
					experimentData.nextTestName = projectData.TestName[checkNextIndex];
					Subject.update({
						id: subjectId	
					},{
						ExperimentData : experimentData
					}).exec(function(updated){
						return res.redirect("/experimentHome?subjectId="+subjectId);
					});
				}
			}else{
				//All test finish
				return res.redirect("/finishAllTest");
			}
		});
		// if (req.cookies.subjectAuth.experiment.hasNextTest) {
		// 	req.cookies.subjectAuth.experiment.thisTestIndex += 1;
		// 	req.cookies.subjectAuth.experiment.thisTestUrl = req.cookies.subjectAuth.experiment.nextTestUrl;
		// 	req.cookies.subjectAuth.experiment.thisTestName = req.cookies.subjectAuth.experiment.nextTestName;
		// 	if (req.cookies.subjectAuth.experiment.thisTestIndex + 1 >= req.cookies.subjectAuth.project.TestUrl.length) {
		// 		//No next
		// 		req.cookies.subjectAuth.experiment.hasNextTest = false;
		// 		req.cookies.subjectAuth.experiment.nextTestUrl = "";
		// 		req.cookies.subjectAuth.experiment.nextTestName = "";
		// 		res.cookie("subjectAuth", req.cookies.subjectAuth);
		// 		//console.log(req.cookies.subjectAuth);
		// 		return res.redirect("/experimentHome");
		// 	} else if (req.cookies.subjectAuth.experiment.thisTestIndex + 1 < req.cookies.subjectAuth.project.TestUrl.length) {
		// 		//Has next
		// 		req.cookies.subjectAuth.experiment.hasNextTest = true;
		// 		req.cookies.subjectAuth.experiment.nextTestUrl = req.cookies.subjectAuth.project.TestUrl[req.cookies.subjectAuth.experiment.thisTestIndex + 1];
		// 		req.cookies.subjectAuth.experiment.nextTestName = req.cookies.subjectAuth.project.TestName[req.cookies.subjectAuth.experiment.thisTestIndex + 1];
		// 		res.cookie("subjectAuth", req.cookies.subjectAuth);
		// 		//console.log(req.cookies.subjectAuth);
		// 		return res.redirect("/experimentHome");
		// 	}

		// } else {
		// 	//All test finish
		// 	return res.redirect("/finishAllTest");
		// }
	},
	dragAndDropHome: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
			return res.view("client/dragAndDropHome", {
				layout: 'client/layout',
				data: {
					experiment: data.ExperimentData,
					project: data.Project,
					device: data.ProjectDevice,
					subject: data.id,
				}
			});
		});
	},
	dragAndDropTest: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
			return res.view("client/dragAndDrop", {
				layout: 'client/layout',
				data: {
					experiment: data.ExperimentData,
					project: data.Project,
					device: data.ProjectDevice,
					subject: data.id,
				}
			});
		});
	},
	typingHome: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
			return res.view("client/typingHome", {
				layout: 'client/layout',
				data: {
					experiment: data.ExperimentData,
					project: data.Project,
					device: data.ProjectDevice,
					subject: data.id,
				}
			});
		});
	},
	typingTest: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
			return res.view("client/typing", {
				layout: 'client/layout',
				data: {
					experiment: data.ExperimentData,
					project: data.Project,
					device: data.ProjectDevice,
					subject: data.id,
				}
			});
		});
	},
	fittsTest: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
			return res.view("client/fitts", {
				layout: 'client/layout',
				data: {
					experiment: data.ExperimentData,
					project: data.Project,
					device: data.ProjectDevice,
					subject: data.id,
				}
			});
		});
	},
	fittsPractice: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
		return res.view("client/fittsPractice", {
			layout: 'client/layout',
			data: {
				experiment: data.ExperimentData,
				project: data.Project,
				device: data.ProjectDevice,
				subject: data.id,
			}
		});
		});
	},
	fittsHome: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
			return res.view("client/fittsHome", {
				layout: 'client/layout',
				data: {
					experiment: data.ExperimentData,
					project: data.Project,
					device: data.ProjectDevice,
					subject: data.id,
					noPrac: (req.param("donePrac")) ? (true) : (false)
				}
			});
		});
	},
	// typingPage
	// dragAndDropPage
	experimentLogin: function (req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Devices").exec(function (err, data) {
			return res.view("client/login", {
				layout: '',
				data: {
					project: data
				}
			});
		});
	},
	experimentHome: function (req, res) {
		let subjectId = req.param('subjectId');
		Subject.findOne({
			id: subjectId
		}).populateAll().exec(function (err, data) {
			return res.view("client/home", {
				layout: 'client/layout',
				data: {
					experiment: data.ExperimentData,
					project: data.Project,
					device: data.ProjectDevice,
					subject: data.id
				}
			});
		});
	},
	// { experiment: 
	// 	{ thisTestUrl: './Test-Typing-Home',
	// 	  thisTestName: 'Typing',
	// 	  thisTestIndex: 2,
	// 	  hasNextTest: false,
	// 	  nextTestUrl: '',
	// 	  nextTestName: '' },
	//    project: 
	// 	{ Creator: '5e71a52df0f898321b730596',
	// 	  Name: 'Test for update _EMRIC',
	// 	  CreaterEditorOnly: false,
	// 	  TestUrl: 
	// 	   [ './Test-Fitts-Home',
	// 		 './Test-DragAndDrop-Home',
	// 		 './Test-Typing-Home' ],
	// 	  TestName: [ 'Winfitts', 'Drag And Drop', 'Typing' ],
	// 	  FittsW: [ 3, 15, 3, 15 ],
	// 	  FittsD: [ 150, 150, 30, 30 ],
	// 	  FittsID: [ 5.7, 3.5, 3.5, 1.6 ],
	// 	  FittsRound: 48,
	// 	  FittsPracticeRound: 0,
	// 	  Alive: true,
	// 	  createdAt: '2021-02-04T03:14:53.159Z',
	// 	  updatedAt: '2021-02-04T03:14:53.159Z',
	// 	  id: '601b66ad7de88823241727d1' },
	//    device: 
	// 	{ Project: '601b66ad7de88823241727d1',
	// 	  ModelName: 'A',
	// 	  DeviceName: 'a',
	// 	  Rang: 4.6,
	// 	  createdAt: '2021-02-04T03:14:53.173Z',
	// 	  updatedAt: '2021-02-04T03:15:43.110Z',
	// 	  id: '601b66ad7de88823241727d2' },
	//    subject: 
	// 	{ Name: '5',
	// 	  Project: '601b66ad7de88823241727d1',
	// 	  ProjectDevice: '601b66ad7de88823241727d2',
	// 	  createdAt: '2021-02-04T07:38:13.164Z',
	// 	  updatedAt: '2021-02-04T07:38:13.164Z',
	// 	  id: '601ba465323b36fc5f874f93' } }
};
