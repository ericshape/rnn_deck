/**
 * Created by ericshape on 5/2/16.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClaimSchema = new Schema({
    claim_id: Number,
    claim_content: String,
    claim_label: String,
    claim_title: String,
    claim_topic: String,
    dist_mat: Object
}, {collection: 'claim'});

module.exports = mongoose.model('Claim', ClaimSchema);