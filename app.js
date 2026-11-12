// إعدادات سوقنا: عدّل رقم واتساب بعد الحصول على رقم مخصص للمشروع.
// اكتب الرقم بصيغة دولية مع رمز الدولة، من دون + أو مسافات.
const WHATSAPP_NUMBER = ""; // مثال شكلي فقط: 9677XXXXXXXX

// هذه بيانات تجريبية لشرح شكل الموقع. استبدلها بمحلات وافقت على النشر.
const listings = [
  {name:"متجر أزياء تجريبي",city:"عدن",area:"المنصورة",category:"ملابس",emoji:"👕",tag:"مثال تجريبي",desc:"أضف هنا وصفاً حقيقياً للمحل ومنتجاته بعد موافقة صاحبه."},
  {name:"إلكترونيات تجريبية",city:"عدن",area:"الشيخ عثمان",category:"هواتف",emoji:"📱",tag:"مثال تجريبي",desc:"هواتف وإكسسوارات؛ لا تضف أسعاراً إلا بعد التأكد منها."},
  {name:"عطور تجريبية",city:"لحج",area:"الحوطة",category:"عطور",emoji:"🧴",tag:"مثال تجريبي",desc:"استخدم هذه البطاقة لاحقاً لعرض متجر عطور حقيقي."},
  {name:"مطعم تجريبي",city:"لحج",area:"تبن",category:"مطاعم",emoji:"🍽️",tag:"مثال تجريبي",desc:"أضف قائمة الطعام وساعات العمل بعد التحقق من المطعم."},
  {name:"متجر منزل تجريبي",city:"عدن",area:"كريتر",category:"منزل",emoji:"🏠",tag:"مثال تجريبي",desc:"منتجات منزلية؛ أضف الصور والمعلومات بإذن صاحب المتجر."},
  {name:"أزياء تجريبية",city:"لحج",area:"الحوطة",category:"ملابس",emoji:"👜",tag:"مثال تجريبي",desc:"بطاقة توضيحية قابلة للاستبدال ببيانات محل مشارك."}
];

let selectedCity = "الكل";
let selectedCategory = "الكل";
const grid = document.getElementById("listingGrid");
const searchInput = document.getElementById("searchInput");

function safeText(value){return String(value).replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}

function render(){
  const q = searchInput.value.trim().toLowerCase();
  const filtered = listings.filter(item=>{
    const text = [item.name,item.city,item.area,item.category,item.desc].join(" ").toLowerCase();
    return (selectedCity==="الكل" || item.city===selectedCity) &&
           (selectedCategory==="الكل" || item.category===selectedCategory) &&
           (!q || text.includes(q));
  });
  grid.innerHTML = filtered.map(item=>`
    <article class="listing-card">
      <div class="card-visual"><span class="tag">${safeText(item.tag)}</span><span class="emoji">${item.emoji}</span></div>
      <div class="card-body">
        <h3 class="card-title">${safeText(item.name)}</h3>
        <p class="card-meta">⌖ ${safeText(item.city)} – ${safeText(item.area)} · ${safeText(item.category)}</p>
        <p class="card-desc">${safeText(item.desc)}</p>
        <div class="card-actions">
          <a class="details-btn" href="#join">التفاصيل</a>
          <a class="contact-btn" href="${merchantLink(item)}" target="_blank" rel="noopener">تواصل</a>
        </div>
      </div>
    </article>`).join("");
  document.getElementById("resultsCount").textContent = `${filtered.length} نتيجة`;
  document.getElementById("emptyState").hidden = filtered.length !== 0;
}
function merchantLink(item){
  const message = `مرحباً، أريد الاستفسار عن ${item.name} عبر منصة سوقنا.`;
  return WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}` : "#join";
}

document.querySelectorAll(".city").forEach(btn=>btn.addEventListener("click",()=>{
  selectedCity=btn.dataset.city;
  document.querySelectorAll(".city").forEach(b=>b.classList.toggle("active",b===btn));
  render();
}));
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{
  selectedCategory=btn.dataset.category;
  document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b===btn));
  render();
}));
searchInput.addEventListener("input",render);
document.getElementById("clearSearch").addEventListener("click",()=>{searchInput.value="";render();searchInput.focus();});
document.getElementById("merchantWhatsApp").addEventListener("click",e=>{
  if(!WHATSAPP_NUMBER){e.preventDefault();alert("قبل استقبال طلبات التجار، أضف رقم واتساب المشروع في ملف app.js.");}
});
document.getElementById("year").textContent=new Date().getFullYear();
render();
