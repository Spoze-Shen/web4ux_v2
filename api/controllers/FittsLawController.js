/**
 * FittsLawController
 *
 * @description :: Server-side logic for managing Fittslaws
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
Array.prototype.sortOn = function (key) {
	this.sort(function (a, b) {
		if (a[key] < b[key]) {
			return -1;
		} else if (a[key] > b[key]) {
			return 1;
		}
		return 0;
	});
}

module.exports = {
	editFailTrail: function (req, res) {
		FittsLaw.find({
			Project: req.param("pid"),
			sort: {
				"Subject": 1,
				"ProjectDevice": 1,
				"Round": 1,
				"ClickTime": 1
				//event time
			}
		}).exec(function (err, data) {
			var returnData = [];
			var result = {
				totalTrail: 0,
				failTrail: 0
			};
			for (var i = 0; i < data.length; i++) {
				if (data[i].ClickOn === 'Else') {
					for (var j = i; j < data.length; j++) {
						if (data[j].ClickOn === 'Start') {
							data[i].IsFailTrail = false;
							break;
						} else if (data[j].ClickOn === 'Target') {
							data[i].IsFailTrail = true;
							break;
						}
					}
					returnData.push(data[i]);
				} else if (data[i].ClickOn === 'Target') {
					if (data[i - 1].ClickOn === 'Else') {
						data[i].IsFailTrail = true;
						returnData.push(data[i]);
					} else if (data[i - 1].ClickOn === 'Start') {
						data[i].IsFailTrail = false;
						returnData.push(data[i]);
					}
				}

				// if(data[i].IsFailTrail && data[i].Alive){
				// 	if(data[i-1].ClickOn === 'Start'){
				// 		data[i].IsFailTrail = false;
				// 		for(var j=i; j<data.length; j++){
				// 			if(data[j].ClickOn === 'Else'){
				// 				data[j].
				// 			}
				// 			else if(data[j].ClickOn === 'Target'){
				// 				break;
				// 			}
				// 		}
				// 		returnData.push(data[i]);
				// 	}else if(data[i-1].ClickOn === 'Else'){
				// 		data[i].IsFailTrail = true;
				// 		returnData.push(data[i]);
				// 	}
				// }
			}
			for (var i = 0; i < returnData.length; i++) {
				updateFittsService.updateFitts(returnData[i]);
			}
			return res.json(returnData);
		});

	},
	testBigData: function (req, res) {
		FittsLaw.find({
			pid: req.param("pid")
		}).exec(function (err, data) {
			if (err) {
				return res.json({
					error: "System error!",
					code: err
				});
			} else {
				return res.json(data);
			}
		});
	},
	fittsLog: function (req, res) {
		FittsLaw.find({
			Project: req.param("project"),
			IsPractice: req.param("IsPractice"),
			//alive: true,
			sort: {
				"Subject": 1,
				"ProjectDevice": 1,
				"Round": 1,
				"ClickTime": 1
				//event time
			}
		}).populate("ProjectDevice").populate("Subject").exec(function (err, data) {
			if (err) {
				return res.json({
					error: "System error!",
					code: err
				});
			} else {
				return res.json(data);
			}
		});
	},
	fittsDurationSubjectsResults: function (req, res) {
		FittsLaw.find({
			Project: req.param("project"),
			IsPractice: req.param("isPractice"),
			ClickOn: "Target",
			Alive: req.param("alive")
		}).sort([{
			Subject: 'ASC'
		},
		{
			ProjectDevice: 'ASC'
		},
		]).average("Duration").groupBy("ProjectDevice", "ID", "Subject").exec(function (err, data) {
			if (err) {
				return res.json({
					error: "System error!",
					code: err
				});
			} else {
				ProjectDevice.find({
					Project: req.param("project")
				}).exec(function (err2, devices) {
					Subject.find({
						Project: req.param("project")
					}).exec(function (err3, subjects) {
						for (var i = 0; i < data.length; i++) {
							for (var j = 0; j < devices.length; j++) {
								if (data[i].ProjectDevice == devices[j].id) {
									data[i].DeviceObj = devices[j];
									break;
								}
							}
							for (var a = 0; a < subjects.length; a++) {
								if (data[i].Subject == subjects[a].id) {
									data[i].SubjectObj = subjects[a];
									break;
								}
							}
						}
						data.sortOn("ID");
						for (var i = 0; i < data.length; i++) {
							data[i].Duration = parseFloat((data[i].Duration).toFixed(1));
						};
						return res.json(data);
					});

				});

			}
		});
	},
	fittsErrorResults: function (req, res) {
		//var totalRounds = req.param("totalRounds");
		//var isFailTrail = (req.param("isFailTrail")) ? (req.param("isFailTrail")) : ([true, false]);
		FittsLaw.find({
			Project: req.param("project"),
			IsPractice: req.param("isPractice"),
			Alive: true,
			//Success: false,
			ClickOn: req.param("clickOn"),
			IsFailTrail: true,
			sort: {
				"ID": 1
			}
		}).sum("Counter").groupBy("ProjectDevice", "ID").exec(function (err, data) {
			FittsLaw.find({
				Project: req.param("project"),
				IsPractice: req.param("isPractice"),
				Alive: true,
				ClickOn: "Target",
				sort: {
					"ID": 1
				}
			}).sum("Counter").groupBy("ProjectDevice", "ID").exec(function (err2, dataSum) {
				ProjectDevice.find({
					Project: req.param("project")
				}).exec(function (err3, devices) {
					// var c =0;
					// for (var i = 0; i < data.length; i++) {
					// 	for (var j = 0; j < dataSum.length; j++) {
					// 		if(dataSum[j].ProjectDevice == data[i].ProjectDevice){
					// 			c+=1;
					// 		}
					// 	}
					// }
					// for (var i = 0; i < data.length; i++) {
					// 	data[i].ErrorResult = 0;
					// 	var tRound = 0;
					// 	for (var a = 0; a < dataSum.length; a++) {
					// 		if (dataSum[a].ID == data[i].ID) {
					// 			if(dataSum[a].ProjectDevice == data[i].ProjectDevice){
					// 				data[i].tRound = dataSum[a].Counter;
					// 				// data[i].ErrorResult = parseFloat((data[i].Counter / dataSum[a].Counter).toFixed(2));
					// 				break;
					// 			}
					// 		}
					// 	};
					// 	data[i].ErrorResult = parseFloat((data[i].Counter / tRound).toFixed(2));
					// };
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < devices.length; j++) {
							if (data[i].ProjectDevice == devices[j].id) {
								data[i].DeviceObj = devices[j];
								break;
							}
						};
					};
					data.sortOn("ID");
					return res.json({
						data: data,
						dataSum: dataSum
						//c : c
					});
				});
			});
		});
	},
	aliveRecords: function (req, res) {
		FittsLaw.update({
			Project: req.param("project"),
			ProjectDevice: req.param("d"),
			Subject: req.param("s"),
			IsPractice: req.param("isPractice")
		}, {
			Alive: (req.param("alive")) ? (req.param("alive")) : (true)
		}).exec(function (err, data) {
			if (err) {
				return res.json({
					error: "System error!",
					code: err
				});
			} else {
				return res.json({
					data: data.length
				});
			}
		});
	},

	fittsDurationResults: function (req, res) {
		var isFailTrail = (req.param("isFailTrail")) ? (req.param("isFailTrail")) : ([true, false]);
		FittsLaw.find({
			Project: req.param("project"),
			IsPractice: req.param("isPractice"),
			ClickOn: "Target",
			Alive: true,
			IsFailTrail: isFailTrail,
			sort: {
				"ID": 1
			}
		}).sum(["Counter", "Duration"]).groupBy("ProjectDevice", "ID").exec(function (err, data) {
			//.average("Duration")
			//return res.json(data);
			if (err) {
				return res.json({
					error: "System error!",
					code: err
				});
			} else {
				ProjectDevice.find({
					Project: req.param("project")
				}).exec(function (err2, devices) {
					for (var i = 0; i < data.length; i++) {
						for (var j = 0; j < devices.length; j++) {
							if (data[i].ProjectDevice == devices[j].id) {
								data[i].DeviceObj = devices[j];
								break;
							}
						}
					}
					data.sortOn("ID");
					for (var i = 0; i < data.length; i++) {
						//data[i].Duration = parseFloat((data[i].Duration).toFixed(1));
						//data[i].TotalDuration = parseFloat((data[i].Duration * data[i].Counter).toFixed(0));
						data[i].TotalDuration = data[i].Duration;
						data[i].Duration = parseFloat((data[i].TotalDuration / data[i].Counter).toFixed(1));
					};
					return res.json(data);
				});

			}
		});
	},

	updateFitts: function (req, res) {
		FittsLaw.update({}, {
			Alive: true
		}).exec(function (err, s) {
			return res.ok();
		});
	},
	record: function (req, res) {
		var record = req.allParams();
		// experiment: req.cookies.subjectAuth.experiment,
		// 	project: req.cookies.subjectAuth.project,
		// 	device: req.cookies.subjectAuth.device,
		// 	subject: req.cookies.subjectAuth.subject
		// record.Project = req.cookies.subjectAuth.project.id;
		// record.ProjectDevice = req.cookies.subjectAuth.device.id;
		// record.Subject = req.cookies.subjectAuth.subject.id;
		FittsLaw.create(record).exec(function (err, created) {
			if (err) {
				return res.json({
					error: "System error!",
					code: err
				});
			} else {
				return res.json(created);
			}
		});
	},
	detroyFittsAll: function (req, res) {
		FittsLaw.destroy({}).exec(function (err, destroyList) {
			if (err) {
				return res.json({
					error: "System error!",
					code: err
				});
			} else {
				return res.json(destroyList);
			}
		});
	}
};
