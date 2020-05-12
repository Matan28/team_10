import Store from "./components/Store.vue";
import ShoppingCart from "./components/ShoppingCart.vue";
import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";
import Orders from "./components/Orders.vue";
import Sales from "./components/Sales.vue";

export const routes = [
  { path: "/", component: Store, name: "mainpage" },
  { path: "/cart", component: ShoppingCart, name: "shoppingcart" },
  { path: "/login", component: Login, name: "login", onlyGuest: true },
  { path: "/register", component: Register, name: "register", onlyGuest: true },
  { path: "/", component: Orders, name: "orders", onlyGuest: true },
  { path: "/sales", component: Sales, name: "sales" },
  { path: "*", redirect: "/" },
];
