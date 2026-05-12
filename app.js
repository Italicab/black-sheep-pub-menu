const KEY="blackSheepMenuData_v1";let data=JSON.parse(localStorage.getItem(KEY)||"null")||window.DEFAULT_MENU_DATA;let lang=localStorage.getItem("blackSheepLang")||"it";let activeCat=data.categories[0].id;const tr={it:{hero:"Atmosfera calda, cucina di carattere, birre selezionate, cocktails e gin tonic preparati con cura.",today:"Menu del giorno",viewMenu:"Guarda il menu",book:"Prenota ora",firstView:"In prima visione",introTitle:"Cucina, birre e drink",introText:"Un menu digitale semplice da consultare, pensato per smartphone e QR code sul tavolo.",burgerText:"Specialità pub e piatti ricchi.",beerTitle:"Birre",beerText:"Spina e bottiglia ben separate.",ginText:"Gin premium e toniche scelte per esaltarne ogni aroma.",digitalMenu:"Menu digitale",chooseCat:"Scegli una sezione",contacts:"Info e prenotazioni",phoneLabel:"Telefono / WhatsApp",callNow:"Chiama ora"},en:{hero:"Warm atmosphere, characterful food, selected beers, cocktails and carefully prepared gin & tonics.",today:"Daily menu",viewMenu:"View menu",book:"Book now",firstView:"First view",introTitle:"Food, beers and drinks",introText:"A simple digital menu made for smartphones and table QR codes.",burgerText:"Pub specials and generous dishes.",beerTitle:"Beers",beerText:"Tap and bottled beers clearly separated.",ginText:"Premium gins and tonics chosen to enhance every flavor.",digitalMenu:"Digital menu",chooseCat:"Choose a section",contacts:"Info and bookings",phoneLabel:"Phone / WhatsApp",callNow:"Call now"}};function setLang(l){lang=l;localStorage.setItem("blackSheepLang",l);render()}function money(v){return v?`<span class=price>${v}</span>`:""}function renderDaily(){
  let d = data.daily[lang] || data.daily.it;

  // controlla se esiste almeno una voce compilata
  let hasItems = (d.items || []).some(i =>
    (i.name && i.name.trim() !== "") ||
    (i.desc && i.desc.trim() !== "") ||
    (i.price && i.price.trim() !== "")
  );

  // nasconde completamente la sezione se vuota
  document.getElementById("daily").style.display = hasItems ? "block" : "none";

  if(!hasItems) return;

  dailyTitle.textContent = d.title;
  dailySubtitle.textContent = d.subtitle;

  dailyItems.innerHTML = (d.items || []).map(i => `
    <div class="item">
      <div class="item-top">
        <span>${i.name || ""}</span>
        ${money(i.price)}
      </div>
      <p>${i.desc || ""}</p>
    </div>
  `).join("");
}function renderMenu(){tabs.innerHTML=data.categories.map(c=>`<button class="tab ${c.id===activeCat?'active':''}" onclick="activeCat='${c.id}';renderMenu()">${c[lang]}</button>`).join("");let c=data.categories.find(x=>x.id===activeCat)||data.categories[0];menuContent.innerHTML=`<h2>${c[lang]}</h2><div class=menu-grid>${(c.items||[]).map(i=>`<div class=item><div class=item-top><span>${i[lang]||i.it}</span>${money(i.price)}</div><p>${i['desc_'+lang]||i.desc_it||""}</p></div>`).join("")}</div>`}function renderContacts(){let s=data.settings||{},phone=s.phone||"INSERISCI NUMERO",clean=phone.replace(/[^\d+]/g,"");phoneText.textContent=phone;phoneLink.href=clean?`tel:${clean}`:"#";callBtn.href=clean?`tel:${clean}`:"#";let wa=(s.whatsapp||phone).replace(/\D/g,"");whatsappLink.href=wa?`https://wa.me/${wa}`:"#";addressText.textContent=s.address||"Brescia"}function render(){document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(e=>e.textContent=tr[lang][e.dataset.i18n]||e.dataset.i18n);itBtn.classList.toggle('active',lang==='it');enBtn.classList.toggle('active',lang==='en');renderDaily();renderMenu();renderContacts()}render();
