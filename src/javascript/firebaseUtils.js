//@flow

import type {
  ArtistType,
  ArtPieceType,
  ArtTypeType,
  CartType,
  OrderType,
  UserType,
  CallbackType,
  FirebaseUser
} from "../types/types";
import artistModel from "../models/artist";
import artPieceModel from "../models/artPiece";
import artTypeModel from "../models/artType";
import cartModel from "../models/cart";
import orderModel from "../models/order";
import userModel from "../models/user";
import callbackModel from "../models/callback";

import * as firebase from "firebase";

export let app = null;
export let database = null;
export let auth = null;
export let storage = null;

export const init = () => {
  const config = {
    apiKey: "AIzaSyCVHvfzWzV5p2G8VkXW7k_3ALHLuS_m-WQ",
    authDomain: "ohmyart-ee13a.firebaseapp.com",
    databaseURL: "https://ohmyart-ee13a.firebaseio.com",
    storageBucket: "ohmyart-ee13a.appspot.com",
    messagingSenderId: "564094140683.4"
  };
  app = firebase.initializeApp(config);
  database = app.database();
  auth = app.auth();
  storage = app.storage();
};

// add new section
export const addArtTypeToFirebase = (root: string, element: ArtTypeType) => {
  let key = database ? database.ref(root).push().key : null;
  const model = key
    ? artTypeModel(key, element, firebase.database.ServerValue.TIMESTAMP)
    : null;
  return database && key ? database.ref(root + "/" + key).set(model) : null;
};

export const addArtPieceToFirebase = (root: string, element: ArtPieceType) => {
  let key = database ? database.ref(root).push().key : null;
  const model = key
    ? artPieceModel(key, element, firebase.database.ServerValue.TIMESTAMP)
    : null;
  return database && key ? database.ref(root + "/" + key).set(model) : null;
};

export const addCartToFirebase = (root: string, element: CartType) => {
  console.log(element);
  console.log(root);
  let key = database ? database.ref(root).push().key : null;
  const model = key
    ? cartModel(element.uid, element, firebase.database.ServerValue.TIMESTAMP)
    : null;
  return database && key
    ? database.ref(root + "/" + element.uid + "/" + key).set(model)
    : null;
};

export const addArtistToFirebase = (root: string, element: ArtistType) => {
  let key = database ? database.ref(root).push().key : null;
  let model = key
    ? artistModel(key, element, firebase.database.ServerValue.TIMESTAMP)
    : null;

  return database && key ? database.ref(root + "/" + key).set(model) : null;
};

export const addOrderToFirebase = async (root: string, element: OrderType) => {
  let key = database ? database.ref(root).push().key : null;
  let model = key
    ? orderModel(key, element, firebase.database.ServerValue.TIMESTAMP)
    : null;

  return database && key
    ? await database.ref(root + "/" + key).set(model)
    : null;
};

export const addUserExtraInfosToFirebase = async (
  root: string,
  key: string,
  element: UserType
) => {
  let model = userModel(key, element, firebase.database.ServerValue.TIMESTAMP);
  return database && key
    ? await database.ref(root + "/" + key).set(model)
    : null;
};

export const addCallbackToFirebase = async (
  root: string,
  element: CallbackType
) => {
  let key = database ? database.ref(root).push().key : null;
  let model = key
    ? callbackModel(key, element, firebase.database.ServerValue.TIMESTAMP)
    : null;
  return database && key
    ? await database.ref(root + "/" + key).set(model)
    : null;
};

export function getArtPieces(callback: (Array<ArtPieceType>) => void) {
  const artPiecesRef = database ? database.ref("/artpieces") : null;
  const artPieces: Array<ArtPieceType> = [];
  if (artPiecesRef) {
    artPiecesRef.on("value", snap => {
      snap.forEach(child => {
        artPieces.push(child.val());
      });
      callback(artPieces);
    });
  }
}

export function getUsersExtraInfos(callback: (Array<UserType>) => void) {
  const userDatasRef = database ? database.ref("/userDatas") : null;
  const usersInfos: Array<ArtPieceType> = [];
  if (userDatasRef) {
    userDatasRef.on("value", snap => {
      snap.forEach(child => {
        usersInfos.push(child.val());
      });
      callback(usersInfos);
    });
  }
}
export function getArtPiece(
  artpieceId: string,
  callback: ArtPieceType => void
) {
  const artPiecesRef = database
    ? database.ref("/artpieces/" + artpieceId)
    : null;
  if (artPiecesRef) {
    artPiecesRef.on("value", snap => {
      snap.forEach(child => {
        callback(child.val());
      });
    });
  }
}
export async function getArtPiece2(artpieceId: string) {
  const artPiecesRef = database
    ? database.ref(`artpieces/${artpieceId}`)
    : null;
  if (artPiecesRef) {
    const artPieceSnapshot = await artPiecesRef.once("value");
    return artPieceSnapshot.val();
  }
  return null;
}

export async function getArtist2(artistId: string) {
  const artistRef = database ? database.ref(`artists/${artistId}`) : null;
  if (artistRef) {
    const artistSnapshot = await artistRef.once("value");
    return artistSnapshot.val();
  }
}

export function getArtist(artistId: string, callback: ArtistType => void) {
  const artistRef = database ? database.ref("/artists/" + artistId) : null;
  if (artistRef) {
    artistRef.on("value", snap => {
      snap.forEach(child => {
        callback(child.val());
      });
    });
  }
}

export async function getArtPieceFromArtist(artistId: string) {
  const artpieceRef = database ? database.ref("/artpieces") : null;
  let res: Array<ArtPieceType> = [];
  if (artpieceRef) {
    const artistSnapshot = await artpieceRef.once("value");
    artistSnapshot.forEach(function(child) {
      if (child.val().artistId === artistId) res.push(child.val());
    });
    return res;
  }
  return [];
}

export async function getArtPieceFromArtType(arttypeId: string) {
  const artpieceRef = database ? database.ref("/artpieces") : null;
  let res: Array<ArtPieceType> = [];
  if (artpieceRef) {
    const artistSnapshot = await artpieceRef.once("value");
    artistSnapshot.forEach(function(child) {
      if (child.val().typeOfArtPieces === arttypeId) res.push(child.val());
    });
    return res;
  }
}

export function listenToCartChange(
  userId: string,
  cartId: ?string,
  callback: any => any
) {
  if (cartId) {
    const cartRef = database ? database.ref(`/cart/${userId}/${cartId}`) : null;
    if (cartRef) {
      cartRef.on("value", snap =>
        snap.forEach(function(child) {
          console.log(child.val());
          if (child.val().active) callback(child.val());
          else {
            callback(null);
          }
        })
      );
    }
  }
}

export async function getCart(userId: string) {
  const cartRef = database
    ? database.ref(`/cart/`).orderByChild("timestamp")
    : null;

  if (cartRef) {
    const cartSnapshot = await cartRef.once("value");
    const res: Array<string> = [];
    cartSnapshot.forEach(function(child) {
      console.log(child.val());
      Object.keys(child.val()).forEach(key => {
        console.log(child.val()[key]);
        if (child.val()[key].id === userId) res.push(child.val()[key]);
      });
    });

    return res.length ? res[res.length - 1] : null;
  }
}

export function getArtists(callback: (Array<ArtistType>) => void) {
  const artistRef = database ? database.ref("/artists") : null;
  const artists: Array<ArtistType> = [];
  if (artistRef) {
    artistRef.on("value", snap => {
      snap.forEach(child => {
        artists.push(child.val());
      });
      callback(artists);
    });
  }
}

export function getArtTypes(callback: (Array<ArtTypeType>) => void) {
  const arttypeRef = database ? database.ref("/arttypes") : null;
  const arttypes: Array<ArtTypeType> = [];
  if (arttypeRef) {
    arttypeRef.on("value", snap => {
      snap.forEach(child => {
        arttypes.push(child.val());
      });
      callback(arttypes);
    });
  }
}

export function getLastArtist(callback: ArtistType => void) {
  const artistRef = database ? database.ref("/artists") : null;
  if (artistRef) {
    artistRef.on("child_added", snap => {
      console.log(snap.val());
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

export function getLastOrder(callback: OrderType => void) {
  const ordersRef = database ? database.ref("/orders") : null;
  if (ordersRef) {
    console.log(ordersRef);
    ordersRef.on("child_added", snap => {
      console.log(snap.val());
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

export function getLastCallback(callback: CallbackType => void) {
  const callbackRef = database ? database.ref("/callbacks") : null;
  if (callbackRef) {
    console.log(callbackRef);
    callbackRef.on("child_added", snap => {
      console.log(snap.val());
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

// export function getUsersExtraInfos(callback: UserType => void) {
//   const userDatasRef = database ? database.ref("/userDatas") : null;
//   if (userDatasRef) {
//     userDatasRef.on("child_added", snap => {
//       console.log(snap.val());
//       callback(snap.val());
//     });
//   } else {
//     console.log("database not initiated");
//   }
// }

export function getLastCartItem(userId: string, callback: CartType => void) {
  const artistRef = database ? database.ref(`/cart/${userId}`) : null;
  if (artistRef) {
    artistRef.on("child_added", snap => {
      console.log(snap.val());
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

export function getLastArtPiece(callback: ArtPieceType => void) {
  const artPieceRef = database ? database.ref("/artpieces") : null;
  if (artPieceRef) {
    artPieceRef.on("child_added", snap => {
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

export function getLastArtType(callback: ArtTypeType => void) {
  const artTypeRef = database ? database.ref("/arttypes") : null;
  if (artTypeRef) {
    artTypeRef.on("child_added", snap => {
      console.log(snap.val());
      callback(snap.val());
    });
  } else {
    console.log("database not initiated");
  }
}

export async function getUserExtraInfos(key: string, callback: any) {
  if (database) {
    const ref = database.ref("/userDatas/" + key);

    // Attach an asynchronous callback to read the data at our posts reference
    const userSnapshot = await ref.once("value");
    callback(userSnapshot.val());
  }
}

// export function listenToCartChange(userId: string) {
//   if (database) {
//     const cartRef = database.ref(`cart/${userId}`);
//
//     cartRef.on("value", function(data) {
//       console.log("update");
//       console.log(data.val());
//     });
//   }
// }

export async function getCurrentUser() {
  if (auth) {
    const user: firebaseUser = await auth.currentUser;
    return user;
  }
  return null;
}

export async function logOut() {
  if (auth) {
    await auth.signOut();
  }
}
