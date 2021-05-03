import firebase from 'firebase/app';
import { Transaction } from 'firebase/firestore';
import artPieceModel from '../models/artPiece';
import artTypeModel from '../models/artType';
import artistModel from '../models/artist';
import callbackModel from '../models/callback';
import cartModel from '../models/cart';
import orderModel from '../models/order';
import userModel from '../models/user';

export let app = null;
export let database = null;
export let auth = null;
export let storage = null;

export const init = () => {
  const appName = 'Megadental Art Gallery';
  const config = {
    apiKey: 'AIzaSyCVHvfzWzV5p2G8VkXW7k_3ALHLuS_m-WQ',
    authDomain: 'ohmyart-ee13a.firebaseapp.com',
    databaseURL: 'https://ohmyart-ee13a.firebaseio.com',
    storageBucket: 'ohmyart-ee13a.appspot.com',
    messagingSenderId: '564094140683.4',
  };
  if (!firebase.apps.length) {
    app = firebase.initializeApp(config, appName);
  } else {
    app = firebase.app(appName);
  }
  database = firebase.database(app);
  auth = app.auth();
  storage = app.storage();
};

export const addArtTypeToFirebase = async element => {
  const root = '/arttypes';
  if (database) {
    const key = database.ref(root).push().key;
    if (key) {
      const model = artTypeModel(
        key,
        element,
        firebase.database.ServerValue.TIMESTAMP
      );
      try {
        await database.ref(`${root}/${key}`).set(model);
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  }
  return null;
};
export const addArtPieceToFirebase = async element => {
  const root = '/artpieces';
  console.log(database);
  if (database) {
    const key = database.ref(root).push().key;
    console.log('key', key);
    if (key) {
      const model = artPieceModel(
        key,
        element,
        firebase.database.ServerValue.TIMESTAMP
      );
      if (model) {
        try {
          await database.ref(`${root}/${key}`).set(model);
          return null;
        } catch (e) {
          return e;
        }
      } else {
        return { message: 'Error: no model' };
      }
    } else {
      return { message: 'Error: no key' };
    }
  } else {
    return { message: 'Error: no database' };
  }
};

export const addCartToFirebase = element => {
  const root = '/cart';
  let key = database ? database.ref(root).push().key : null;
  const model = key
    ? cartModel(element.id, element, firebase.database.ServerValue.TIMESTAMP)
    : null;
  return database && key
    ? database.ref(`${root}/${element.id}/${key}`).set(model)
    : null;
};

export const addArtistToFirebase = async element => {
  const root = '/artists';
  if (database) {
    const key = database.ref(root).push().key;
    if (key) {
      const model = artistModel(
        key,
        element,
        firebase.database.ServerValue.TIMESTAMP
      );
      try {
        await database.ref(`${root}/${key}`).set(model);
      } catch (e) {
        console.log(JSON.stringify(e));
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};
export const uploadPictureToFirebase = async file => {
  const metadata = {
    contentType: 'image/jpeg',
  };
  console.log('file', file);
  console.log('filename', file.name);
  console.log('metadata', metadata);

  // Upload file and metadata to the object 'images/mountains.jpg'
  if (storage) {
    // Listen for state changes, errors, and completion of the upload.
    const snapshot = await storage
      .ref()
      .child('images/' + file.name)
      .put(file, metadata);
    console.log('snapshot', snapshot);
    if (snapshot.state === 'success') {
      console.log(
        storage
          .ref()
          .child(`images/${file.name}`)
          .getDownloadURL()
      );

      return snapshot.downloadURL;
    } else {
      console.log('Error on upload');
      return null;
    }
  }
};
export const addOrderToFirebase = async element => {
  const root = '/orders';
  let key = database ? database.ref(root).push().key : null;
  let model = key
    ? orderModel(key, element, firebase.database.ServerValue.TIMESTAMP)
    : null;

  return database && key
    ? await database.ref(`${root}/${key}`).set(model)
    : null;
};

export const addUserExtraInfosToFirebase = async (
  key,
  element
) => {
  const root = '/userDatas';
  let model = userModel(key, element, firebase.database.ServerValue.TIMESTAMP);
  return database && key
    ? await database.ref(root + '/' + key).set(model)
    : null;
};

export const addCallbackToFirebase = async (
  root,
  element
) => {
  let key = database ? database.ref(root).push().key : null;
  let model = key
    ? callbackModel(key, element, firebase.database.ServerValue.TIMESTAMP)
    : null;
  return database && key
    ? await database.ref(root + '/' + key).set(model)
    : null;
};

export const getArtPieces = callback => {
  const artPiecesRef = database ? database.ref('/artpieces') : null;
  const artPieces = [];
  if (artPiecesRef) {
    artPiecesRef.on('value', snap => {
      snap.forEach(child => {
        artPieces.push(child.val());
      });
      callback(artPieces);
    });
  }
};

export const getUsersExtraInfos = callback => {
const userDatasRef = database ? database.ref('/userDatas') : null;
  const usersInfos = [];
  if (userDatasRef) {
    userDatasRef.on('value', snap => {
      snap.forEach(child => {
        usersInfos.push(child.val());
      });
      callback(usersInfos);
    });
  }
};

export const getArtPiece = async artpieceId => {
  const artPiecesRef = database
    ? database.ref(`artpieces/${artpieceId}`)
    : null;
  if (artPiecesRef) {
    const artPieceSnapshot = await artPiecesRef.once('value');
    return artPieceSnapshot.val();
  }
  return null;
};

export const getArtist = async artistId => {
  const artistRef = database ? database.ref(`artists/${artistId}`) : null;
  if (artistRef) {
    const artistSnapshot = await artistRef.once('value');
    return await artistSnapshot.val();
  }
  return null;
};

export const getArtPieceFromArtist = async artistId => {
  const artpieceRef = database ? database.ref('/artpieces') : null;
  let artPieces = [];
  if (artpieceRef) {
    const artistSnapshot = await artpieceRef.once('value');
    artistSnapshot.forEach(function(child) {
      if (child.val().artistId === artistId) artPieces.push(child.val());
    });
  }
  return artPieces;
};

export const getArtPieceFromArtType = async arttypeId => {
  const artpieceRef = database ? database.ref('/artpieces') : null;
  let res = [];
  if (artpieceRef) {
    const artistSnapshot = await artpieceRef.once('value');
    artistSnapshot.forEach(function(child) {
      if (child.val().typeOfArtPieces === arttypeId) {
        const artPiece = child.val();
        res.push(artPiece);
      }
    });
  }
  return res;
};

export const listenToCartChange = (
  userId,
  cartId,
  callback
) => {
  if (cartId) {
    const cartRef = database ? database.ref(`/cart/${userId}/${cartId}`) : null;
    if (cartRef) {
      cartRef.on('value', snap =>
        snap.forEach(function(child) {
          if (child.val().active) callback(child.val());
          else {
            callback(null);
          }
        })
      );
    }
  }
};

export const getCart = async userId => {
  const cartRef = database
    ? database.ref(`/cart/`).orderByChild('timestamp')
    : null;

  if (cartRef) {
    const cartSnapshot = await cartRef.once('value');
    const res = [];
    cartSnapshot.forEach(function(child) {
      Object.keys(child.val()).forEach(key => {
        if (child.val()[key].id === userId) res.push(child.val()[key]);
      });
    });

    return res.length ? res[res.length - 1] : null;
  }
};

export const getArtists = callback => {
  const artistRef = database ? database.ref('/artists') : null;
  const artists = [];
  if (artistRef) {
    artistRef.on('value', snap => {
      snap.forEach(child => {
        artists.push(child.val());
      });
      callback(artists);
    });
  }
};

export const getArtTypes = callback => {
  const arttypeRef = database ? database.ref('/arttypes') : null;
  const arttypes = [];
  if (arttypeRef) {
    arttypeRef.on('value', snap => {
      snap.forEach(child => {
        arttypes.push(child.val());
      });
      callback(arttypes);
    });
  }
};

export const getLastArtist = callback => {
  const artistRef = database ? database.ref('/artists') : null;
  if (artistRef) {
    artistRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

export const getLastOrder = callback => {
  const ordersRef = database ? database.ref('/orders') : null;
  if (ordersRef) {
    ordersRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

export const getLastCallback = callback => {
  const callbackRef = database ? database.ref('/callbacks') : null;
  if (callbackRef) {
    callbackRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

export const getLastArtPiece = callback => {
  const artPieceRef = database ? database.ref('/artpieces') : null;
  if (artPieceRef) {
    artPieceRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

export const getLastArtType = callback => {
  const artTypeRef = database ? database.ref('/arttypes') : null;
  if (artTypeRef) {
    artTypeRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

export const getUserExtraInfos = async (key, callback) => {
  if (database) {
    const ref = database.ref('/userDatas/' + key);

    // Attach an asynchronous callback to read the data at our posts reference
    const userSnapshot = await ref.once('value');
    callback(userSnapshot.val());
  }
};

export const getCurrentUser = () => {
  if (auth) {
    return auth.currentUser;
  }
  return null;
};

export const logOut = async () => {
  if (auth) {
    await auth.signOut();
  }
};

export const updateArtist = artist => {
  const { id, ...updatedValues } = artist;
  const artistRef = database ? database.ref(`artists/${id}`) : null;
  if (artistRef) {
    return artistRef.transaction(function(loadedArtist) {
      if (loadedArtist) {
        loadedArtist = { ...loadedArtist, ...updatedValues };
      }
      return loadedArtist;
    });
  }
  return null;
};

export const updateArtPieceToFirebase = artpiece => {
  const { id, ...updatedValues } = artpiece;
  const artpieceRef = database ? database.ref(`artpieces/${id}`) : null;
  if (artpieceRef) {
    return artpieceRef.transaction(function(loadedArtpiece) {
      if (loadedArtpiece) {
        loadedArtpiece = { ...loadedArtpiece, ...updatedValues };
      }
      return loadedArtpiece;
    });
  }
  return null;
};

export const updateArtTypeInFirebase = arttype => {
  const { id, ...updatedValues } = arttype;
  const arttypeRef = database ? database.ref(`arttypes/${id}`) : null;
  if (arttypeRef) {
    return arttypeRef.transaction(function(loadedArtType) {
      if (loadedArtType) {
        loadedArtType = { ...loadedArtType, ...updatedValues };
      }
      return loadedArtType;
    });
  }
  return null;
};
