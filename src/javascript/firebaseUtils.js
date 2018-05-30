//@flow

import firebase from 'firebase/app';
import { Transaction } from 'firebase/firestore';
import artPieceModel from '../models/artPiece';
import artTypeModel from '../models/artType';
import artistModel from '../models/artist';
import callbackModel from '../models/callback';
import cartModel from '../models/cart';
import orderModel from '../models/order';
import userModel from '../models/user';

import type {
  ArtistType,
  ArtPieceType,
  ArtTypeType,
  CartType,
  OrderType,
  FirebaseOrderType,
  UserType,
  FirebaseUser,
  FirebaseCallbackType,
  CallbackType,
} from '../types/types';

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
  app = firebase.initializeApp(config, appName);
  database = app.database();
  auth = app.auth();
  storage = app.storage();
};

type AddArtTypeToFirebase = (element: ArtTypeType) => Promise<null>;
export const addArtTypeToFirebase: AddArtTypeToFirebase = async element => {
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
type AddArtPieceToFirebase = (
  element: ArtPieceType
) => Promise<{ message: string } | null>;
export const addArtPieceToFirebase: AddArtPieceToFirebase = async element => {
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

type AddCartToFirebase = (element: CartType) => null;
export const addCartToFirebase: AddCartToFirebase = element => {
  const root = '/cart';
  let key = database ? database.ref(root).push().key : null;
  const model = key
    ? cartModel(element.id, element, firebase.database.ServerValue.TIMESTAMP)
    : null;
  return database && key
    ? database.ref(`${root}/${element.id}/${key}`).set(model)
    : null;
};

type AddArtistToFirebase = (element: ArtistType) => Promise<null>;
export const addArtistToFirebase: AddArtistToFirebase = async element => {
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

type UploadPictureToFirebase = (file: File) => Promise<?string>;
export const uploadPictureToFirebase: UploadPictureToFirebase = async file => {
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

type AddOrderToFirebase = (element: OrderType) => Promise<null>;
export const addOrderToFirebase: AddOrderToFirebase = async element => {
  const root = '/orders';
  let key = database ? database.ref(root).push().key : null;
  let model = key
    ? orderModel(key, element, firebase.database.ServerValue.TIMESTAMP)
    : null;

  return database && key
    ? await database.ref(`${root}/${key}`).set(model)
    : null;
};

type AddUserExtraInfosToFirebase = (
  key: string,
  element: UserType
) => Promise<null>;
export const addUserExtraInfosToFirebase: AddUserExtraInfosToFirebase = async (
  key,
  element
) => {
  const root = '/userDatas';
  let model = userModel(key, element, firebase.database.ServerValue.TIMESTAMP);
  return database && key
    ? await database.ref(root + '/' + key).set(model)
    : null;
};

type AddCallbackToFirebase = (
  root: string,
  element: CallbackType
) => Promise<null>;
export const addCallbackToFirebase: AddCallbackToFirebase = async (
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
type GetArtPieces = (callback: (ArtPieceType[]) => void) => void;
export const getArtPieces: GetArtPieces = callback => {
  const artPiecesRef = database ? database.ref('/artpieces') : null;
  const artPieces: ArtPieceType[] = [];
  if (artPiecesRef) {
    artPiecesRef.on('value', snap => {
      snap.forEach(child => {
        artPieces.push(child.val());
      });
      callback(artPieces);
    });
  }
};

type GetUsersExtraInfos = (callback: (UserType[]) => void) => void;
export const getUsersExtraInfos: GetUsersExtraInfos = callback => {
  const userDatasRef = database ? database.ref('/userDatas') : null;
  const usersInfos: UserType[] = [];
  if (userDatasRef) {
    userDatasRef.on('value', snap => {
      snap.forEach(child => {
        usersInfos.push(child.val());
      });
      callback(usersInfos);
    });
  }
};

type GetArtPiece = (artpieceId: string) => Promise<null | ArtPieceType>;
export const getArtPiece: GetArtPiece = async artpieceId => {
  const artPiecesRef = database
    ? database.ref(`artpieces/${artpieceId}`)
    : null;
  if (artPiecesRef) {
    const artPieceSnapshot = await artPiecesRef.once('value');
    return artPieceSnapshot.val();
  }
  return null;
};

type GetArtist = (artistId: string) => Promise<ArtistType | null>;
export const getArtist: GetArtist = async artistId => {
  const artistRef = database ? database.ref(`artists/${artistId}`) : null;
  if (artistRef) {
    const artistSnapshot = await artistRef.once('value');
    return await artistSnapshot.val();
  }
  return null;
};

type GetArtPieceFromArtist = (artistId: string) => Promise<ArtPieceType[]>;
export const getArtPieceFromArtist: GetArtPieceFromArtist = async artistId => {
  const artpieceRef = database ? database.ref('/artpieces') : null;
  let res: ArtPieceType[] = [];
  if (artpieceRef) {
    const artistSnapshot = await artpieceRef.once('value');
    artistSnapshot.forEach(function(child) {
      if (child.val().artistId === artistId) res.push(child.val());
    });
  }
  return res;
};

type GetArtPieceFromArtType = (arttypeId: string) => Promise<ArtPieceType[]>;
export const getArtPieceFromArtType: GetArtPieceFromArtType = async arttypeId => {
  const artpieceRef = database ? database.ref('/artpieces') : null;
  let res: ArtPieceType[] = [];
  if (artpieceRef) {
    const artistSnapshot = await artpieceRef.once('value');
    artistSnapshot.forEach(function(child) {
      if (child.val().typeOfArtPieces === arttypeId) {
        const artPiece: ArtPieceType = child.val();
        res.push(artPiece);
      }
    });
  }
  return res;
};

type ListenToCartChange = (
  userId: string,
  cartId: ?string,
  callback: (cart: ?CartType) => void
) => void;
export const listenToCartChange: ListenToCartChange = (
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

type GetCart = (userId: string) => Promise<?CartType>;
export const getCart: GetCart = async userId => {
  const cartRef = database
    ? database.ref(`/cart/`).orderByChild('timestamp')
    : null;

  if (cartRef) {
    const cartSnapshot = await cartRef.once('value');
    const res: CartType[] = [];
    cartSnapshot.forEach(function(child) {
      Object.keys(child.val()).forEach(key => {
        if (child.val()[key].id === userId) res.push(child.val()[key]);
      });
    });

    return res.length ? res[res.length - 1] : null;
  }
};

type GetArtists = (callback: (ArtistType[]) => void) => void;
export const getArtists: GetArtists = callback => {
  const artistRef = database ? database.ref('/artists') : null;
  const artists: ArtistType[] = [];
  if (artistRef) {
    artistRef.on('value', snap => {
      snap.forEach(child => {
        artists.push(child.val());
      });
      callback(artists);
    });
  }
};

type GetArtTypes = (callback: (ArtTypeType[]) => void) => void;
export const getArtTypes: GetArtTypes = callback => {
  const arttypeRef = database ? database.ref('/arttypes') : null;
  const arttypes: ArtTypeType[] = [];
  if (arttypeRef) {
    arttypeRef.on('value', snap => {
      snap.forEach(child => {
        arttypes.push(child.val());
      });
      callback(arttypes);
    });
  }
};

type GetLastArtist = (callback: (ArtistType) => void) => void;
export const getLastArtist: GetLastArtist = callback => {
  const artistRef = database ? database.ref('/artists') : null;
  if (artistRef) {
    artistRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};
type GetLastOrder = (callback: (FirebaseOrderType) => void) => void;
export const getLastOrder: GetLastOrder = callback => {
  const ordersRef = database ? database.ref('/orders') : null;
  if (ordersRef) {
    ordersRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

type GetLastCallback = (callback: (FirebaseCallbackType) => void) => void;
export const getLastCallback: GetLastCallback = callback => {
  const callbackRef = database ? database.ref('/callbacks') : null;
  if (callbackRef) {
    callbackRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

type GetLastArtPiece = (callback: (ArtPieceType) => void) => void;
export const getLastArtPiece: GetLastArtPiece = callback => {
  const artPieceRef = database ? database.ref('/artpieces') : null;
  if (artPieceRef) {
    artPieceRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

type GetLastArtType = (callback: (ArtTypeType) => void) => void;
export const getLastArtType: GetLastArtType = callback => {
  const artTypeRef = database ? database.ref('/arttypes') : null;
  if (artTypeRef) {
    artTypeRef.on('child_added', snap => {
      callback(snap.val());
    });
  } else {
    console.log('database not initiated');
  }
};

type GetUserExtraInfos = (
  key: string,
  callback: (info: any) => void
) => Promise<void>;
export const getUserExtraInfos: GetUserExtraInfos = async (key, callback) => {
  if (database) {
    const ref = database.ref('/userDatas/' + key);

    // Attach an asynchronous callback to read the data at our posts reference
    const userSnapshot = await ref.once('value');
    callback(userSnapshot.val());
  }
};

type GetCurrentUser = () => ?FirebaseUser;
export const getCurrentUser: GetCurrentUser = () => {
  if (auth) {
    return auth.currentUser;
  }
  return null;
};

type LogOut = () => Promise<void>;
export const logOut: LogOut = async () => {
  if (auth) {
    await auth.signOut();
  }
};

type UpdateArtist = (artist: ArtistType) => null;
export const updateArtist: UpdateArtist = artist => {
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

type UpdateArtPieceToFirebase = (artpiece: ArtPieceType) => null;
export const updateArtPieceToFirebase: UpdateArtPieceToFirebase = artpiece => {
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

type UpdateArtTypeInFirebase = (arttype: ArtTypeType) => Transaction | null;
export const updateArtTypeInFirebase: UpdateArtTypeInFirebase = arttype => {
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
