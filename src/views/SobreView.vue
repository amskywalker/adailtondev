<template>
  <main>
    <section class="section-container pt-14 pb-10">
      <p class="font-mono text-xs text-pink tracking-widest uppercase mb-4">// sobre</p>
      <h1 class="text-3xl md:text-4xl font-semibold text-white leading-tight mb-5">
        Engenheiro Back-end<br />
        <span class="text-white/30">com sede de aprender.</span>
      </h1>
      <p class="text-sm text-white/40 leading-relaxed max-w-lg">
        De apostilas online aos 14 anos ao Tech Lead de uma prefeitura. Uma jornada construída na
        persistência, no estudo e na vontade de ser melhor do que o eu de ontem.
      </p>
    </section>

    <section class="section-container pb-12">
      <p class="font-mono text-[10px] text-white/25 tracking-widest uppercase mb-4">
        stack principal
      </p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in stack"
          :key="tech.label"
          class="font-mono text-xs px-3 py-1 rounded-[4px]"
          :style="tech.style"
          >{{ tech.label }}</span
        >
      </div>
    </section>

    <div class="section-container" style="border-top: 1px solid var(--border)" />

    <section class="section-container py-14">
      <div class="text-center mb-10">
        <p class="font-mono text-[10px] text-white/25 tracking-widest uppercase mb-2">trajetória</p>
        <h2 class="text-2xl font-semibold text-white tracking-wide">Jornada nas Estrelas</h2>
      </div>

      <!-- Trilho desktop -->
      <div ref="trilhoRef" class="relative hidden md:flex items-center justify-between mb-14 px-2">
        <div
          class="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
          style="background: var(--border)"
        />
        <div
          class="ship-wrap absolute z-20 top-1/2 pointer-events-none"
          :style="{ left: shipLeft + 'px', transform: 'translate(-50%, -50%)' }"
        >
          <div class="ship-trail" />
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d="M2 7 L10 2 L20 7 L10 12 Z" fill="#e84393" opacity="0.9" />
            <ellipse
              cx="13"
              cy="7"
              rx="3"
              ry="2"
              fill="rgba(255,255,255,0.15)"
              stroke="#e84393"
              stroke-width="0.5"
            />
            <path d="M8 9 L4 13 L10 10 Z" fill="#a97bff" opacity="0.7" />
            <path d="M8 5 L4 1 L10 4 Z" fill="#a97bff" opacity="0.7" />
          </svg>
        </div>
        <button
          v-for="(item, index) in timeline"
          :key="item.year"
          :ref="
            (el) => {
              if (el) dotRefs[index] = el
            }
          "
          class="relative z-10 font-mono text-xs transition-all duration-200"
          :class="activeYear === item.year ? 'text-pink' : 'text-white/30 hover:text-white/60'"
          @click="selectYear(item.year, index)"
        >
          <span
            class="block w-2 h-2 rounded-full mx-auto mb-2 transition-all duration-200"
            :class="activeYear === item.year ? 'bg-pink scale-125' : 'bg-white/20'"
          />
          {{ item.year }}
        </button>
      </div>

      <!-- Seletor mobile: dropdown -->
      <div class="md:hidden mb-8 flex items-center gap-3">
        <button
          class="p-2 rounded-md text-white/40 hover:text-white transition-colors"
          style="border: 1px solid var(--border)"
          :disabled="activeIndex === 0"
          @click="selectYear(timeline[activeIndex - 1].year, activeIndex - 1)"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div class="flex-1 text-center">
          <span class="font-mono text-sm text-pink">{{ activeYear }}</span>
          <span class="font-mono text-xs text-white/25 ml-2"
            >{{ activeIndex + 1 }}/{{ timeline.length }}</span
          >
        </div>

        <button
          class="p-2 rounded-md text-white/40 hover:text-white transition-colors"
          style="border: 1px solid var(--border)"
          :disabled="activeIndex === timeline.length - 1"
          @click="selectYear(timeline[activeIndex + 1].year, activeIndex + 1)"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <!-- Card do ano ativo -->
      <transition name="fade" mode="out-in">
        <div :key="activeYear">
          <div
            v-if="activeEntry.lightspeed"
            class="relative rounded-xl overflow-hidden h-52 md:h-64 flex items-center justify-center"
            style="border: 1px solid var(--border)"
          >
            <div class="lightspeed-bg absolute inset-0" />
            <div class="relative z-10 text-center px-4">
              <p class="font-mono text-xs text-pink tracking-widest uppercase mb-3">
                em rota de colisão com o futuro
              </p>
              <p class="text-2xl font-semibold text-white">{{ activeEntry.year }}</p>
              <p class="text-sm text-white/40 mt-2 max-w-xs mx-auto leading-relaxed">
                {{ activeEntry.text }}
              </p>
            </div>
          </div>

          <div
            v-else
            class="flex flex-col md:items-center md:gap-10"
            :class="activeEntry.flip ? 'md:flex-row-reverse' : 'md:flex-row'"
          >
            <div
              class="w-full md:w-64 shrink-0 rounded-xl overflow-hidden mb-6 md:mb-0"
              style="border: 1px solid var(--border)"
            >
              <img
                v-if="activeEntry.photo"
                :src="activeEntry.photo"
                :alt="`${activeYear}`"
                class="w-full h-48 object-cover block"
              />
              <div
                v-else
                class="w-full h-48 flex items-center justify-center font-mono text-white/10 text-xs"
                style="background: var(--color-bg-card)"
              >
                {{ activeEntry.year }}
              </div>
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-4 mb-4">
                <span class="text-2xl md:text-3xl font-semibold text-white">{{
                  activeEntry.year
                }}</span>
                <div class="flex-1 h-px" style="background: var(--border)" />
              </div>
              <p class="text-sm text-white/50 leading-relaxed max-w-md italic font-serif">
                {{ activeEntry.text }}
              </p>
              <div v-if="activeEntry.tag" class="mt-5">
                <span
                  class="font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-[3px]"
                  style="
                    background: var(--pink-dim);
                    color: var(--color-pink);
                    border: 1px solid var(--pink-border);
                  "
                  >{{ activeEntry.tag }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const stack = [
  {
    label: 'Java',
    style:
      'background: rgba(245,158,11,0.1); color: #F59E0B; border: 1px solid rgba(245,158,11,0.2)',
  },
  {
    label: 'Kotlin',
    style:
      'background: rgba(169,123,255,0.1); color: #a97bff; border: 1px solid rgba(169,123,255,0.2)',
  },
  {
    label: 'Spring Boot',
    style:
      'background: rgba(16,185,129,0.1); color: #10B981; border: 1px solid rgba(16,185,129,0.2)',
  },
  {
    label: 'Spring Cloud',
    style:
      'background: rgba(16,185,129,0.1); color: #10B981; border: 1px solid rgba(16,185,129,0.2)',
  },
  {
    label: 'PostgreSQL',
    style:
      'background: rgba(96,165,250,0.1); color: #60A5FA; border: 1px solid rgba(96,165,250,0.2)',
  },
  {
    label: 'Docker',
    style:
      'background: rgba(96,165,250,0.1); color: #60A5FA; border: 1px solid rgba(96,165,250,0.2)',
  },
  {
    label: 'Kafka',
    style:
      'background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.1)',
  },
  {
    label: 'AWS',
    style:
      'background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.1)',
  },
  {
    label: 'Vue.js',
    style:
      'background: rgba(16,185,129,0.1); color: #10B981; border: 1px solid rgba(16,185,129,0.2)',
  },
  {
    label: 'PHP',
    style:
      'background: rgba(169,123,255,0.1); color: #a97bff; border: 1px solid rgba(169,123,255,0.2)',
  },
]

const timeline = [
  {
    year: 2017,
    flip: false,
    photo: '/sobre/2017.png',
    tag: 'O início',
    text: 'Tinha 14 anos e uma certeza: havia algo maior além do que o mundo ao redor oferecia. Encontrou num projeto de informática a primeira fagulha. Matemática, lógica, apostilas online às madrugadas. Ninguém precisou mandar. A curiosidade era o combustível.',
  },
  {
    year: 2018,
    flip: true,
    photo: '/sobre/2018.png',
    tag: 'Primeiro lugar',
    text: 'Aos 15, passou em primeiro lugar no processo seletivo do Instituto Federal de Ciência e Tecnologia Sergipe. Não foi sorte. Foi a colheita de quem havia plantado no silêncio. O IFSE ensinaria a fazer, com as mãos e com precisão, com os melhores professores do Brasil.',
  },
  {
    year: 2019,
    flip: false,
    photo: '/sobre/2019.png',
    tag: 'Aprendizado',
    text: 'O instituto ensinou a fazer. A lógica de programação deixou de ser exercício e se tornou linguagem. Os conceitos primordiais foram gravados não na memória, mas no instinto. As armas estavam prontas.',
  },
  {
    year: 2020,
    flip: true,
    photo: '/sobre/2020.png',
    tag: 'Primeiro emprego',
    text: 'Três frentes ao mesmo tempo. Júnior na Agily, construindo aplicações reais com PHP e Vue.js para clientes de verdade. O TCC sendo escrito nas horas que sobravam. E um PIBIC sobre tecnologia e consumo energético, onde a pesquisa encontrou a engenharia. Foi o ano em que aprendeu que crescer rápido é uma escolha.',
  },
  {
    year: 2021,
    flip: false,
    photo: '/sobre/2021.png',
    tag: 'Universidade',
    text: 'A Universidade Federal de Sergipe abriu o capô. Não bastava mais fazer. Era preciso entender o motor por dentro, cada peça, cada razão. A teoria chegou não para substituir a prática, mas para dar a ela uma profundidade que a prática sozinha não alcança.',
  },
  {
    year: 2022,
    flip: true,
    photo: '/sobre/2022.png',
    tag: 'Pesquisa',
    text: 'O engajamento na vida acadêmica foi além das salas de aula. Eventos, debates, e então um convite inesperado: um projeto de pesquisa de algoritmos de inteligência artificial para extração de dados de poços de petróleo a partir de PDFs. Foi preciso criar, praticamente do zero, um interpretador capaz de traduzir PostScript em dados estruturados. Um problema sem manual. A solução nasceu da teimosia.',
  },
  {
    year: 2023,
    flip: false,
    photo: '/sobre/2023.png',
    tag: 'Júnior',
    text: 'A Procuradoria Municipal foi o campo de batalha real. Chegou júnior, cheio de ideias e com sede de provar. Cada desafio era um nível a superar. Cada entrega, uma promessa cumprida. A promoção para pleno não demorou.',
  },
  {
    year: 2024,
    flip: true,
    photo: '/sobre/2024.png',
    tag: 'Sênior',
    text: 'Técnica e maturidade cresceram juntas. O conhecimento deixou de ser apenas código e se tornou também gente. Comunicação, liderança, decisão sob pressão. A promoção para sênior confirmou o que a equipe já sabia: havia mais do que um bom desenvolvedor ali.',
  },
  {
    year: 2025,
    flip: false,
    photo: '/sobre/2025.png',
    tag: 'Tech Lead',
    text: 'A promoção a Tech Lead não foi apenas um título. Foi o momento em que a jornada individual se tornou responsabilidade coletiva. Passou a guiar times, tomar decisões de arquitetura e responder pelo que outros constroem. Um peso novo. Uma satisfação maior.',
  },
  {
    year: 2026,
    flip: true,
    photo: '/sobre/2026.png',
    tag: 'Presente',
    text: 'Membro técnico do Comitê de Transformação Digital da Prefeitura de Aracaju. Parcerias firmadas, programas de formação para o jovem cidadão elaborados. O código virou política pública. A engenharia virou impacto social. E a jornada continua.',
  },
  {
    year: 2027,
    flip: false,
    photo: null,
    tag: null,
    lightspeed: true,
    text: 'O destino ainda não tem nome. Mas a rota está traçada.',
  },
]

const activeYear = ref(2017)
const activeIndex = computed(() => timeline.findIndex((t) => t.year === activeYear.value))
const activeEntry = computed(() => timeline[activeIndex.value])

const trilhoRef = ref(null)
const dotRefs = ref([])
const shipLeft = ref(0)

function selectYear(year, index) {
  activeYear.value = year
  nextTick(() => {
    const dot = dotRefs.value[index]
    const trilho = trilhoRef.value
    if (dot && trilho) {
      const dotRect = dot.getBoundingClientRect()
      const trilhoRect = trilho.getBoundingClientRect()
      shipLeft.value = dotRect.left - trilhoRect.left + dotRect.width / 2
    }
  })
}

onMounted(() => {
  nextTick(() => {
    const firstDot = dotRefs.value[0]
    const trilho = trilhoRef.value
    if (firstDot && trilho) {
      const dotRect = firstDot.getBoundingClientRect()
      const trilhoRect = trilho.getBoundingClientRect()
      shipLeft.value = dotRect.left - trilhoRect.left + dotRect.width / 2
    }
  })
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.ship-wrap {
  transition: left 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: drop-shadow(0 0 4px rgba(232, 67, 147, 0.7));
}

.ship-trail {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 2px;
  background: linear-gradient(to left, rgba(232, 67, 147, 0.6), transparent);
  border-radius: 2px;
  animation: trail-pulse 0.8s ease-in-out infinite;
}

@keyframes trail-pulse {
  0%,
  100% {
    opacity: 0.4;
    width: 14px;
  }
  50% {
    opacity: 0.9;
    width: 22px;
  }
}

.lightspeed-bg {
  background: #000;
  overflow: hidden;
}
.lightspeed-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 0%, #000 70%);
  z-index: 1;
}
.lightspeed-bg::after {
  content: '';
  position: absolute;
  inset: -100%;
  background-image:
    radial-gradient(1px 80px at 10% 30%, rgba(255, 255, 255, 0.8) 0%, transparent 100%),
    radial-gradient(1px 120px at 25% 60%, rgba(255, 255, 255, 0.6) 0%, transparent 100%),
    radial-gradient(1px 60px at 40% 20%, rgba(255, 255, 255, 0.9) 0%, transparent 100%),
    radial-gradient(1px 100px at 55% 75%, rgba(255, 255, 255, 0.7) 0%, transparent 100%),
    radial-gradient(1px 90px at 70% 40%, rgba(255, 255, 255, 0.85) 0%, transparent 100%),
    radial-gradient(1px 110px at 82% 55%, rgba(255, 255, 255, 0.65) 0%, transparent 100%),
    radial-gradient(1px 70px at 92% 25%, rgba(255, 255, 255, 0.75) 0%, transparent 100%),
    radial-gradient(2px 140px at 15% 80%, rgba(232, 67, 147, 0.6) 0%, transparent 100%),
    radial-gradient(2px 130px at 65% 15%, rgba(169, 123, 255, 0.5) 0%, transparent 100%);
  animation: hyperspace 1.2s linear infinite;
  transform-origin: center center;
}

@keyframes hyperspace {
  0% {
    transform: scale(0.2);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>
