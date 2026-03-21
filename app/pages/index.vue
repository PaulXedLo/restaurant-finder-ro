<script setup lang="ts">
import { useSession } from "~~/lib/auth-client";
const session = useSession();
</script>
<template>
  <div class="hero bg-base-300 container mx-auto mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Local restaurants</h1>
        <p class="py-6">Find your best local restaurant in Romania!</p>
        <button v-if="!session.data" class="btn btn-primary">
          Sign In using Github<Icon name="tabler:brand-github" size="24" />
        </button>
        <button v-else class="btn btn-primary">
          Find the best places to eat
        </button>
      </div>
    </div>
  </div>
</template>
