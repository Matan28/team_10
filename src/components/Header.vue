<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <a class="navbar-brand" href="/">Sce Online</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item dropdown">
          <a class="btn btn-dark dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Categories
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#">category 1</a>
            <a class="dropdown-item" href="#">category 2</a>
            <a class="dropdown-item" href="#">category 3</a>
          </div>
        </li>
        <li class="nav-item">
          <a class="btn btn-dark" href="/login" v-if="!isLoggedIn" active-class="active">Login</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-dark" href="/Sales" v-if="isLoggedIn && isStudent" active-class="active">Sales</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-dark" href="/" v-if="isLoggedIn" active-class="active">My Orders</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-dark" @click="logout" v-if="isLoggedIn" active-class="active">Logout ({{ currentUser.email }})</a>
        </li>

        <router-link to="/cart" id="checkout" class="btn btn-success" tag="button">
          Checkout
          <div class="badge badge-warning">Items:{{ numItems }} Total: ₪{{ cartValue }}</div>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isNavOpen: false,
      categories: [
        {
          category: "Web",
        },
        {
          category: "Design",
        },
        {
          category: "Videos",
        },
      ],
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "cartValue", "currentUser", "cartItemList"]),
    numItems() {
      return this.cartItemList.reduce((total, item) => {
        total += item.quantity;
        return total;
      }, 0);
    },
    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
  },
  methods: {
    ...mapActions(["logout", "isStudent"]),
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen;
    },
    studentEmail() {
      return this.currentUser.email.toLowerCase().includes("@ac.sce.ac.il");
    },
  },
};
</script>

<style>
#checkout {
  margin-right: 1px !important;
}
.navbar-brand {
  color: rgb(255, 196, 0) !important;
}

.navbar-nav .btn {
  color: rgb(192, 192, 192);
}
.navbar-nav .btn:hover {
  color: white;
}
</style>
