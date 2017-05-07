const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Partner = require('../models/partner');

class PartnersRepository {
    // get all the states
    getPartners(callback) {
        console.log('svetla PartnersRepository.getPartners');
        Partner.find({}, {}, { sort: { name: 1 } }, (err, partners) => {
            if (err) {
                console.log(`svetls PartnersRepository.getPartners err: ${err}`);
                return callback(err);
            }
            callback(null, partners);
        });
    }

    // get a state
    getPartner(partnerId, callback) {
        console.log('svetla PartnersRepository.getPartner');
        Partner.find({ 'id': partnerId }, {}, (err, partner) => {
            if (err) {
                console.log(`svetla PartnersRepository.getPartner err: ${err}`);
                return callback(err);
            }
            callback(null, partner);
        });
    }
}

module.exports = new PartnersRepository();
