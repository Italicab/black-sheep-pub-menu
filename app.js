const KEY="blackSheepMenuData_v1";let data=JSON.parse(localStorage.getItem(KEY)||"null")||window.DEFAULT_MENU_DATA;let lang=localStorage.getItem("blackSheepLang")||"it";let activeCat=data.categories[0].id;

const tr={
it:{
hero:"Atmosfera calda, cucina di carattere, birre selezionate, cocktails e gin tonic preparati con cura.",
today:"Menu del giorno",
viewMenu:"Guarda il menu",
book:"Prenota ora",
firstView:"In prima visione",
storyTitle:"Benvenuti al Black Sheep Pub",
storyText:"Benvenuti nel nostro pub ristorante, un luogo dove buon cibo, ottime birre e atmosfera conviviale si incontrano ogni giorno.<br><br>Abbiamo creato uno spazio accogliente pensato per chi ama stare bene: dalla cena tra amici all’aperitivo serale, fino al dopocena con cocktails, gin tonic selezionati e distillati di qualità.<br><br>La nostra cucina propone piatti gustosi preparati con ingredienti scelti, accompagnati da una selezione di birre, cocktails classici e specialità della casa.<br><br>Ogni giorno troverai anche il nostro Menu del Giorno, con proposte sempre nuove pensate per sorprenderti e farti sentire a casa.<br><br>Ti aspettiamo per condividere buon gusto, relax e belle serate.",
introTitle:"Cucina, birre e drink",
introText:"Sapori autentici, birre selezionate e cocktail preparati con cura.",
burgerText:"Specialità pub e piatti ricchi.",
beerTitle:"Birre",
beerText:"Spina e bottiglia ben separate.",
ginText:"Gin premium e toniche scelte per esaltarne ogni aroma.",
digitalMenu:"Menu digitale",
chooseCat:"Scegli una sezione",
contacts:"Info e prenotazioni",
phoneLabel:"Telefono / WhatsApp",
callNow:"Chiama ora"
},
en:{
hero:"Carefully prepared dishes, quality ingredients and an atmosphere to enjoy.",
today:"Daily menu",
viewMenu:"View menu",
book:"Book now",
firstView:"First view",
storyTitle:"Welcome to Black Sheep Pub",
storyText:"Welcome to our pub restaurant, a place where great food, quality beers and a friendly atmosphere come together every day.<br><br>We created a warm and welcoming space for people who enjoy good times: from dinner with friends to evening aperitifs, all the way to after-dinner cocktails, selected gin & tonics and premium spirits.<br><br>Our kitchen offers flavorful dishes prepared with carefully selected ingredients, paired with a wide choice of beers, classic cocktails and house specials.<br><br>Every day you will also find our Daily Menu, featuring new dishes designed to surprise you and make you feel at home.<br><br>We look forward to welcoming you for great flavors, relaxation and unforgettable evenings.",
introTitle:"Food, beers & drinks",
introText:"Authentic flavors, selected beers and carefully crafted cocktails.",
burgerText:"Pub specials and generous dishes.",
beerTitle:"Beers",
beerText:"Tap and bottled beers clearly separated.",
ginText:"Premium gins and tonics chosen to enhance every flavor.",
digitalMenu:"Digital menu",
chooseCat:"Choose a section",
contacts:"Info and bookings",
phoneLabel:"Phone / WhatsApp",
callNow:"Call now"
}
};

function setLang(l){lang=l;localStorage.setItem("blackSheepLang",l);render()}
function money(v){return v?`<span class=price>${v}</span>`:""}

function renderDaily(){
  if(data.settings && data.settings.showDaily === false){
    document.getElementById("daily").style.display = "none";
    return;
  }
  let d=data.daily[lang]||data.daily.it;
  document.getElementById("daily").style.display="block";
  dailyTitle.textContent=d.title;
  dailySubtitle.textContent=d.subtitle;
  dailyItems.innerHTML=(d.items||[]).map(i=>`
    <div class="item">
      <div class="item-top"><span>${i.name||""}</span>${money(i.price)}</div>
      <p>${i.desc||""}</p>
    </div>
  `).join("");
}

function renderMenu(){
  tabs.innerHTML=data.categories.map(c=>`<button class="tab ${c.id===activeCat?'active':''}" onclick="activeCat='${c.id}';renderMenu()">${c[lang]}</button>`).join("");
  let c=data.categories.find(x=>x.id===activeCat)||data.categories[0];
  menuContent.innerHTML=`<h2>${c[lang]}</h2><div class=menu-grid>${(c.items||[]).map(i=>`<div class=item><div class=item-top><span>${i[lang]||i.it}</span>${money(i.price)}</div><p>${i['desc_'+lang]||i.desc_it||""}</p></div>`).join("")}</div>`;
}

function renderContacts(){
  let s=data.settings||{},phone=s.phone||"INSERISCI NUMERO",clean=phone.replace(/[^\d+]/g,"");
  phoneText.textContent=phone;
  phoneLink.href=clean?`tel:${clean}`:"#";
  callBtn.href=clean?`tel:${clean}`:"#";
  let wa=(s.whatsapp||phone).replace(/\D/g,"");
  whatsappLink.href=wa?`https://wa.me/${wa}`:"#";
  addressText.textContent=s.address||"Brescia";
}

function render(){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=tr[lang][e.dataset.i18n]||e.dataset.i18n);
  storyTitle.innerHTML=tr[lang].storyTitle;
  storyText.innerHTML=tr[lang].storyText;
  itBtn.classList.toggle('active',lang==='it');
  enBtn.classList.toggle('active',lang==='en');
  renderDaily();
  renderMenu();
  renderContacts();
}

render();
