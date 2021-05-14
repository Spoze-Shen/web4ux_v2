/**
 * TypingController
 *
 * @description :: Server-side logic for managing Typings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	typeError: function(req, res) {
        if (req.param("modelOnly")) {
            Typing.find({
                Project: req.param("project"),
                EventType : { "!" : "endTest"}
            }).sum(["Counter","EventDuration"]).groupBy("ProjectDevice").exec(function(err1, data) {
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
            Typing.find({
                Project: req.param("project"),
                EventType : { "!" : "endTest"}
            }).sum(["Eounter","EventDuration"]).groupBy("ProjectDevice", "Subject").exec(function(err1, data) {
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
    typeSpecialError: function(req, res) { //
        if (req.param("modelOnly")) {
            Typing.find({
                Project: req.param("project"),
                ProjectDevice: req.param("device")
            }).sum(["Counter","EventDuration"]).groupBy("EventType").exec(function(err1, data) {
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
            Typing.find({
                Project: req.param("project"),
                ProjectDevice: req.param("device"),
                Subject: req.param("subject")
            }).sum(["Counter","EventDuration"]).groupBy("EventType").exec(function(err1, data) {
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
    typingLog: function(req, res) {
        Typing.find({
            Project: req.param("project"),
            sort: {
                "Subject": 1,
                "ProjectDevice": 1,
                "EventStartTime": 1,
                "EventType": 1,
                "EventDuration" : 1
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
    record: function(req, res) {
        var record = req.allParams();
        // record.Project = req.cookies.subjectAuth.project.id;
		// record.ProjectDevice = req.cookies.subjectAuth.device.id;
		// record.Subject = req.cookies.subjectAuth.subject.id;
        Typing.create(record).exec(function(err, created) {
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
    detroyTypingAll: function(req, res) {
        Typing.destroy({}).exec(function(err, destroyList) {
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

