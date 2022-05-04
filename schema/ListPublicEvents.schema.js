const listPublicEventsSchema = new Schema({
  id: String,
  type: String,
  actor: Object,
  repo: Object,
  payload: Object,
  public: Boolean,
  created_at: Date
});

exports.listPublicEventsSchema = listPublicEventsSchema;