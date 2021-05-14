/**
 * SubjectController
 *
 * @description :: Server-side logic for managing Subjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  checkSubjectAuth: function (req, res) {
    if (req.cookies.subjectAuth) {
      return res.json({
        auth: true,
        data: req.cookies.subjectAuth
      });
    } else {
      return res.json({
        auth: false
      });
    }
  },
  authDuplicate: function (req, res) {
    // var data = req.allParams();

    // data.newCookie.test1 = JSON.parse(data.newCookie.test1);
    // data.newCookie.test2 = JSON.parse(data.newCookie.test2);
    // data.newCookie.test3 = JSON.parse(data.newCookie.test3);

    // var cookieData = data.oldCookie;
    // cookieData.test1 = JSON.parse(cookieData.test1);
    // cookieData.test2 = JSON.parse(cookieData.test2);
    // cookieData.test3 = JSON.parse(cookieData.test3);
    // if (cookieData.test1) {
    //     cookieData.test1Finished = (data.newCookie.test1) ? false : true;
    // }
    // if (cookieData.test2) {
    //     cookieData.test2Finished = (data.newCookie.test2) ? false : true;
    // }
    // if (cookieData.test3) {
    //     cookieData.test3Finished = (data.newCookie.test3) ? false : true;
    // }
    // cookieData.total1Rounds = parseInt(cookieData.total1Rounds);
    // for (var i = 0; i < cookieData.test1ID.length; i++) {
    //     cookieData.test1ID[i] = parseFloat(cookieData.test1ID[i]);
    // };
    // for (var i = 0; i < cookieData.test1D.length; i++) {
    //     cookieData.test1D[i] = parseFloat(cookieData.test1D[i]);
    // };
    // for (var i = 0; i < cookieData.test1W.length; i++) {
    //     cookieData.test1W[i] = parseFloat(cookieData.test1W[i]);
    // };

    Manager.findOne({
      id: req.param("Manager"),
      Pwd: req.param("Pwd")
    }).exec(function (err, manager) {
      if (manager) {
        FittsLaw.destroy({
          Subject: req.param("Subject"),
          Project: req.param("Project"),
          ProjectDevice: req.param("ProjectDevice")
        }).exec(function (errF, F) {
          DragAndDrop.destroy({
            Subject: req.param("Subject"),
            Project: req.param("Project"),
            ProjectDevice: req.param("ProjectDevice")
          }).exec(function (errD, D) {
            Typing.destroy({
              Subject: req.param("Subject"),
              Project: req.param("Project"),
              ProjectDevice: req.param("ProjectDevice")
            }).exec(function (errT, T) {
              Subject.destroy({
                id: req.param("Subject")
              }).exec(function (errS, S) {
                return res.json({
                  Auth: true,
                  Manager: manager,
                  Subject: S,
                  F: F.length,
                  D: D.length,
                  T: T.length
                });
              });
            });
          });
        });
      } else {
        return res.json({ Auth: false });
      }
      // if (manager.passwords == data.newCookie.pass) {
      // 	res.clearCookie("subjectAuth");
      // 	res.cookie("subjectAuth", cookieData, {
      // 		maxAge: 3 * 24 * 60 * 60 * 1000
      // 	});
      // 	if (!cookieData.test1Finished) {
      // 		FittsLaw.destroy({
      // 			subjectName: cookieData.subjectName,
      // 			pid: cookieData.projectId,
      // 			model: cookieData.subjectDevice
      // 		}).exec(function(errF, f) {

      // 		});
      // 	}
      // 	if (!cookieData.test2Finished) {
      // 		DragAndDrop.destroy({
      // 			subjectName: cookieData.subjectName,
      // 			pid: cookieData.projectId,
      // 			model: cookieData.subjectDevice
      // 		}).exec(function(errF, f) {

      // 		});
      // 	}
      // 	if (!cookieData.test3Finished) {
      // 		Typing.destroy({
      // 			subjectName: cookieData.subjectName,
      // 			pid: cookieData.projectId,
      // 			model: cookieData.subjectDevice
      // 		}).exec(function(errF, f) {

      // 		});
      // 	}
      // 	return res.json({ auth: true, data: cookieData });
      // } else {
      // 	return res.json({ auth: false, data: cookieData });
      // }
    });
  },
  authSubject: function (req, res) {
    // var cookieData = req.allParams();
    // cookieData.test1 = JSON.parse(cookieData.test1);
    // cookieData.test2 = JSON.parse(cookieData.test2);
    // cookieData.test3 = JSON.parse(cookieData.test3);
    // cookieData.rang = parseFloat(cookieData.rang);
    // if (cookieData.test1) {
    //     cookieData.test1Finished = false;
    // }
    // if (cookieData.test2) {
    //     cookieData.test2Finished = false;
    // }
    // if (cookieData.test3) {
    //     cookieData.test3Finished = false;
    // }
    // cookieData.total1Rounds = parseInt(cookieData.total1Rounds);
    // for (var i = 0; i < cookieData.test1ID.length; i++) {
    //     cookieData.test1ID[i] = parseFloat(cookieData.test1ID[i]);
    // };
    // for (var i = 0; i < cookieData.test1D.length; i++) {
    //     cookieData.test1D[i] = parseFloat(cookieData.test1D[i]);
    // };
    // for (var i = 0; i < cookieData.test1W.length; i++) {
    //     cookieData.test1W[i] = parseFloat(cookieData.test1W[i]);
    // };

    var auth = req.allParams();

    Project.findOne({
      id: auth.Project
    })
      //.populate("Devices")
      .exec(function (err1, projectData) {
        if (err1) {
          console.log(err1);
          return res.json(err1);
        } else {
          ProjectDevice.findOne({
            id: auth.ProjectDevice
          }).exec(function (err2, deviceData) {
            if (err2) {
              console.log(err2);
              return res.json(err2);
            } else {
              Subject.find({
                Name: auth.Name,
                Project: auth.Project,
                ProjectDevice: auth.ProjectDevice
              }).exec(function (err3, foundSubjectData) {
                if (err3) {
                  console.log(err3);
                  return res.json(err3);
                } else {
                  if (foundSubjectData.length > 0) {
                    return res.json({
                      auth: false,
                      data: foundSubjectData[0]
                    });
                  } else {
                    //ok
                    //res.clearCookie("subjectAuth");
                    var ExperimentData = {
                      thisTestUrl: projectData.TestUrl[0],
                      thisTestName: projectData.TestName[0],
                      thisTestIndex: 0,
                      hasNextTest: (projectData.TestUrl.length > 1) ? (true) : (false),
                      nextTestUrl: (projectData.TestUrl.length > 1) ? (projectData.TestUrl[1]) : (""),
                      nextTestName: (projectData.TestUrl.length > 1) ? (projectData.TestName[1]) : (""),
                    };
                    Subject.create({
                      Name: auth.Name,
                      Project: auth.Project,
                      ProjectDevice: auth.ProjectDevice,
                      ExperimentData: ExperimentData
                    }).exec(function (err4, subjectData) {
                      if (err4) {
                        console.log(err4);
                        return res.json(err4);
                      } else {
                        return res.json({
                          auth: true,
                          subjectData
                        });
                        // var cookieData = {
                        //   experiment: {
                        //     thisTestUrl: projectData.TestUrl[0],
                        //     thisTestName: projectData.TestName[0],
                        //     thisTestIndex: 0,
                        //     hasNextTest: false,
                        //     nextTestUrl: "",
                        //     nextTestName: ""
                        //   },
                        //   project: projectData, //here
                        //   device: deviceData,
                        //   subject: subjectData
                        // };
                        // if (projectData.TestUrl.length > 1) {
                        //   cookieData.experiment.hasNextTest = true;
                        //   cookieData.experiment.nextTestUrl =
                        //     projectData.TestUrl[1];
                        //   cookieData.experiment.nextTestName =
                        //     projectData.TestName[1];
                        //   res.cookie("subjectAuth", cookieData);
                        //   return res.json({
                        //     auth: true
                        //   });
                        // } else {
                        //   res.cookie("subjectAuth", cookieData);
                        //   return res.json({
                        //     auth: true
                        //   });
                        // }
                      }
                    });
                  }
                }
              });
            }
          });
        }
      });
  }
};
