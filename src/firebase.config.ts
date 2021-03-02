import { secrets } from './secrets';

/**
 * @type {Object} Config for Firebase.
 */
export const firebaseConfig = {
    apiKey: secrets.apiKey,
    authDomain: secrets.authDomain,
    databaseURL: secrets.databaseURL,
    projectId: secrets.projectId,
    storageBucket: secrets.storageBucket,
    messagingSenderId: secrets.messagingSenderId,
};
