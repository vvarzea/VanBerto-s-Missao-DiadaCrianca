# VanBerto's — O Dia da Criança

Jogo de plataformas educativo (Phaser 3, módulos ES, sem build) sobre os Direitos das Crianças.
Motor da Missão Internet Segura v14 (chaves, blocos «?», plataformas que caem, feixes, vento, bosses com proteção, PWA offline) com o conteúdo do Dia da Criança: 20 níveis em 4 mundos, 4 bosses (Vírus Gigante, Monstro da Ignorância, Poluidor Mecânico, Guardião das Sombras), perguntas, artefactos e conquistas.

- Conteúdo: `data-levels.js`, `data-quiz.js`, `data-story.js`, `data-bosses.js`, `data-progression.js`, `data-flavor.js`.
- Motor: `game/`. Desenhos dos bosses e itens: `textures.js`.
- Perguntas: temas 4–11 com banco Fácil, Difícil e Extremo (data-quiz.js); os restantes temas usam o banco base nas 3 dificuldades.
- Gravação: chave `vanbertos_dia_crianca_save_v1`.

- Versão: v27 (carimbo 20261124c1, igual no sw.js, no index.html e nos imports).
- Ao publicar uma nova versão, muda esse carimbo em todos os ficheiros para os telemóveis largarem a cache antiga.
- v17: vilões deixam de girar no ar — têm pés, sombra fixa no chão e animação de passos (textures.js `_w0/_w1`, level.js `spawnVilao`, scene.js `updateMalware`); urso de peluche redesenhado (56×62).
- v18: fundos novos dos 4 mundos (mundo1-4.webp e map-mundo1-4.webp; mundo3_escuro.webp refeito a partir do novo mundo 3); bosses Monstro da Ignorância e Poluidor Mecânico assentam no chão (bossY 443).
- v19: vilões maiores (mini 50, patrol 66, jumper 80 px).
- v20: plataformas e chão com o estilo de cada mundo (textures.js makeWorldPlatformTexture): blocos/arenas de boss/plataformas móveis incluídos; sala secreta mantém o tema roxo.
- v21: estrela e livro redesenhados; vilões passam por baixo das plataformas baixas (collider em scene.js) com corpo ~70% do desenho.
- v22: Vírus Gigante ganha plataforma do meio; aviso do escudo deixa de piscar em modo estroboscópico.
- v22 (cont.): bosses de patrulha (Ignorância, Poluidor) andam com balanço de passo.
- v23: tela desenhada a 2× (RENDER_RES em scene.js, câmara com zoom, texto com resolution) e fundos 1920×1080 → imagem nítida em ecrãs grandes; ?res=1 força a resolução antiga.
- v24: proteção de arranque de 2,5s (spawnGrace) quando o nível começa; menu da professora «ir para nível N» já não retoma a física antes da transição (perdia-se vida no nível antigo).
- v25: ao entrar num nível a partir do mapa (e no menu da professora) o jogo fica travado até ao fim da transição — o watchdog retomava a física no nível antigo e perdia-se uma vida antes de jogar.
- v26: vilões mais coloridos e sempre com a mesma cor (textures.js): Sombra rosa, Espinho laranja, Bicho da Indiferença verde, Nuvem de Tempestade azul-violeta; explicação inicial (index.html) e dica (data-flavor.js) com as mesmas cores.
- v27: bosses — o VanBerto's já não começa ao lado do boss (perdia-se uma vida logo no arranque; agora entra na plataforma elevada mais afastada) e o boss deixou de flutuar acima do chão (corpo físico ajustado ao desenho, game/boss-art.js + boss-core.js).
