/**
 * DragAndDropController
 *
 * @description :: Server-side logic for managing Draganddrops
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	dragAndDropLog: function(req, res) {
		DragAndDrop.find({
			Project: req.param("project"),
			sort: {
				"Subject": 1,
				"ProjectDevice": 1,
				"Side": 1,
				"Round": 1
			}
		}).populate("ProjectDevice").populate("Subject").exec(function(err, data) {
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
	dragError: function(req, res) {
		if (req.param("modelOnly")) {
			DragAndDrop.find({
				Project: req.param("project"),
				Success: false,
			}).sum("Counter").groupBy("ProjectDevice").exec(function(err1, data) {
				if (err1) {
					return res.json({
						error: "System error!",
						code: err1
					});
				} else {
					return res.json(data);
				}
			});
		} else {
			DragAndDrop.find({
				Project: req.param("project"),
				Success: false,
			}).sum("counter").groupBy("ProjectDevice", "Subject").exec(function(err1, data) {
				if (err1) {
					return res.json({
						error: "System error!",
						code: err1
					});
				} else {
					return res.json(data);
				}
			});
		}

	},
	dragSpecialError: function(req, res) { //failDropMiddle, failDropOverlapping, dbClickFile
		if (req.param("modelOnly")) {
			DragAndDrop.find({
				Project: req.param("project"),
				Success: false,
				ProjectDevice: req.param("device")
			}).sum("Counter").groupBy("ProjectDevice", "EventType").exec(function(err1, data) {
				if (err1) {
					return res.json({
						error: "System error!",
						code: err1
					});
				} else {
					return res.json(data);
				}
			});
		} else {
			DragAndDrop.find({
				Project: req.param("project"),
				Success: false,
				ProjectDevice: req.param("device"),
				Subject: req.param("subject")
			}).sum("Counter").groupBy("ProjectDevice","Subject", "EventType").exec(function(err1, data) {
				if (err1) {
					return res.json({
						error: "System error!",
						code: err1
					});
				} else {
					return res.json(data);
				}
			});
		}

	},
	record: function(req, res) {
		var record = req.allParams();
		// record.Project = req.cookies.subjectAuth.project.id;
		// record.ProjectDevice = req.cookies.subjectAuth.device.id;
		// record.Subject = req.cookies.subjectAuth.subject.id;
		DragAndDrop.create(record).exec(function(err, created) {
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
	detroyDragAndDropAll: function(req, res) {
		DragAndDrop.destroy({}).exec(function(err, destroyList) {
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
