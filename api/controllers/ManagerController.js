/**
 * ManagerController
 *
 * @description :: Server-side logic for managing managers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var nodemailer = require("nodemailer");
module.exports = {
  setPasswordPage: function(req, res) {
    if (req.param("id")) {
      Manager.findOne({
        id: req.param("id")
      }).exec(function(err, found) {
        if (err || !found) {
          return res.notFound();
        } else {
          res.clearCookie("managerAuth");
          res.cookie("managerAuth", found);
          return res.view("manager/setPassword", {
            layout: "",
            data: {
              manager: found
            }
          });
        }
      });
    } else {
      return res.notFound();
    }
  },
  isAdmin: function(req, res) {
    Manager.update(
      {
        id: req.param("id")
      },
      {
        IsAdmin: req.param("admin")
      }
    ).exec(function(err, data) {
      return res.json(data[0]);
    });
  },
  deleteManager: function(req, res) {
    Manager.update(
      {
        id: req.param("id")
      },
      {
        Alive: false
      }
    ).exec(function(err, data) {
      return res.json(data[0]);
    });
  },
  resetName: function(req, res) {
    Manager.update(
      {
        id: req.cookies.managerAuth.id
      },
      {
        Name: req.param("newName")
      }
    ).exec(function(err, updated) {
      res.clearCookie("managerAuth");
      updated[0].Auth = true;
      res.cookie("managerAuth", updated[0]);
      return res.json(updated);
    });
  },
  resetPassword: function(req, res) {
    Manager.update(
      {
        id: req.cookies.managerAuth.id
        //Email : "paichen@chongson.com.tw"
      },
      {
        Pwd: req.param("newPwd"),
        Invited: false
      }
    ).exec(function(err, updated) {
      return res.json(updated);
    });
  },
  inviteManager: function(req, res) {
    Manager.findOne({
      Email: req.param("email")
    }).exec(function(err1, found) {
      if (err1 || found) {
        return res.json({
          error: true
        });
      } else {
        var randomstring = Math.random()
          .toString(36)
          .slice(-8);
        Manager.create({
          Name: req.param("name"),
          Email: req.param("email"),
          //Pwd: randomstring,
          Invited: true
        }).exec(function(err2, created) {
          var sgMail = require("@sendgrid/mail");
          //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 // Old
          sgMail.setApiKey(
            "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"
          );
          var contact = req.allParams();

          var emailContent =
            "<p>Hello " +
            created.Name +
            ",</p>" +
            "<h2>You are invited to join TouchPad Experiment</h2>" +
            "<p>Plaese use this <a href='https://web4ux.com/setPassword?id=" +
            created.id +
            "'> Link</a></p>" +
            "<p>to set up your Passwords, and try to login.</p>" +
            "<p>If the link is broken, please copy and use this url : </p>" +
            "<p>https://web4ux.com/setPassword?id=" +
            created.id +
            "</p>" +
            "<p>Best regards, </p>" +
            "<p>System Admin</p>";

          var mails = [
            {
              to: created.Email,
              from: "service.admin@web4ux.com",
              replyTo: "service.admin@web4ux.com",
              //bcc: ["spoze@primeplus.business", "jimifeng@primeplus.business", "queena@primeplus.business"],
              subject: "Invitation of TouchPad Experiment",
              text: " ",
              html: emailContent
            }
          ];
          sgMail.send(mails, function(errSend, sendResult) {
            if (errSend) {
              console.log(errSend);
              return res.json({
                error: "Email Fail",
                msg: errSend
              });
            } else {
              return res.json({
                success: true,
                msg: "Mail sent!"
              });
            }
          });
        });
      }
    });
  },
  findPassword: function(req, res) {
    Manager.findOne({
      Email: req.param("email")
    }).exec(function(err, m) {
      if (!err && m) {
        var sgMail = require("@sendgrid/mail");
        sgMail.setApiKey(
          "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"
          //"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"
        );
        var contact = req.allParams();

        var emailContent =
          "<p>Hello " +
          m.Name +
          ",</p>" +
          "<h2>This is password reset email for TouchPad Experiment</h2>" +
          "<p>Plaese use this <a href='https://web4ux.com/setPassword?id=" +
          m.id +
          "'> Link</a></p>" +
          "<p>to set up your Passwords, and try to login.</p>" +
          "<p>If the link is broken, please copy and use this url : </p>" +
          "<p>https://web4ux.com/setPassword?id=" +
          m.id +
          "</p>" +
          "<p>Best regards, </p>" +
          "<p>System Admin</p>";

        var mails = [
          {
            to: m.Email,
            from: "service.admin@web4ux.com",
            replyTo: "service.admin@web4ux.com",
            //bcc: ["spoze@primeplus.business", "jimifeng@primeplus.business", "queena@primeplus.business"],
            subject: "Invitation of TouchPad Experiment",
            text: " ",
            html: emailContent
          }
        ];
        sgMail.send(mails, function(errSend, sendResult) {
          if (errSend) {
            return res.json({
              error: "Email Fail",
              msg: errSend
            });
          } else {
            return res.json({
              success: true,
              msg: "Mail sent!"
            });
          }
        });
      } else {
        return res.json({
          error: "Manager not fount!"
        });
      }
    });
  },
  listManager: function(req, res) {
    var query = req.allParams();
    Manager.find(query)
      .sort("Name DESC")
      .populate("ProjectCreated")
      .exec(function(err, list) {
        return res.json(list);
      });
  },
  authManager: function(req, res) {
    Manager.findOne({
      Email: req.param("Email"),
      Pwd: req.param("Pwd"),
      Invited: false,
      Alive: true
    }).exec(function(err, found) {
      if (err) {
        return res.json({
          error: "System error!",
          code: err
        });
      } else if (found) {
        //delete found.Pwd;
        if (req.cookies.managerAuth) {
          res.clearCookie("managerAuth");
        }
        found.Auth = true;
        res.cookie("managerAuth", found);
        return res.json({
          auth: true
        });
      } else {
        return res.json({
          auth: false
        });
      }
    });
  },
  managerLogout: function(req, res) {
    res.clearCookie("managerAuth");
    return res.redirect("/managerLogin");
  },
  checkManagerAuth: function(req, res) {
    // if (req.session && req.session.manager) {
    // 	return res.json({
    // 		auth: true,
    // 		manager: res.session.manager,
    // 		session : res.session
    // 	});
    // } else {
    // 	return res.json({
    // 		auth: false,
    // 		session : res.session
    // 	});
    // }
    if (req.cookies.managerAuth) {
      return res.json({
        manager: req.cookies.managerAuth
      });
    } else {
      return res.json({
        manager: {}
      });
    }
  }
};
