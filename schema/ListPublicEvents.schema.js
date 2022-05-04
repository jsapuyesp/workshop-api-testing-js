const Schema = require('mongoose').Schema;
const listPublicEventsSchema = new Schema({
  id: String,
  type: String,
  actor: Object,
  repo: Object,
  payload: Object,
  public: Boolean,
  created_at: Date,
  org: Object,
  required: ['id', 'type', 'actor', 'repo', 'payload', 'public', 'created_at'],
});

exports.listPublicEventsSchema = listPublicEventsSchema;