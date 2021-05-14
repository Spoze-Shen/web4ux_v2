/**
 * ProjectController
 *
 * @description :: Server-side logic for managing Projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function newDevice(device) {
	ProjectDevice.create(device).exec(function(err, created) {
		if (err) {
			console.log(err);
		}
	});
}
module.exports = {
	searchProject: function(req, res) {
		Project.find({
			Name: {
				contains: req.param("query")
			},
			or: [{
					Creator: req.cookies.managerAuth.id
				},
				{
					Editor: req.cookies.managerAuth.id
				}
			],
			sort: "updatedAt DESC"
		}).populate("Subject").populate("Creator").populate("Editor").exec(function(err, list) {
			if (err) {
				return res.json({
					error: err
				});
			} else {
				return res.json(list);
			}
		});
	},
	listProject: function(req, res) {
		var Alive = req.param("Alive"),
			or = req.param("or"),
			sort = req.param("sort");
			//CreaterEditorOnly = req.param("CreaterEditorOnly");
		// sort.updatedAt = parseInt(sort.updatedAt);
		// sort.createdAt = parseInt(sort.createdAt);
		//console.log(Alive, or, sort);
		Project.find({
			Alive: Alive,
			or: or,
			sort: sort,
			//CreaterEditorOnly: CreaterEditorOnly
		}).populate("Subject").populate("Creator").populate("Editor").exec(function(err, list) {
			if (err) {
				return res.json({
					error: err
				});
			} else {
				return res.json(list);
			}
		});
	},
	updateProejct: function(req, res) {
		var updateData = req.allParams();
		delete updateData.id;
		var id = req.param("id");
		Project.update({
			id: id
		}, updateData).exec(function(err, updated) {
			if (err) {
				console.log(err);
				return res.json({
					error: err
				});
			} else {

				// if (updateData.Editor) {
				// 	var p = updated[0];
				// 	p.Editor = updateData.Editor;
				// 	p.save(function(errSave, saved) {
				// 		return res.json(saved);
				// 	});
				return res.json(updated[0]);
			}
		});
	},
	createProject: function(req, res) {
		var projectObj = req.param("Project"),
			deviceList = req.param("Device");
		Project.create(projectObj).exec(function(err, created) {
			if (err) {
				return res.json({
					error: err
				});
			} else {
				for (var i = 0; i < deviceList.length; i++) {
					deviceList[i].Project = created.id;
					newDevice(deviceList[i]);
				};
				return res.json(created);
			}
		});
	},
	removeAllData: function(req, res) {
		Project.destroy({}).exec(function(err1, des1) {
			ProjectDevice.destroy({}).exec(function(err2, des2) {
				Subject.destroy({}).exec(function(err3, des3) {
					FittsLaw.destroy({}).exec(function(err4, des4) {
						DragAndDrop.destroy({}).exec(function(err5, des5) {
							Typing.destroy({}).exec(function(err6, des6) {
								return res.json("Done");
							});
						});
					});

				});
			});
		});
	},
	removeProject: function(req, res) {
		var id = req.param("id");
		Project.destroy({
			id: id
		}).exec(function() {
			return res.json("Done");
		});
	}
};
