<template>
  <article
    class="bg-bg-card rounded-xl cursor-pointer overflow-hidden flex flex-col transition-all duration-150 hover:-translate-y-0.5"
    :class="post.type === 'article' ? 'sm:col-span-2' : 'col-span-1'"
    style="border: 1px solid var(--border)"
    @mouseenter="(e) => (e.currentTarget.style.borderColor = 'var(--border-hover)')"
    @mouseleave="(e) => (e.currentTarget.style.borderColor = 'var(--border)')"
    @click="router.push(`/blog/${post.slug}`)"
  >
    <!-- Artigo: thumb quadrada + texto lado a lado (só em sm+) -->
    <div v-if="post.type === 'article'" class="flex flex-col sm:flex-row h-full">
      <div class="w-full sm:w-40 h-40 sm:h-auto shrink-0 overflow-hidden">
        <img
          :src="post.cover"
          :alt="post.title"
          class="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div class="flex flex-col gap-2 p-[18px] flex-1">
        <span class="badge-article">Artigo</span>
        <h3 class="font-serif font-semibold text-[15px] md:text-[17px] leading-snug text-[#e0e0e0]">
          {{ post.title }}
        </h3>
        <p v-if="post.excerpt" class="font-serif italic text-xs text-white/35 leading-relaxed">
          {{ post.excerpt }}
        </p>
        <div class="flex items-center gap-2 font-mono text-[10px] text-white/25 mt-auto">
          <span>{{ formattedDate }}</span
          ><span>·</span><span>{{ post.readTime }}</span>
        </div>
      </div>
    </div>

    <!-- Quick / Tip -->
    <div v-else class="flex flex-col gap-2 p-[18px] flex-1">
      <span :class="post.type === 'tip' ? 'badge-tip' : 'badge-quick'">{{ typeLabel }}</span>
      <h3 class="font-serif font-semibold text-[13px] leading-snug text-[#e0e0e0]">
        {{ post.title }}
      </h3>
      <div class="flex items-center gap-2 font-mono text-[10px] text-white/25 mt-auto">
        <span>{{ formattedDate }}</span
        ><span>·</span><span>{{ post.readTime }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ post: { type: Object, required: true } })
const router = useRouter()

const typeLabel = computed(
  () => ({ quick: 'Post rápido', tip: 'Dica' })[props.post.type] ?? props.post.type,
)

const formattedDate = computed(() =>
  new Date(props.post.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }),
)
</script>
