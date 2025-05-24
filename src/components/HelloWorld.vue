<script setup>
  import { ref } from "vue";

  defineProps({
    id: String,
    title: String,
  });
</script>

<template>
  <h1 class="text-3xl font-bold mt-8" :id="id">{{ title }}</h1>

  <p class="text-sm">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, urna
    eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum nisi nisl eget
    sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada
    fames ac turpis egestas. Suspendisse potenti. Etiam euismod, urna eu
    tincidunt consectetur, nisi nisl aliquam enim, nec dictum nisi nisl eget
    sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada
    fames ac turpis egestas. Suspendisse potenti. Etiam euismod, urna eu
    tincidunt consectetur, nisi nisl aliquam enim, nec dictum nisi nisl eget
    sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada
    fames ac turpis egestas. Suspendisse potenti. Nullam ac urna eu felis
    dapibus condimentum sit amet a augue. Sed non neque elit. Sed ut imperdiet
    nisi. Proin condimentum fermentum nunc. Etiam pharetra, erat sed fermentum
    feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque.
    Suspendisse in orci enim. Pellentesque habitant morbi tristique senectus et
    netus et malesuada fames ac turpis egestas. Suspendisse potenti. Etiam
    euismod, urna eu tincidunt consectetur, nisi nisl aliquam enim, nec dictum
    nisi nisl eget sapien. Pellentesque habitant morbi tristique senectus et
    netus et malesuada fames ac turpis egestas. Suspendisse potenti. Vestibulum
    ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
    Etiam at risus et justo dignissim congue. Donec congue lacinia dui, a
    porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget
    odio ac lectus vestibulum faucibus eget in metus. In pellentesque faucibus
    vestibulum. Nulla at nulla justo, eget luctus tortor. Nulla facilisi. Duis
    aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia
    scelerisque tempor, lacus lacus ornare ante, ac egestas est urna sit amet
    arcu. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
    per inceptos himenaeos. Sed molestie augue sit amet leo consequat posuere.
    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
    cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem
    ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed
    urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed
    nec diam eu diam mattis viverra. Nulla fringilla, orci ac euismod semper,
    magna diam porttitor mauris, quis sollicitudin sapien justo in libero.
    Vestibulum mollis mauris enim. Morbi euismod magna ac lorem rutrum
    elementum. Donec viverra auctor lobortis. Pellentesque eu est a nulla
    placerat dignissim. Morbi a enim in magna semper bibendum. Etiam
    scelerisque, nunc ac egestas consequat, odio nibh euismod nulla, eget auctor
    orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc
    gravida congue sed sit amet purus. Fusce nec tellus sed augue semper porta.
    Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti
    sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
    Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur
    tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.
    Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc
    egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus
    non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla
    metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque
    volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent
    per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna
    non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis
    turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a
    tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices.
    Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod
    lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa
    mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis
    in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia
    molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue
    congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec
    lacus nunc, viverra nec. Praesent blandit dolor. Sed non quam. In vel mi sit
    amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet.
    Donec lacus nunc, viverra nec. Praesent blandit dolor. Sed non quam. In vel
    mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis
    laoreet. Donec lacus nunc, viverra nec. Praesent blandit dolor. Sed non
    quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet
    pede facilisis laoreet. Donec lacus nunc, viverra nec. Praesent blandit
    dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in
    ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec.
  </p>
</template>
