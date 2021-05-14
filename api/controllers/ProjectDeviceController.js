/**
 * ProjectDeviceController
 *
 * @description :: Server-side logic for managing Projectdevices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	calibrateDevice: function(req, res) {
		var id = req.param("id"),
			rang = req.param("rang");
		ProjectDevice.update({
			id : id
		}, {
			Rang : rang
		}).exec(function(err, updated) {
			if (err) {
				console.log(err);
				return res.json({ error: err });
			} else {
				return res.json(updated[0]);
			}
		});
	}
};
