<template>
  <nav
    class="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(15,15,15,0.92)] backdrop-blur-[10px]"
  >
    <div class="flex items-center justify-between px-6 md:px-12 py-4 md:py-5">
      <span class="font-mono text-sm text-pink tracking-[0.05em]">adailton.dev</span>

      <!-- Desktop links -->
      <div class="hidden md:flex gap-7">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="text-sm text-white/40 transition-colors duration-150 hover:text-white"
          active-class="!text-white"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <!-- Desktop socials -->
      <div class="hidden md:flex items-center gap-2.5">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          :aria-label="social.label"
          :target="social.href.startsWith('mailto') ? undefined : '_blank'"
          class="w-8 h-8 flex items-center justify-center rounded-md text-white/50 transition-all duration-150 hover:text-pink hover:border-pink"
          style="border: 1px solid rgba(255, 255, 255, 0.1)"
          @mouseenter="(e) => (e.currentTarget.style.background = 'var(--pink-dim)')"
          @mouseleave="(e) => (e.currentTarget.style.background = 'transparent')"
        >
          <component :is="social.icon" :size="14" :stroke-width="1.75" />
        </a>
      </div>

      <!-- Mobile: socials + hamburger -->
      <div class="flex md:hidden items-center gap-3">
        <a
          v-for="social in socials"
          :key="social.label"
          :href="social.href"
          :aria-label="social.label"
          :target="social.href.startsWith('mailto') ? undefined : '_blank'"
          class="text-white/40 hover:text-pink transition-colors"
        >
          <component :is="social.icon" :size="16" :stroke-width="1.75" />
        </a>
        <button
          class="text-white/40 hover:text-white transition-colors ml-1"
          @click="menuOpen = !menuOpen"
          aria-label="Menu"
        >
          <component :is="menuOpen ? X : Menu" :size="20" :stroke-width="1.75" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="menuOpen"
      class="md:hidden border-t border-[var(--border)] px-6 py-4 flex flex-col gap-4"
    >
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="text-sm text-white/40 hover:text-white transition-colors"
        active-class="!text-white"
        @click="menuOpen = false"
      >
        {{ link.label }}
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { Github, Linkedin, Mail, Menu, X } from 'lucide-vue-next'

const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Home' },
  { to: '/sobre', label: 'Sobre' },
  // { to: '/projetos', label: 'Projetos' },
  // { to: '/blog', label: 'Blog' },
]

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/amskywalker' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/adailton-moura' },
  { icon: Mail, label: 'Email', href: 'mailto:contatoadailtonmoura@gmail.com' },
]
</script>
