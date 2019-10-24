import { firebase } from '../firebase';

class DBService {
  constructor() {
    this.limit = 100;
  }

  async readTestData() {
    return await this.readCollection('test');
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
      throw(err);
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
}

export default new DBService();
