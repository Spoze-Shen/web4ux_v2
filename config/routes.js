/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

	/***************************************************************************
	 *                                                                          *
	 * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
	 * etc. depending on your default view engine) your home page.              *
	 *                                                                          *
	 * (Alternatively, remove this and add an `index.html` file in your         *
	 * `assets` directory)                                                      *
	 *                                                                          *
	 ***************************************************************************/

	/****TEST****/
	'get /removeAllData': 'ProjectController.removeAllData',
	'/managerLogin': {
		view: 'manager/login',
		locals: {
			layout: ''
		}
	},
  '/browserSupport': {
		view: 'browserSupport',
    locals: {
			layout: ''
		}
	},
	/*Manager Console*/
	'/': 'BackendController.managerHome',
	'/newProject': 'BackendController.newProject',
	'/project-devices': 'BackendController.projectDevices',
	'/project-calibrate': 'BackendController.projectCalibrate',
	'/project-permission': 'BackendController.projectPermission',
	'/project-setting': 'BackendController.projectSetting',
	'/project-fitts-result': 'BackendController.projectFittsResult',
	'/project-fitts-raw': 'BackendController.projectFittsRaw',
	'/project-drag-result': 'BackendController.projectDragResult',
	'/project-drag-raw': 'BackendController.projectDragRaw',
	'/project-typing-result': 'BackendController.projectTypingResult',
	'/project-typing-raw': 'BackendController.projectTypingRaw',
	'/adminHome': 'BackendController.adminHome',
	'/myAccount': 'BackendController.myAccount',
	'/setPassword' : 'ManagerController.setPasswordPage',
	/*Experiment Console*/
	'/experimentLogin': 'ExperimentController.experimentLogin',
	'/experimentHome': 'ExperimentController.experimentHome',
	'/Test-Fitts-Home': 'ExperimentController.fittsHome',
	'/Test-Fitts-Practice': 'ExperimentController.fittsPractice',
	'/Test-Fitts': 'ExperimentController.fittsTest',
	'/Test-Typing-Home': 'ExperimentController.typingHome',
	'/Test-Typing': 'ExperimentController.typingTest',
	'/Test-DragAndDrop-Home': 'ExperimentController.dragAndDropHome',
	'/Test-DragAndDrop': 'ExperimentController.dragAndDropTest',
	'/finishOneTest': 'ExperimentController.finishOneTest',
	'/finishAllTest': 'ExperimentController.finishAllTest',
	/*ManagerController*/
	'get /listManager': 'ManagerController.listManager',
	'get /checkManagerAuth': 'ManagerController.checkManagerAuth',
	'post /authManager': 'ManagerController.authManager',
	'/managerLogout': 'ManagerController.managerLogout',
	'get /findPassword': 'ManagerController.findPassword',
	'post /inviteManager': 'ManagerController.inviteManager',
	'post /resetPassword': 'ManagerController.resetPassword',
	'post /resetName': 'ManagerController.resetName',
	'post /isAdmin': 'ManagerController.isAdmin',
	'post /deleteManager': 'ManagerController.deleteManager',
	/*SubjectController*/
	'post /authSubject': 'SubjectController.authSubject',
	'get /checkSubjectAuth': 'SubjectController.checkSubjectAuth',
	'post /authDuplicate': 'SubjectController.authDuplicate',
	/*ProjectController*/
	'post /createProject': 'ProjectController.createProject',
	'get /listProject': 'ProjectController.listProject',
	'get /searchProject': 'ProjectController.searchProject',
	'post /updateProejct': 'ProjectController.updateProejct',
	/*ProjectController*/
	'post /calibrateDevice': 'ProjectDevice.calibrateDevice',
	/*FittsLawController*/
	'post /fittsLawRecord': 'FittsLawController.record',
	'get /fittsLogData': 'FittsLawController.fittsLog',
	'get /fittsDurationResults': 'FittsLawController.fittsDurationResults',
	'get /fittsErrorResults': 'FittsLawController.fittsErrorResults',
	'get /fittsDurationSubjectsResults': 'FittsLawController.fittsDurationSubjectsResults',
	'post /aliveRecords': 'FittsLawController.aliveRecords',
	//Test
	'get /updateFitts': 'FittsLawController.updateFitts',
	/*TypingController*/
	'post /typingRecord': 'TypingController.record',
	'get /typingLogData': 'TypingController.typingLog',
	'get /typeError': 'TypingController.typeError',
	'get /typeSpecialError': 'TypingController.typeSpecialError',
	/*DragAndDrop*/
	'post /dragAndDropRecord': 'DragAndDropController.record',
	'get /dragAndDropLogData': 'DragAndDropController.dragAndDropLog',
	'get /dragError': 'DragAndDropController.dragError',
	'get /dragSpecialError': 'DragAndDropController.dragSpecialError',


	//
	'get /editFailTrail' : 'FittsLawController.editFailTrail',
	/***************************************************************************
	 *                                                                          *
	 * Custom routes here...                                                    *
	 *                                                                          *
	 * If a request to a URL doesn't match any of the custom routes above, it   *
	 * is matched against Sails route blueprints. See `config/blueprints.js`    *
	 * for configuration options and examples.                                  *
	 *                                                                          *
	 ***************************************************************************/

};
