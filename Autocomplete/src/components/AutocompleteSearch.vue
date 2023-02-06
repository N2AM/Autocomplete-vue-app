<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Book } from "./models/book.model";

const props = defineProps<{
  entity: (string | Book)[];
}>();
let entityName = ref(Object.keys(props.entity)[0]);

let searchTerm = ref("");
let search = ref(null);
let notFound = false;

onMounted(() => {
  // When the page loads the search field should the first search input selected automatically
  if (entityName.value !== "book") {
    search.value?.focus();
  }
});

let searchEntity = computed({
  get: () => {
    if (
      searchTerm.value === "" ||
      searchEntity.value?.find((entity) =>
        entity.title
          ? entity.title === searchTerm.value
          : entity === searchTerm.value
      )
    ) {
      notFound = false;
      return [];
    } else {
      notFound = false;

      const entityList = Object.values(props.entity).flat(1);
      let cities = entityList.filter((entity: string | Book) => {
        if (
          entity.title &&
          searchTerm.value.length >= 3 &&
          entity.title?.toLowerCase().includes(searchTerm.value?.toLowerCase())
        ) {
          return entity;
        } else if (
          !entity.title &&
          searchTerm.value.length >= 3 &&
          entity?.toLowerCase().includes(searchTerm.value?.toLowerCase())
        ) {
          return entity;
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

const selectEntity = (entity): void => {
  searchTerm.value = entity.title ? entity.title : entity;
};
// unit test
defineExpose({ searchEntity });
</script>

<template>
  <div class="px-4">
    <div class="max-w-xs px-4 relative space-y-3">
      <label for="search" class="text-gray-900">
        Type the name of a {{ entityName }} to search
      </label>

      <input
        type="text"
        id="search"
        :data-testId="'search-' + entityName"
        ref="search"
        placeholder="Type here at least 3 characters..."
        v-model="searchTerm"
        class="p-3 mb-0.5 w-full border border-gray-300 rounded capitalize"
      />
      <ul
        v-if="searchEntity?.length"
        class="w-full rounded bg-white border border-gray-300 px-4 py-2 space-y-1 absolute z-10"
      >
        <li
          data-testId="result-counts"
          class="px-1 pt-1 pb-2 font-bold border-b border-gray-200"
        >
          Showing {{ searchEntity.length }} of {{ entity.length }} results
        </li>
        <li
          v-for="entity in searchEntity"
          :key="entity"
          @click="selectEntity(entity)"
          class="cursor-pointer hover:bg-gray-100 p-1 capitalize"
        >
          <a v-if="entity.title" href="#" class="w-full block">
            title: {{ entity.title }}
            <p>Author: {{ entity.author }}</p></a
          >
          <a v-else>{{ entity }}</a>
        </li>
      </ul>

      <p data-testId="not-found" v-if="notFound" class="text-lg pt-2 absolute">
        <span class="font-semibold">No result found</span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
