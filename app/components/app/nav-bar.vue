<script setup lang="ts">
import { useAuth } from "~/composables/auth";
import { useSession } from "~~/lib/auth-client";
const session = useSession();
const { loginGithub, handleLogout } = useAuth();
</script>
<template>
  <div class="navbar bg-primary text-primary-content">
    <div class="navbar-start ml-10">
      <NuxtLink to="/" class="btn btn-gray text-xl">Restaurant Finder</NuxtLink>
    </div>
    <div class="navbar-end mr-10">
      <AppThemeToggle />
      <button v-if="!session.data" @click="loginGithub" class="btn btn-gray">
        Sign In using Github<Icon name="tabler:brand-github" size="24" />
      </button>
      <div v-else class="dropdown dropdown-bottom">
        <div tabindex="0" role="button" class="btn m-1">
          {{ session.data.user.name }}
          <NuxtImg :src="session.data.user.image || undefined" width="24" />
        </div>
        <ul
          tabindex="-1"
          class="dropdown-content menu bg-base-100 rounded-box z-1 w-24 p-2 shadow-sm"
        >
          <li @click="handleLogout"><a>Sign out</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
