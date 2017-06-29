window.onload = function(){

  const petUpdate = document.getElementById("pet-update");

  document.addEventListener("click", function(e){
    if(e.target.className == "del"){
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `${e.target.dataset.id}`, true);
        xhr.send();
        xhr.onreadystatechange = function() { 
          if (xhr.readyState != 4 && xhr.status != 200) return;
          else {
            console.log("GO!");
            console.log(xhr.status + ': ' + xhr.statusText);
            location.reload();
          }
        }
     }else	if(e.target.classList.contains("user")){
       e.preventDefault();
       petUpdate.dataset.action = e.target.dataset.update;
			 modal.classList.toggle("hidden");
	   }
  });

  petUpdate.addEventListener("submit", function(e){ 
      e.preventDefault();
      let xhr = new XMLHttpRequest();
      xhr.open('PUT', `${e.target.dataset.action}/${e.target.name.value}`, true);
      xhr.send();
      xhr.onreadystatechange = function() { 
        if (xhr.readyState != 4 && xhr.status != 200) return;
        else {
          console.log("GO!");
          console.log(xhr.status + ': ' + xhr.statusText);
          location.reload();
        }
      }
  });

	// модальное окно
	
	modal.addEventListener("click",function(){
		modal.classList.toggle("hidden");
	});
	
	modal.querySelector("div *").addEventListener("click",function(e){
		e.stopPropagation();
	}, true);

} 