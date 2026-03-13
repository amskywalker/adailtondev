<template>
  <main>
    <section class="section-container flex items-center justify-between py-16 gap-12">
      <div class="flex-1">
        <h1 class="text-[2.6rem] font-semibold text-white leading-[1.1] mb-3">
          Adailton<br />
          <span class="text-pink">Moura</span>
        </h1>

        <p class="text-base text-white/40 font-light mb-3">
          Engenheiro Back-end Senior -
          <strong class="font-mono font-semibold text-amber">Java</strong>
          /
          <strong class="font-mono font-semibold text-purple">Kotlin</strong>
        </p>

        <p class="text-sm text-white/30 leading-[1.7] max-w-[360px] mb-8">
          Construindo sistemas robustos e escaláveis. Apaixonado por arquitetura limpa, boas
          práticas e compartilhar o que aprendo.
        </p>

        <div class="flex gap-3 flex-wrap">
          <button class="btn-primary" @click="openCalendly">Agendar conversa</button>
          <a
            href="https://drive.google.com/file/d/12UfqHcmWcIKyb21Q8YxWTe-st5a3DmLc/view?usp=drive_link"
            target="_blank"
            class="btn-outline"
            >Ver currículo</a
          >
        </div>
      </div>

      <PixelAvatar />
    </section>

    <div class="section-container" style="border-top: 1px solid var(--border)" />

    <section class="section-container py-10 pb-[72px]">
      <div class="flex justify-end mb-6">
        <RouterLink
          to="/blog"
          class="text-xs text-pink opacity-70 hover:opacity-100 transition-opacity duration-150"
        >
          ver todas →
        </RouterLink>
      </div>

      <div class="grid grid-cols-3 gap-4 items-stretch">
        <PostCard v-for="post in recentPosts" :key="post.slug" :post="post" />
      </div>
    </section>
  </main>
</template>

<script setup>
import PixelAvatar from '../components/PixelAvatar.vue'
import PostCard from '../components/PostCard.vue'

const recentPosts = [
  {
    slug: 'arquitetura-hexagonal-spring-kotlin',
    type: 'article',
    cover: '/cover-hexagonal.png',
    title: 'Arquitetura Hexagonal na prática com Spring Boot e Kotlin',
    excerpt:
      'Como estruturar um projeto real separando domínio, aplicação e infraestrutura sem complicar demais.',
    date: '2026-03-12',
    readTime: '8 min de leitura',
  },
  {
    slug: 'codigo-resolve-menos-do-que-parece',
    type: 'quick',
    title: 'Código resolve menos problemas do que parece.',
    date: '2026-03-13',
    readTime: '1 min',
  },
  {
    slug: 'habito-e-o-remo',
    type: 'quick',
    title: 'O hábito é o remo que faz o seu barco andar.',
    date: '2026-03-10',
    readTime: '1 min',
  },
  {
    slug: 'calendly-popup-sem-framework',
    type: 'tip',
    title: 'Como configurar o Calendly como pop-up no seu site sem frameworks',
    date: '2026-03-08',
    readTime: '2 min',
  },
  {
    slug: 'hardware-rapido-software-lento',
    type: 'quick',
    title: 'Hardware rápido torna o software lento.',
    date: '2026-03-05',
    readTime: '1 min',
  },
]

function openCalendly() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: 'https://calendly.com/contatoadailtonmoura' })
  } else {
    window.open('https://calendly.com/contatoadailtonmoura', '_blank')
  }
}
</script>
