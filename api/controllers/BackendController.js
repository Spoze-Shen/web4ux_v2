/**
 * SiteController
 *
 * @description :: Server-side logic for managing managers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	myAccount: function(req, res) {
		return res.view("manager/myAccount", {
			layout: 'manager/layout',
			data: {
				manager: req.cookies.managerAuth
			}
		});
	},
	adminHome: function(req, res) {
		if(req.cookies.managerAuth.IsAdmin){
			return res.view("manager/adminHome", {
				layout: 'manager/layout',
				data: {
					manager: req.cookies.managerAuth
				}
			});
		}
		else{
			return res.view("manager/permission-denied", {
				layout: 'manager/layout',
				data: {
					manager: req.cookies.managerAuth
				}
			});
		}
	},
	projectTypingResult: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Subject").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-typing-result", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectTypingRaw: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-typing-raw", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectDragResult: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Subject").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-drag-result", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectDragRaw: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-drag-raw", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectFittsResult: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Subject").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-fitts-result", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectFittsRaw: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-fitts-raw", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectFittsSetting: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-permission", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectPermission: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-permission", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectCalibrate: function(req, res) {
		var id = req.param("id");
		ProjectDevice.findOne({
			id: id
		}).exec(function(err, deviceData) {
			Project.findOne({
				id: deviceData.Project
			}).populate("Creator").populate("Editor").populate("Devices").exec(function(err2, projectData) {
				return res.view("manager/project-calibrate", {
					layout: 'manager/projectPageLayout',
					data: {
						manager: req.cookies.managerAuth,
						project: projectData,
						device: deviceData
					}
				});
			});

		});
	},
	projectDevices: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-devices", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	projectSetting: function(req, res) {
		var id = req.param("id");
		Project.findOne({
			id: id
		}).populate("Creator").populate("Editor").populate("Devices").exec(function(err, projectData) {
			return res.view("manager/project-setting", {
				layout: 'manager/projectPageLayout',
				data: {
					manager: req.cookies.managerAuth,
					project: projectData
				}
			});
		});
	},
	managerHome: function(req, res) {
		return res.view("manager/home", {
			layout: 'manager/layout',
			data: {
				manager: req.cookies.managerAuth
			}
		});
	},
	newProject: function(req, res) {
		return res.view("manager/newProject", {
			layout: 'manager/layout',
			data: {
				manager: req.cookies.managerAuth
			}
		});
	}
};
