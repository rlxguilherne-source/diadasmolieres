const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const loveBtn = document.getElementById("love");
const fx = document.getElementById("fx");
const dateEl = document.getElementById("date");

dateEl.textContent = new Date().toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric"
});

let isOpen = false;

function rand(min, max){ return Math.random() * (max - min) + min; }

function petals(count=18){
  for(let i=0;i<count;i++){
    const el = document.createElement("div");
    el.className = "fx";
    el.textContent = Math.random() > .5 ? "🌸" : "🌺";

    const x = rand(8, 92);
    const x2 = x + rand(-12, 12);
    const r = rand(-60, 60);
    const t = rand(3.2, 6.0);

    el.style.setProperty("--x", `${x}vw`);
    el.style.setProperty("--x2", `${x2}vw`);
    el.style.setProperty("--r", `${r}deg`);
    el.style.setProperty("--t", `${t}s`);
    el.style.fontSize = `${rand(14, 26)}px`;

    fx.appendChild(el);
    setTimeout(()=> el.remove(), t*1000 + 250);
  }
}

function hearts(count=16){
  for(let i=0;i<count;i++){
    const h = document.createElement("div");
    h.className = "fx heart";

    const x = rand(10, 90);
    const x2 = x + rand(-16, 16);
    const t = rand(1.6, 2.8);

    h.style.setProperty("--x", `${x}vw`);
    h.style.setProperty("--x2", `${x2}vw`);
    h.style.setProperty("--t", `${t}s`);

    fx.appendChild(h);
    setTimeout(()=> h.remove(), t*1000 + 250);
  }
}

function openLetter(){
  if(isOpen) return;
  isOpen = true;

  envelope.classList.remove("closing");
  envelope.classList.add("open");

  // depois que a aba terminou de girar, manda ela pra trás (não corta a carta)
  setTimeout(() => {
    envelope.classList.add("opened");
  }, 820);

  petals(24);
}

function closeLetter(){
  if(!isOpen) return;
  isOpen = false;

  // tira a aba de trás antes de fechar
  envelope.classList.remove("opened");
  envelope.classList.add("closing");

  // fecha a aba depois do papel descer
  setTimeout(() => {
    envelope.classList.remove("open");
  }, 420);

  setTimeout(() => {
    envelope.classList.remove("closing");
  }, 1200);
}

openBtn.addEventListener("click", (e)=>{
  e.stopPropagation();
  openLetter();
});

closeBtn.addEventListener("click", (e)=>{
  e.stopPropagation();
  closeLetter();
});

loveBtn.addEventListener("click", (e)=>{
  e.stopPropagation();
  hearts(18);
  petals(8);
});

// clique no envelope abre se estiver fechado
envelope.addEventListener("click", ()=>{
  if(!isOpen) openLetter();
});

// acessibilidade
envelope.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " "){
    e.preventDefault();
    if(!isOpen) openLetter();
  }
});