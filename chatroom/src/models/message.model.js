export default class Message {
  constructor(data) {
    this.setData(data);
  }

  setData(data) {
    this.text = data.text || this.text;
    this.datetime = data.datetime || this.datetime;
    this.user_id = data.user_id || this.user_id;
    this.room_id = data.room_id || this.room_id;
  }
};
