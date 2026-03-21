<template>
  <div class="navbar bg-orange-300 text-primary-content">
    <div class="navbar-start">
      <NuxtLink to="/" class="btn btn-gray text-xl">Restaurant Finder</NuxtLink>
    </div>
    <div class="navbar-end">
      <AppThemeToggle />
      <button class="btn btn-gray">
        Sign In using Github<Icon name="tabler:brand-github" size="24" />
      </button>
    </div>
  </div>
</template>
