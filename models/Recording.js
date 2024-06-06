import { Realm, BSON, ObjectSchema } from 'realm'

// Define your object model
export class Recording extends Realm.Object {
  static schema = {
    name: 'Recording',
    properties: {
      _id: 'string',
      name: 'string',
      length: 'int',
      encodedAudio: 'string',
    },
    primaryKey: '_id',
  }
}
