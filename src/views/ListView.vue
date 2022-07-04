<template>
  <div class="container max-w-[1000px] m-auto">
    <h1>Nimekiri</h1>
    <div class="loading" v-if="loading">
      <img :src="loaderIcon" class="animate-spin w-28 h-28 mx-auto" />
    </div>
    <div class="table-container" v-else>
      <table class="w-full">
        <thead>
          <tr class="bg-gray-2">
            <th v-for="item in tableHeaders" :key="item">
              <button
                @click="filterBy(item.name)"
                v-if="item.filter"
                :aria-label="item.title"
                class="w-full text-left"
              >
                {{ item.title }}

                <component
                  :is="FontAwesomeIcon"
                  :icon="
                    activeFilters.name === item.name &&
                    activeFilters.sort === 'up'
                      ? 'sort-up'
                      : activeFilters.name === item.name &&
                        activeFilters.sort === 'down'
                      ? 'sort-down'
                      : 'sort'
                  "
                />
              </button>
              <span v-else>
                {{ item.title }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in filteredList" :key="item.id">
            <tr
              class="even:bg-gray-3 odd:dark:bg-gray-800 hover:cursor-pointer"
              role="button"
              @keydown.enter="handleTableItem(item.id)"
              @click.enter="handleTableItem(item.id)"
              :class="
                activeItem == item.id
                  ? 'even:bg-white odd:bg-white text-gray-1'
                  : ''
              "
              tabindex="0"
            >
              <td tabindex="0">{{ item.firstname }}</td>
              <td tabindex="0">{{ item.surname }}</td>
              <td tabindex="0">{{ item.sex }}</td>
              <td tabindex="0">{{ formatDate(item.date) }}</td>
              <td tabindex="0">{{ item.phone }}</td>
            </tr>
            <tr v-if="activeItem == item.id" class="bg-white text-gray-1">
              <td colspan="5">
                <div class="flex">
                  <img
                    :src="item.image.small"
                    :alt="item.image.title"
                    class="w-[12.5rem] h-[12.5rem] m-1.5 object-cover"
                    tabindex="0"
                  />
                  <div class="pl-4">
                    <div
                      v-html="excerpt(item.body, 305, '...')"
                      tabindex="0"
                    ></div>
                    <a
                      :href="'/article/' + item.id"
                      class="
                        inline-block
                        mt-5
                        mb-4
                        py-[.85em]
                        px-[2.5em]
                        uppercase
                        text-xs
                        font-bold
                        bg-green-1
                        border-b-4 border-green-2
                        hover:bg-green-3
                      "
                      >Loe rohkem</a
                    >
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <Pagination
        :startPage="1"
        :currentPage="currentPage"
        :totalPages="list.length / rowsPerPage"
        :perPage="rowsPerPage"
        :maxVisibleButtons="5"
        @pagechanged="changePages"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import loaderIcon from "../assets/images/loader.svg";
import Pagination from "../components/pagination.vue";

const listTemplate = ref({
  firstname: "",
  surname: "",
  sex: "",
  date: "",
  phone: "",
});

const tableHeaders = [
  {
    name: "firstname",
    title: "Nimi",
    filter: true,
  },
  {
    name: "surname",
    title: "Perekonnanimi",
    filter: true,
  },
  {
    name: "sex",
    title: "Sugu",
    filter: true,
  },
  {
    name: "date",
    title: "Sünnikuupäev",
    filter: true,
  },
  {
    name: "phone",
    title: "Telefon",
    filter: false,
  },
];

const list = ref([]);
const errorMessage = ref("");
const loading = ref(true);
const rowsPerPage = ref(10);
const currentPage = ref(1);
const activeItem = ref("");
const activeFilters = ref({
  name: "",
  sort: "",
});

const filteredList = computed(() => {
  const name = activeFilters.value.name;
  const sort = activeFilters.value.sort;
  let start = (currentPage.value - 1) * rowsPerPage.value;
  let end = start + rowsPerPage.value;
  let items = [...list.value];
  const results =
    sort === "" ? list.value : items.sort(sortMethods(name, sort));
  return results.filter((row, index) => {
    if (index >= start && index < end) return row;
  });
});

onMounted(async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const results = await fetch(
      "https://midaiganes.irw.ee/api/list?limit=500",
      options
    ).then((response) => response.json());

    list.value = results.list
      .map((x) => ({ ...listTemplate, ...x }))
      .map((x) => ({
        ...x,
        sex: x.sex === "m" ? "Mees" : "Naine",
        phone:
          x.phone.substring(0, 4) + " " + x.phone.substring(4, x.phone.length),
        date: getBirthdayFromId(x.personal_code),
      }));
    loading.value = false;
  } catch (error) {
    errorMessage.value = error;
  }
});

watch(
  () => activeFilters.value.name,
  (value) => {
    activeFilters.value = {
      name: value,
      sort: "down",
    };
  }
);

function sortMethods(name, sort) {
  switch (name) {
    case "date": {
      const date =
        name.substring(5, 9) +
        "-" +
        name.substring(2, 4) +
        "-" +
        name.substring(0, 2);
      return sort === "down"
        ? (a, b) => new Date(b[name]) - new Date(a[name])
        : (a, b) => new Date(a[name]) - new Date(b[name]);
    }
    default: {
      return sort === "down"
        ? (a, b) => (b[name] > a[name] ? -1 : a[name] > b[name] ? 1 : 0)
        : (a, b) => (a[name] > b[name] ? -1 : b[name] > a[name] ? 1 : 0);
    }
  }
}

function getBirthdayFromId(number) {
  const date = number.toString();
  let year;
  const century = parseInt(date.substring(0, 1));
  switch (true) {
    case century <= 2:
      year = 18;
      break;
    case century <= 4:
      year = 19;
      break;
    case century <= 6:
      year = 20;
      break;
  }
  return (
    year +
    date.toString().substring(1, 3) +
    "-" +
    date.substring(3, 5) +
    "-" +
    date.substring(5, 7)
  );
}

function formatDate(date) {
  return (
    date.substring(8, 10) +
    "." +
    date.substring(5, 7) +
    "." +
    date.toString().substring(0, 4)
  );
}

function filterBy(name) {
  activeFilters.value.name = name;
  activeFilters.value.sort === ""
    ? (activeFilters.value.sort = "down")
    : activeFilters.value.sort === "down"
    ? (activeFilters.value.sort = "up")
    : (activeFilters.value.sort = "");
}

function changePages(amount) {
  currentPage.value = amount;
}
function handleTableItem(id) {
  activeItem.value == id ? (activeItem.value = "") : (activeItem.value = id);
}
function excerpt(string, max, suffix) {
  //TODO: need to check if last character is comma before space
  return string.length < max
    ? string
    : `${string.substr(
        0,
        string.substr(0, max - suffix.length).lastIndexOf(" ")
      )}${suffix}`;
}
</script>

<style scoped lang="scss">
h1 {
  font-size: 2.8125rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1.9688rem;
  text-align: center;
}

table {
  thead {
    font-family: Arial, Helvetica, sans-serif;
  }
  tr {
    border-bottom: 1px solid #fff;
    &.active {
    }
  }
  td,
  th {
    width: 20%;
    padding: 10px 16px;
    text-align: left;
  }
}
.table-container {
  width: 100%;
  overflow-x: auto;
}
</style>