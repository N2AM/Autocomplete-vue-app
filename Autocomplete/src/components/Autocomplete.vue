<script setup lang="ts">
import AutocompleteSearch from "../components/AutocompleteSearch.vue";

import books from "../data/books.json";
import cities from "../data/cities.json";
import { Book } from "./models/book.model";

const citiesList = cities as string[];
const booksList = books as Book[];
const entites: [{ city: string[] }, { book: Book[] }] = [
  { city: citiesList },
  { book: booksList },
];
</script>
<template>
  <div class="flex flex-wrap justify-center items-center">
    <div
      v-for="entity of entites"
      v-bind:key="entity.key"
      class="bg-gray-50min-w-screen min-h-screen flex justify-center items-center"
    >
      <AutocompleteSearch :entity="entity" />
    </div>
  </div>
</template>
