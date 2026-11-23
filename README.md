# VanBerto's — O Dia da Criança

Jogo de plataformas educativo (Phaser 3, módulos ES, sem build) sobre os Direitos das Crianças.
Motor da Missão Internet Segura v14 (chaves, blocos «?», plataformas que caem, feixes, vento, bosses com proteção, PWA offline) com o conteúdo do Dia da Criança: 20 níveis em 4 mundos, 4 bosses (Vírus Gigante, Monstro da Ignorância, Poluidor Mecânico, Guardião das Sombras), perguntas, artefactos e conquistas.

- Conteúdo: `data-levels.js`, `data-quiz.js`, `data-story.js`, `data-bosses.js`, `data-progression.js`, `data-flavor.js`.
- Motor: `game/`. Desenhos dos bosses e itens: `textures.js`.
- Perguntas: temas 4–11 com banco Fácil, Difícil e Extremo (data-quiz.js); os restantes temas usam o banco base nas 3 dificuldades.
- Gravação: chave `vanbertos_dia_crianca_save_v1`.

- Versão: v18 (carimbo 20261123ff1, igual no sw.js, no index.html e nos imports).
- Ao publicar uma nova versão, muda esse carimbo em todos os ficheiros para os telemóveis largarem a cache antiga.
- v17: vilões deixam de girar no ar — têm pés, sombra fixa no chão e animação de passos (textures.js `_w0/_w1`, level.js `spawnVilao`, scene.js `updateMalware`); urso de peluche redesenhado (56×62).
- v18: fundos novos dos 4 mundos (mundo1-4.webp e map-mundo1-4.webp; mundo3_escuro.webp refeito a partir do novo mundo 3); bosses Monstro da Ignorância e Poluidor Mecânico assentam no chão (bossY 443).
