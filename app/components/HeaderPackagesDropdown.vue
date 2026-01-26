<script setup lang="ts">
const props = defineProps<{
  username: string
}>()

const { listUserPackages } = useConnector()

const isOpen = ref(false)
const isLoading = ref(false)
const packages = ref<Array<{ name: string; updated: string }>>([])
const hasLoaded = ref(false)

async function loadPackages() {
  if (hasLoaded.value || isLoading.value) return

  isLoading.value = true
  try {
    const pkgMap = await listUserPackages()
    if (pkgMap) {
      const pkgNames = Object.keys(pkgMap)

      // Fetch package info to get update times using our server API
      // Limit to 20 packages to avoid too many parallel requests
      const pkgInfoPromises = pkgNames.slice(0, 20).map(async name => {
        try {
          const response = await $fetch<{ time?: { modified?: string } }>(
            `/api/registry/${encodeURIComponent(name).replace('%40', '@')}`,
            { timeout: 5000 },
          )
          return {
            name,
            updated: response.time?.modified || '',
          }
        } catch {
          return { name, updated: '' }
        }
      })

      const results = await Promise.all(pkgInfoPromises)

      // Sort by most recently updated
      packages.value = results
        .filter(p => p.updated)
        .sort((a, b) => b.updated.localeCompare(a.updated))
        .slice(0, 10)

      // If we couldn't get update times, fall back to alphabetical
      if (packages.value.length === 0) {
        packages.value = pkgNames
          .sort()
          .slice(0, 10)
          .map(name => ({ name, updated: '' }))
      }
    }
    hasLoaded.value = true
  } finally {
    isLoading.value = false
  }
}

function handleMouseEnter() {
  isOpen.value = true
  if (!hasLoaded.value) {
    loadPackages()
  }
}

function handleMouseLeave() {
  isOpen.value = false
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    isOpen.value = false
  }
}

function getPackageUrl(pkgName: string): string {
  return `/${pkgName}`
}
</script>

<template>
  <div
    class="relative"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @keydown="handleKeydown"
  >
    <NuxtLink
      :to="`/~${username}`"
      class="link-subtle font-mono text-sm inline-flex items-center gap-1"
    >
      packages
      <span
        class="i-carbon-chevron-down w-3 h-3 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </NuxtLink>

    <Transition
      enter-active-class="transition-all duration-150"
      leave-active-class="transition-all duration-100"
      enter-from-class="opacity-0 translate-y-1"
      leave-to-class="opacity-0 translate-y-1"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 w-64 bg-bg-elevated border border-border rounded-lg shadow-lg z-50 overflow-hidden"
      >
        <div class="px-3 py-2 border-b border-border">
          <span class="font-mono text-xs text-fg-subtle">Your Packages</span>
        </div>

        <div v-if="isLoading" class="px-3 py-4 text-center">
          <span class="text-fg-muted text-sm">Loading...</span>
        </div>

        <ul v-else-if="packages.length > 0" class="py-1 max-h-80 overflow-y-auto">
          <li v-for="pkg in packages" :key="pkg.name">
            <NuxtLink
              :to="getPackageUrl(pkg.name)"
              class="block px-3 py-2 font-mono text-sm text-fg hover:bg-bg-subtle transition-colors truncate"
            >
              {{ pkg.name }}
            </NuxtLink>
          </li>
        </ul>

        <div v-else class="px-3 py-4 text-center">
          <span class="text-fg-muted text-sm">No packages found</span>
        </div>

        <div class="px-3 py-2 border-t border-border">
          <NuxtLink
            :to="`/~${username}`"
            class="link-subtle font-mono text-xs inline-flex items-center gap-1"
          >
            View all
            <span class="i-carbon-arrow-right w-3 h-3" />
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
