/*bu script islem js içinde executeScript metodu kullanarak webview nesnesini manipüle etmek için kullanılıyor.*/

/*webview ile gelen içeriği keyfi olarak css değişimine uğratıyoruz. */

document.body.style.fontSize="8px";
document.body.style.backgroundColor="rgb(30,30,40)";
document.getElementById("paylas").style.display="none";
document.getElementById('ic').style.width='90%';
document.getElementById('ic').style.left='3%';
document.getElementById('ic').style.padding="2%";
document.getElementById('ic').style.backgroundColor='rgb(30,30,40)';
document.getElementById('ic').style.color='white';
document.getElementById('ic').style.marginLeft='0';
document.getElementById('ic').style.border='none';

/* webview scrollbarları için yeni kural yazıyoruz*/
var scrbar= document.createElement('style');
document.head.appendChild(scrbar);
var styl=scrbar.sheet;
styl.addRule('::-webkit-scrollbar','background-color:rgb(50,50,60)')	//bu kural scrollbarı istediğimiz renge boyayacak.

document.getElementById('govde').style.lineHeight="200%";
document.getElementById('govde').style.padding='none';
document.getElementById("sag").style.display="none";
document.getElementById("haberbaslik").style.width="70%";
document.getElementById("isim").style.display="none";

/*gelen içeriğe kapat düğmesi ekliyoruz */
var haberkapa=document.createElement('span');
haberkapa.id='haberkapa';
haberkapa.style.position='fixed';
haberkapa.style.top='5px';
haberkapa.style.right='15%';
haberkapa.style.zIndex="70";
haberkapa.style.fontSize="12px";
haberkapa.style.cursor='pointer';
haberkapa.style.color='white';
haberkapa.innerHTML='x';
haberkapa.addEventListener('click',function () {
	window.close();  // islem.js içinde okupen nesnesine onclose listenerini tetiklemek için
	
})
document.body.appendChild(haberkapa);



/* eğer haberlerde link olursa güvenlik açısından silinsin istiyorum */
var lin=document.getElementsByTagName('a');
for (i=0;i<lin.length;i++){
	
	lin[i].removeAttribute('href');
	lin[i].style.color='rgb(200,200,200)';
	lin[i].style.textDecoration='line-through';
}

