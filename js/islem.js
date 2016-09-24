/* bir mericsoft calışmasıdır. istanbul 2016, irtibat : mericsoftware@gmail.com */


/*ustteki butonlar*/
document.getElementById('kapa').addEventListener('click',function(){window.close();}); //uygulamadan çık
document.getElementById('info').addEventListener('click',function () {  //bilgi dümğesi
	var inf=document.createElement('div');  //boş bir div yarat
	inf.id="biz";  //bu dive id ata
	inf.innerHTML="<span id='bizkapa'>x</span>mericsoft 2016"; //divin içeriği
	document.body.appendChild(inf); //bu divi body elemetine ekle
	document.getElementById('bizkapa').addEventListener('click',function () {  //info penceresideki x e tıklayınca
		document.body.removeChild(inf);		// pencerenin kendisini kapa
	})
})
	
/*ajax mesajları*/
var mesaj=function (metin,sure) {
	var msj=document.createElement('div');  //mesaj için div yarat
	msj.id='mesaj'; // id mesaj olacak
	msj.innerText=metin; //içerik metin parametresinden alınacak
	document.body.appendChild(msj); //mesaj divini göveye ekle
	if(sure!=null){setTimeout(function () {document.body.removeChild(msj)},sure);} // eğer süre boş değilse belirtilen süre sonrası sil
}

// blog yazılarının çekildiği fonksiyon
var cek=function () {
	mesaj('yükleniyor...',null); // başlangıç mesajı
	var xht=new XMLHttpRequest();
	var hedef='http://mericegitim.com/blog/php/cek.php';  //özetler buradan çekilecek
	xht.onreadystatechange=function () {
		if(xht.readyState==4 && xht.status==200){  //herşey yolunda ise
			gel=JSON.parse(xht.responseText);	//çekilen başlığı json ile parse et
			var yaz=''; //json formatlı datayı döngü ile buraya aktaracağız
			for(var i=0;i<gel.length;i++){
				yaz+='<div class= liste id='+gel[i].hab_no+'>'+gel[i].hab_bas+'</div>';		//aktardık.	
			}	
			document.getElementById('alt').innerHTML=yaz; //alt id li dive yaz değişkenini bastık.
			document.body.removeChild(document.getElementById('mesaj'));  //yükleniyor mesajına artık gerek yok.
			haberpen(); //haberpeni hazırla ve çalıştır.				
			
		}	
			
	}
		
	xht.onerror=function (){ //eğer bir hata oluştu ise
		document.body.removeChild(document.getElementById('mesaj'));	//varsa olan mesajı sil
		mesaj('hata! ,mesaja yeniden tıklayın');  // hata mesajı oluştur.
		document.getElementById('mesaj').addEventListener('click',function (){ //hata mesajına tıklayarak yeniden dene
			document.body.removeChild(document.getElementById('mesaj'));	// hata mesajını sil		
			cek();// baştan dene		
		});
		xht.abort();  // işlemi kes
	}
	
	xht.open('POST',hedef,true);  // post metodu ile kanalı aç
	xht.setRequestHeader("Content-type","application/x-www-form-urlencoded"); //php safasına content tipi yolla
	xht.send(); // ajax isteğini yolla
	
	
}
cek();


/*listedeki haberlere tıklayınca pencere açılacak fonksiyon */
var haberpen = function(){
	var list=document.getElementsByClassName('liste'); // liste sınıflı tüm elementleri al
	for(var ii=0;ii<list.length;ii++){ //bu elementleri döngüye sokuyoruz
		document.getElementById(list[ii].id).addEventListener('click',function () {	// listedeki her bir habere tıklar ise
				if(document.getElementById('haberoku')){document.body.removeChild(document.getElementById('haberoku'));} //haber penceresi açıksa kapa
				var okupen=document.createElement('webview'); // haberleri alacak webview i yarat
				okupen.id='haberoku'; // haberoku id sini ata
				okupen.addEventListener('loadstart',function () { // haberoku yüklenmeye başladığında 
					okupen.executeScript({file:'js/haberoku.js'});  // yeni js dosyasını enjekte et.
					mesaj('yazı yükleniyor');
				});
							
				okupen.addEventListener('loadstop',function () { // haberoku tamamen yüklendiğinde
					this.style.display='block'; // kendisi css ile gizli idi artık göster.
					document.body.removeChild(document.getElementById('mesaj'));// haber yüklendi artık mesajı silebilirsin.				
				});
				
				okupen.addEventListener('close',function (){ // haber pen içinden window.close çağırıldıysa 
					document.body.removeChild(document.getElementById('haberoku')); //haberoku penceresini kapa
				}) ;
				
									
				document.body.appendChild(okupen); // haber okuma penceresini artık ekleyebiliriz.
				for(var iii=0;iii<gel.length;iii++){ 
					if(gel[iii].hab_no==this.id){  //eğer tıkladığımda kendi id değerim ile json daki haber id si uyuyor ise
						haberoku(gel[iii].hab_no); // haber oku ile pencereyi çağır.
					}			
				}	
		});
	}
}


/*webview(haber penceresi) e haberi çekecek fonksiyon */
var haberoku = function (hno) {
	var hlink='http://mericegitim.com/blog/oku.php?haber='+hno;  // haberpenden gel[iii] ile aldık
	document.getElementById('haberoku').src=hlink; // aynı iframe gibi haberi çek
}




