import { firebase } from '../firebase';

class DBService {
  constructor() {
    this.limit = 100;
    this.usersRef = firebase.firestore().collection('users')
    this.roomsRef = firebase.firestore().collection('rooms')
  }

  async readCollection(collectionName) {
    try {
      const snapshot = await firebase
        .firestore()
        .collection(collectionName)
        .orderBy('dateTime')
        .limit(this.limit)
        .get();
      const values = snapshot.docs.map(doc => doc.data());
      return values;
    } catch (err) {
      console.error(err);
      throw (err);
    }
  }

  async writeToCollection(collection, message, user, dateTime) {
    try {
      const snapshot = await firebase.firestore().collection(collection).add({ message, user, dateTime });
      return snapshot;
    } catch (err) {
      throw err;
    }
  }

  listenForMessages(callback) {
    const query = firebase.firestore().collection('messages').orderBy('dateTime').startAt(Date.now());
    query.onSnapshot(snap => {
      const changes = snap.docChanges();
      if (changes.length === 0 || changes[0].type !== 'added') return null; // this may need to change as we add features
      return callback(changes[0].doc.data());
    });
  }


  async loginUser(userData = {}) {
    try {
      await this.usersRef.doc(userData.uid).set({
        display_name: userData.displayName,
        user_id: userData.uid,
        // full_name: userData.fullName
      }, { merge: true })
    } catch (error) {
      console.log(error)
    }
  }

  async createRoom(roomName, userData) {
    try {
      const newRoom = this.roomsRef.doc();
      const userRef = this.usersRef.doc(userData.userId);
      if (!userRef) return console.log('shit')
      await newRoom.set({
        name: roomName,
        room_id: newRoom.id,
      });
      await newRoom.collection('users').add({
        user_id: userData.userId,
        display_name: userData.displayName,
      })
      await newRoom.collection('messages').add({ text: 'Welcome to your new room!', datetime: Date.now() });
      await userRef.collection('rooms').add({ 
        name: roomName,
        room_id: newRoom.id,
      })
      return await newRoom.get();
      // return room.data();
    } catch (err) {
      console.error(err);
    }
  }

  async getUser(userId) {
    try {
      const userRef = this.usersRef.doc(userId);
      const rooms = await userRef.collection('rooms').get();
      const user = await userRef.get();
      return {
        user: user.data(),
        rooms: rooms.docs.map(r => Object.assign({}, r.data(), { id: r.id }))
      }
    } catch (error) {
      console.log(error)
      throw(error);
    }
  }

  async getRoom(roomId) {
    try {
      if (!roomId) return console.log('no roomid')
      const roomRef = this.roomsRef.doc(roomId)
      const messages = await roomRef.collection('messages').get();
      const room = await roomRef.get();
      if (!room) throw(new Error('no room with id ' + roomId));
      return {
        room: room.data(),
        messages: messages.docs.map(m => Object.assign({}, m.data(), { id: m.id }))
      }
    } catch(err) {
      console.error(err);
      throw(err);
    }
  }


}

export default new DBService();
