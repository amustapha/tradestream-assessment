<template>
  <div class="w-14 bg-gray h-screen z-10">
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-10">
        <div
          class="text-white bg-primary-500 w-10 h-10 text-2xl rounded-full flex items-center justify-center font-black mx-auto"
        >
          L
        </div>

        <nav class="flex flex-col">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="group w-40 py-4 pl-4 border-l-4 gap-4 border-transparent flex flex-row hover:bg-gray-900 hover:text-primary-500 hover:border-primary-500"
          >
            <component :is="link.icon" class="w-6 h-6" />
            <span class="invisible group-hover:visible">{{ link.label }}</span>
          </a>
        </nav>
      </div>

      <div
        class="text-white bg-primary-500 w-10 h-10 text-xl rounded-full flex items-center justify-center font-bold mx-auto"
      >
        AM
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import {
    TvIcon,
    ChartBarIcon,
    ArrowTrendingUpIcon,
    CalendarIcon,
    NewspaperIcon,
  } from "@heroicons/vue/24/solid";

  const navLinks = ref([
    {
      icon: TvIcon,
      href: "#title",
      label: "Title",
    },
    {
      icon: ChartBarIcon,
      href: "#second-title",
      label: "Second Title",
    },
    {
      icon: ArrowTrendingUpIcon,
      href: "#third-title",
      label: "Third Title",
    },
    {
      icon: CalendarIcon,
      href: "#fourth-title",
      label: "Fourth Title",
    },
    {
      icon: NewspaperIcon,
      href: "#final-title",
      label: "Final Title",
    },
  ]);
</script>
