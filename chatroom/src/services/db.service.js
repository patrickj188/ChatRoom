import { firebase } from '../firebase'

class DBService {
  async readTestData() {
    return await this.readCollection('test');
  }

  async readCollection(collectionName) {
    try {
      const snapshot = await firebase.firestore().collection(collectionName).get();
      const values = snapshot.docs.map(doc => doc.data());
      return values;
    } catch (err) {
      console.error(err)
      throw(err)
    }
  }

  async writeToCollection(collection, message, user, dateTime) {
    try {
      const snapshot = await firebase.firestore().collection(collection).add({ message, user, dateTime })
      return snapshot;
    } catch (err) {
      throw err;
    }


  }
}

export default new DBService();
