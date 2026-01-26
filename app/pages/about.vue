<script setup lang="ts">
useSeoMeta({
  title: 'About - npmx',
  description: 'About npmx.dev - a better npm package explorer',
})
</script>

<template>
  <main class="container py-8 sm:py-12 max-w-2xl">
    <header class="mb-8">
      <h1 class="font-mono text-2xl sm:text-3xl font-medium mb-4">About</h1>
    </header>

    <div class="prose prose-invert">
      <p class="text-fg-muted text-lg mb-6">
        <span class="font-mono text-fg">npmx.dev</span> is a better way to explore npm packages.
      </p>

      <section class="mb-8">
        <h2 class="font-mono text-lg font-medium mb-3">Features</h2>
        <ul class="list-disc list-inside text-fg-muted space-y-2">
          <li>Fast package search with keyboard navigation</li>
          <li>Browse package files and source code</li>
          <li>View organization members and teams</li>
          <li>Manage npm permissions with the local CLI connector</li>
        </ul>
      </section>

      <section class="mb-8">
        <h2 class="font-mono text-lg font-medium mb-3">Local CLI Connector</h2>
        <p class="text-fg-muted mb-4">
          The optional CLI connector lets you manage npm permissions directly from the web
          interface. It runs locally and uses your existing npm authentication.
        </p>
        <pre
          class="bg-bg-subtle border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto"
        ><code>npx npmx-connector</code></pre>
        <div
          class="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm text-yellow-200"
        >
          <p class="flex items-start gap-2">
            <span class="i-carbon-warning-alt w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              The npm package isn't published yet. For now, clone the
              <a
                href="https://github.com/npmx-dev/npmx.dev"
                target="_blank"
                rel="noopener noreferrer"
                class="underline hover:text-yellow-100"
                >repository</a
              >
              and run
              <code class="font-mono bg-yellow-500/20 px-1 rounded">pnpm npmx-connector</code>.
            </span>
          </p>
        </div>
      </section>

      <section class="mb-8">
        <h2 class="font-mono text-lg font-medium mb-3">Links</h2>
        <ul class="space-y-2">
          <li>
            <a
              href="https://github.com/npmx-dev/npmx.dev"
              target="_blank"
              rel="noopener noreferrer"
              class="link-subtle font-mono text-sm inline-flex items-center gap-1.5"
            >
              <span class="i-carbon-logo-github w-4 h-4" />
              GitHub Repository
            </a>
          </li>
          <li>
            <a
              href="https://github.com/npmx-dev/npmx.dev/issues"
              target="_blank"
              rel="noopener noreferrer"
              class="link-subtle font-mono text-sm inline-flex items-center gap-1.5"
            >
              <span class="i-carbon-warning w-4 h-4" />
              Report an Issue
            </a>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>
