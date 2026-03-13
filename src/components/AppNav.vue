<template>
  <nav
    class="sticky top-0 z-50 flex items-center justify-between px-12 py-5 border-b border-[var(--border)] bg-[rgba(15,15,15,0.92)] backdrop-blur-[10px]"
  >
    <span class="font-mono text-sm text-pink tracking-[0.05em]">adailton.dev</span>

    <div class="flex gap-7">
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

    <div class="flex items-center gap-2.5">
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
  </nav>
</template>

<script setup>
import { Github, Linkedin, Mail } from 'lucide-vue-next'

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
