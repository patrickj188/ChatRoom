export default class Room {
  constructor(data) {
    this.setData(data);
  }

  setData(data) {
    this.name = data.name || this.name;
    if (Array.isArray(data.users) && data.users.length > 0) {
      this.users = data.users;
    }
  }
}
