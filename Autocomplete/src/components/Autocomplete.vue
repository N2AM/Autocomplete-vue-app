<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import books from "../data/books.json";
import cities from "../data/cities.json";
import { Book } from "../components/models/book.model";

let searchTerm = ref("");
let search = ref(null);
let notFound = false;

let citiesList = cities as string[];
let booksList = books as Book[];

onMounted(() => {
  search.value?.focus();
});

let searchCities = computed({
  get: () => {
    if (searchTerm.value === "" || searchCities?.value[0] == searchTerm.value) {
      notFound = false;
      return [];
    } else {
      notFound = false;

      let cities = citiesList.filter((city) => {
        if (
          searchTerm.value.length >= 3 &&
          city?.toLowerCase().includes(searchTerm.value?.toLowerCase())
        ) {
          return city;
        }
      });
      if (
        searchTerm.value !== "" &&
        searchTerm.value.length >= 3 &&
        cities[0] !== searchTerm.value
      ) {
        notFound = true;
      }
      return cities;
    }
  },
  set: (cities) => {
    return cities;
  },
});

const selectCity = (city) => {
  searchTerm.value = city;
};
</script>

<template>
  <div
    class="bg-gray-50 min-w-screen min-h-screen flex justify-center items-center"
  >
    <div class="max-w-xs relative space-y-3">
      <label for="search" class="text-gray-900">
        Type the name of a city to search
      </label>

      <input
        type="text"
        id="search"
        ref="search"
        placeholder="Type here at least 3 characters..."
        v-model="searchTerm"
        class="p-3 mb-0.5 w-full border border-gray-300 rounded capitalize"
      />
      <ul
        v-if="searchCities?.length"
        class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10"
      >
        <li class="px-1 pt-1 pb-2 font-bold border-b border-gray-200">
          Showing {{ searchCities.length }} of {{ cities.length }} results
        </li>
        <li
          v-for="city in searchCities"
          :key="city"
          @click="selectCity(city)"
          class="cursor-pointer hover:bg-gray-100 p-1 capitalize"
        >
          <a href="#" class="w-full block"> {{ city }}</a>
        </li>
      </ul>
      <p v-if="notFound" class="text-lg pt-2 absolute">
        You have selected: <span class="font-semibold">No result found</span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
