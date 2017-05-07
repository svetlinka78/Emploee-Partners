const partnersRep  = require('../../../lib/partnersRepository'),
      util        = require('util');

class PartnersController {

    constructor(router) {
        router.get('/', this.getPartners.bind(this));
    }

    getPartners(req, res) {
        console.log('svela getPartners');

        partnersRep.getPartners((err, data) => {
            if (err) {
                console.log('svetla getPartners error: ' + util.inspect(err));
                res.json({partners: null});
            } else {
                console.log('svetla getPartners ok');
                res.json(data);
            }
        });
    }

}

module.exports = PartnersController;
