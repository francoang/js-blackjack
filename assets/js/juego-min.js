(()=>{"use strict";let e=[],t=["C","D","H","S"],l=["A","J","Q","K"],r=[],a=document.querySelector("#btnPedir"),n=document.querySelector("#btnDetener"),d=document.querySelector("#btnNuevo"),i=document.querySelectorAll(".divCartas"),s=document.querySelectorAll("small"),o=(t=2)=>{e=c(),r=[];for(let l=0;l<t;l++)r.push(0);s.forEach(e=>e.innerText=0),i.forEach(e=>e.innerHTML=""),a.disabled=!1,n.disabled=!1},c=()=>{e=[];for(let r=2;r<=10;r++)for(let a of t)e.push(r+a);for(let n of t)for(let d of l)e.push(d+n);return _.shuffle(e)},$=()=>{if(!e.length)throw"No hay cartas en el deck";return e.pop()},u=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t},f=(e,t)=>(r[t]=r[t]+u(e),s[t].innerText=r[t],r[t]),b=(e,t)=>{let l=document.createElement("img");l.src=`assets/cartas/${e}.png`,l.classList.add("carta"),i[t].append(l)},h=e=>{let t=r.length-1,l=0;do{let a=$();if(l=f(a,t),b(a,t),e>21&&l<=21)break}while(l<e&&l<=21);p()},p=()=>{let[e,t]=r;setTimeout(()=>{e===t?alert("EMPATE"):t>21&&e>21?alert("AMBOS PIERDEN"):e>21?alert("La COMPUTADORA gan\xf3 la partida"):t>21?alert("El JUGADOR gan\xf3 la partida"):alert("La COMPUTADORA gan\xf3 la partida")},100)};a.addEventListener("click",()=>{let e=$(),t=f(e,0);b(e,0),t>21?(console.warn("Lo siento mucho, perdiste"),a.disabled=!0,n.disabled=!0,h(t)):21===t&&(console.warn("21, genial!"),a.disabled=!0,n.disabled=!0,h(t))}),n.addEventListener("click",()=>{a.disabled=!0,n.disabled=!0,h(r[0])}),d.addEventListener("click",()=>{o()})})();