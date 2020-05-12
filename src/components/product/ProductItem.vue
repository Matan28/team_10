<template>
  <div class="mb-3 col-sm-6 col-md-4 item" :class="{ 'list-group-item': displayList }">
    <div class="thumbnail card">
      <div class="img-event intrinsic">
        <img :src="item.thumbnail_url" alt="" class="grow thumbnail-image card-img-top intrinsic-item p-3" />
      </div>
      <div class="card-body">
        <router-link :to="'/product/' + item.id" tag="h5" class="card-title"
          ><a>{{ item.name }}</a></router-link
        >

        <p class="card-text truncate">
          {{ item.brand }}
        </p>
        <p class="card-category-text truncate">
          {{ item.category }}
        </p>

        <h6 class="card-subtitle mb-2 remain pull-left">{{ item.totalQuantity }} left in stock</h6>
        <input type="number" class="form-control text-center col-3 pull-right" :value="item.quantity" @input="updateQuantity" min="0" max="10" />
        <br /><br />
        <div class="row">
          <p class="col-6 lead">₪ {{ item.price }}</p>
          <p class="col-6">
            <button class="btn btn-success pull-right" :disabled="item.totalQuantity === 0" @click="addItem()">
              Add to cart
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      inputValue: 0,
    };
  },
  props: ["item", "displayList"],
  methods: {
    ...mapActions(["updateCart"]),
    addItem() {
      const order = {
        item: Object.assign({}, this.item),
        quantity: this.inputValue,
        isAdd: true,
      };
      this.updateCart(order);
    },
    updateQuantity(event) {
      this.inputValue = parseInt(event.target.value);
    },
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + "...";
      } else {
        return value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div.card {
  height: 100%;
}

.card-text {
  font-size: 1rem;
  color: orange;
}

.remain {
  color: #d17581;
}

.grow {
  transition: all 0.3s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}

.list-group-item {
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 30px;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 1rem;
  border: 0;
  .thumbnail {
    display: inline-block;
    width: 100%;
  }
  .img-event {
    width: 20%;
    float: left;
    padding: 0 !important;
    margin: 0;
    height: auto;
  }

  .thumbnail-image {
    position: static;
  }

  .card-body {
    float: left;
    width: 80%;
    margin: 0;
  }
  .form-control {
    width: 105px;
  }

  @media (max-width: 767.98px) {
    .img-event {
      width: 30%;
      float: left;
      padding: 0 !important;
      margin: 0;
    }

    .card-body {
      float: left;
      width: 70%;
      margin: 0;
    }
    .form-control {
      width: 105px;
    }
  }
}
.form-control {
  width: 105px;
}

.item.list-group-item:before,
.item.list-group-item:after {
  display: table;
  content: " ";
}

.item.list-group-item:after {
  clear: both;
}
</style>
