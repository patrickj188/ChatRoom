export default class User {
  constructor(data) {
    this.setData(data);
  }

  setData(data) {
    this.login_id = data.login_id || this.login_id;
    this.name = data.name || this.name;
    this.display_name = data.display_name || this.display_name;
    if (Array.isArray(data.rooms) && data.rooms.length > 0) {
      this.rooms = data.rooms;
    }
  }
};
