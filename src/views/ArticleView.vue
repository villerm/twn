<template>
  <div class="container max-w-[1000px] m-auto text-left">
    <div v-if="loading">
      <img :src="loaderIcon" class="animate-spin w-28 h-28 mx-auto" />
    </div>
    <div v-else>
      <h1
        class="
          text-2xl
          leading-6
          sm:leading-10
          sm:text-[45px]
          text-center
          uppercase
          font-bold
          mb-[30.15px]
        "
      >
        {{ article.title }}
      </h1>
      <div v-html="article.intro" class="font-bold intro"></div>
      <ArticleImage :image="article.image" />
      <div v-html="article.body"></div>
      <div class="flex -mx-4">
        <div
          v-for="item in article.tags"
          :key="item"
          class="bg-pink-1 py-2 px-4 rounded-[2rem] ml-4 text-sm font-bold"
          tabindex="0"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import loaderIcon from "../assets/images/loader.svg";
import ArticleImage from "../components/articleImage.vue";

const articleId = ref("");
const article = ref([]);
const route = useRoute();
const errorMessage = ref("");
const loading = ref(true);

onMounted(async () => {
  articleId.value = route.params.id;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const results = await fetch(
      "https://midaiganes.irw.ee/api/list/" + articleId.value,
      options
    ).then((response) => response.json());
    article.value = results;
    loading.value = false;
  } catch (error) {
    errorMessage.value = error;
  }
});
</script>
<style lang="scss" scoped>
.intro {
  font-family: "Open Sans";
}
</style>