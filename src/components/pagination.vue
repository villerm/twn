<template>
  <ul class="my-12 flex justify-center align-middle">
    <li>
      <button
        type="button"
        @click="onClickPreviousPage"
        :disabled="isInFirstPage"
        class="mx-2 rounded-full h-12 w-12"
      >
        <FontAwesomeIcon icon="chevron-left" />
      </button>
    </li>

    <!-- Visible Buttons Start -->

    <li v-for="page in pages" :key="page.name">
      <button
        type="button"
        @click="onClickPage(page.name)"
        :disabled="page.isDisabled"
        class="
          mx-2
          rounded-full
          h-12
          w-12
          border-gray-1
          hover:border-white
          border-2
        "
        :class="page.name === currentPage ? 'bg-white text-gray-2' : ''"
      >
        {{ page.name }}
      </button>
    </li>

    <!-- Visible Buttons End -->

    <li>
      <button
        type="button"
        @click="onClickNextPage"
        :disabled="isInLastPage"
        class="mx-2 rounded-full h-12 w-12"
      >
        <FontAwesomeIcon icon="chevron-right" />
      </button>
    </li>
  </ul>
</template>

<script setup>
import { ref, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  startPage: {
    type: Number,
    required: true,
    default: 0,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  perPage: {
    type: Number,
    required: true,
  },
  maxVisibleButtons: {
    type: Number,
    required: true,
    default: 5,
  },
});

const pages = computed(() => {
  const range = [];

  for (var i = min.value; i < max.value; i++) {
    range.push({
      name: i,
      isDisabled: i === props.currentPage,
    });
  }

  return range;
});

const min = computed(() => {
  if (props.currentPage < 4) {
    return 1;
  } else if (props.currentPage > props.totalPages - 3) {
    return props.totalPages - 4;
  } else {
    return props.currentPage - 2;
  }
});

const max = computed(() => {
  if (props.totalPages < 5) {
    return props.totalPages;
  } else if (props.currentPage < 4) {
    return 6;
  } else if (props.currentPage > props.totalPages - 3) {
    return props.totalPages + 1;
  } else {
    return props.currentPage + 3;
  }
});
const isInFirstPage = computed(() => {
  return props.currentPage === 1;
});

const isInLastPage = computed(() => {
  return props.currentPage === props.totalPages;
});

const emit = defineEmits(["pagechanged"]);

function onClickPreviousPage() {
  emit("pagechanged", props.currentPage - 1);
}

function onClickNextPage() {
  emit("pagechanged", props.currentPage + 1);
}

function onClickPage(page) {
  emit("pagechanged", page);
}
</script>