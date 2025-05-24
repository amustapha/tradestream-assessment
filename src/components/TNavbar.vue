<template>
  <div class="w-14 bg-gray h-screen z-10 pb-8">
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-10">
        <svg
          width="36"
          height="48"
          viewBox="0 0 36 48"
          class="mx-auto my-4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M35.1436 30.4258L17.4414 47.9997C13.8672 44.453 13.8672 38.7015 17.4414 35.1548L28.6793 24.0113L20.7742 16.167L35.047 16.2629L35.1436 30.4258Z"
            fill="#65C49D"
          ></path>
          <path
            d="M18.5576 12.8449L7.32774 23.9964L15.2249 31.8327L0.95207 31.7369L0.855469 17.5739L18.5576 0C22.1318 3.54673 22.1318 9.29819 18.5576 12.8449Z"
            fill="#65C49D"
          ></path>
        </svg>

        <nav class="flex flex-col">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="group py-2.5 pl-4 border-l-4 gap-2 border-transparent flex flex-row items-center hover:w-36 hover:bg-gray-900 hover:text-primary-500 hover:border-primary-500"
            :class="{
              'bg-gray-900 text-primary-500 border-primary-500': link.active,
            }"
          >
            <component :is="link.icon" class="size-6 p-0.5" />
            <span class="hidden group-hover:block text-sm">{{
              link.label
            }}</span>
          </a>
        </nav>
      </div>

      <div
        class="text-white bg-primary-800 size-8 rounded-full flex items-center justify-center font-semibold mx-auto"
      >
        AM
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import {
    ChartBarIcon,
    ArrowTrendingUpIcon,
    CalendarIcon,
    NewspaperIcon,
    HomeIcon,
    Squares2X2Icon,
  } from "@heroicons/vue/24/solid";

  const navLinks = ref([
    {
      icon: HomeIcon,
      href: "#",
      label: "Home",
      active: true,
    },
    {
      icon: Squares2X2Icon,
      href: "#title",
      label: "Dashboard",
    },
    {
      icon: ChartBarIcon,
      href: "#second-title",
      label: "Reports",
    },
    {
      icon: ArrowTrendingUpIcon,
      href: "#third-title",
      label: "Analytics",
    },
    {
      icon: CalendarIcon,
      href: "#fourth-title",
      label: "Calendar",
    },
    {
      icon: NewspaperIcon,
      href: "#final-title",
      label: "Trades",
    },
  ]);
</script>
