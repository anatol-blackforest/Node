window.onload = function(){
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
     }else if(e.target.className == "update"){
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', `${e.target.dataset.update}`, true);
        xhr.send();
        xhr.onreadystatechange = function() { 
          if (xhr.readyState != 4 && xhr.status != 200) return;
          else {
            console.log("GO!");
            console.log(xhr.status + ': ' + xhr.statusText);
            location.reload();
          }
        }
     }
  });
} 