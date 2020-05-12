import { ref, firebaseAuth } from "../config/firebaseConfig";

export const updateCart = ({ commit }, { item, quantity, isAdd }) => {
  // TODO: Call service
  commit("UPDATE_CART", { item, quantity, isAdd });
  if (isAdd && quantity != 0) {
    let message_obj = {
      message: `Add ${item.name} to cart successfully`,
      messageClass: "success",
      autoClose: true,
    };
    var updateQuantity = {};
    var id = item.id - 1;
    updateQuantity["/products/" + id + "/totalQuantity"] = item.totalQuantity - quantity;
    ref.update(updateQuantity);
    commit("ADD_MESSAGE", message_obj);
  }
};

export const removeItemInCart = ({ commit }, { item }) => {
  commit("REMOVE_CART_ITEM", { item });
  // var updateQuantity = {};
  // var id = item.id - 1;
  // updateQuantity["/products/" + id + "/totalQuantity"] = item.totalQuantity - quantity;
  // ref.update(updateQuantity);
};

export const isStudent = () => {
  let email = firebaseAuth().currentUser.email;
  return email.toLowerCase().includes("@ac.sce.ac.il");
};

export const registerByEmail = (_, { email, password }) => {
  return firebaseAuth().createUserWithEmailAndPassword(email, password);
};

export const logout = ({ commit }) => {
  commit("SET_CART", []); // clear current cart
  return firebaseAuth().signOut();
};

export function loginWithEmail(_, { email, password }) {
  return firebaseAuth().signInWithEmailAndPassword(email, password);
}

export function listenToProductList({ commit }) {
  return ref.child("products").on("value", (products) => {
    commit("UPDATE_PRODUCT_LIST", products.val());
  });
}

export function getShoppingCart({ commit }, { uid, currentCart }) {
  if (uid) {
    return ref
      .child("cart/" + uid)
      .once("value")
      .then((cart) => {
        if (cart.val() && (!currentCart || currentCart.length == 0)) {
          commit("SET_CART", cart.val());
        }
      });
  } else {
    // console.log("User has not logged in");
  }
}

export function saveShoppingCart(_, { uid, cartItemList }) {
  return ref.child("cart/" + uid).set(cartItemList);
}

export function saveToTransaction(_, { uid, cartItemList }) {
  let newTransactionKey = ref.child("transactions").push().key;
  var newTransaction = {},
    orderDate = {},
    orderDeliveryDate = {},
    orderDeliveryAddress = {};
  var date = new Date();

  var day = String(date.getDate()).padStart(2, "0");
  var month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var year = date.getFullYear();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  date = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;

  newTransaction["/transactions/" + uid + "/" + newTransactionKey + "/products"] = cartItemList;
  orderDate["/transactions/" + uid + "/" + newTransactionKey + "/orderDate"] = date;
  orderDeliveryDate["/transactions/" + uid + "/" + newTransactionKey + "/orderDeliveryDate"] = "";
  orderDeliveryAddress["/transactions/" + uid + "/" + newTransactionKey + "/orderDeliveryAddress"] = "";
  ref.update(orderDate);
  ref.update(orderDeliveryDate);
  ref.update(orderDeliveryDate);
  return ref.update(newTransaction);
}
