import { buildBossArt } from "./game/boss-art.js?v=20261123ii1";
// ===== Geração de texturas Phaser/canvas — VanBerto's =====
// Extraído de dia-crianca.js. Ficheiro 100% autocontido: cada função só
// depende do parâmetro `scene` (instância Phaser) e de constantes locais.
// Não lê nem escreve nenhum estado partilhado do jogo (score, player, etc.).
// Só makeTextures() e makePlatformTextureThemed() são chamadas a partir de
// dia-crianca.js — as restantes (makePlatformTexture, makeDoorTexture,
// makeVilaosTextures, makeBossTextures, makeSparkTexture, makeItemTextures,
// makeVanBertoTexture, rrPath, rrVan, cVan, cfVan, lVan) são de uso interno
// deste módulo, por isso não são exportadas.

// ===== TEXTURAS =====

function rrPath(ctx,x,y,w,h,r){
  ctx.beginPath();
  ctx.moveTo(x+r,y);
  ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
  ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
  ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
  ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
  ctx.closePath();
}
export function makeTextures(scene){
  makePlatformTexture(scene);
  makeDoorTexture(scene);
  makeVilaosTextures(scene);
  makeBossTextures(scene);
  buildBossArt(scene); // imagens dos bosses (ver game/boss-art.js)
  makeSparkTexture(scene);
  makeItemTextures(scene);
  makeVanBertoTexture(scene,"vanberto_open",false,-1);
  makeVanBertoTexture(scene,"vanberto_blink",true,-1);
  makeVanBertoTexture(scene,"vanberto_wink","wink",-1);
  makeVanBertoTexture(scene,"vanberto_happy","happy",-1);
  makeVanBertoTexture(scene,"vanberto_sad","sad",-1);
  makeVanBertoTexture(scene,"vanberto_walk1",false,0);
  makeVanBertoTexture(scene,"vanberto_walk2",false,1);
  makeVanBertoTexture(scene,"vanberto_jump",false,-1,true);
}

// Plataforma colorida estilo cartoon
function makePlatformTexture(scene){
  if(scene.textures.exists("platform_grass")) return;
  makePlatformTextureThemed(scene,"platform_grass",0);
}

// Cano à Mario (pedido: "atalhos ou áreas secretas") — rebordo largo em
// cima + corpo mais estreito a descer, em verde, ao estilo clássico.
export function makePipeTexture(scene){
  if (scene.textures.exists("pipe_mario")) return;
  const RIMW=76, RIMH=20, BODYW=64, BODYH=44;
  const totalW=RIMW, totalH=RIMH+BODYH;
  const bx=(RIMW-BODYW)/2;
  const g=scene.make.graphics({x:0,y:0,add:false});
  // corpo
  g.fillStyle(0x0d5c1e,1); g.fillRect(bx,RIMH,BODYW,BODYH);
  g.fillStyle(0x1e8c34,1); g.fillRect(bx+7,RIMH,BODYW-14,BODYH);
  g.fillStyle(0x5cd873,0.55); g.fillRect(bx+10,RIMH+3,7,BODYH-6);
  // rebordo (mais largo, dá o aspeto de "boca" do cano)
  g.fillStyle(0x0d5c1e,1); g.fillRoundedRect(0,0,RIMW,RIMH+8,6);
  g.fillStyle(0x1e8c34,1); g.fillRoundedRect(4,3,RIMW-8,RIMH,5);
  g.fillStyle(0x5cd873,0.6); g.fillRoundedRect(8,4,RIMW-16,5,3);
  // contornos
  g.lineStyle(3,0x063610,1);
  g.strokeRoundedRect(0,0,RIMW,RIMH+8,6);
  g.strokeRect(bx,RIMH,BODYW,BODYH);
  g.generateTexture("pipe_mario",totalW,totalH); g.destroy();
}

// Gera uma textura de plataforma para cada tema
const PLAT_COLORS=[
  [0x0d3878,0x1e5cb8,0x6aa8ff], // tema0 azul rico
  [0x6a1800,0xc04018,0xff8850], // tema1 crepúsculo
  [0x004858,0x0090a0,0x60e8f0], // tema2 aqua profundo
  [0x780840,0xc03070,0xffa0c8], // tema3 rosa
  [0x200060,0x4810a0,0xc080ff], // tema4 lilás noturno
  [0x003a3a,0x008888,0x40e8e0], // tema5 turquesa
  [0x6a1800,0xb84010,0xff9050], // tema6 laranja quente
  [0x001040,0x0848a0,0x60b8f8], // tema7 azul noturno
  [0x580020,0xa01060,0xff80b8], // tema8 magenta rico
  [0x081808,0x185c28,0x70d870], // tema9 floresta
  [0x7a4a00,0xd9921a,0xffd86a], // tema10 final dourado
];
export function makePlatformTextureThemed(scene, key, themeIdx){
  if(scene.textures.exists(key)) return;
  const [dark, mid, light] = PLAT_COLORS[themeIdx % PLAT_COLORS.length];
  const g=scene.make.graphics({x:0,y:0,add:false});
  // Sombra exterior — mais larga e deslocada para dar profundidade
  g.fillStyle(0x000000,0.40); g.fillRoundedRect(4,25,98,8,4);
  // Corpo principal
  g.fillStyle(dark,1);        g.fillRoundedRect(0,7,100,17,5);
  // Face superior (mais clara)
  g.fillStyle(mid,1);         g.fillRoundedRect(0,0,100,12,5);
  // Brilho suave no topo (efeito vidro)
  g.fillStyle(light,0.35);    g.fillRoundedRect(4,1,92,6,3);
  // Linha de brilho no topo
  g.lineStyle(2,light,0.75);  g.beginPath(); g.moveTo(5,2); g.lineTo(95,2); g.strokePath();
  // Aresta inferior arredondada
  g.fillStyle(dark,1);        g.fillRoundedRect(0,21,100,3,{bl:5,br:5,tl:0,tr:0});
  // Contorno exterior
  g.lineStyle(2.5,dark,1);    g.strokeRoundedRect(0,0,100,24,5);
  // Realce lateral esquerdo (efeito 3D)
  g.lineStyle(1.5,light,0.28); g.beginPath(); g.moveTo(2,6); g.lineTo(2,22); g.strokePath();
  g.generateTexture(key,100,32); g.destroy();
}


// ===== Plataformas por mundo (v20) =====
// Em vez de esticar uma barra azul de 100px, cada plataforma ganha uma textura do
// seu tamanho real (w×h), no estilo do mundo onde está: relva+pedra (Origens),
// blocos de brincar+madeira (Desenvolvimento), tronco com musgo (Proteção) e
// painel metálico com néon (Participação). A textura tem exatamente o tamanho do
// corpo físico, por isso a colisão não muda.
let _platWorld = "origens";
export function setPlatformWorld(id){ _platWorld = id || "origens"; }
export function getPlatformWorld(){ return _platWorld; }
export function platformWorldFromBg(bgKey){
  const k = String(bgKey||"");
  if(k.includes("desenvolvimento")) return "desenvolvimento";
  if(k.includes("protecao"))        return "protecao";
  if(k.includes("participacao"))    return "participacao";
  return "origens";
}
function seededRnd(seed){ let s=(seed>>>0)||1; return ()=>((s=(s*1664525+1013904223)>>>0)/4294967296); }
const PLAT_OUTLINE = { origens:"#5b3a1c", desenvolvimento:"#6b3a10", protecao:"#35200e", participacao:"#131a3a" };
const PLAT_DRAW = {
  origens(c,w,h,rnd){
    const t=Math.round(h*0.45);
    let g=c.createLinearGradient(0,0,0,h); g.addColorStop(0,"#e6c796"); g.addColorStop(1,"#b58654");
    c.fillStyle=g; c.fillRect(0,0,w,h);
    // blocos de pedra
    c.strokeStyle="rgba(110,70,35,0.55)"; c.lineWidth=1.2;
    const rows = (h-t)>=13 ? 2 : 1, bh=(h-t)/rows;
    for(let r=0;r<rows;r++){
      const y0=t+r*bh; c.beginPath(); c.moveTo(0,y0); c.lineTo(w,y0); c.stroke();
      for(let x=(r%2)*17+12;x<w;x+=34){ c.beginPath(); c.moveTo(x,y0); c.lineTo(x,y0+bh); c.stroke(); }
    }
    c.fillStyle="rgba(255,255,255,0.18)"; for(let x=6;x<w;x+=34){ c.fillRect(x,t+2,10,2); }
    // relva
    c.fillStyle="#5fc83f";
    for(let x=-2;x<w+6;x+=8){ c.beginPath(); c.arc(x,t,5.2,0,Math.PI*2); c.fill(); }
    g=c.createLinearGradient(0,0,0,t+5); g.addColorStop(0,"#8be85a"); g.addColorStop(1,"#3f9a2e");
    c.fillStyle=g; c.fillRect(0,0,w,t);
    c.fillStyle="#3f9a2e"; for(let x=-2;x<w+6;x+=8){ c.beginPath(); c.arc(x,t,5.2,0,Math.PI); c.fill(); }
    c.fillStyle="rgba(255,255,255,0.4)"; c.fillRect(0,1,w,2);
    // florzinhas
    const cols=["#ffffff","#ff8fb3","#ffd84a"];
    for(let x=18+rnd()*30;x<w-8;x+=44+rnd()*50){ c.fillStyle=cols[Math.floor(rnd()*3)]; c.beginPath(); c.arc(x,t*0.5,1.9,0,Math.PI*2); c.fill(); }
  },
  desenvolvimento(c,w,h,rnd){
    const t=Math.round(h*0.42);
    let g=c.createLinearGradient(0,0,0,h); g.addColorStop(0,"#f3bb63"); g.addColorStop(1,"#c27428");
    c.fillStyle=g; c.fillRect(0,0,w,h);
    // veios da madeira
    c.strokeStyle="rgba(110,55,10,0.28)"; c.lineWidth=1;
    for(let i=0;i<Math.max(6,w/18);i++){ const y=t+2+rnd()*(h-t-3), x=rnd()*w, l=14+rnd()*40; c.beginPath(); c.moveTo(x,y); c.lineTo(x+l,y+(rnd()-0.5)*1.5); c.stroke(); }
    // juntas das tábuas + parafusos
    for(let x=60;x<w;x+=60){ c.strokeStyle="rgba(90,45,5,0.5)"; c.lineWidth=1.3; c.beginPath(); c.moveTo(x,t); c.lineTo(x,h); c.stroke();
      c.fillStyle="#7a4a1f"; c.beginPath(); c.arc(x-6,t+(h-t)/2,1.7,0,Math.PI*2); c.fill();
      c.fillStyle="#7a4a1f"; c.beginPath(); c.arc(x+6,t+(h-t)/2,1.7,0,Math.PI*2); c.fill(); }
    // topo: blocos de brincar coloridos
    const bc=["#ff5d5d","#4da3ff","#ffd23f","#46c46a"], bw=26;
    for(let i=0,x=0;x<w;i++,x+=bw){ c.fillStyle=bc[i%4]; c.fillRect(x,0,bw,t);
      c.fillStyle="rgba(255,255,255,0.38)"; c.fillRect(x,1,bw,2.5);
      c.fillStyle="rgba(0,0,0,0.18)"; c.fillRect(x,t-2,bw,2);
      c.strokeStyle="rgba(0,0,0,0.28)"; c.lineWidth=1; c.beginPath(); c.moveTo(x+0.5,0); c.lineTo(x+0.5,t); c.stroke(); }
  },
  protecao(c,w,h,rnd){
    const t=Math.round(h*0.42);
    let g=c.createLinearGradient(0,0,0,h); g.addColorStop(0,"#a47040"); g.addColorStop(1,"#68421f");
    c.fillStyle=g; c.fillRect(0,0,w,h);
    // casca do tronco
    c.strokeStyle="rgba(45,22,8,0.5)"; c.lineWidth=1.3; c.lineCap="round";
    for(let i=0;i<Math.max(8,w/12);i++){ const x=rnd()*w, y=t+1+rnd()*(h-t-5), l=4+rnd()*(h-t)*0.6; c.beginPath(); c.moveTo(x,y); c.lineTo(x+(rnd()-0.5)*2,Math.min(h-1,y+l)); c.stroke(); }
    c.fillStyle="rgba(255,225,170,0.14)"; for(let x=10;x<w;x+=46){ c.fillRect(x,t+2,16,2); }
    // nós
    for(let x=40+rnd()*40;x<w-20;x+=90+rnd()*90){ c.fillStyle="#4b2d14"; c.beginPath(); c.ellipse(x,t+(h-t)*0.55,4.2,3,0,0,Math.PI*2); c.fill();
      c.strokeStyle="rgba(255,220,160,0.35)"; c.lineWidth=1; c.beginPath(); c.ellipse(x,t+(h-t)*0.55,2.2,1.4,0,0,Math.PI*2); c.stroke(); }
    // musgo
    g=c.createLinearGradient(0,0,0,t+6); g.addColorStop(0,"#86d44a"); g.addColorStop(1,"#3f8a2a");
    c.fillStyle=g; c.fillRect(0,0,w,t);
    for(let x=0;x<w+6;x+=5+rnd()*3){ const r=3+rnd()*3.2; c.fillStyle=rnd()<0.5?"#4f9d33":"#5fb53a"; c.beginPath(); c.arc(x,t,r,0,Math.PI); c.fill(); }
    c.fillStyle="rgba(255,255,255,0.3)"; c.fillRect(0,1,w,2);
    c.fillStyle="#b5ef7b"; for(let x=10+rnd()*20;x<w-6;x+=28+rnd()*30){ c.beginPath(); c.ellipse(x,t*0.45,3,1.5,-0.5,0,Math.PI*2); c.fill(); }
  },
  participacao(c,w,h,rnd){
    const t=Math.max(5,Math.round(h*0.34));
    let g=c.createLinearGradient(0,0,0,h); g.addColorStop(0,"#566aa8"); g.addColorStop(1,"#222a55");
    c.fillStyle=g; c.fillRect(0,0,w,h);
    // painéis
    for(let x=48;x<w;x+=48){ c.fillStyle="rgba(0,0,0,0.25)"; c.fillRect(x,t,1.5,h-t); c.fillStyle="rgba(255,255,255,0.12)"; c.fillRect(x+1.5,t,1,h-t);
      c.fillStyle="#c3cdff"; c.beginPath(); c.arc(x-7,t+(h-t)*0.5,1.4,0,Math.PI*2); c.fill(); c.beginPath(); c.arc(x+8,t+(h-t)*0.5,1.4,0,Math.PI*2); c.fill(); }
    // luzinhas
    for(let x=24;x<w;x+=96){ c.fillStyle="#ffd84a"; c.beginPath(); c.arc(x,t+(h-t)*0.5,2,0,Math.PI*2); c.fill(); c.fillStyle="rgba(255,216,74,0.35)"; c.beginPath(); c.arc(x,t+(h-t)*0.5,4,0,Math.PI*2); c.fill(); }
    // faixa de néon no topo
    g=c.createLinearGradient(0,0,0,t); g.addColorStop(0,"#b8f4ff"); g.addColorStop(0.5,"#5be3ff"); g.addColorStop(1,"#2aa4d8");
    c.fillStyle=g; c.fillRect(0,0,w,t);
    c.fillStyle="rgba(255,255,255,0.65)"; c.fillRect(0,1,w,1.6);
    c.fillStyle="rgba(91,227,255,0.28)"; c.fillRect(0,t,w,3);
    // aresta dourada em baixo
    c.fillStyle="#f5c542"; c.fillRect(0,h-3,w,3);
  }
};
export function makeWorldPlatformTexture(scene, world, w, h){
  w=Math.max(8,Math.round(w)); h=Math.max(8,Math.round(h));
  const wd = PLAT_DRAW[world] ? world : "origens";
  const key=`pw_${wd}_${w}x${h}`;
  if(scene.textures.exists(key)) return key;
  const tex=scene.textures.createCanvas(key,w,h), c=tex.getContext();
  const rnd=seededRnd(w*31+h*7), R=Math.min(7,h/3);
  c.save(); rrPath(c,0.5,0.5,w-1,h-1,R); c.clip();
  PLAT_DRAW[wd](c,w,h,rnd);
  c.restore();
  rrPath(c,1.2,1.2,w-2.4,h-2.4,R); c.lineWidth=2.4; c.strokeStyle=PLAT_OUTLINE[wd]; c.stroke();
  tex.refresh();
  return key;
}

// Portal de Estrela — fim do nível muito mais apelativo que uma porta
function makeDoorTexture(scene){
  if(scene.textures.exists("door_party")) return;
  const w=88, h=104, tex=scene.textures.createCanvas("door_party",w,h), ctx=tex.getContext();
  const cx=w/2, cy=h*0.46;

  // ── Aura exterior pulsante (desenhada estaticamente; a animação fica no update) ──
  // Camadas de brilho arco-íris (externas)
  const auras=[
    {r:44, c:"rgba(160,80,255,0.13)"},
    {r:38, c:"rgba(255,107,53,0.16)"},
    {r:33, c:"rgba(255,215,0,0.18)"},
  ];
  auras.forEach(a=>{
    ctx.fillStyle=a.c;
    ctx.beginPath(); ctx.arc(cx,cy,a.r,0,Math.PI*2); ctx.fill();
  });

  // ── Anéis do portal ──
  // Anel 3 — exterior lilás
  const r3g=ctx.createRadialGradient(cx,cy,24,cx,cy,38);
  r3g.addColorStop(0,"rgba(200,120,255,0.0)");
  r3g.addColorStop(0.4,"rgba(200,120,255,0.45)");
  r3g.addColorStop(0.75,"rgba(255,107,53,0.35)");
  r3g.addColorStop(1,"rgba(255,215,0,0.0)");
  ctx.fillStyle=r3g; ctx.beginPath(); ctx.arc(cx,cy,38,0,Math.PI*2); ctx.fill();

  // Anel 2 — intermédio dourado
  const r2g=ctx.createRadialGradient(cx,cy,16,cx,cy,28);
  r2g.addColorStop(0,"rgba(255,215,0,0.0)");
  r2g.addColorStop(0.5,"rgba(255,215,0,0.55)");
  r2g.addColorStop(0.85,"rgba(255,107,53,0.40)");
  r2g.addColorStop(1,"rgba(255,215,0,0.0)");
  ctx.fillStyle=r2g; ctx.beginPath(); ctx.arc(cx,cy,28,0,Math.PI*2); ctx.fill();

  // Centro do portal — vórtice azul-ciano profundo
  const vortex=ctx.createRadialGradient(cx-3,cy-3,1,cx,cy,18);
  vortex.addColorStop(0,"#ffffff");
  vortex.addColorStop(0.18,"#c0f0ff");
  vortex.addColorStop(0.42,"#40b8ff");
  vortex.addColorStop(0.70,"#1040d0");
  vortex.addColorStop(0.88,"#060830");
  vortex.addColorStop(1,"#020415");
  ctx.fillStyle=vortex; ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2); ctx.fill();

  // Espirais no vórtice (6 raios curvos brancos)
  ctx.save(); ctx.translate(cx,cy);
  for(let s=0;s<6;s++){
    ctx.save(); ctx.rotate(s*Math.PI/3);
    ctx.strokeStyle="rgba(255,255,255,0.22)"; ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(2,0);
    ctx.bezierCurveTo(6,-4, 10,-2, 14,0);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();

  // ── Estrela grande central de 5 pontas ──
  ctx.save(); ctx.translate(cx,cy);
  // Sombra da estrela
  ctx.shadowColor="rgba(255,215,0,0.9)"; ctx.shadowBlur=18;
  const sgr=ctx.createRadialGradient(-1,-2,0,0,0,16);
  sgr.addColorStop(0,"#ffffff");
  sgr.addColorStop(0.3,"#fffbe0");
  sgr.addColorStop(0.6,"#ffd700");
  sgr.addColorStop(1,"#ff9500");
  ctx.fillStyle=sgr;
  ctx.beginPath();
  for(let j=0;j<5;j++){
    const o=Math.PI*2*j/5-Math.PI/2, inn=o+Math.PI/5;
    j===0?ctx.moveTo(Math.cos(o)*16,Math.sin(o)*16):ctx.lineTo(Math.cos(o)*16,Math.sin(o)*16);
    ctx.lineTo(Math.cos(inn)*7,Math.sin(inn)*7);
  }
  ctx.closePath(); ctx.fill();
  ctx.shadowBlur=0;
  // Brilho no centro da estrela
  ctx.fillStyle="rgba(255,255,255,0.75)";
  ctx.beginPath(); ctx.arc(-2,-3,4,0,Math.PI*2); ctx.fill();
  ctx.restore();

  // ── Partículas estáticas em redor (pequenas estrelinhas) ──
  const sparks=[
    {x:cx-30,y:cy-28,r:3.5,c:"#ffd700"},{x:cx+32,y:cy-24,r:3,c:"#ff6b35"},
    {x:cx-36,y:cy+8,r:2.5,c:"#ff80c0"},{x:cx+34,y:cy+12,r:2.5,c:"#80d0ff"},
    {x:cx-18,y:cy-40,r:3,c:"#a0ff80"},{x:cx+16,y:cy-42,r:2.5,c:"#c080ff"},
    {x:cx-4, y:cy+44,r:3.5,c:"#ffd700"},{x:cx+22,y:cy+38,r:2,c:"#ff6b35"},
    {x:cx-24,y:cy+36,r:2,c:"#80d0ff"},
  ];
  sparks.forEach(s=>{
    // Mini-estrela de 4 pontas
    ctx.save(); ctx.translate(s.x,s.y);
    ctx.fillStyle=s.c;
    ctx.shadowColor=s.c; ctx.shadowBlur=6;
    ctx.beginPath();
    for(let k=0;k<4;k++){
      const a=k*Math.PI/2-Math.PI/4, inn=a+Math.PI/4;
      k===0?ctx.moveTo(Math.cos(a)*s.r,Math.sin(a)*s.r):ctx.lineTo(Math.cos(a)*s.r,Math.sin(a)*s.r);
      ctx.lineTo(Math.cos(inn)*s.r*0.38,Math.sin(inn)*s.r*0.38);
    }
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur=0;
    ctx.restore();
  });

  // ── Texto de apelo no fundo ──
  ctx.font="bold 11px 'Baloo 2', sans-serif";
  ctx.textAlign="center"; ctx.textBaseline="middle";
  ctx.fillStyle="#ffd700";
  ctx.shadowColor="rgba(0,0,0,0.8)"; ctx.shadowBlur=4;
  ctx.fillText("PORTAL!", cx, h-10);
  ctx.shadowBlur=0;

  tex.refresh();
}

// Vilões — muito mais detalhados e com personalidade própria
function makeVilaosTextures(scene){

  // helper: olhos malvados com sobrancelhas
  function evilEyes(ctx,cx,cy,eyeColor){
    // Sobrancelhas malvadas (mais espessas e inclinadas)
    ctx.strokeStyle="#000"; ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(cx-14,cy-11); ctx.lineTo(cx-4,cy-6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+14,cy-11); ctx.lineTo(cx+4,cy-6); ctx.stroke();
    // Brancos dos olhos (com sombra)
    ctx.shadowColor="rgba(0,0,0,0.4)"; ctx.shadowBlur=3;
    ctx.fillStyle="#fff";
    ctx.beginPath(); ctx.ellipse(cx-7,cy,5.5,6.5,Math.PI*0.08,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+7,cy,5.5,6.5,-Math.PI*0.08,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0;
    // Íris colorida
    ctx.fillStyle=eyeColor;
    ctx.beginPath(); ctx.ellipse(cx-7,cy+1,3.5,4.5,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+7,cy+1,3.5,4.5,0,0,Math.PI*2); ctx.fill();
    // Pupila preta
    ctx.fillStyle="#000";
    ctx.beginPath(); ctx.ellipse(cx-7,cy+2,1.8,2.4,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+7,cy+2,1.8,2.4,0,0,Math.PI*2); ctx.fill();
    // Brilho duplo na pupila (mais realista)
    ctx.fillStyle="rgba(255,255,255,0.75)";
    ctx.beginPath(); ctx.arc(cx-8,cy-0.5,1.4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+6,cy-0.5,1.4,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,0.45)";
    ctx.beginPath(); ctx.arc(cx-6,cy+2,0.8,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+8,cy+2,0.8,0,Math.PI*2); ctx.fill();
  }

  // helper: boca malvada com dentes e babas
  function evilMouth(ctx,cx,cy,color, drool=false){
    // Boca aberta (meia-lua)
    ctx.fillStyle="#1a0000";
    ctx.beginPath(); ctx.arc(cx,cy,10,0,Math.PI); ctx.fill();
    // Língua
    ctx.fillStyle="#cc2244";
    ctx.beginPath(); ctx.ellipse(cx, cy+5, 4, 3, 0, 0, Math.PI*2); ctx.fill();
    // Dentes (4 dentes irregulares)
    ctx.fillStyle="#ffffee";
    ctx.fillRect(cx-9, cy, 4, 6);
    ctx.fillRect(cx-4, cy, 4, 7);
    ctx.fillRect(cx+1, cy, 4, 6);
    ctx.fillRect(cx+6, cy, 4, 5);
    // Contorno da boca
    ctx.strokeStyle=color; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(cx,cy,10,0,Math.PI); ctx.stroke();
    // Babas (detalhe de vilão perigoso)
    if(drool){
      ctx.fillStyle="rgba(200,255,200,0.7)";
      ctx.beginPath(); ctx.moveTo(cx-3,cy+8); ctx.quadraticCurveTo(cx-3,cy+14,cx-2,cy+18); ctx.quadraticCurveTo(cx+0,cy+16,cx+1,cy+8); ctx.fill();
    }
  }

  // ── Vilões do chão: as «Sombras» que tiram a alegria às crianças ──
  // (mesmas chaves e tamanho 64×64 de sempre, para o comportamento não mudar)
  function sombraOlhos(ctx,cx,cy,cor,dx,rot){
    ctx.strokeStyle="#ece9ff"; ctx.lineWidth=3; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(cx-dx-7,cy-9); ctx.lineTo(cx-dx+3,cy-5); ctx.moveTo(cx+dx+7,cy-9); ctx.lineTo(cx+dx-3,cy-5); ctx.stroke();
    [[-dx,rot],[dx,-rot]].forEach(([ox,r])=>{
      ctx.shadowColor=cor; ctx.shadowBlur=6; ctx.fillStyle=cor;
      ctx.beginPath(); ctx.ellipse(cx+ox,cy,5,6.5,r,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      ctx.fillStyle="#fffbe0"; ctx.beginPath(); ctx.ellipse(cx+ox,cy,2.6,3.6,r,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#120f22"; ctx.beginPath(); ctx.ellipse(cx+ox*0.85,cy+1,1.3,2.2,0,0,Math.PI*2); ctx.fill();
    });
  }

  // 1) Sombra — mancha escura com «pingos» em baixo e olhos amarelos a brilhar
  if(!scene.textures.exists("vilao_round")){
    const tex=scene.textures.createCanvas("vilao_round",64,64), ctx=tex.getContext(); const cx=32,cy=30;
    const blob=()=>{ctx.beginPath(); ctx.moveTo(cx-22,cy+4); ctx.arc(cx,cy+4,22,Math.PI,0); ctx.lineTo(cx+22,cy+16);
      for(let i=0;i<4;i++){const x2=cx+22-11*(i+1); ctx.quadraticCurveTo(cx+22-11*i-5.5,cy+30,x2,cy+16);} ctx.closePath();};
    ctx.shadowColor="rgba(120,90,255,0.65)"; ctx.shadowBlur=10; ctx.strokeStyle="rgba(255,255,255,0.9)"; ctx.lineWidth=4.5; blob(); ctx.stroke(); ctx.shadowBlur=0;
    const g=ctx.createRadialGradient(cx-7,cy-8,2,cx,cy+2,26); g.addColorStop(0,"#6a66a0"); g.addColorStop(0.5,"#34305a"); g.addColorStop(1,"#171430");
    ctx.fillStyle=g; blob(); ctx.fill(); ctx.strokeStyle="#0d0b1c"; ctx.lineWidth=2; ctx.stroke();
    sombraOlhos(ctx,cx,cy-1,"#ffd93a",8,0.35);
    ctx.fillStyle="#0d0b1c"; ctx.beginPath(); ctx.ellipse(cx,cy+13,11,5,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#fff"; for(let i=0;i<4;i++){const x=cx-8+i*5.3; ctx.beginPath(); ctx.moveTo(x,cy+9.2); ctx.lineTo(x+4,cy+9.2); ctx.lineTo(x+2,cy+14); ctx.closePath(); ctx.fill();}
    tex.refresh();
  }

  // 2) Espinho — bola de espinhos roxa e carrancuda
  if(!scene.textures.exists("vilao_spike")){
    const tex=scene.textures.createCanvas("vilao_spike",64,64), ctx=tex.getContext(); const cx=32,cy=32;
    const spikes=()=>{ctx.beginPath(); for(let i=0;i<12;i++){const a=i*Math.PI/6, w=0.2; ctx.moveTo(cx+Math.cos(a-w)*17,cy+Math.sin(a-w)*17); ctx.lineTo(cx+Math.cos(a)*28,cy+Math.sin(a)*28); ctx.lineTo(cx+Math.cos(a+w)*17,cy+Math.sin(a+w)*17); ctx.closePath();}};
    ctx.shadowColor="rgba(190,90,255,0.6)"; ctx.shadowBlur=10; ctx.strokeStyle="rgba(255,255,255,0.9)"; ctx.lineWidth=4; spikes(); ctx.stroke(); ctx.shadowBlur=0;
    ctx.fillStyle="#3d2d63"; spikes(); ctx.fill(); ctx.strokeStyle="#1a1030"; ctx.lineWidth=1.6; ctx.stroke();
    const g=ctx.createRadialGradient(cx-6,cy-7,2,cx,cy,20); g.addColorStop(0,"#b79be0"); g.addColorStop(0.5,"#7a5cb4"); g.addColorStop(1,"#463070");
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,19,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#1a1030"; ctx.lineWidth=2; ctx.stroke();
    sombraOlhos(ctx,cx,cy-1,"#ff6a2a",7,0.3);
    ctx.strokeStyle="#1a1030"; ctx.lineWidth=2.6; ctx.lineCap="round"; ctx.beginPath(); ctx.arc(cx,cy+16,7,Math.PI*1.15,Math.PI*1.85); ctx.stroke();
    tex.refresh();
  }

  // 3) Bicho da Indiferença — escaravelho cinzento, de pálpebras descaídas, que nem quer saber
  if(!scene.textures.exists("vilao_bug")){
    const tex=scene.textures.createCanvas("vilao_bug",64,64), ctx=tex.getContext(); const cx=32;
    ctx.strokeStyle="#2b2a38"; ctx.lineWidth=3; ctx.lineCap="round";
    [-17,-9,-1].forEach(x=>{ctx.beginPath(); ctx.moveTo(cx+x-2,44); ctx.lineTo(cx+x-8,56); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx-x+2,44); ctx.lineTo(cx-x+8,56); ctx.stroke();});
    ctx.beginPath(); ctx.moveTo(cx-6,13); ctx.lineTo(cx-12,5); ctx.moveTo(cx+6,13); ctx.lineTo(cx+12,5); ctx.stroke();
    ctx.fillStyle="#2b2a38"; [[cx-12,5],[cx+12,5]].forEach(([x,y])=>{ctx.beginPath(); ctx.arc(x,y,2.4,0,Math.PI*2); ctx.fill();});
    const shell=()=>{ctx.beginPath(); ctx.ellipse(cx,38,23,15,0,0,Math.PI*2);};
    ctx.shadowColor="rgba(150,150,190,0.7)"; ctx.shadowBlur=9; ctx.strokeStyle="rgba(255,255,255,0.9)"; ctx.lineWidth=4.5; shell(); ctx.stroke(); ctx.shadowBlur=0;
    const g=ctx.createRadialGradient(cx-8,30,2,cx,38,24); g.addColorStop(0,"#a9a7c0"); g.addColorStop(0.6,"#6a6882"); g.addColorStop(1,"#3a384e");
    ctx.fillStyle=g; shell(); ctx.fill(); ctx.strokeStyle="#262535"; ctx.lineWidth=2; ctx.stroke();
    ctx.strokeStyle="#262535"; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(cx,26); ctx.lineTo(cx,52); ctx.stroke();
    ctx.fillStyle="#262535"; [[-11,36],[11,36],[-8,46],[8,46]].forEach(([dx,y])=>{ctx.beginPath(); ctx.arc(cx+dx,y,2.2,0,Math.PI*2); ctx.fill();});
    const hg=ctx.createRadialGradient(cx-4,16,2,cx,22,15); hg.addColorStop(0,"#c4c2da"); hg.addColorStop(1,"#7e7c98");
    ctx.fillStyle=hg; ctx.beginPath(); ctx.ellipse(cx,23,15,12,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle="#262535"; ctx.lineWidth=2; ctx.stroke();
    [[-6.5,22],[6.5,22]].forEach(([dx,y])=>{
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(cx+dx,y,4.8,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#262535"; ctx.beginPath(); ctx.arc(cx+dx+1.2,y+1.6,1.9,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#9a98b4"; ctx.beginPath(); ctx.arc(cx+dx,y,5,Math.PI,0); ctx.fill();
      ctx.strokeStyle="#262535"; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(cx+dx-5,y); ctx.lineTo(cx+dx+5,y); ctx.stroke();
    });
    ctx.strokeStyle="#262535"; ctx.lineWidth=2.4; ctx.beginPath(); ctx.moveTo(cx-13,15); ctx.lineTo(cx-3,18); ctx.moveTo(cx+13,15); ctx.lineTo(cx+3,18); ctx.stroke();
    ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(cx-5,30); ctx.lineTo(cx+5,29); ctx.stroke();
    tex.refresh();
  }

  // ── Frames de caminhada ──────────────────────────────────────────────
  // Cada vilão ganha 2 frames (_w0/_w1): sombra FIXA no chão, corpo um pouco
  // mais pequeno e dois pés que se alternam (um assenta, o outro levanta).
  // A base do desenho fica no y=56 da textura, que é onde o corpo físico
  // pousa (ver spawnVilao), por isso o vilão pisa mesmo no chão.
  ["vilao_round","vilao_spike","vilao_bug"].forEach(base=>{
    const src=scene.textures.get(base).getSourceImage();
    [0,1].forEach(f=>{
      const k=base+"_w"+f;
      if(scene.textures.exists(k)) return;
      const tex=scene.textures.createCanvas(k,64,64), ctx=tex.getContext();
      // sombra no chão
      ctx.fillStyle="rgba(0,0,0,0.26)"; ctx.beginPath(); ctx.ellipse(32,56.5,20,3.4,0,0,Math.PI*2); ctx.fill();
      // pés
      const foot=(x,lift)=>{
        const y=52.5-lift;
        ctx.fillStyle="#1b1530"; ctx.strokeStyle="rgba(255,255,255,0.85)"; ctx.lineWidth=1.6;
        ctx.beginPath(); ctx.ellipse(x,y,8.5,4.4,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.fillStyle="rgba(255,255,255,0.22)"; ctx.beginPath(); ctx.ellipse(x-2,y-1.6,3.6,1.4,0,0,Math.PI*2); ctx.fill();
      };
      foot(21+(f?2:-1), f?4:0);
      foot(43+(f?1:-2), f?0:4);
      // corpo (o frame 1 sobe 1px — «passo»)
      ctx.drawImage(src,32-26,(f?0:1.5),52,52);
      tex.refresh();
    });
  });
} // fim makeVilaosTextures

// ── Bosses — silhuetas próprias, uma por boss, para deixarem de ser o
//    vilão normal aumentado. Cada textura é desenhada uma única vez. ────
function makeBossTextures(scene){
  const S = 116, C = 58;

  function bossShadow(ctx){
    ctx.fillStyle="rgba(0,0,0,0.28)";
    ctx.beginPath(); ctx.ellipse(C,S-14,34,8,0,0,Math.PI*2); ctx.fill();
  }
  function glowEye(ctx,x,y,r,color){
    ctx.shadowColor=color; ctx.shadowBlur=10;
    ctx.fillStyle=color;
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle="rgba(255,255,255,0.85)";
    ctx.beginPath(); ctx.arc(x-r*0.3,y-r*0.3,r*0.32,0,Math.PI*2); ctx.fill();
  }

  // ── 1) Monstro da Ignorância — redesenho "boss clássico à Mario" (nova) ──
  // Antes: silhueta abstrata, sombria, com venda e boca cosida — assustadora
  // e difícil de "ler" à distância. Agora: uma criatura roxa, rechonchuda e
  // divertida — mistura de Goomba (simplicidade) com Bomberman (corpo
  // arredondado) — baixa e larga de propósito, para ser óbvio saltar-lhe em
  // cima. Nunca assustadora: olhos grandes com pupilas em "?", sorriso
  // malandro, braços curtos com mãos grandes, pernas pequenas e pés largos.
  function drawMonstroBody(ctx) {
    bossShadow(ctx);
    // Corpo — um só blob grande e macio, roxo, sólido (nada de fumo/abstrato)
    const gr = ctx.createRadialGradient(C-12,C-16,6,C,C-2,44);
    gr.addColorStop(0,"#ad82ff"); gr.addColorStop(0.55,"#6a3ad8"); gr.addColorStop(1,"#3a1a80");
    ctx.fillStyle = gr;
    ctx.beginPath(); ctx.ellipse(C, C-2, 40, 33, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = "#2a1060"; ctx.lineWidth = 3;
    ctx.stroke();
    // Barriga — roxo mais claro
    ctx.fillStyle = "#cdb4ff";
    ctx.beginPath(); ctx.ellipse(C, C+13, 19, 14, 0, 0, Math.PI*2); ctx.fill();
    // Pernas pequenas + pés largos — anda aos pequenos saltinhos, nunca flutua
    ctx.strokeStyle = "#2a1060"; ctx.lineWidth = 2;
    [-17,17].forEach(dx=>{
      ctx.fillStyle = "#6a3ad8";
      ctx.beginPath(); ctx.ellipse(C+dx, C+35, 9, 8, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#2a1060";
      ctx.beginPath(); ctx.ellipse(C+dx, C+43, 13, 6, 0, 0, Math.PI*2); ctx.fill();
    });
  }
  // Braços curtos, mãos grandes — "wave" (a acenar/apontar, usado na pose
  // normal e confiante) ou "rest" (junto ao corpo, usado no estado de dor).
  function drawMonstroArms(ctx, mood) {
    ctx.strokeStyle = "#2a1060"; ctx.lineWidth = 2;
    if (mood === "wave") {
      [[-1,-34,-8],[1,34,-8]].forEach(([side,dx,dy])=>{
        ctx.fillStyle = "#6a3ad8";
        ctx.beginPath(); ctx.ellipse(C+dx*0.7, C+dy, 9, 15, side*0.55, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(C+dx, C+dy-10, 8.5, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      });
    } else {
      [-38,38].forEach(dx=>{
        ctx.fillStyle = "#6a3ad8";
        ctx.beginPath(); ctx.ellipse(C+dx, C+8, 8, 13, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(C+dx, C+21, 8, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      });
    }
  }
  // Estado normal — confiante, sorriso malandro, um sobrolho levantado.
  // Pupilas em forma de "?" — reforça o tema sem precisar de mais nada.
  // Olhos + sobrolho + sorriso do estado normal, separados num helper para
  // poderem ser reutilizados nas novas variantes de animação "idle" (piscar
  // e braços em repouso) sem duplicar o desenho todo. eyesOpen=false desenha
  // os olhos fechados (piscar), mantendo a mesma zona ocular para o "?" não
  // saltar de posição quando volta a abrir.
  function drawMonstroFace(ctx, eyesOpen) {
    if (eyesOpen) {
      [-16,16].forEach(dx=>{
        ctx.fillStyle="#fffaff";
        ctx.beginPath(); ctx.ellipse(C+dx, C-10, 12, 13, 0, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle="#2a1060"; ctx.lineWidth=1.5; ctx.stroke();
        ctx.fillStyle="#2a1060"; ctx.font="bold 15px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
        ctx.fillText("?", C+dx, C-8);
      });
      ctx.textBaseline="alphabetic";
    } else {
      ctx.strokeStyle="#2a1060"; ctx.lineWidth=2.5; ctx.lineCap="round";
      [-16,16].forEach(dx=>{
        ctx.beginPath(); ctx.moveTo(C+dx-9, C-9); ctx.quadraticCurveTo(C+dx, C-4, C+dx+9, C-9); ctx.stroke();
      });
    }
    // Sobrolho malandro — um levantado, o outro relaxado ("está sempre
    // convencido que vai ganhar")
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=3; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(C-26,C-26); ctx.lineTo(C-8,C-30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C+8,C-22); ctx.lineTo(C+26,C-20); ctx.stroke();
    // Sorriso assimétrico, malandro — preenchido (não só contorno fino) para
    // se ler bem à distância/em jogo, com um "dente" a brilhar no canto
    // levantado, reforçando o ar convencido.
    ctx.fillStyle="#2a1060";
    ctx.beginPath();
    ctx.moveTo(C-15,C+14);
    ctx.quadraticCurveTo(C, C+29, C+22, C+9);
    ctx.quadraticCurveTo(C+2, C+21, C-15,C+14);
    ctx.fill();
    ctx.strokeStyle="#1a0a40"; ctx.lineWidth=1.5; ctx.stroke();
    ctx.fillStyle="#fffaff";
    ctx.beginPath(); ctx.moveTo(C+18,C+11); ctx.lineTo(C+23,C+9); ctx.lineTo(C+19,C+16); ctx.closePath(); ctx.fill();
  }
  if(!scene.textures.exists("boss_monstro_ignorancia")){
    const tex=scene.textures.createCanvas("boss_monstro_ignorancia",S,S), ctx=tex.getContext();
    drawMonstroBody(ctx);
    drawMonstroArms(ctx, "wave");
    drawMonstroFace(ctx, true);
    tex.refresh();
  }
  // Duas variantes novas, só para a animação "idle" (ver doBossIdleArms/
  // doBossIdleBlink em dia-crianca.js) — o Monstro deixa de ficar
  // completamente parado fora dos golpes: alterna braços "wave"/"rest" a
  // espaços regulares e pisca os olhos de vez em quando.
  if(!scene.textures.exists("boss_monstro_ignorancia_armsdown")){
    const tex=scene.textures.createCanvas("boss_monstro_ignorancia_armsdown",S,S), ctx=tex.getContext();
    drawMonstroBody(ctx);
    drawMonstroArms(ctx, "rest");
    drawMonstroFace(ctx, true);
    tex.refresh();
  }
  if(!scene.textures.exists("boss_monstro_ignorancia_blink")){
    const tex=scene.textures.createCanvas("boss_monstro_ignorancia_blink",S,S), ctx=tex.getContext();
    drawMonstroBody(ctx);
    drawMonstroArms(ctx, "wave");
    drawMonstroFace(ctx, false);
    tex.refresh();
  }
  // Estado "ouch" — usado por meio segundo sempre que leva um salto na
  // cabeça: achatamento exagerado tipo desenho animado, olhos esbugalhados,
  // boca aberta. Volta ao estado normal logo a seguir (não é uma fase — é
  // só a reação a UM golpe, reaproveitada nos 3 saltos).
  if(!scene.textures.exists("boss_monstro_ignorancia_ouch")){
    const tex=scene.textures.createCanvas("boss_monstro_ignorancia_ouch",S,S), ctx=tex.getContext();
    drawMonstroBody(ctx);
    drawMonstroArms(ctx, "rest");
    [-16,16].forEach(dx=>{
      ctx.fillStyle="#fffaff";
      ctx.beginPath(); ctx.ellipse(C+dx, C-8, 14, 15, 0, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle="#2a1060"; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle="#2a1060"; ctx.font="bold 17px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText("?", C+dx, C-6);
    });
    ctx.textBaseline="alphabetic";
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=3; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(C-26,C-30); ctx.lineTo(C-8,C-22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C+8,C-22); ctx.lineTo(C+26,C-30); ctx.stroke();
    ctx.fillStyle="#2a1060";
    ctx.beginPath(); ctx.ellipse(C, C+21, 9, 11, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle="#ff9fdc";
    ctx.beginPath(); ctx.ellipse(C, C+25, 5, 5, 0, 0, Math.PI*2); ctx.fill();
    tex.refresh();
  }
  // Estado "riso maléfico" — usado na entrada do combate (intro): antes de
  // a luta começar a sério, o boss ri-se de forma trocista, confiante que
  // vai ganhar. Olhos semicerrados de gozo ("^ ^") + boca bem aberta a rir.
  if(!scene.textures.exists("boss_monstro_ignorancia_laugh")){
    const tex=scene.textures.createCanvas("boss_monstro_ignorancia_laugh",S,S), ctx=tex.getContext();
    drawMonstroBody(ctx);
    drawMonstroArms(ctx, "wave");
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=3; ctx.lineCap="round";
    [-16,16].forEach(dx=>{
      ctx.beginPath(); ctx.arc(C+dx, C-6, 8, Math.PI*1.15, Math.PI*1.85); ctx.stroke();
    });
    ctx.beginPath(); ctx.moveTo(C-28,C-30); ctx.lineTo(C-6,C-24); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C+6,C-24); ctx.lineTo(C+28,C-30); ctx.stroke();
    ctx.fillStyle="#2a1060";
    ctx.beginPath(); ctx.ellipse(C, C+16, 17, 13, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle="#fffaff";
    ctx.beginPath(); ctx.ellipse(C, C+9, 13, 4, 0, 0, Math.PI); ctx.fill();
    tex.refresh();
  }
  // Estado "zangado" (vermelho) — ao escalar de fúria a meio do combate (ver
  // bossEnterRage em dia-crianca.js), a cara fecha-se em fúria: sobrolho em
  // V carregado, olhos estreitos. O motor de jogo aplica também um tint
  // avermelhado por cima deste estado (ver bossEnterRage), daí "vermelho".
  if(!scene.textures.exists("boss_monstro_ignorancia_angry")){
    const tex=scene.textures.createCanvas("boss_monstro_ignorancia_angry",S,S), ctx=tex.getContext();
    drawMonstroBody(ctx);
    drawMonstroArms(ctx, "wave");
    [-16,16].forEach(dx=>{
      ctx.fillStyle="#fffaff";
      ctx.beginPath(); ctx.ellipse(C+dx, C-8, 9, 7, 0, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle="#2a1060"; ctx.beginPath(); ctx.arc(C+dx, C-8, 3.4, 0, Math.PI*2); ctx.fill();
    });
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=4; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(C-28,C-24); ctx.lineTo(C-8,C-14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C+8,C-14); ctx.lineTo(C+28,C-24); ctx.stroke();
    ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(C-16,C+14); ctx.lineTo(C+16,C+14); ctx.stroke();
    tex.refresh();
  }
  // Estado "triste" — usado na derrota: em vez do "sentado" calmo de antes
  // (ver comentário em startBossStompDefeat, dia-crianca.js), o boss fica
  // com pena e foge a correr. Sobrolho preocupado + olhos fechados de
  // tristeza + boca em "n" invertido (franzida para baixo) + uma lágrima.
  if(!scene.textures.exists("boss_monstro_ignorancia_sad")){
    const tex=scene.textures.createCanvas("boss_monstro_ignorancia_sad",S,S), ctx=tex.getContext();
    drawMonstroBody(ctx);
    drawMonstroArms(ctx, "rest");
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=3; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(C-24,C-28); ctx.lineTo(C-8,C-22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C+8,C-22); ctx.lineTo(C+24,C-28); ctx.stroke();
    [-16,16].forEach(dx=>{
      ctx.fillStyle="#fffaff";
      ctx.beginPath(); ctx.ellipse(C+dx, C-8, 10, 11, 0, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle="#2a1060"; ctx.lineWidth=1.5; ctx.stroke();
      ctx.fillStyle="#2a1060"; ctx.beginPath(); ctx.arc(C+dx, C-4, 3, 0, Math.PI*2); ctx.fill();
    });
    ctx.fillStyle="#7fc8ff";
    ctx.beginPath(); ctx.ellipse(C-16, C+2, 3, 5, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.moveTo(C-14,C+24); ctx.quadraticCurveTo(C,C+13,C+14,C+22); ctx.stroke();
    tex.refresh();
  }
  // Estado "sentado" — usado na sequência de derrota: senta-se no chão,
  // lê um livro que aparece à sua frente e dá um polegar para cima. Não
  // morre, não explode — só fica contente e simpático, tal como pedido.
  if(!scene.textures.exists("boss_monstro_ignorancia_sentado")){
    const tex=scene.textures.createCanvas("boss_monstro_ignorancia_sentado",S,S), ctx=tex.getContext();
    bossShadow(ctx);
    const gr = ctx.createRadialGradient(C-12,C-8,6,C,C+6,44);
    gr.addColorStop(0,"#ad82ff"); gr.addColorStop(0.55,"#6a3ad8"); gr.addColorStop(1,"#3a1a80");
    ctx.fillStyle = gr;
    ctx.beginPath(); ctx.ellipse(C, C+4, 42, 28, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = "#2a1060"; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = "#cdb4ff";
    ctx.beginPath(); ctx.ellipse(C, C+17, 20, 12, 0, 0, Math.PI*2); ctx.fill();
    // Pernas cruzadas à frente, sentado
    ctx.fillStyle = "#6a3ad8"; ctx.strokeStyle="#2a1060"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.ellipse(C-14, C+35, 17, 7, 0.28, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.ellipse(C+14, C+35, 17, 7, -0.28, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    // Braço junto ao corpo
    ctx.beginPath(); ctx.ellipse(C-33, C+10, 8, 13, 0, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    // Braço com polegar para cima
    ctx.beginPath(); ctx.ellipse(C+29, C-4, 8, 15, -0.32, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.fillRect(C+29, C-26, 6, 11);
    ctx.beginPath(); ctx.arc(C+33, C-18, 7, 0, Math.PI*2); ctx.fill(); ctx.stroke();
    // Olhos contentes — curva feliz, em vez de ovais abertos
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=3; ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(C-16, C-6, 8, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    ctx.beginPath(); ctx.arc(C+16, C-6, 8, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    // Sorriso largo e satisfeito
    ctx.beginPath(); ctx.arc(C, C+12, 14, 0.15*Math.PI, 0.85*Math.PI); ctx.stroke();
    tex.refresh();
  }

  // ── 2) Vírus Gigante — esfera com espigões, estilo coronavírus ──────
  // Corpo/braços/cara separados em helpers (mesmo padrão do Monstro da
  // Ignorância) para gerar as variantes "_armsdown"/"_blink"/"_ouch" sem
  // duplicar o desenho todo — dá-lhe a mesma vivacidade (braços/olhos) que
  // só o Monstro tinha antes.
  function drawVirusBody(ctx){
    bossShadow(ctx);
    const bodyR=28;
    // brilho exterior dourado — o nível dele é todo em tons de verde-água,
    // por isso o corpo passou de verde para magenta/rosa (ver abaixo), e este
    // anel garante que se destaca também de qualquer outro fundo escuro.
    ctx.shadowColor="rgba(255,224,140,0.55)"; ctx.shadowBlur=14;
    ctx.strokeStyle="rgba(255,232,160,0.65)"; ctx.lineWidth=3;
    ctx.beginPath(); ctx.arc(C,C,bodyR+15,0,Math.PI*2); ctx.stroke();
    ctx.shadowBlur=0;
    // espigões
    ctx.strokeStyle="#7a1450"; ctx.lineWidth=3.5; ctx.lineCap="round";
    const spikes=12;
    for(let i=0;i<spikes;i++){
      const a=(Math.PI*2*i)/spikes;
      const x1=C+Math.cos(a)*bodyR, y1=C+Math.sin(a)*bodyR;
      const x2=C+Math.cos(a)*(bodyR+13), y2=C+Math.sin(a)*(bodyR+13);
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      ctx.fillStyle= i%2===0 ? "#ffe85c" : "#ff6b5c";
      ctx.beginPath(); ctx.arc(x2,y2,4.2,0,Math.PI*2); ctx.fill();
    }
    // corpo — magenta/rosa vivo (contraste com o fundo verde-água do nível)
    const gr=ctx.createRadialGradient(C-8,C-8,3,C,C,bodyR);
    gr.addColorStop(0,"#ffd6f0"); gr.addColorStop(0.45,"#e0409a"); gr.addColorStop(1,"#5c1050");
    ctx.fillStyle=gr;
    ctx.beginPath(); ctx.arc(C,C,bodyR,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#3a0a30"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(C,C,bodyR,0,Math.PI*2); ctx.stroke();
    // padrão interior (manchas)
    ctx.fillStyle="rgba(90,10,60,0.35)";
    [[-10,-6,6],[9,-11,4],[6,9,5],[-8,10,4]].forEach(([dx,dy,r])=>{
      ctx.beginPath(); ctx.arc(C+dx,C+dy,r,0,Math.PI*2); ctx.fill();
    });
  }
  // Dois pseudópodes finos (tentáculos) que saem do corpo — "wave" esticados
  // para cima/fora como se acenassem, "rest" a pender ao longo do corpo.
  function drawVirusArms(ctx, mood){
    const bodyR=28;
    ctx.lineCap="round";
    if (mood === "wave") {
      [-1,1].forEach(side=>{
        const bx=C+side*bodyR*0.7, by=C+bodyR*0.5;
        const tx=C+side*(bodyR+21), ty=C-bodyR*0.25;
        ctx.strokeStyle="#e0409a"; ctx.lineWidth=7;
        ctx.beginPath(); ctx.moveTo(bx,by); ctx.quadraticCurveTo(C+side*(bodyR+9), C+bodyR*0.05, tx, ty); ctx.stroke();
        ctx.fillStyle="#e0409a";
        ctx.beginPath(); ctx.arc(tx,ty,6.5,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle="#7a1450"; ctx.lineWidth=1.5; ctx.stroke();
      });
    } else {
      [-1,1].forEach(side=>{
        const bx=C+side*bodyR*0.72, by=C+bodyR*0.35;
        const tx=C+side*bodyR*0.92, ty=C+bodyR*1.05;
        ctx.strokeStyle="#e0409a"; ctx.lineWidth=6;
        ctx.beginPath(); ctx.moveTo(bx,by); ctx.quadraticCurveTo(C+side*bodyR*1.05, C+bodyR*0.7, tx, ty); ctx.stroke();
        ctx.fillStyle="#e0409a";
        ctx.beginPath(); ctx.arc(tx,ty,5.5,0,Math.PI*2); ctx.fill();
        ctx.strokeStyle="#7a1450"; ctx.lineWidth=1.5; ctx.stroke();
      });
    }
  }
  // eyesOpen=false pisca (curva fechada em vez da elipse branca) — boca
  // mantém-se igual, tal como no Monstro, para não "saltar" ao piscar.
  function drawVirusFace(ctx, eyesOpen){
    if (eyesOpen) {
      ctx.fillStyle="#fff";
      ctx.beginPath(); ctx.ellipse(C-8,C-2,5,6,0,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(C+8,C-2,5,6,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#2a0a1a";
      ctx.beginPath(); ctx.arc(C-8,C,2.4,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(C+8,C,2.4,0,Math.PI*2); ctx.fill();
    } else {
      ctx.strokeStyle="#2a0a1a"; ctx.lineWidth=2.5; ctx.lineCap="round";
      [-8,8].forEach(dx=>{
        ctx.beginPath(); ctx.moveTo(C+dx-5,C-1); ctx.quadraticCurveTo(C+dx,C+3,C+dx+5,C-1); ctx.stroke();
      });
    }
    ctx.strokeStyle="#2a0a1a"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(C,C+11,7,0.1*Math.PI,0.9*Math.PI); ctx.stroke();
  }
  if(!scene.textures.exists("boss_virus_gigante")){
    const tex=scene.textures.createCanvas("boss_virus_gigante",S,S), ctx=tex.getContext();
    drawVirusBody(ctx); drawVirusArms(ctx,"wave"); drawVirusFace(ctx,true);
    tex.refresh();
  }
  if(!scene.textures.exists("boss_virus_gigante_armsdown")){
    const tex=scene.textures.createCanvas("boss_virus_gigante_armsdown",S,S), ctx=tex.getContext();
    drawVirusBody(ctx); drawVirusArms(ctx,"rest"); drawVirusFace(ctx,true);
    tex.refresh();
  }
  if(!scene.textures.exists("boss_virus_gigante_blink")){
    const tex=scene.textures.createCanvas("boss_virus_gigante_blink",S,S), ctx=tex.getContext();
    drawVirusBody(ctx); drawVirusArms(ctx,"wave"); drawVirusFace(ctx,false);
    tex.refresh();
  }
  // "ouch" — espigões a tremer visualmente (olhos em espiral) + boca aberta
  // de choque + tentáculos em repouso, mesmo espírito exagerado do Monstro.
  if(!scene.textures.exists("boss_virus_gigante_ouch")){
    const tex=scene.textures.createCanvas("boss_virus_gigante_ouch",S,S), ctx=tex.getContext();
    drawVirusBody(ctx); drawVirusArms(ctx,"rest");
    ctx.strokeStyle="#2a0a1a"; ctx.lineWidth=2;
    [-8,8].forEach(dx=>{
      ctx.beginPath();
      for(let a=0;a<=Math.PI*2.4;a+=0.4){
        const r=1+a*0.7, px=C+dx+Math.cos(a)*r, py=C-2+Math.sin(a)*r;
        a===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
      }
      ctx.stroke();
    });
    ctx.fillStyle="#2a0a1a";
    ctx.beginPath(); ctx.ellipse(C,C+13,6,8,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#ff9fc0";
    ctx.beginPath(); ctx.ellipse(C,C+16,3,4,0,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }

  // Estado "riso maléfico" — entrada em combate: convencido, quase a
  // rir-se antes mesmo de começar a lutar.
  if(!scene.textures.exists("boss_virus_gigante_laugh")){
    const tex=scene.textures.createCanvas("boss_virus_gigante_laugh",S,S), ctx=tex.getContext();
    drawVirusBody(ctx); drawVirusArms(ctx,"wave");
    ctx.strokeStyle="#2a0a1a"; ctx.lineWidth=2.5; ctx.lineCap="round";
    [-8,8].forEach(dx=>{
      ctx.beginPath(); ctx.arc(C+dx, C-3, 5, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    });
    ctx.fillStyle="#2a0a1a";
    ctx.beginPath(); ctx.ellipse(C,C+13,9,7,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#ff9fc0";
    ctx.beginPath(); ctx.ellipse(C,C+9,6,2.4,0,0,Math.PI); ctx.fill();
    tex.refresh();
  }
  // Estado "zangado" (vermelho) — durante a escalada de fúria; o motor de
  // jogo aplica também um tint avermelhado por cima deste estado.
  if(!scene.textures.exists("boss_virus_gigante_angry")){
    const tex=scene.textures.createCanvas("boss_virus_gigante_angry",S,S), ctx=tex.getContext();
    drawVirusBody(ctx); drawVirusArms(ctx,"wave");
    ctx.fillStyle="#2a0a1a";
    ctx.beginPath(); ctx.ellipse(C-8,C-2,4.5,3,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(C+8,C-2,4.5,3,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#2a0a1a"; ctx.lineWidth=3; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(C-14,C-10); ctx.lineTo(C-3,C-5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C+3,C-5); ctx.lineTo(C+14,C-10); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C-9,C+12); ctx.lineTo(C-4,C+9); ctx.lineTo(C,C+13); ctx.lineTo(C+4,C+9); ctx.lineTo(C+9,C+12); ctx.stroke();
    tex.refresh();
  }
  // Estado "triste" — derrota: perde o brilho e foge, em vez de continuar
  // no combate.
  if(!scene.textures.exists("boss_virus_gigante_sad")){
    const tex=scene.textures.createCanvas("boss_virus_gigante_sad",S,S), ctx=tex.getContext();
    drawVirusBody(ctx); drawVirusArms(ctx,"rest");
    ctx.strokeStyle="#2a0a1a"; ctx.lineWidth=2.5; ctx.lineCap="round";
    [-8,8].forEach(dx=>{
      ctx.beginPath(); ctx.arc(C+dx, C+1, 5, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
    });
    ctx.fillStyle="#7fc8ff";
    ctx.beginPath(); ctx.ellipse(C-8,C+5,2.4,4,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#2a0a1a"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(C-6,C+16); ctx.quadraticCurveTo(C,C+10,C+6,C+15); ctx.stroke();
    tex.refresh();
  }

  // ── 3) Guardião das Sombras — capa encapuzada, olhos a brilhar ──────
  function drawGuardiaoBody(ctx){
    bossShadow(ctx);
    // capa — forma triangular com bainha irregular em baixo
    const gr=ctx.createLinearGradient(0,C-40,0,S-16);
    gr.addColorStop(0,"#4a4a72"); gr.addColorStop(0.5,"#2a2a48"); gr.addColorStop(1,"#0e0e1c");
    ctx.fillStyle=gr;
    ctx.beginPath();
    ctx.moveTo(C,C-40);
    ctx.lineTo(C+30,C+24);
    ctx.lineTo(C+22,C+22); ctx.lineTo(C+14,S-16); ctx.lineTo(C+5,C+26);
    ctx.lineTo(C-5,C+26); ctx.lineTo(C-14,S-16); ctx.lineTo(C-22,C+22);
    ctx.lineTo(C-30,C+24);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle="#000"; ctx.lineWidth=2; ctx.stroke();
    // Melhoria de leitura (pedido: "melhora a imagem dos bosses") — antes
    // a capa era só um triângulo escuro liso, difícil de destacar do fundo
    // também escuro deste nível. Duas camadas novas, sem mudar a silhueta:
    // 1) brilho de contorno ciano ténue à volta de toda a capa, ecoando a
    // cor dos olhos, para se destacar de fundos escuros;
    ctx.save();
    ctx.strokeStyle="rgba(127,224,255,0.45)"; ctx.lineWidth=1.4;
    ctx.shadowColor="rgba(127,224,255,0.5)"; ctx.shadowBlur=6;
    ctx.stroke();
    ctx.restore();
    // 2) duas linhas de "bordado" a brilhar, a descer pela capa — dão
    // textura/profundidade onde antes era uma só cor plana.
    ctx.strokeStyle="rgba(150,150,200,0.55)"; ctx.lineWidth=1.4; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(C-9,C-6); ctx.quadraticCurveTo(C-12,C+16,C-11,S-20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C+9,C-6); ctx.quadraticCurveTo(C+12,C+16,C+11,S-20); ctx.stroke();
    // capuz — sombra mais escura no topo
    ctx.fillStyle="#08081a";
    ctx.beginPath(); ctx.ellipse(C,C-18,17,20,0,0,Math.PI*2); ctx.fill();
    // borda do capuz a brilhar ligeiramente — separa a cara do resto da capa
    ctx.strokeStyle="rgba(127,224,255,0.3)"; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.ellipse(C,C-18,17,20,0,0,Math.PI*2); ctx.stroke();
  }
  // Mangas fantasmagóricas a sair da capa — "wave" levantadas (como a
  // invocar sombras), "rest" a pender junto ao corpo. Reaproveita o mesmo
  // gradiente escuro da capa, com garras pálidas na ponta para se destacar.
  function drawGuardiaoArms(ctx, mood){
    const grA=ctx.createLinearGradient(0,C-20,0,C+40);
    grA.addColorStop(0,"#4a4a72"); grA.addColorStop(1,"#0e0e1c");
    ctx.strokeStyle="#000"; ctx.lineWidth=2;
    if (mood === "wave") {
      [-1,1].forEach(side=>{
        ctx.fillStyle=grA;
        ctx.beginPath();
        ctx.moveTo(C+side*18, C-4);
        ctx.quadraticCurveTo(C+side*38, C-22, C+side*33, C-44);
        ctx.lineTo(C+side*21, C-38);
        ctx.quadraticCurveTo(C+side*22, C-18, C+side*9, C-2);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle="#c8c8e0";
        for(let i=-1;i<=1;i++){
          ctx.beginPath();
          ctx.moveTo(C+side*(27+i*3), C-40); ctx.lineTo(C+side*(29+i*3), C-49); ctx.lineTo(C+side*(31+i*3), C-40);
          ctx.closePath(); ctx.fill();
        }
      });
    } else {
      [-1,1].forEach(side=>{
        ctx.fillStyle=grA;
        ctx.beginPath();
        ctx.moveTo(C+side*18, C-4);
        ctx.quadraticCurveTo(C+side*30, C+16, C+side*23, C+32);
        ctx.lineTo(C+side*13, C+28);
        ctx.quadraticCurveTo(C+side*15, C+8, C+side*9, C-2);
        ctx.closePath(); ctx.fill(); ctx.stroke();
      });
    }
  }
  // eyesOpen=false: os olhos-brilho ficam só um traço fino a espreitar do
  // capuz, em vez do brilho cheio — a mesma ideia do piscar do Monstro.
  function drawGuardiaoFace(ctx, eyesOpen){
    if (eyesOpen) {
      glowEye(ctx, C-7, C-18, 5, "#8ee8ff");
      glowEye(ctx, C+7, C-18, 5, "#8ee8ff");
    } else {
      ctx.strokeStyle="#7fe0ff"; ctx.lineWidth=2; ctx.lineCap="round";
      ctx.shadowColor="#7fe0ff"; ctx.shadowBlur=6;
      [-7,7].forEach(dx=>{
        ctx.beginPath(); ctx.moveTo(C+dx-3,C-18); ctx.lineTo(C+dx+3,C-18); ctx.stroke();
      });
      ctx.shadowBlur=0;
    }
  }
  if(!scene.textures.exists("boss_guardiao_sombras")){
    const tex=scene.textures.createCanvas("boss_guardiao_sombras",S,S), ctx=tex.getContext();
    drawGuardiaoBody(ctx); drawGuardiaoArms(ctx,"rest"); drawGuardiaoFace(ctx,true);
    tex.refresh();
  }
  if(!scene.textures.exists("boss_guardiao_sombras_armsdown")){
    const tex=scene.textures.createCanvas("boss_guardiao_sombras_armsdown",S,S), ctx=tex.getContext();
    drawGuardiaoBody(ctx); drawGuardiaoArms(ctx,"rest"); drawGuardiaoFace(ctx,true);
    tex.refresh();
  }
  if(!scene.textures.exists("boss_guardiao_sombras_blink")){
    const tex=scene.textures.createCanvas("boss_guardiao_sombras_blink",S,S), ctx=tex.getContext();
    drawGuardiaoBody(ctx); drawGuardiaoArms(ctx,"rest"); drawGuardiaoFace(ctx,false);
    tex.refresh();
  }
  // "ouch": mangas levantadas em choque + olhos a brilhar com mais força
  // (em vez de expressão facial, que a capa não tem) — reage na mesma.
  if(!scene.textures.exists("boss_guardiao_sombras_ouch")){
    const tex=scene.textures.createCanvas("boss_guardiao_sombras_ouch",S,S), ctx=tex.getContext();
    drawGuardiaoBody(ctx); drawGuardiaoArms(ctx,"wave");
    glowEye(ctx, C-7, C-18, 6, "#ffffff");
    glowEye(ctx, C+7, C-18, 6, "#ffffff");
    tex.refresh();
  }

  // Estado "riso maléfico" — entrada em combate: olhos semicerrados de
  // gozo, confiante que a escuridão vai vencer. Sem boca (a capa não tem,
  // ver comentário no "ouch" acima) — tudo se exprime só nos olhos.
  if(!scene.textures.exists("boss_guardiao_sombras_laugh")){
    const tex=scene.textures.createCanvas("boss_guardiao_sombras_laugh",S,S), ctx=tex.getContext();
    drawGuardiaoBody(ctx); drawGuardiaoArms(ctx,"rest");
    ctx.strokeStyle="#7fe0ff"; ctx.lineWidth=2.5; ctx.lineCap="round";
    ctx.shadowColor="#7fe0ff"; ctx.shadowBlur=8;
    [-7,7].forEach(dx=>{
      ctx.beginPath(); ctx.arc(C+dx, C-15, 4.5, Math.PI*1.1, Math.PI*1.9); ctx.stroke();
    });
    ctx.shadowBlur=0;
    tex.refresh();
  }
  // Estado "zangado" (vermelho) — durante a escalada de fúria, o brilho dos
  // olhos muda de ciano para um tom quente/avermelhado; o motor de jogo
  // aplica também um tint por cima deste estado.
  if(!scene.textures.exists("boss_guardiao_sombras_angry")){
    const tex=scene.textures.createCanvas("boss_guardiao_sombras_angry",S,S), ctx=tex.getContext();
    drawGuardiaoBody(ctx); drawGuardiaoArms(ctx,"wave");
    glowEye(ctx, C-7, C-18, 5.4, "#ff6a5c");
    glowEye(ctx, C+7, C-18, 5.4, "#ff6a5c");
    ctx.strokeStyle="#ff6a5c"; ctx.lineWidth=2.5; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(C-15,C-27); ctx.lineTo(C-4,C-22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(C+4,C-22); ctx.lineTo(C+15,C-27); ctx.stroke();
    tex.refresh();
  }
  // Estado "triste" — derrota: o brilho apaga-se quase todo antes de fugir.
  if(!scene.textures.exists("boss_guardiao_sombras_sad")){
    const tex=scene.textures.createCanvas("boss_guardiao_sombras_sad",S,S), ctx=tex.getContext();
    drawGuardiaoBody(ctx); drawGuardiaoArms(ctx,"rest");
    glowEye(ctx, C-7, C-14, 2.6, "#5a90a8");
    glowEye(ctx, C+7, C-14, 2.6, "#5a90a8");
    tex.refresh();
  }

  // ── 4) Poluidor Mecânico — redesenho (pedido: "esteticamente pode ser
  // muito melhor" + expressões "mais vincadas") ──────────────────────────
  // Antes: um só LED vermelho ao centro mudava de forma ligeiramente entre
  // TODOS os estados (normal/riso/zangado/triste/choque) — daí serem quase
  // impossíveis de distinguir. Agora tem uma cara a sério, com a mesma
  // gramática visual legível dos outros 3 bosses (sobrancelhas + 2 olhos +
  // boca), só que em versão mecânica: duas lentes num visor escuro
  // embutido, sobrancelhas em forma de placas de metal articuladas, e uma
  // boca-grelha cuja FORMA muda por completo por estado (não só o brilho).
  // O corpo também ganhou mais detalhe/leitura: faixa de perigo
  // amarela/preta, manchas de ferrugem, e uma base de lagartas/rodas para
  // deixar de parecer que flutua — agora está mesmo "pousado" no chão,
  // como convém a um robô industrial pesado.
  function drawPoluidorBody(ctx){
    bossShadow(ctx);
    // fumo — penacho maior, várias camadas com opacidade a esbater
    [[C-2,C-46,8,0.5],[C+4,C-56,10,0.4],[C-5,C-66,8,0.28],[C+1,C-75,6,0.18]].forEach(([x,y,r,a])=>{
      ctx.fillStyle=`rgba(130,130,120,${a})`;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    });
    // chaminé com aro no topo
    ctx.fillStyle="#5a5a4a";
    ctx.fillRect(C-6,C-40,12,20);
    ctx.strokeStyle="#2a2a20"; ctx.lineWidth=1.5; ctx.strokeRect(C-6,C-40,12,20);
    ctx.fillStyle="#3a3a2e"; ctx.fillRect(C-8,C-42,16,4);
    // corpo — caixa metálica, gradiente oliva/ferrugem com mais contraste
    const gr=ctx.createLinearGradient(C-30,C-22,C+30,C+26);
    gr.addColorStop(0,"#a8b686"); gr.addColorStop(0.5,"#7a8a5c"); gr.addColorStop(1,"#4a5432");
    ctx.fillStyle=gr;
    rrPath(ctx,C-30,C-22,60,44,8); ctx.fill();
    ctx.strokeStyle="#2a2e1c"; ctx.lineWidth=2.5; ctx.stroke();
    // faixa de perigo amarela/preta — nova, ao longo da base do corpo
    ctx.save();
    rrPath(ctx,C-30,C+10,60,12,3); ctx.clip();
    ctx.fillStyle="#22241a"; ctx.fillRect(C-30,C+10,60,12);
    ctx.fillStyle="#e8c73c";
    for(let x=-36;x<40;x+=10){
      ctx.save(); ctx.translate(C+x,C+16); ctx.rotate(Math.PI/4);
      ctx.fillRect(-3,-11,6,22);
      ctx.restore();
    }
    ctx.restore();
    // manchas de ferrugem — decorativas, baixa opacidade
    ctx.fillStyle="rgba(120,60,20,0.35)";
    [[C-23,C-12,5],[C+21,C+2,4],[C-15,C+1,3]].forEach(([x,y,r])=>{
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    });
    // rebites
    ctx.fillStyle="#2f3320";
    [[-25,-17],[25,-17],[-25,-3],[25,-3]].forEach(([dx,dy])=>{
      ctx.beginPath(); ctx.arc(C+dx,C+dy,2.2,0,Math.PI*2); ctx.fill();
    });
    // engrenagens nos ombros
    [[-30,-4],[30,-4]].forEach(([dx,dy])=>{
      const gx=C+dx, gy=C+dy;
      ctx.fillStyle="#4a4a3a";
      for(let i=0;i<8;i++){
        const a=(Math.PI*2*i)/8;
        ctx.save(); ctx.translate(gx,gy); ctx.rotate(a);
        ctx.fillRect(-2,-11,4,5);
        ctx.restore();
      }
      ctx.beginPath(); ctx.arc(gx,gy,7,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#8a8a70"; ctx.beginPath(); ctx.arc(gx,gy,3,0,Math.PI*2); ctx.fill();
    });
    // base de lagartas/rodas — deixa de parecer que flutua
    ctx.fillStyle="#22241a";
    rrPath(ctx,C-28,C+22,56,13,4); ctx.fill();
    ctx.strokeStyle="#12130d"; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle="#4a4a3a";
    [-20,-7,7,20].forEach(dx=>{
      ctx.beginPath(); ctx.arc(C+dx,C+28,4.2,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#7a7a64"; ctx.beginPath(); ctx.arc(C+dx,C+28,1.6,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#4a4a3a";
    });
    // visor — painel escuro embutido onde entram os olhos+sobrancelhas+boca
    ctx.fillStyle="#1c1e14";
    rrPath(ctx,C-23,C-19,46,30,5); ctx.fill();
    ctx.strokeStyle="#0e0f0a"; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle="#4a4a3a";
    [[-20,-16],[20,-16],[-20,8],[20,8]].forEach(([dx,dy])=>{
      ctx.beginPath(); ctx.arc(C+dx,C+dy,1.6,0,Math.PI*2); ctx.fill();
    });
  }
  // Braços-garra mecânicos — "wave" levantados/abertos (a ameaçar), "rest"
  // pousados ao longo do corpo.
  function drawPoluidorArms(ctx, mood){
    ctx.fillStyle="#7a8a5c"; ctx.strokeStyle="#3a4028"; ctx.lineWidth=2.5;
    if (mood === "wave") {
      [-1,1].forEach(side=>{
        const sx=C+side*30, sy=C-4;
        ctx.beginPath(); ctx.ellipse(sx+side*11, sy-15, 7,14, side*0.45,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sx+side*15, sy-27); ctx.lineTo(sx+side*24, sy-33); ctx.lineTo(sx+side*17, sy-23); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sx+side*15, sy-21); ctx.lineTo(sx+side*25, sy-21); ctx.lineTo(sx+side*17, sy-15); ctx.closePath(); ctx.fill(); ctx.stroke();
      });
    } else {
      [-1,1].forEach(side=>{
        const sx=C+side*30, sy=C-4;
        ctx.beginPath(); ctx.ellipse(sx+side*7, sy+16, 7,14, -side*0.28,0,Math.PI*2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(sx+side*11, sy+31, 6, 0, Math.PI*2); ctx.fill(); ctx.stroke();
      });
    }
  }
  // Sobrancelhas mecânicas — placas de metal articuladas, uma por estado,
  // com um rebite no ponto de fixação. Ângulos bem diferentes entre si
  // (pedido: "mais vincado") para se lerem à distância.
  function drawPoluidorBrow(ctx, mood){
    ctx.strokeStyle="#1c1e14"; ctx.lineWidth=5; ctx.lineCap="round";
    const VT = C-19; // borda de cima do visor — as sobrancelhas ficam mesmo por cima
    const shapes = {
      normal:  [[C-21,VT-6,C-7,VT-4],[C+7,VT-4,C+21,VT-6]],
      laugh:   [[C-21,VT-9,C-6,VT-5],[C+6,VT-5,C+21,VT-9]],
      angry:   [[C-21,VT-10,C-6,VT+2],[C+6,VT+2,C+21,VT-10]],
      sad:     [[C-21,VT+0,C-6,VT-7],[C+6,VT-7,C+21,VT+0]],
      ouch:    [[C-22,VT-12,C-5,VT-10],[C+5,VT-10,C+22,VT-12]],
    };
    (shapes[mood]||shapes.normal).forEach(([x1,y1,x2,y2])=>{
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });
    ctx.fillStyle="#4a4a3a";
    [-14,14].forEach(dx=>{ ctx.beginPath(); ctx.arc(C+dx,VT-6,2,0,Math.PI*2); ctx.fill(); });
  }
  // Duas lentes (em vez de um LED central só) — cor/tamanho variam por
  // estado. "blink" fecha-as como um obturador mecânico.
  function drawPoluidorEyes(ctx, mood){
    const pos=[[-10,-6],[10,-6]];
    if (mood==="blink"){
      ctx.strokeStyle="#ff4030"; ctx.lineWidth=2.5; ctx.lineCap="round";
      ctx.shadowColor="#ff4030"; ctx.shadowBlur=5;
      pos.forEach(([dx,dy])=>{ ctx.beginPath(); ctx.moveTo(C+dx-4,C+dy); ctx.lineTo(C+dx+4,C+dy); ctx.stroke(); });
      ctx.shadowBlur=0;
      return;
    }
    let r=5.5, color="#ff4030", dyAdj=0;
    if (mood==="angry"){ r=6.5; color="#ff2010"; }
    if (mood==="laugh"){ r=5;   color="#ff6030"; }
    if (mood==="ouch"){  r=7;   color="#ffffff"; }
    if (mood==="sad"){   r=4;   color="#ff8070"; dyAdj=3; }
    pos.forEach(([dx,dy])=>{ glowEye(ctx, C+dx, C+dy+dyAdj, r, color); });
  }
  // Boca-grelha — a peça que mais muda de FORMA (não só de cor) entre
  // estados, para as expressões ficarem mesmo "vincadas": grelha reta
  // (normal), grelha larga e aberta a rir (laugh), fenda descaída (sad),
  // grelha em zigue-zague cerrada (angry), grelha ovalada bem aberta em
  // choque (ouch).
  function drawPoluidorMouth(ctx, mood){
    const cy=C+1; // dentro do visor (que vai até C+11) — antes ultrapassava a borda de baixo
    if (mood==="laugh"){
      ctx.fillStyle="#12130d"; ctx.strokeStyle="#0e0f0a"; ctx.lineWidth=1.5;
      ctx.beginPath();
      ctx.moveTo(C-15,cy-3); ctx.quadraticCurveTo(C, cy+7, C+15, cy-3);
      ctx.quadraticCurveTo(C, cy+1, C-15, cy-3);
      ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle="#ffe85c"; ctx.lineWidth=1.2;
      for(let i=0;i<2;i++){ ctx.beginPath(); ctx.moveTo(C-9,cy+i*2.2); ctx.lineTo(C+9,cy+i*2.2); ctx.stroke(); }
    } else if (mood==="sad"){
      ctx.strokeStyle="#3a4028"; ctx.lineWidth=2.5; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(C-10,cy+3); ctx.quadraticCurveTo(C, cy-5, C+10, cy+3); ctx.stroke();
    } else if (mood==="angry"){
      ctx.strokeStyle="#0e0f0a"; ctx.lineWidth=3; ctx.lineCap="round"; ctx.lineJoin="round";
      ctx.beginPath();
      ctx.moveTo(C-13,cy-1);
      for(let i=0;i<4;i++){ ctx.lineTo(C-13+(i+1)*6.5, cy-1+(i%2===0?4:-4)); }
      ctx.stroke();
    } else if (mood==="ouch"){
      ctx.fillStyle="#0e0f0a";
      ctx.beginPath(); ctx.ellipse(C,cy+1,6.5,6.5,0,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle="#ffe85c"; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(C-4,cy+1); ctx.lineTo(C+4,cy+1); ctx.stroke();
    } else {
      ctx.strokeStyle="#12130d"; ctx.lineWidth=2;
      for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(C-9,cy-4+i*3.4); ctx.lineTo(C+9,cy-4+i*3.4); ctx.stroke(); }
    }
  }
  // Reúne sobrancelhas + olhos + boca — um só ponto de entrada por estado,
  // reaproveitado pelos 7 blocos de textura abaixo.
  function drawPoluidorFace(ctx, mood){
    drawPoluidorBrow(ctx, mood);
    drawPoluidorEyes(ctx, mood);
    drawPoluidorMouth(ctx, mood);
  }
  if(!scene.textures.exists("boss_poluidor_mecanico")){
    const tex=scene.textures.createCanvas("boss_poluidor_mecanico",S,S), ctx=tex.getContext();
    drawPoluidorBody(ctx); drawPoluidorArms(ctx,"wave"); drawPoluidorFace(ctx,"normal");
    tex.refresh();
  }
  if(!scene.textures.exists("boss_poluidor_mecanico_armsdown")){
    const tex=scene.textures.createCanvas("boss_poluidor_mecanico_armsdown",S,S), ctx=tex.getContext();
    drawPoluidorBody(ctx); drawPoluidorArms(ctx,"rest"); drawPoluidorFace(ctx,"normal");
    tex.refresh();
  }
  if(!scene.textures.exists("boss_poluidor_mecanico_blink")){
    const tex=scene.textures.createCanvas("boss_poluidor_mecanico_blink",S,S), ctx=tex.getContext();
    drawPoluidorBody(ctx); drawPoluidorArms(ctx,"wave"); drawPoluidorFace(ctx,"blink");
    tex.refresh();
  }
  // "ouch" — sobrancelhas esbugalhadas, olhos brancos de sobrecarga, boca
  // ovalada bem aberta + faíscas dos cantos do visor.
  if(!scene.textures.exists("boss_poluidor_mecanico_ouch")){
    const tex=scene.textures.createCanvas("boss_poluidor_mecanico_ouch",S,S), ctx=tex.getContext();
    drawPoluidorBody(ctx); drawPoluidorArms(ctx,"rest"); drawPoluidorFace(ctx,"ouch");
    ctx.strokeStyle="#ffe85c"; ctx.lineWidth=2; ctx.lineCap="round";
    [[C-21,C-12,C-29,C-22],[C+21,C-12,C+29,C-22],[C-17,C+12,C-25,C+20]].forEach(([x1,y1,x2,y2])=>{
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    });
    tex.refresh();
  }
  // "riso maléfico" — entrada em combate: sobrancelhas trocistas erguidas
  // nas pontas, lentes com brilho quente, boca-grelha bem aberta a rir.
  if(!scene.textures.exists("boss_poluidor_mecanico_laugh")){
    const tex=scene.textures.createCanvas("boss_poluidor_mecanico_laugh",S,S), ctx=tex.getContext();
    drawPoluidorBody(ctx); drawPoluidorArms(ctx,"wave"); drawPoluidorFace(ctx,"laugh");
    tex.refresh();
  }
  // "zangado" (vermelho) — sobrancelhas em V bem carregado, lentes maiores
  // e mais intensas, boca em grelha cerrada/dentada. O motor de jogo
  // aplica também um tint por cima deste estado.
  if(!scene.textures.exists("boss_poluidor_mecanico_angry")){
    const tex=scene.textures.createCanvas("boss_poluidor_mecanico_angry",S,S), ctx=tex.getContext();
    drawPoluidorBody(ctx); drawPoluidorArms(ctx,"wave"); drawPoluidorFace(ctx,"angry");
    tex.refresh();
  }
  // "triste" — derrota: sobrancelhas preocupadas (caídas para dentro),
  // lentes pequenas e baças, boca-grelha descaída, antes de fugir a coxear.
  if(!scene.textures.exists("boss_poluidor_mecanico_sad")){
    const tex=scene.textures.createCanvas("boss_poluidor_mecanico_sad",S,S), ctx=tex.getContext();
    drawPoluidorBody(ctx); drawPoluidorArms(ctx,"rest"); drawPoluidorFace(ctx,"sad");
    tex.refresh();
  }

  // ── Projéteis do Monstro da Ignorância — livro bom vs. livro mau ────
  // Muito diferentes ao olhar: dourado/brilhante vs. escuro/rabiscado com X vermelho.
  if(!scene.textures.exists("boss_proj_book")){
    const w=34,h=28,tex=scene.textures.createCanvas("boss_proj_book",w,h), ctx=tex.getContext();
    ctx.shadowColor="rgba(255,220,80,0.8)"; ctx.shadowBlur=9;
    // capa
    const gr=ctx.createLinearGradient(2,2,w-2,h-2);
    gr.addColorStop(0,"#fff2b0"); gr.addColorStop(0.5,"#ffd23f"); gr.addColorStop(1,"#e08a00");
    ctx.fillStyle=gr; rrPath(ctx,2,2,w-4,h-4,4); ctx.fill();
    ctx.shadowBlur=0;
    ctx.strokeStyle="#8a5200"; ctx.lineWidth=2; ctx.stroke();
    // lombada
    ctx.strokeStyle="rgba(138,82,0,0.6)"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(w/2,3); ctx.lineTo(w/2,h-3); ctx.stroke();
    // páginas
    ctx.fillStyle="#fffdf0";
    ctx.fillRect(5,6,w/2-6,h-12); ctx.fillRect(w/2+1,6,w/2-6,h-12);
    // brilho de "conhecimento"
    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.beginPath(); ctx.ellipse(9,8,4,3,Math.PI/4,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }
  if(!scene.textures.exists("boss_proj_badbook")){
    const w=34,h=28,tex=scene.textures.createCanvas("boss_proj_badbook",w,h), ctx=tex.getContext();
    const gr=ctx.createLinearGradient(2,2,w-2,h-2);
    gr.addColorStop(0,"#5a4a5c"); gr.addColorStop(0.5,"#3a2a3c"); gr.addColorStop(1,"#1a0e1c");
    ctx.fillStyle=gr; rrPath(ctx,2,2,w-4,h-4,4); ctx.fill();
    ctx.strokeStyle="#0a050a"; ctx.lineWidth=2; ctx.stroke();
    // rabiscos confusos
    ctx.strokeStyle="rgba(180,160,190,0.5)"; ctx.lineWidth=1;
    for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(6,9+i*5); ctx.lineTo(16,7+i*6); ctx.stroke(); }
    // aviso — X vermelho bem visível
    ctx.shadowColor="rgba(255,40,40,0.7)"; ctx.shadowBlur=6;
    ctx.strokeStyle="#ff3030"; ctx.lineWidth=3.5; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(w-15,7); ctx.lineTo(w-3,19); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w-3,7); ctx.lineTo(w-15,19); ctx.stroke();
    ctx.shadowBlur=0;
    tex.refresh();
  }
  // ── Bola ❓ do Monstro da Ignorância (redesenho) — rola devagar pelo chão,
  // saltitando um pouco, em vez de voar direto à cabeça. Lenta e fácil de
  // ver/evitar de propósito — nada de "aviso vermelho" agressivo aqui.
  if(!scene.textures.exists("boss_proj_qmark")){
    const w=30,h=30,tex=scene.textures.createCanvas("boss_proj_qmark",w,h), ctx=tex.getContext();
    const gr=ctx.createRadialGradient(w/2-4,h/2-4,2,w/2,h/2,15);
    gr.addColorStop(0,"#c8aeff"); gr.addColorStop(0.6,"#8a5cff"); gr.addColorStop(1,"#5228b0");
    ctx.fillStyle=gr;
    ctx.beginPath(); ctx.arc(w/2,h/2,13,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#2a1060"; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle="#fff8ff"; ctx.font="bold 15px sans-serif"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.fillText("?", w/2, h/2+1);
    ctx.textBaseline="alphabetic";
    tex.refresh();
  }

  // ── Micróbio do Vírus Gigante — bolinha com espigões curtos, sem símbolo
  // nenhum (o "?" só fazia sentido no Monstro da Ignorância). Desenhada em
  // tons neutros/claros para o setTint (orbTint em data-bosses.js) pintar
  // limpo por cima, tal como já acontecia com a bola ❓ original.
  if(!scene.textures.exists("boss_proj_germ")){
    const w=30,h=30,tex=scene.textures.createCanvas("boss_proj_germ",w,h), ctx=tex.getContext();
    const cx=w/2, cy=h/2, r=10;
    // espigões curtos à volta (visual de vírus/micróbio, não de "perigo")
    ctx.strokeStyle="#e8e0ff"; ctx.lineWidth=2.2;
    for(let i=0;i<8;i++){
      const a=(Math.PI*2*i)/8;
      const x1=cx+Math.cos(a)*r, y1=cy+Math.sin(a)*r;
      const x2=cx+Math.cos(a)*(r+4.5), y2=cy+Math.sin(a)*(r+4.5);
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x2,y2,1.6,0,Math.PI*2); ctx.fillStyle="#e8e0ff"; ctx.fill();
    }
    const gr=ctx.createRadialGradient(cx-3,cy-3,1,cx,cy,r);
    gr.addColorStop(0,"#ffffff"); gr.addColorStop(0.6,"#e8e0ff"); gr.addColorStop(1,"#b8a8e0");
    ctx.fillStyle=gr;
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
    // pequenas manchas internas, tipo organelos
    ctx.fillStyle="rgba(150,120,200,0.5)";
    ctx.beginPath(); ctx.arc(cx-3,cy+2,2.4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx+3,cy-3,1.8,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }

  // ── Orbe sombrio do Guardião das Sombras — antes era só um círculo liso
  // com um traço fino (não lia como "nuvem" nenhuma, parecia só uma bolinha
  // igual às outras). Agora é um aglomerado de bolhas sobrepostas (silhueta
  // tipo nuvenzinha), com 2 caudas de fumo a espiralar para os lados e um
  // par de "olhos" ténues — dá logo a ideia de nuvem/sombra com alguma
  // presença assombrada, sem símbolo nenhum. Desenhada quase branca (o tint
  // em data-bosses.js é que lhe dá a cor roxo-escura final).
  if(!scene.textures.exists("boss_proj_shadow")){
    const w=30,h=30,tex=scene.textures.createCanvas("boss_proj_shadow",w,h), ctx=tex.getContext();
    const cx=w/2, cy=h/2;
    ctx.shadowColor="#e8e0ff"; ctx.shadowBlur=6;
    const gr=ctx.createRadialGradient(cx-2,cy-2,1,cx,cy,13);
    gr.addColorStop(0,"#ffffff"); gr.addColorStop(0.45,"#d8ccf5"); gr.addColorStop(1,"#9a86d0");
    ctx.fillStyle=gr;
    // Várias bolhas sobrepostas em vez de um único círculo perfeito — é isto
    // que dá a silhueta irregular e "fofa" de nuvem, em vez de uma bola lisa.
    [[0,-2,7],[-6,1,5.5],[6,1,5.5],[-3,5,5],[3,5,5],[0,0,8]].forEach(([dx,dy,r])=>{
      ctx.beginPath(); ctx.arc(cx+dx,cy+dy,r,0,Math.PI*2); ctx.fill();
    });
    ctx.shadowBlur=0;
    // Duas caudas de fumo/sombra a espiralar para os lados opostos — reforça
    // a sensação de algo imaterial (nem espigões de vírus, nem contorno reto
    // de porca/parafuso).
    ctx.strokeStyle="rgba(255,255,255,0.5)"; ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.moveTo(cx-9,cy-1); ctx.quadraticCurveTo(cx-13,cy-6,cx-11,cy-11); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx+9,cy+2); ctx.quadraticCurveTo(cx+13,cy+7,cx+10,cy+12); ctx.stroke();
    // Par de "olhos" bem ténues — presença ligeiramente assombrada, sem
    // exagerar (isto continua a ser um jogo do 4º ano).
    ctx.fillStyle="rgba(230,220,255,0.9)";
    ctx.beginPath(); ctx.ellipse(cx-2.5,cy-1,1.1,1.6,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx+2.5,cy-1,1.1,1.6,0,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }

  // ── Faísca/parafuso do Poluidor Mecânico — pequena porca dourada com
  // brilho, sem símbolo — tema industrial em vez de "perigo desconhecido".
  if(!scene.textures.exists("boss_proj_bolt")){
    const w=30,h=30,tex=scene.textures.createCanvas("boss_proj_bolt",w,h), ctx=tex.getContext();
    const cx=w/2, cy=h/2, r=9;
    const gr=ctx.createRadialGradient(cx-3,cy-3,1,cx,cy,r+3);
    gr.addColorStop(0,"#fffef0"); gr.addColorStop(0.6,"#f0ecc8"); gr.addColorStop(1,"#c8bc80");
    ctx.fillStyle=gr;
    // hexágono (porca)
    ctx.beginPath();
    for(let i=0;i<6;i++){
      const a=(Math.PI*2*i)/6 - Math.PI/2;
      const x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    }
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle="#8a7a30"; ctx.lineWidth=1.6; ctx.stroke();
    ctx.fillStyle="#8a7a30";
    ctx.beginPath(); ctx.arc(cx,cy,3.2,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }
}

function makeSparkTexture(scene){
  if(scene.textures.exists("spark_item")) return;
  const g=scene.make.graphics({x:0,y:0,add:false});
  g.fillStyle(0xffd700,1);
  g.beginPath();
  for(let _i=0;_i<5;_i++){
    const _o=Math.PI*2*_i/5-Math.PI/2, _in=_o+Math.PI/5;
    _i===0?g.moveTo(8+Math.cos(_o)*8,8+Math.sin(_o)*8):g.lineTo(8+Math.cos(_o)*8,8+Math.sin(_o)*8);
    g.lineTo(8+Math.cos(_in)*3,8+Math.sin(_in)*3);
  }
  g.closePath(); g.fillPath();
  g.generateTexture("spark_item",16,16); g.destroy();
}

function makeItemTextures(scene){
  // Estrela
  if(!scene.textures.exists("item_estrela")){
    // Estrela v20: 44×44, pontas arredondadas, gradiente dourado, facetas, brilho e carinha sorridente.
    const S=44, tex=scene.textures.createCanvas("item_estrela",S,S), ctx=tex.getContext();
    const cx=22, cy=23.5, RO=19, RI=9.2;
    const pt=(k,r)=>{ const a=-Math.PI/2+k*Math.PI/5; return [cx+Math.cos(a)*r, cy+Math.sin(a)*r]; };
    const starPath=()=>{ ctx.beginPath(); for(let k=0;k<10;k++){ const [x,y]=pt(k,k%2?RI:RO); k?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.closePath(); };
    // brilho exterior + sombra
    ctx.save(); ctx.shadowColor="rgba(255,150,30,0.85)"; ctx.shadowBlur=9;
    ctx.lineJoin="round"; ctx.lineWidth=5; ctx.strokeStyle="#c47a00"; ctx.fillStyle="#ffc400"; starPath(); ctx.stroke(); ctx.fill(); ctx.restore();
    // corpo com gradiente
    const g=ctx.createLinearGradient(cx-16,cy-18,cx+14,cy+18); g.addColorStop(0,"#fff6a8"); g.addColorStop(0.45,"#ffd51f"); g.addColorStop(1,"#f29a00");
    ctx.lineJoin="round"; ctx.fillStyle=g; starPath(); ctx.fill();
    // facetas: metade de cada ponta mais escura
    ctx.save(); starPath(); ctx.clip();
    for(let k=0;k<5;k++){ const o=pt(2*k,RO), l=pt(2*k-1,RI), r=pt(2*k+1,RI);
      ctx.fillStyle="rgba(190,100,0,0.20)"; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(o[0],o[1]); ctx.lineTo(r[0],r[1]); ctx.closePath(); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.22)"; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(o[0],o[1]); ctx.lineTo(l[0],l[1]); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    // contorno
    ctx.lineJoin="round"; ctx.lineWidth=2.4; ctx.strokeStyle="#a85f00"; starPath(); ctx.stroke();
    // brilhos
    ctx.fillStyle="rgba(255,255,255,0.75)"; ctx.beginPath(); ctx.ellipse(15.5,12.5,3.6,2,-0.7,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(30.5,9.5,1.1,0,Math.PI*2); ctx.fill();
    // carinha
    ctx.fillStyle="#5a3000"; ctx.beginPath(); ctx.ellipse(cx-4.4,cy-0.5,1.7,2.2,0,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx+4.4,cy-0.5,1.7,2.2,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(cx-3.8,cy-1.3,0.65,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(cx+5,cy-1.3,0.65,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#5a3000"; ctx.lineWidth=1.5; ctx.lineCap="round"; ctx.beginPath(); ctx.arc(cx,cy+3,3.2,0.25,Math.PI-0.25); ctx.stroke();
    ctx.fillStyle="rgba(255,90,70,0.4)"; ctx.beginPath(); ctx.ellipse(cx-8,cy+3.2,2.4,1.5,0,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(cx+8,cy+3.2,2.4,1.5,0,0,Math.PI*2); ctx.fill();
    tex.refresh();
  }
  // Balões 🎈 flutuantes — 6 cores
  const BALAO_COLORS=[
    {hi:"#ff9080", lo:"#e84d10", stroke:"#b03000"}, // laranja-vermelho
    {hi:"#ffe080", lo:"#ffd700", stroke:"#b09000"}, // amarelo
    {hi:"#ff90d0", lo:"#e0209a", stroke:"#900060"}, // rosa
    {hi:"#90d0ff", lo:"#1a90e0", stroke:"#005090"}, // azul
    {hi:"#90ffb0", lo:"#20c060", stroke:"#008030"}, // verde
    {hi:"#d0a0ff", lo:"#9030e0", stroke:"#500090"}, // lilás
  ];
  BALAO_COLORS.forEach((bc,ci)=>{
    const key="item_balao_"+ci;
    if(scene.textures.exists(key)) return;
    const tex=scene.textures.createCanvas(key,32,46), ctx=tex.getContext();
    // Corpo do balão
    const gr=ctx.createRadialGradient(10,11,2,16,16,14);
    gr.addColorStop(0,bc.hi); gr.addColorStop(1,bc.lo);
    ctx.fillStyle=gr;
    ctx.beginPath(); ctx.ellipse(16,16,13,15,0,0,Math.PI*2); ctx.fill();
    // Contorno
    ctx.strokeStyle=bc.stroke; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.ellipse(16,16,13,15,0,0,Math.PI*2); ctx.stroke();
    // Brilho oval
    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.beginPath(); ctx.ellipse(10,9,4,6,Math.PI/4,0,Math.PI*2); ctx.fill();
    // Brilho pequeno secundário
    ctx.fillStyle="rgba(255,255,255,0.25)";
    ctx.beginPath(); ctx.ellipse(20,11,2.5,3.5,Math.PI/5,0,Math.PI*2); ctx.fill();
    // Nozinho na base
    ctx.fillStyle=bc.lo;
    ctx.beginPath(); ctx.arc(16,31,3,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle=bc.stroke; ctx.lineWidth=1; ctx.stroke();
    // Fio
    ctx.strokeStyle=bc.stroke; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.moveTo(16,31);
    ctx.quadraticCurveTo(18,38,16,44); ctx.stroke();
    tex.refresh();
  });
  // Chupa-chupa 🍭 — desenhado em Canvas (consistente com todos os outros itens)
  if(!scene.textures.exists("item_chupachupa")){
    const tex=scene.textures.createCanvas("item_chupachupa",52,56), ctx=tex.getContext();
    const cx=26, cy=20;

    // Halo exterior colorido (brilho de candy)
    const haloGr = ctx.createRadialGradient(cx,cy,12,cx,cy,22);
    haloGr.addColorStop(0,"rgba(255,100,200,0)");
    haloGr.addColorStop(0.6,"rgba(255,80,180,0.22)");
    haloGr.addColorStop(1,"rgba(255,200,80,0.0)");
    ctx.fillStyle=haloGr;
    ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2); ctx.fill();

    // Cabo — listrado como bastão de Natal (vermelho e branco alternados)
    for(let ri=0; ri<5; ri++){
      ctx.fillStyle = ri%2===0 ? "#ff1a44" : "#fff5f8";
      ctx.beginPath();
      ctx.roundRect(cx-4, cy+12+ri*5, 8, 6, ri===0?[3,3,0,0]:ri===4?[0,0,3,3]:[0]);
      ctx.fill();
    }
    // Brilho no cabo (lateral esquerda)
    ctx.fillStyle="rgba(255,255,255,0.45)";
    ctx.fillRect(cx-3, cy+13, 2, 22);
    // Contorno do cabo
    ctx.strokeStyle="#cc0030"; ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.roundRect(cx-4,cy+12,8,28,3); ctx.stroke();

    // Sombra suave por baixo do berlinde
    ctx.fillStyle="rgba(180,0,80,0.20)";
    ctx.beginPath(); ctx.ellipse(cx+3,cy+5,15,5,0,0,Math.PI*2); ctx.fill();

    // Berlinde — 6 fatias arco-íris bem saturadas
    const sliceColors=[
      "#ff1a44",  // vermelho vivo
      "#ff8c00",  // laranja
      "#ffe600",  // amarelo
      "#00cc44",  // verde
      "#0088ff",  // azul
      "#cc00ff",  // violeta
    ];
    ctx.save(); ctx.translate(cx,cy);
    // Clip ao círculo para as fatias não saírem
    ctx.beginPath(); ctx.arc(0,0,17,0,Math.PI*2); ctx.clip();
    for(let si=0;si<6;si++){
      ctx.fillStyle=sliceColors[si];
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.arc(0,0,17, si*Math.PI/3 - Math.PI*0.015, (si+1)*Math.PI/3 + Math.PI*0.015);
      ctx.closePath(); ctx.fill();
    }
    // Espiral branca por cima das fatias (dá o aspeto de twist clássico)
    ctx.strokeStyle="rgba(255,255,255,0.70)";
    ctx.lineWidth=3.5;
    ctx.lineCap="round";
    ctx.beginPath();
    for(let t=0; t<=Math.PI*1.7; t+=0.06){
      const r = t / (Math.PI*1.7) * 15;
      const x2 = Math.cos(t) * r;
      const y2 = Math.sin(t) * r;
      t===0 ? ctx.moveTo(x2,y2) : ctx.lineTo(x2,y2);
    }
    ctx.stroke();
    ctx.restore();

    // Contorno do berlinde — grosso e escuro para destacar
    ctx.shadowColor="rgba(180,0,80,0.55)"; ctx.shadowBlur=8;
    ctx.strokeStyle="#990022"; ctx.lineWidth=2.5;
    ctx.beginPath(); ctx.arc(cx,cy,17,0,Math.PI*2); ctx.stroke();
    ctx.shadowBlur=0;

    // Brilho principal (oval branco grande no canto sup. esq.)
    ctx.fillStyle="rgba(255,255,255,0.62)";
    ctx.beginPath(); ctx.ellipse(cx-6,cy-7,7,9,Math.PI*0.35,0,Math.PI*2); ctx.fill();
    // Brilho secundário mais pequeno
    ctx.fillStyle="rgba(255,255,255,0.38)";
    ctx.beginPath(); ctx.ellipse(cx-4,cy-12,3.5,4.5,Math.PI*0.3,0,Math.PI*2); ctx.fill();
    // Ponto de luz vivo no centro do brilho
    ctx.fillStyle="rgba(255,255,255,0.85)";
    ctx.beginPath(); ctx.arc(cx-8,cy-9,2.5,0,Math.PI*2); ctx.fill();

    tex.refresh();
  }
  // Brinquedo — ursinho de peluche 🧸 (sentado, de frente, com laço vermelho)
  if(!scene.textures.exists("item_brinquedo")){
    const tex=scene.textures.createCanvas("item_brinquedo",56,62), ctx=tex.getContext();
    const OL="#6e3510";                       // contorno castanho-escuro
    const FUR_L="#f0bb7a", FUR="#d28a47", FUR_D="#b06a2e";
    const CREAM="#fbe3b8", PAD="#f2a89a";
    const part=(path,fill)=>{ ctx.beginPath(); path(); ctx.fillStyle=fill; ctx.fill(); ctx.strokeStyle=OL; ctx.lineWidth=1.7; ctx.lineJoin="round"; ctx.stroke(); };
    const fur=(cx,cy,r)=>{ const g=ctx.createRadialGradient(cx-r*0.35,cy-r*0.4,r*0.1,cx,cy,r*1.15); g.addColorStop(0,FUR_L); g.addColorStop(0.55,FUR); g.addColorStop(1,FUR_D); return g; };

    // sombra no chão
    ctx.fillStyle="rgba(0,0,0,0.18)"; ctx.beginPath(); ctx.ellipse(28,58.5,19,3,0,0,Math.PI*2); ctx.fill();

    // pés (sentado, pernas à frente)
    [[16.5,-0.12],[39.5,0.12]].forEach(([x,r])=>{
      part(()=>ctx.ellipse(x,51.5,9,7,r,0,Math.PI*2), fur(x,51.5,9));
      ctx.fillStyle=PAD; ctx.beginPath(); ctx.ellipse(x,53,5,3.6,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#fff"; ctx.globalAlpha=0.5; ctx.beginPath(); ctx.arc(x-1.5,52.4,1,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1;
    });

    // corpo
    part(()=>ctx.ellipse(28,40,15.5,15,0,0,Math.PI*2), fur(28,40,15.5));
    // barriga
    ctx.beginPath(); ctx.ellipse(28,42.5,9.5,9.5,0,0,Math.PI*2); ctx.fillStyle=CREAM; ctx.fill();
    ctx.strokeStyle="rgba(110,53,16,0.35)"; ctx.lineWidth=1.1; ctx.stroke();
    // remendo em coração na barriga
    ctx.fillStyle="#ff6f8f"; ctx.beginPath();
    ctx.moveTo(28,47); ctx.bezierCurveTo(21.5,42.5,23.5,38.5,28,41.4); ctx.bezierCurveTo(32.5,38.5,34.5,42.5,28,47); ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,0.8)"; ctx.setLineDash([1.6,1.6]); ctx.lineWidth=0.9; ctx.stroke(); ctx.setLineDash([]);

    // braços (ligeiramente levantados)
    [[11.5,38,0.55,-1],[44.5,38,-0.55,1]].forEach(([x,y,r])=>{
      part(()=>ctx.ellipse(x,y,5.6,9,r,0,Math.PI*2), fur(x,y,9));
    });
    ctx.fillStyle=PAD;
    ctx.beginPath(); ctx.arc(8.3,45.2,2.6,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(47.7,45.2,2.6,0,Math.PI*2); ctx.fill();

    // orelhas (atrás da cabeça)
    [[14.5,9],[41.5,9]].forEach(([x,y])=>{
      part(()=>ctx.arc(x,y,7,0,Math.PI*2), fur(x,y,7));
      ctx.fillStyle=PAD; ctx.beginPath(); ctx.arc(x,y+0.3,3.9,0,Math.PI*2); ctx.fill();
    });

    // cabeça
    part(()=>ctx.arc(28,21,15.5,0,Math.PI*2), fur(28,21,15.5));
    // brilho no pelo
    ctx.fillStyle="rgba(255,255,255,0.28)"; ctx.beginPath(); ctx.ellipse(21,11.5,6,3,-0.5,0,Math.PI*2); ctx.fill();

    // bochechas
    ctx.fillStyle="rgba(255,105,115,0.45)";
    ctx.beginPath(); ctx.ellipse(16.5,26,3.3,2.2,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(39.5,26,3.3,2.2,0,0,Math.PI*2); ctx.fill();

    // focinho
    ctx.beginPath(); ctx.ellipse(28,26.5,8,6.2,0,0,Math.PI*2); ctx.fillStyle=CREAM; ctx.fill();
    ctx.strokeStyle="rgba(110,53,16,0.55)"; ctx.lineWidth=1.2; ctx.stroke();
    // nariz
    ctx.fillStyle="#3a1a08"; ctx.beginPath();
    ctx.moveTo(24.6,23.6); ctx.quadraticCurveTo(28,21.8,31.4,23.6); ctx.quadraticCurveTo(30.6,27,28,27.4); ctx.quadraticCurveTo(25.4,27,24.6,23.6); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,0.7)"; ctx.beginPath(); ctx.ellipse(26.8,23.7,1.3,0.7,-0.3,0,Math.PI*2); ctx.fill();
    // boca sorridente
    ctx.strokeStyle="#3a1a08"; ctx.lineWidth=1.5; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(28,27.4); ctx.lineTo(28,29);
    ctx.moveTo(28,29); ctx.quadraticCurveTo(25.8,31.2,23.6,29.2);
    ctx.moveTo(28,29); ctx.quadraticCurveTo(30.2,31.2,32.4,29.2); ctx.stroke();

    // olhos
    [[21,18.5],[35,18.5]].forEach(([x,y])=>{
      ctx.fillStyle="#2a1000"; ctx.beginPath(); ctx.ellipse(x,y,3.1,3.5,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(x+1,y-1.3,1.25,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(x-1,y+1.2,0.55,0,Math.PI*2); ctx.fill();
    });

    // laço vermelho
    const bow=(dir)=>{ ctx.beginPath(); ctx.moveTo(28,36.5); ctx.quadraticCurveTo(28+dir*8,30.5,28+dir*11,34.5); ctx.quadraticCurveTo(28+dir*11,39.5,28,36.5); ctx.closePath();
      ctx.fillStyle="#e8344e"; ctx.fill(); ctx.strokeStyle="#8c1228"; ctx.lineWidth=1.3; ctx.stroke(); };
    bow(-1); bow(1);
    ctx.fillStyle="#ff6b82"; ctx.beginPath(); ctx.ellipse(28,36.5,2.9,2.7,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="#8c1228"; ctx.lineWidth=1.3; ctx.stroke();
    tex.refresh();
  }
  // Escudo — canvas 52×58, forma classica de escudo heraldico
  if(!scene.textures.exists("item_medalha")){
    const tex=scene.textures.createCanvas("item_medalha",52,58), ctx=tex.getContext();
    const cx=26, cy=26;

    // Funcao auxiliar para desenhar a forma do escudo
    function shieldPath(ctx, x, y, w, h){
      const r=w*0.18;
      ctx.beginPath();
      ctx.moveTo(x+r, y);
      ctx.lineTo(x+w-r, y);
      ctx.quadraticCurveTo(x+w, y, x+w, y+r);
      ctx.lineTo(x+w, y+h*0.55);
      // Curva inferior que forma a ponta do escudo
      ctx.quadraticCurveTo(x+w, y+h*0.82, x+w/2, y+h);
      ctx.quadraticCurveTo(x, y+h*0.82, x, y+h*0.55);
      ctx.lineTo(x, y+r);
      ctx.quadraticCurveTo(x, y, x+r, y);
      ctx.closePath();
    }

    // Sombra exterior
    ctx.shadowColor="rgba(255,215,0,0.55)"; ctx.shadowBlur=8;
    // Borda exterior dourada
    const borderGr=ctx.createLinearGradient(0,0,0,54);
    borderGr.addColorStop(0,"#ffe060"); borderGr.addColorStop(1,"#c07000");
    ctx.fillStyle=borderGr; shieldPath(ctx,1,1,50,54); ctx.fill();
    ctx.shadowBlur=0;

    // Corpo do escudo — gradiente azul real
    const bodyGr=ctx.createLinearGradient(4,4,4,50);
    bodyGr.addColorStop(0,"#4a90e8"); bodyGr.addColorStop(0.5,"#1a50b8"); bodyGr.addColorStop(1,"#0a2878");
    ctx.fillStyle=bodyGr; shieldPath(ctx,4,4,44,50); ctx.fill();

    // Reflexo de luz no topo esquerdo
    ctx.fillStyle="rgba(255,255,255,0.28)";
    ctx.beginPath(); ctx.ellipse(16,14,9,13,Math.PI*0.15,0,Math.PI*2); ctx.fill();

    // Divisao central horizontal (cruz do escudo — faixa horizontal)
    ctx.fillStyle="rgba(255,215,0,0.22)";
    ctx.fillRect(4,24,44,6);
    // Divisao central vertical
    ctx.fillRect(23,4,6,50);

    // Estrela dourada no centro
    ctx.save(); ctx.translate(cx, cy+4);
    ctx.shadowColor="#ffd700"; ctx.shadowBlur=6;
    const sg=ctx.createRadialGradient(-1,-2,1,0,0,10);
    sg.addColorStop(0,"#ffffff"); sg.addColorStop(0.35,"#ffe060"); sg.addColorStop(1,"#ffa000");
    ctx.fillStyle=sg;
    ctx.beginPath();
    for(let j=0;j<5;j++){
      const o=Math.PI*2*j/5-Math.PI/2, inn=o+Math.PI/5;
      j===0?ctx.moveTo(Math.cos(o)*11,Math.sin(o)*11):ctx.lineTo(Math.cos(o)*11,Math.sin(o)*11);
      ctx.lineTo(Math.cos(inn)*5,Math.sin(inn)*5);
    }
    ctx.closePath(); ctx.fill();
    ctx.shadowBlur=0;
    ctx.restore();

    // Contorno exterior dourado
    ctx.strokeStyle="#ffd700"; ctx.lineWidth=2.5;
    shieldPath(ctx,4,4,44,50); ctx.stroke();
    // Linha de brilho interior
    ctx.strokeStyle="rgba(255,255,255,0.35)"; ctx.lineWidth=1.2;
    shieldPath(ctx,7,7,38,44); ctx.stroke();

    tex.refresh();
  }
  // Livro do saber — 46×44, item de recolha do Monstro da Ignorância (fase "collect").
  // Reaproveita a paleta dourada/brilhante do projétil "boss_proj_book", mas maior
  // e com mais detalhe (páginas abertas), para não parecer um projétil a voar.
  if(!scene.textures.exists("item_livro")){
    // Livro v20: aberto, com capa azul, páginas com volume, texto colorido e fita vermelha.
    const w=52,h=46,tex=scene.textures.createCanvas("item_livro",w,h), ctx=tex.getContext();
    ctx.save(); ctx.translate(w/2,h/2+1);
    ctx.shadowColor="rgba(255,220,80,0.8)"; ctx.shadowBlur=9;
    // capa azul (maior que as páginas)
    ctx.fillStyle="#2a62c9"; ctx.strokeStyle="#173a85"; ctx.lineWidth=1.8; ctx.lineJoin="round";
    ctx.beginPath(); ctx.moveTo(-23,-9); ctx.quadraticCurveTo(-12,-14,0,-9); ctx.quadraticCurveTo(12,-14,23,-9); ctx.lineTo(23,14); ctx.quadraticCurveTo(12,10,0,15); ctx.quadraticCurveTo(-12,10,-23,14); ctx.closePath(); ctx.fill(); ctx.shadowBlur=0; ctx.stroke();
    // bloco de páginas (camadas de baixo)
    ctx.fillStyle="#e9d9a8";
    ctx.beginPath(); ctx.moveTo(-20,-6); ctx.quadraticCurveTo(-10,-11,0,-6); ctx.quadraticCurveTo(10,-11,20,-6); ctx.lineTo(20,13); ctx.quadraticCurveTo(10,9,0,13.5); ctx.quadraticCurveTo(-10,9,-20,13); ctx.closePath(); ctx.fill();
    // páginas da frente
    const pg=(sx)=>{ const gr=ctx.createLinearGradient(0,0,sx*20,0); gr.addColorStop(0,"#fff0bd"); gr.addColorStop(1,"#fffdf2"); ctx.fillStyle=gr;
      ctx.beginPath(); ctx.moveTo(0,-7); ctx.quadraticCurveTo(sx*10,-12,sx*20,-8); ctx.lineTo(sx*20,10); ctx.quadraticCurveTo(sx*10,6,0,11); ctx.closePath(); ctx.fill();
      ctx.strokeStyle="rgba(120,80,20,0.55)"; ctx.lineWidth=1; ctx.stroke(); };
    pg(-1); pg(1);
    // lombada
    ctx.strokeStyle="#8a5200"; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(0,-7); ctx.lineTo(0,11); ctx.stroke();
    // texto colorido
    const lc=["#e0524d","#3b86e0","#3fae5c"];
    for(let i=0;i<4;i++){ ctx.strokeStyle=lc[i%3]; ctx.globalAlpha=0.75; ctx.lineWidth=1.4; ctx.lineCap="round";
      ctx.beginPath(); ctx.moveTo(-16,-3+i*3.7); ctx.lineTo(-4,-3.6+i*3.7); ctx.stroke();
      if(i<2){ ctx.beginPath(); ctx.moveTo(4,-3+i*3.7); ctx.lineTo(16,-3.6+i*3.7); ctx.stroke(); } }
    ctx.globalAlpha=1;
    // estrelinha na página direita
    ctx.fillStyle="#ffc400"; ctx.beginPath();
    for(let k=0;k<10;k++){ const a=-Math.PI/2+k*Math.PI/5, r=k%2?2.1:4.6; const x=10+Math.cos(a)*r, y=5.4+Math.sin(a)*r; k?ctx.lineTo(x,y):ctx.moveTo(x,y); } ctx.closePath(); ctx.fill();
    // fita vermelha
    ctx.fillStyle="#e23b4a"; ctx.strokeStyle="#8f1624"; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(-3,9); ctx.lineTo(-3,19); ctx.lineTo(-0.5,16.5); ctx.lineTo(2,19); ctx.lineTo(2,9); ctx.closePath(); ctx.fill(); ctx.stroke();
    // brilho
    ctx.fillStyle="rgba(255,255,255,0.55)"; ctx.beginPath(); ctx.ellipse(-14,-9.5,4,1.6,-0.2,0,Math.PI*2); ctx.fill();
    ctx.restore();
    tex.refresh();
  }
  // Ícones de "conhecimento" — lápis, diploma, lâmpada — desenhados a partir do
  // próprio emoji (glow por trás), para dar variedade rápida ao Monstro da
  // Ignorância sem ter de desenhar 3 ícones vetoriais à mão. Junta-se ao
  // item_livro já existente para formar o conjunto de 4 usado nesse combate.
  function makeEmojiItemTexture(scene, key, emoji, size = 44, glow = "rgba(255,220,80,0.75)") {
    if (scene.textures.exists(key)) return;
    const tex = scene.textures.createCanvas(key, size, size), ctx = tex.getContext();
    ctx.save();
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `${Math.round(size*0.78)}px sans-serif`;
    ctx.shadowColor = glow; ctx.shadowBlur = 10;
    ctx.fillText(emoji, size/2, size/2+2);
    ctx.restore();
    tex.refresh();
  }
  makeEmojiItemTexture(scene, "item_lapis",   "✏️", 44, "rgba(255,180,80,0.75)");
  makeEmojiItemTexture(scene, "item_diploma", "🎓", 46, "rgba(160,140,255,0.75)");
  makeEmojiItemTexture(scene, "item_lampada", "💡", 44, "rgba(255,240,120,0.85)");
  // Borboleta — 48×40, asas coloridas com padrão
  const BUTTERFLY_COLORS=[
    {top:"#ff80c0",bot:"#e0209a",pat:"#ffd700",stroke:"#800040"}, // rosa
    {top:"#80d0ff",bot:"#1a90e0",pat:"#ffffff",stroke:"#004090"}, // azul
    {top:"#a0ff80",bot:"#20c060",pat:"#ffd700",stroke:"#006030"}, // verde
    {top:"#ffd700",bot:"#ff9500",pat:"#ffffff",stroke:"#804000"}, // laranja-dourado
    {top:"#d0a0ff",bot:"#9030e0",pat:"#ffe080",stroke:"#400080"}, // lilás
  ];
  BUTTERFLY_COLORS.forEach((bc,ci)=>{
    const key="item_borboleta_"+ci;
    if(scene.textures.exists(key)) return;
    const tex=scene.textures.createCanvas(key,48,40), ctx=tex.getContext();
    // Asa superior esquerda
    const grTL=ctx.createRadialGradient(14,14,2,12,16,14);
    grTL.addColorStop(0,bc.top); grTL.addColorStop(1,bc.bot);
    ctx.fillStyle=grTL;
    ctx.beginPath(); ctx.moveTo(24,20);
    ctx.bezierCurveTo(20,8,2,4,2,16);
    ctx.bezierCurveTo(2,24,14,26,24,20);
    ctx.fill();
    // Asa superior direita
    const grTR=ctx.createRadialGradient(34,14,2,36,16,14);
    grTR.addColorStop(0,bc.top); grTR.addColorStop(1,bc.bot);
    ctx.fillStyle=grTR;
    ctx.beginPath(); ctx.moveTo(24,20);
    ctx.bezierCurveTo(28,8,46,4,46,16);
    ctx.bezierCurveTo(46,24,34,26,24,20);
    ctx.fill();
    // Asa inferior esquerda
    ctx.fillStyle=bc.bot;
    ctx.beginPath(); ctx.moveTo(24,20);
    ctx.bezierCurveTo(18,24,4,28,6,36);
    ctx.bezierCurveTo(8,40,20,36,24,20);
    ctx.fill();
    // Asa inferior direita
    ctx.beginPath(); ctx.moveTo(24,20);
    ctx.bezierCurveTo(30,24,44,28,42,36);
    ctx.bezierCurveTo(40,40,28,36,24,20);
    ctx.fill();
    // Padrões nas asas (círculos)
    ctx.fillStyle=bc.pat; ctx.globalAlpha=0.6;
    ctx.beginPath(); ctx.arc(13,14,4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(35,14,4,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(11,28,3,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(37,28,3,0,Math.PI*2); ctx.fill();
    ctx.globalAlpha=1;
    // Contornos das asas
    ctx.strokeStyle=bc.stroke; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.moveTo(24,20);
    ctx.bezierCurveTo(20,8,2,4,2,16);
    ctx.bezierCurveTo(2,24,14,26,24,20); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(24,20);
    ctx.bezierCurveTo(28,8,46,4,46,16);
    ctx.bezierCurveTo(46,24,34,26,24,20); ctx.stroke();
    // Corpo (abdómen)
    ctx.fillStyle="#1a1a1a";
    ctx.beginPath(); ctx.ellipse(24,20,3,10,0,0,Math.PI*2); ctx.fill();
    // Cabeça
    ctx.fillStyle="#2a2a2a";
    ctx.beginPath(); ctx.arc(24,11,3,0,Math.PI*2); ctx.fill();
    // Antenas
    ctx.strokeStyle="#1a1a1a"; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.moveTo(24,9); ctx.quadraticCurveTo(18,2,14,1); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(24,9); ctx.quadraticCurveTo(30,2,34,1); ctx.stroke();
    ctx.fillStyle=bc.pat;
    ctx.beginPath(); ctx.arc(14,1,2.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(34,1,2.5,0,Math.PI*2); ctx.fill();
    tex.refresh();
  });

  // Abelha — 44×40, listras amarelas e pretas, asas transparentes
  if(!scene.textures.exists("item_abelha")){
    // Abelha desenhada na horizontal (como emoji 🐝): cabeça à direita, ferrão à esquerda
    // Canvas 56×36
    const tex=scene.textures.createCanvas("item_abelha",56,36), ctx=tex.getContext();
    const bx=28, by=18; // centro

    // --- ASAS (em cima do corpo, semi-transparentes) ---
    ctx.fillStyle="rgba(210,245,255,0.80)";
    ctx.strokeStyle="rgba(80,160,220,0.85)"; ctx.lineWidth=1;
    // Asa superior esquerda (maior)
    ctx.beginPath(); ctx.ellipse(bx-2, by-11, 11, 6, Math.PI*0.15, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();
    // Asa superior direita (maior)
    ctx.beginPath(); ctx.ellipse(bx+10, by-11, 11, 6, -Math.PI*0.15, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();
    // Asa inferior esquerda (menor)
    ctx.beginPath(); ctx.ellipse(bx-3, by-4, 7, 4, Math.PI*0.2, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();
    // Asa inferior direita (menor)
    ctx.beginPath(); ctx.ellipse(bx+9, by-4, 7, 4, -Math.PI*0.2, 0, Math.PI*2);
    ctx.fill(); ctx.stroke();

    // --- ABDÓMEN (oval horizontal, listras) ---
    const abdGr=ctx.createRadialGradient(bx-6,by-2,2,bx-4,by,12);
    abdGr.addColorStop(0,"#ffe566"); abdGr.addColorStop(1,"#d49000");
    ctx.fillStyle=abdGr;
    ctx.beginPath(); ctx.ellipse(bx-6, by, 13, 9, 0, 0, Math.PI*2); ctx.fill();
    // Listras pretas horizontais (clip ao abdómen)
    ctx.save();
    ctx.beginPath(); ctx.ellipse(bx-6, by, 13, 9, 0, 0, Math.PI*2); ctx.clip();
    ctx.fillStyle="rgba(15,15,15,0.80)";
    [-4, 1, 6].forEach(dx=>{
      ctx.fillRect(bx-6+dx-1, by-9, 3, 18);
    });
    ctx.restore();
    // Contorno abdómen
    ctx.strokeStyle="#8a5500"; ctx.lineWidth=1.2;
    ctx.beginPath(); ctx.ellipse(bx-6, by, 13, 9, 0, 0, Math.PI*2); ctx.stroke();

    // --- FERRÃO (ponta à esquerda) ---
    ctx.fillStyle="#b07800";
    ctx.beginPath();
    ctx.moveTo(bx-19, by);
    ctx.lineTo(bx-14, by-3);
    ctx.lineTo(bx-14, by+3);
    ctx.closePath(); ctx.fill();

    // --- TÓRAX (peludo, ligação entre abdómen e cabeça) ---
    const torGr=ctx.createRadialGradient(bx+7,by-2,1,bx+8,by,7);
    torGr.addColorStop(0,"#a07020"); torGr.addColorStop(1,"#4a2800");
    ctx.fillStyle=torGr;
    ctx.beginPath(); ctx.ellipse(bx+8, by, 7, 8, 0, 0, Math.PI*2); ctx.fill();
    // Pelos do tórax
    ctx.strokeStyle="rgba(220,180,0,0.55)"; ctx.lineWidth=0.9;
    for(let pi=0;pi<6;pi++){
      const pa=Math.PI*2*pi/6;
      ctx.beginPath();
      ctx.moveTo(bx+8+Math.cos(pa)*5, by+Math.sin(pa)*6);
      ctx.lineTo(bx+8+Math.cos(pa)*8, by+Math.sin(pa)*9);
      ctx.stroke();
    }

    // --- CABEÇA (à direita, amarela) ---
    const headGr=ctx.createRadialGradient(bx+17,by-2,1,bx+18,by,7);
    headGr.addColorStop(0,"#fff0a0"); headGr.addColorStop(1,"#e8a800");
    ctx.fillStyle=headGr;
    ctx.beginPath(); ctx.arc(bx+18, by, 7, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle="#8a5500"; ctx.lineWidth=1.1; ctx.stroke();

    // Olho (único, virado para a direita)
    ctx.fillStyle="#1a1000";
    ctx.beginPath(); ctx.arc(bx+21, by-1, 2.8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle="rgba(255,255,255,0.75)";
    ctx.beginPath(); ctx.arc(bx+22, by-2, 1.1, 0, Math.PI*2); ctx.fill();

    // Antena (saindo da cabeça para a direita/cima)
    ctx.strokeStyle="#5a3000"; ctx.lineWidth=1.3;
    ctx.beginPath(); ctx.moveTo(bx+22, by-6);
    ctx.quadraticCurveTo(bx+26, by-14, bx+28, by-16); ctx.stroke();
    ctx.fillStyle="#ffd700";
    ctx.beginPath(); ctx.arc(bx+28, by-16, 2.5, 0, Math.PI*2); ctx.fill();

    tex.refresh();
  }

  // Nuvem de Tempestade — 64×52. Inimigo aéreo (Difícil/Extremo): nuvem escura e zangada, com olhos vermelhos e um raio.
  if(!scene.textures.exists("drone_hostil")){
    const tex=scene.textures.createCanvas("drone_hostil",64,52), ctx=tex.getContext();
    const puff=(x,y,r,c)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();};
    ctx.shadowColor="rgba(255,60,60,0.55)"; ctx.shadowBlur=8;
    [[20,24,13],[34,18,15],[46,25,12],[28,30,12],[40,31,11]].forEach(([x,y,r])=>puff(x,y,r+2,"#23253a"));
    ctx.shadowBlur=0;
    [[20,24,13],[34,18,15],[46,25,12],[28,30,12],[40,31,11]].forEach(([x,y,r])=>puff(x,y,r,"#565b78"));
    puff(31,13,7,"#7a80a3");
    ctx.strokeStyle="#16172a"; ctx.lineWidth=3; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(19,19); ctx.lineTo(29,23); ctx.moveTo(47,19); ctx.lineTo(37,23); ctx.stroke();
    [[26,27],[40,27]].forEach(([x,y])=>{puff(x,y,5,"#ffffff");puff(x+1,y+1,3,"#e02020");puff(x+1,y+1,1.2,"#300000");});
    ctx.fillStyle="#16172a"; ctx.beginPath(); ctx.moveTo(26,35); ctx.quadraticCurveTo(33,31,40,35); ctx.quadraticCurveTo(33,38,26,35); ctx.fill();
    ctx.fillStyle="#ffd21f"; ctx.strokeStyle="#b07800"; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(33,38); ctx.lineTo(27,46); ctx.lineTo(32,46); ctx.lineTo(29,52); ctx.lineTo(39,43); ctx.lineTo(34,43); ctx.lineTo(37,38); ctx.closePath(); ctx.fill(); ctx.stroke();
    tex.refresh();
  }

  // Coração — vermelho vivo, grande, com brilho e gradiente
  if(!scene.textures.exists("item_heart")){
    const tex=scene.textures.createCanvas("item_heart",44,40), ctx=tex.getContext();
    const cx=22, cy=20;

    // Função para desenhar o coração centrado
    function heartPath(){
      ctx.beginPath();
      ctx.moveTo(cx, cy+12);
      // Lado esquerdo
      ctx.bezierCurveTo(cx-2, cy+10, cx-14, cy+4, cx-14, cy-4);
      ctx.bezierCurveTo(cx-14, cy-13, cx-6, cy-15, cx, cy-8);
      // Lado direito
      ctx.bezierCurveTo(cx+6, cy-15, cx+14, cy-13, cx+14, cy-4);
      ctx.bezierCurveTo(cx+14, cy+4, cx+2, cy+10, cx, cy+12);
      ctx.closePath();
    }

    // Sombra exterior rosada
    ctx.shadowColor="rgba(255,80,80,0.55)"; ctx.shadowBlur=10;
    const hg=ctx.createRadialGradient(cx-3,cy-5,2,cx,cy,16);
    hg.addColorStop(0,"#ff6080");
    hg.addColorStop(0.4,"#ff2040");
    hg.addColorStop(0.8,"#cc0020");
    hg.addColorStop(1,"#990010");
    ctx.fillStyle=hg;
    heartPath(); ctx.fill();
    ctx.shadowBlur=0;

    // Contorno fino
    ctx.strokeStyle="rgba(140,0,20,0.5)"; ctx.lineWidth=1.2;
    heartPath(); ctx.stroke();

    // Brilho principal (oval branco no canto superior esquerdo)
    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.beginPath(); ctx.ellipse(cx-5,cy-6,5,7,Math.PI*0.35,0,Math.PI*2); ctx.fill();

    // Brilho secundário (pequeno)
    ctx.fillStyle="rgba(255,255,255,0.30)";
    ctx.beginPath(); ctx.ellipse(cx+4,cy-3,3,4,Math.PI*0.2,0,Math.PI*2); ctx.fill();

    tex.refresh();
  }

  // Duplo Salto — asa azul luminosa com fundo circular
  if(!scene.textures.exists("item_duplosalto")){
    const tex=scene.textures.createCanvas("item_duplosalto",64,56), ctx=tex.getContext();
    const cx=32, cy=30;

    // ── Fundo circular azul-celeste ────────────────────────────
    const bg=ctx.createRadialGradient(cx,cy,1,cx,cy,24);
    bg.addColorStop(0,"#eaf9ff"); bg.addColorStop(0.4,"#7dd6ff");
    bg.addColorStop(0.85,"#1a8fe0"); bg.addColorStop(1,"#0050a0");
    ctx.fillStyle=bg;
    ctx.beginPath(); ctx.arc(cx,cy,24,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="rgba(255,255,255,0.80)"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(cx,cy,23,0,Math.PI*2); ctx.stroke();

    // ── Desenho de asa (reutilizável para esq. e dir.) ─────────
    function wing(dir) { // dir = -1 esq, +1 dir
      ctx.save();
      ctx.translate(cx + dir*3, cy+2);
      ctx.scale(dir, 1);

      // Silhueta principal da asa — forma de asa de anjo
      const wg = ctx.createLinearGradient(0,-14,26,4);
      wg.addColorStop(0,"#fffbe0");
      wg.addColorStop(0.45,"#ffd740");
      wg.addColorStop(1,"#e08000");
      ctx.fillStyle = wg;
      ctx.beginPath();
      ctx.moveTo(0, 4);                         // base interior
      ctx.bezierCurveTo( 4,  4,  8, -2, 12,-10); // bordo superior
      ctx.bezierCurveTo(18,-16, 26,-14, 28, -6); // ponta da asa
      ctx.bezierCurveTo(24,  2, 16,  6,  8,  8); // bordo inferior
      ctx.bezierCurveTo( 4,  8,  0,  6,  0,  4);
      ctx.closePath();
      ctx.fill();

      // Contorno fino
      ctx.strokeStyle="rgba(160,80,0,0.50)"; ctx.lineWidth=0.8;
      ctx.stroke();

      // ── 4 penas sobrepostas ──────────────────────────────────
      const penas = [
        {x:4,  y:2,  a:-0.30, l:12, w:3.2},
        {x:9,  y:-2, a:-0.52, l:14, w:3.5},
        {x:15, y:-6, a:-0.72, l:14, w:3.2},
        {x:21, y:-9, a:-0.88, l:11, w:2.6},
      ];
      penas.forEach((p,i)=>{
        const t = i/3;
        const c1 = `rgba(255,${245-i*20},${100-i*15},0.95)`;
        const c2 = `rgba(255,${220-i*20},${60-i*10},0)`;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.a);
        const fg=ctx.createLinearGradient(0,-p.w/2, p.l, p.w/2);
        fg.addColorStop(0,c1); fg.addColorStop(0.6,c1); fg.addColorStop(1,c2);
        ctx.fillStyle=fg;
        // Pena com forma ligeiramente arqueada
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(p.l*0.3,-p.w*0.7, p.l*0.7,-p.w*0.5, p.l,0);
        ctx.bezierCurveTo(p.l*0.7, p.w*0.5, p.l*0.3, p.w*0.7, 0,0);
        ctx.fill();
        // Veia central
        ctx.strokeStyle="rgba(200,120,0,0.35)"; ctx.lineWidth=0.7;
        ctx.beginPath(); ctx.moveTo(1,0); ctx.lineTo(p.l-2,0); ctx.stroke();
        ctx.restore();
      });

      // Brilho topo da asa
      ctx.fillStyle="rgba(255,255,255,0.30)";
      ctx.beginPath();
      ctx.moveTo(2, 2);
      ctx.bezierCurveTo(5,-6, 14,-12, 20,-8);
      ctx.bezierCurveTo(14,-5, 6,-2, 2, 2);
      ctx.fill();

      ctx.restore();
    }

    wing(-1); // asa esquerda
    wing(1);  // asa direita

    // ── Setas ↑↑ douradas com contorno ────────────────────────
    [[cy-8],[cy+2]].forEach(([ay])=>{
      ctx.fillStyle="#ffe040"; ctx.strokeStyle="#7a4000"; ctx.lineWidth=1.2;
      ctx.beginPath();
      ctx.moveTo(cx,     ay-5);   // ponta
      ctx.lineTo(cx-5,   ay+1);
      ctx.lineTo(cx-2.5, ay+1);
      ctx.lineTo(cx-2.5, ay+5);
      ctx.lineTo(cx+2.5, ay+5);
      ctx.lineTo(cx+2.5, ay+1);
      ctx.lineTo(cx+5,   ay+1);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
    });

    // Brilho central
    ctx.fillStyle="rgba(255,255,255,0.55)";
    ctx.beginPath(); ctx.ellipse(cx,cy-6,5,4,0,0,Math.PI*2); ctx.fill();

    tex.refresh();
  }
}

// ===== VanBerto — robozinho 100% original do jogo da UE =====
function rrVan(ctx,x,y,w,h,r){
  const rr=Math.min(r,w/2,h/2);
  ctx.beginPath();ctx.moveTo(x+rr,y);ctx.arcTo(x+w,y,x+w,y+h,rr);ctx.arcTo(x+w,y+h,x,y+h,rr);ctx.arcTo(x,y+h,x,y,rr);ctx.arcTo(x,y,x+w,y,rr);ctx.closePath();
}
function cVan(ctx,x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
function cfVan(ctx,x,y,r,color){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();}
function lVan(ctx,x1,y1,x2,y2){ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}

function makeVanBertoTexture(scene,key,blink,step,armsUp){
  if(scene.textures.exists(key)) return;
  const w=96,h=96, tex=scene.textures.createCanvas(key,w,h), ctx=tex.getContext();
  ctx.clearRect(0,0,w,h);
  ctx.lineJoin="round"; ctx.lineCap="round";
  // Desloca todo o desenho 6px para baixo para o halo da antena (y≈0) não ser cortado.
  // O setOffset do corpo físico foi ajustado em igual medida para o robô ficar na mesma posição no ecrã.
  ctx.save(); ctx.translate(0, 6);
  const NAVY="#16233e", NAVY2="#26365a", OUT="#101a30";
  function white(x0,y0,x1,y1){const g=ctx.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,"#ffffff");g.addColorStop(0.55,"#e6edf7");g.addColorStop(1,"#b4c4dc");return g;}

  // ===== PERNAS (bem visíveis por baixo do tronco; passo marcado) =====
  const LIFT=8, STRIDE=3;
  let lTop=70, rTop=70, lDX=0, rDX=0;          // topo da coxa; planta=70 -> pé a y=88
  if(step===0){ lTop=70-LIFT; lDX=STRIDE; rDX=-STRIDE; }
  else if(step===1){ rTop=70-LIFT; rDX=STRIDE; lDX=-STRIDE; }
  function leg(cx,top){
    rrVan(ctx,cx-5,top,10,11,4.5); ctx.fillStyle=white(cx-5,top,cx+5,top); ctx.fill();
    ctx.lineWidth=2.6; ctx.strokeStyle=OUT; ctx.stroke();
    const fy=top+9;
    rrVan(ctx,cx-6.5,fy,13,9,4); ctx.fillStyle=NAVY; ctx.fill();
    ctx.lineWidth=2.6; ctx.strokeStyle=OUT; ctx.stroke();
    rrVan(ctx,cx-6.5,fy+2,13,2.4,1.2); ctx.fillStyle="rgba(255,255,255,0.85)"; ctx.fill();
    cfVan(ctx,cx-2.5,fy+4.5,1.4,"rgba(255,255,255,0.5)");
  }
  leg(41+lDX,lTop); leg(55+rDX,rTop);

  // ===== BRAÇOS (curtos e encostados; balançam ao contrário da perna do
  // mesmo lado — braço esquerdo para trás quando a perna esquerda avança,
  // tal como um passo natural — só nos frames de caminhar, step 0/1) =====
  // Frame de salto (armsUp=true): braços erguidos quase direitos para cima,
  // só com uma ligeira inclinação para fora — ignora o balanço de andar,
  // usa outro ângulo. (Era 2.4 rad, o que punha as mãos longe do corpo,
  // com um ar "descolado"; a 2.9 rad ficam coladas à cabeça, só saindo
  // ligeiramente para os lados.)
  const ARM_SWING = 0.24; // radianos
  const JUMP_RAISE = 2.9; // radianos — braço roda de "para baixo" para "quase direito para cima"
  let lArmSwing = 0, rArmSwing = 0;
  if(armsUp){ lArmSwing = JUMP_RAISE; rArmSwing = -JUMP_RAISE; }
  else if(step===0){ lArmSwing=-ARM_SWING; rArmSwing=ARM_SWING; }
  else if(step===1){ lArmSwing=ARM_SWING; rArmSwing=-ARM_SWING; }
  function arm(sx,swing){
    ctx.save();
    const px=sx+4.5, py=52; // pivô no ombro
    ctx.translate(px,py); ctx.rotate(swing); ctx.translate(-px,-py);
    rrVan(ctx,sx,52,9,13,4.5); ctx.fillStyle=white(sx,52,sx+9,52); ctx.fill();
    ctx.lineWidth=2.6; ctx.strokeStyle=OUT; ctx.stroke();
    const hx=sx+4.5, hy=67;
    cfVan(ctx,hx,hy,5,NAVY);
    ctx.lineWidth=2.3; ctx.strokeStyle=OUT; ctx.beginPath(); ctx.arc(hx,hy,5,0,Math.PI*2); ctx.stroke();
    cfVan(ctx,hx-2,hy+1.6,1.4,NAVY2); cfVan(ctx,hx+0.5,hy+2.4,1.4,NAVY2); cfVan(ctx,hx+2.5,hy+1.6,1.4,NAVY2);
    ctx.restore();
  }
  arm(17,lArmSwing); arm(70,rArmSwing);

  // ===== TRONCO (estreito: x26–70, igual à cabeça) =====
  rrVan(ctx,26,44,44,32,15); ctx.fillStyle=white(28,46,68,46); ctx.fill();
  ctx.save(); rrVan(ctx,26,44,44,32,15); ctx.clip();
  const wg=ctx.createLinearGradient(0,64,0,76); wg.addColorStop(0,"rgba(22,35,62,0)"); wg.addColorStop(0.4,"#1c2c4c"); wg.addColorStop(1,"#142038");
  ctx.fillStyle=wg; ctx.fillRect(26,62,44,16);
  ctx.strokeStyle="rgba(16,26,48,0.6)"; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(28,64); ctx.lineTo(68,64); ctx.stroke();
  ctx.fillStyle="rgba(255,255,255,0.5)"; ctx.beginPath(); ctx.ellipse(36,52,9,5.5,-0.5,0,Math.PI*2); ctx.fill();
  ctx.restore();
  ctx.lineWidth=3; ctx.strokeStyle=OUT; rrVan(ctx,26,44,44,32,15); ctx.stroke();

  // ===== PAINEL DO PEITO =====
  cfVan(ctx,48,56,8,NAVY);
  ctx.lineWidth=2.5; ctx.strokeStyle=OUT; ctx.beginPath(); ctx.arc(48,56,8,0,Math.PI*2); ctx.stroke();
  const dome=ctx.createRadialGradient(45.5,53.5,1,48,56,7); dome.addColorStop(0,"#aebccf"); dome.addColorStop(0.6,"#5a6a85"); dome.addColorStop(1,"#2b3a57");
  ctx.fillStyle=dome; ctx.beginPath(); ctx.arc(48,56,5.7,0,Math.PI*2); ctx.fill();
  cfVan(ctx,46,53.8,1.5,"rgba(255,255,255,0.85)");

  // ===== EAR PODS (atrás do capacete) =====
  function pod(cx){
    cfVan(ctx,cx,32,6,NAVY);
    ctx.lineWidth=2.3; ctx.strokeStyle=OUT; ctx.beginPath(); ctx.arc(cx,32,6,0,Math.PI*2); ctx.stroke();
    cfVan(ctx,cx,32,2.8,NAVY2); cfVan(ctx,cx-0.8,31,1,"rgba(255,255,255,0.6)");
  }
  pod(25); pod(71);

  // ===== ANTENA =====
  ctx.fillStyle=NAVY; ctx.beginPath(); ctx.moveTo(45,16); ctx.lineTo(51,16); ctx.lineTo(49.2,8); ctx.lineTo(46.8,8); ctx.closePath(); ctx.fill();
  const halo=ctx.createRadialGradient(48,5,1,48,5,11); halo.addColorStop(0,"rgba(90,200,255,0.55)"); halo.addColorStop(1,"rgba(90,200,255,0)");
  ctx.fillStyle=halo; ctx.beginPath(); ctx.arc(48,5,11,0,Math.PI*2); ctx.fill();
  const bg=ctx.createRadialGradient(46.3,3.5,0.5,48,5,5.5); bg.addColorStop(0,"#e6f7ff"); bg.addColorStop(0.4,"#48b4ff"); bg.addColorStop(1,"#1670d8");
  ctx.fillStyle=bg; ctx.beginPath(); ctx.arc(48,5,5.5,0,Math.PI*2); ctx.fill();
  cfVan(ctx,46.2,3.4,1.6,"#ffffff");

  // ===== CAPACETE =====
  rrVan(ctx,26,14,44,34,17); ctx.fillStyle=white(28,15,68,15); ctx.fill();
  ctx.lineWidth=3; ctx.strokeStyle=OUT; ctx.stroke();
  ctx.save(); rrVan(ctx,26,14,44,34,17); ctx.clip();
  ctx.fillStyle="rgba(255,255,255,0.6)"; ctx.beginPath(); ctx.ellipse(38,19,10,4,-0.5,0,Math.PI*2); ctx.fill(); ctx.restore();

  // ===== MOLDURA + VISEIRA =====
  rrVan(ctx,30,20,36,23,12); ctx.fillStyle=NAVY; ctx.fill();
  rrVan(ctx,32.5,22,31,19,10);
  const vg=ctx.createLinearGradient(0,22,0,41); vg.addColorStop(0,"#7fd4ff"); vg.addColorStop(0.5,"#2a9bf0"); vg.addColorStop(1,"#1366c6");
  ctx.fillStyle=vg; ctx.fill();
  ctx.save(); rrVan(ctx,32.5,22,31,19,10); ctx.clip();
  ctx.fillStyle="rgba(255,255,255,0.45)"; ctx.beginPath(); ctx.ellipse(42,25,9,3.5,-0.4,0,Math.PI*2); ctx.fill(); ctx.restore();

  // ===== OLHOS =====
  if(!blink){
    ctx.fillStyle="#0a0f1c";
    ctx.beginPath(); ctx.ellipse(41,30,3.3,4,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(55,30,3.3,4,0,0,Math.PI*2); ctx.fill();
    cfVan(ctx,42.3,28.4,1.5,"#fff"); cfVan(ctx,39.9,31,0.8,"#fff");
    cfVan(ctx,56.3,28.4,1.5,"#fff"); cfVan(ctx,53.9,31,0.8,"#fff");
  } else if(blink==="wink"){
    // pisca-olho brincalhão — olho esquerdo aberto normal, direito fechado num arco
    ctx.fillStyle="#0a0f1c";
    ctx.beginPath(); ctx.ellipse(41,30,3.3,4,0,0,Math.PI*2); ctx.fill();
    cfVan(ctx,42.3,28.4,1.5,"#fff"); cfVan(ctx,39.9,31,0.8,"#fff");
    ctx.lineWidth=3; ctx.strokeStyle="#0a0f1c"; ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(55,31,3.5,0.15*Math.PI,0.85*Math.PI); ctx.stroke();
  } else if(blink==="happy"){
    // sorriso grande e feliz — olhos fechados em arco (mais generosos que o piscar normal)
    // + bochechas coradas, para se distinguir claramente do sorriso base neutro.
    ctx.lineWidth=3.2; ctx.strokeStyle="#0a0f1c"; ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(41,31,3.9,0.10*Math.PI,0.90*Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(55,31,3.9,0.10*Math.PI,0.90*Math.PI); ctx.stroke();
    cfVan(ctx,33.5,35.5,3,"rgba(255,120,120,0.55)");
    cfVan(ctx,62.5,35.5,3,"rgba(255,120,120,0.55)");
  } else if(blink==="sad"){
    // sobrancelhas preocupadas (inclinadas para cima no centro) + olhos tristes + lágrima
    ctx.strokeStyle="#0a0f1c"; ctx.lineWidth=2.3; ctx.lineCap="round";
    ctx.beginPath(); ctx.moveTo(37,24); ctx.lineTo(44.5,27); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(59,24); ctx.lineTo(51.5,27); ctx.stroke();
    ctx.fillStyle="#0a0f1c";
    ctx.beginPath(); ctx.ellipse(41,32,2.8,3.1,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(55,32,2.8,3.1,0,0,Math.PI*2); ctx.fill();
    cfVan(ctx,42,30.7,1.1,"#fff"); cfVan(ctx,56,30.7,1.1,"#fff");
    // lagrimazinha a escorrer do olho direito
    ctx.fillStyle="#6fd0ff";
    ctx.beginPath();
    ctx.moveTo(56,35); ctx.quadraticCurveTo(59,40,56,43.5); ctx.quadraticCurveTo(53,40,56,35);
    ctx.closePath(); ctx.fill();
  } else {
    // piscar feliz — arcos ^_^
    ctx.lineWidth=3; ctx.strokeStyle="#0a0f1c";
    ctx.beginPath(); ctx.arc(41,31,3.5,0.15*Math.PI,0.85*Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.arc(55,31,3.5,0.15*Math.PI,0.85*Math.PI); ctx.stroke();
  }
  // ===== BOCA — sorriso aberto e contente (variantes: maior no pisca-olho/feliz, invertida na tristeza) =====
  ctx.fillStyle="#0a0f1c";
  if(blink==="wink"){
    ctx.beginPath(); ctx.ellipse(48,36,5.6,3.6,0,0,Math.PI); ctx.fill();   // sorriso maroto, um pouco mais largo
    ctx.fillStyle="#ff7a7a";
    ctx.beginPath(); ctx.ellipse(48,37.6,2.9,1.7,0,0,Math.PI); ctx.fill();
  } else if(blink==="happy"){
    ctx.beginPath(); ctx.ellipse(48,36,6.2,4.2,0,0,Math.PI); ctx.fill();   // sorriso grande, o maior de todos
    ctx.fillStyle="#ff7a7a";
    ctx.beginPath(); ctx.ellipse(48,38,3.2,1.9,0,0,Math.PI); ctx.fill();
  } else if(blink==="sad"){
    // boca triste — arco invertido, cantos para baixo (sem preenchimento, só o traço)
    ctx.strokeStyle="#0a0f1c"; ctx.lineWidth=2.4; ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(48,40,4.2,Math.PI,Math.PI*2); ctx.stroke();
  } else {
    ctx.beginPath(); ctx.ellipse(48,36,4.6,3.2,0,0,Math.PI); ctx.fill();   // metade de baixo = sorriso
    ctx.fillStyle="#ff7a7a";
    ctx.beginPath(); ctx.ellipse(48,37.4,2.4,1.5,0,0,Math.PI); ctx.fill(); // línguinha
  }

  ctx.restore();
  tex.refresh();
}
