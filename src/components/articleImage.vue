<template>
  <div class="image w-full relative">
    <img
      :src="props.image.large"
      :alt="props.image.title"
      :title="props.image.title"
      class="w-full object-contain opacity-0 absolute"
      tabindex="0"
    />
    <div
      class="
        image__title
        absolute
        bottom-0
        left-0
        w-full
        z-30
        bg-black/50
        py-2.5
        px-6
      "
      v-html="props.image.title"
    ></div>

    <div class="image__fade">
      <div
        class="image__fade__image"
        :style="{ backgroundImage: 'url(' + props.image.large + ')' }"
      ></div>
    </div>
    <div
      class="image__face"
      :style="{ backgroundImage: 'url(' + props.image.large + ')' }"
    ></div>
  </div>
</template>
<script setup>
const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.image {
  display: block;
  padding-bottom: 50%;
  position: relative;
  transform: translate(0);

  &__face,
  &__fade {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    transition: transform 0.2s;
    background: center center no-repeat;
  }
  &__fade {
    z-index: 1;
    overflow: hidden;
    &__image {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: -0.625rem;
      background: center center no-repeat;
      background-size: cover;
      filter: blur(0.625rem);
      transition: transform 0.3s;
    }
  }
  &__face {
    background-size: contain;
  }
  &:hover {
    .image__fade__image {
      transform: scale(1.2);
    }
    .image__face {
      transform: scale(1.05);
    }
  }
}
</style>