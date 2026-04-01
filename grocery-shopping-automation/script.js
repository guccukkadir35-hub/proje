class Urun{ 
    constructor(ad,fiyat,kategori){
        this.ad = ad;
        this.fiyat = fiyat;
        this.kategori = kategori;
    }
}

let urunler = [
    new Urun("Ekmek",10,"Gıda"),
    new Urun("Süt",25,"İçecek"),
    new Urun("Peynir",50,"Gıda"),
    new Urun("Yumurta",60,"Gıda"),
    new Urun("Domates",15,"Gıda"),
    new Urun("Biber",12,"Gıda"),
    new Urun("Makarna",20,"Gıda"),
    new Urun("Pirinç",35,"Gıda"),
    new Urun("Ayran",30,"İçecek"),
    new Urun("Zeytin",40,"Gıda"),
    new Urun("Çay",50,"İçecek")
];



const urunListesi = document.getElementById("urunListesi");
const ekleBtn = document.getElementById("ekleBtn");
const urunInput = document.getElementById("urunInput");
const fiyatInput = document.getElementById("fiyatInput");
const kategoriInput = document.getElementById("kategoriInput");
const searchInput = document.getElementById("searchInput");
const kategoriFiltre = document.getElementById("kategoriFiltre");
const siralama = document.getElementById("siralama");
const toplamFiyatEl = document.getElementById("toplamFiyat");


function kaydet(){
    localStorage.setItem("urunler", JSON.stringify(urunler));
}

function yukle(){
    const data = localStorage.getItem("urunler");
    if(data){
        urunler = JSON.parse(data).map(u => new Urun(u.ad,u.fiyat,u.kategori));
    }
}


function listele(data = urunler){
    urunListesi.innerHTML="";

    
    const sirali = [...data];
    if(siralama.value==="art") sirali.sort((a,b)=>a.fiyat-b.fiyat);
    if(siralama.value==="az") sirali.sort((a,b)=>b.fiyat-a.fiyat);

    sirali.forEach(urun=>{
        const card = document.createElement("div");
        card.className = "urun-card";
        card.innerHTML = `
            <span>${urun.ad}</span>
            <span>${urun.fiyat} TL</span>
            <span class="kategori-label kategori-${urun.kategori}">${urun.kategori}</span>
            <div class="card-buttons">
                <button class="guncelleBtn">Güncelle</button>
                <button class="silBtn">Sil</button>
            </div>
        `;
        urunListesi.appendChild(card);

        
        card.querySelector(".silBtn").addEventListener("click",()=>{
            const index = urunler.indexOf(urun);
            if(index>-1){
                urunler.splice(index,1);
                kaydet();
                listele();
            }
        });

        
        card.querySelector(".guncelleBtn").addEventListener("click",()=>{
            const yeniAd = prompt("Yeni ürün adı:",urun.ad);
            const yeniFiyat = parseFloat(prompt("Yeni fiyat:",urun.fiyat));
            const yeniKategori = prompt("Yeni kategori (Gıda/İçecek/Temizlik):",urun.kategori);

            if(yeniAd) urun.ad = yeniAd.trim();
            if(!isNaN(yeniFiyat)) urun.fiyat = yeniFiyat;
            if(["Gıda","İçecek","Temizlik"].includes(yeniKategori)) urun.kategori = yeniKategori;

            kaydet();
            listele();
        });
    });

    
    const toplam = sirali.reduce((acc,u)=>acc+u.fiyat,0);
    toplamFiyatEl.textContent = `Toplam: ${toplam} TL`;
}


ekleBtn.addEventListener("click",()=>{
    const ad = urunInput.value.trim();
    const fiyat = parseFloat(fiyatInput.value);
    const kategori = kategoriInput.value;

    if(ad && !isNaN(fiyat)){
        urunler.push(new Urun(ad,fiyat,kategori));
        kaydet();
        urunInput.value="";
        fiyatInput.value="";
        listele();
    } else {
        alert("Lütfen geçerli ürün adı ve fiyat girin.");
    }
});


function filtrele(){
    const arama = searchInput.value.toLowerCase();
    const secilenKategori = kategoriFiltre.value;

    let filtreli = urunler.filter(u => u.ad.toLowerCase().includes(arama));
    if(secilenKategori !== "Hepsi"){
        filtreli = filtreli.filter(u => u.kategori === secilenKategori);
    }

    listele(filtreli);
}

searchInput.addEventListener("input",filtrele);
kategoriFiltre.addEventListener("change",filtrele);
siralama.addEventListener("change",()=>{listele();});


yukle();
listele();