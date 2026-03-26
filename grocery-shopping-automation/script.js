class Urun{
    constructor(ad,fiyat){
        this.ad = ad;
        this.fiyat = fiyat;
    }
}

let urunler = [
    new Urun("Ekmek",10),
    new Urun("Süt",25),
    new Urun("Peynir",50),
    new Urun("Yumurta",60),
    new Urun("Domates",15),
    new Urun("Biber",12),
    new Urun("Makarna",20),
    new Urun("Pirinç",35),
    new Urun("Yoğurt",30),
    new Urun("Zeytin",40),
    new Urun("Çay",50)
];

const urunListesi = document.getElementById("urunListesi");
const ekleBtn = document.getElementById("ekleBtn");
const urunInput = document.getElementById("urunInput");
const fiyatInput = document.getElementById("fiyatInput");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sayfaBilgi = document.getElementById("sayfaBilgi");


let sayfa = 1;
const sayfaBoyutu = 5;
let toplamSayfa = Math.ceil(urunler.length/sayfaBoyutu);


function listele(data = urunler){
    urunListesi.innerHTML="";
    toplamSayfa = Math.ceil(data.length/sayfaBoyutu) || 1;
    if(sayfa > toplamSayfa) sayfa = toplamSayfa;
    sayfaBilgi.textContent = `${sayfa}/${toplamSayfa}`;
    const start = (sayfa-1)*sayfaBoyutu;
    const end = start+sayfaBoyutu;

    data.slice(start,end).forEach((urun,index)=>{
        const li = document.createElement("li");
        li.innerHTML = `${urun.ad} - ${urun.fiyat} TL
        <span>
        <button class="guncelleBtn">Güncelle</button>
        <button class="silBtn">Sil</button>
        </span>`;
        urunListesi.appendChild(li);

        
        li.querySelector(".silBtn").addEventListener("click",()=>{
            const globalIndex = urunler.indexOf(urun);
            if(globalIndex>-1){
                urunler.splice(globalIndex,1);
                if(sayfa>1 && start>=urunler.length) sayfa--;
                listele();
            }
        });

        
        li.querySelector(".guncelleBtn").addEventListener("click",()=>{
            const yeniAd = prompt("Yeni ürün adı:",urun.ad);
            const yeniFiyat = parseFloat(prompt("Yeni fiyat:",urun.fiyat));
            if(yeniAd) urun.ad=yeniAd.trim();
            if(!isNaN(yeniFiyat)) urun.fiyat=yeniFiyat;
            listele();
        });
    });
}


ekleBtn.addEventListener("click",()=>{
    const ad = urunInput.value.trim();
    const fiyat = parseFloat(fiyatInput.value);
    if(ad && !isNaN(fiyat)){
        urunler.push(new Urun(ad,fiyat));
        urunInput.value="";
        fiyatInput.value="";
        sayfa = Math.ceil(urunler.length/sayfaBoyutu);
        listele();
    } else {
        alert("Lütfen geçerli ürün adı ve fiyat girin.");
    }
});


searchInput.addEventListener("input",()=>{
    const arama = searchInput.value.toLowerCase();
    const filtreli = urunler.filter(u => u.ad.toLowerCase().includes(arama));
    sayfa = 1;
    listele(filtreli);
});


prevBtn.addEventListener("click",()=>{ if(sayfa>1){ sayfa--; listele(); } });
nextBtn.addEventListener("click",()=>{ if(sayfa<toplamSayfa){ sayfa++; listele(); } });


listele();