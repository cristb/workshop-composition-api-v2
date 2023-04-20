<script setup>
import { ref, computed } from "vue";
import ProductCard from "./components/ProductCard.vue";
import { useFetch } from "./composables/useFetch";
import { useSort } from "./composables/useSort";

const query = ref("phone");
const url = computed(() => `https://dummyjson.com/products/search?q=${query.value}`);

// loading products
const { data, loading } = useFetch(url);
const products = computed(() => data.value?.products || []);
const numberOfProducts = computed(() => products.value.length);

// ordering products
const orderBy = ref("price");
const desc = ref(false);
const { sorted: orderedProducts } = useSort(products, orderBy, desc);
</script>

<template>
  {{ url }}
  <div v-if="loading">loading...</div>
  <div v-else>
    <h1 class="text-2xl mb-5">Products ({{ numberOfProducts }})</h1>
    <label class="w-1/3"
      >Order by
      <select class="border-2 border-gray-300 rounded w-1/3" v-model="orderBy">
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
      <label class="pl-3 w-1/3">
        <input type="checkbox" v-model="desc" />
        Descending
      </label>
    </label>
    <input type="text" class="input-url" size="40" v-model="query" />

    <ul class="flex gap-4 flex-wrap flex-grow justify-center">
      <ProductCard
        v-for="product in orderedProducts"
        :key="product.id"
        :product="product"
        class="w-80"
      />
    </ul>
  </div>
</template>

<style>
body {
  padding: 30px;
}
.input-url {
  border: 1px solid black;
}
</style>
