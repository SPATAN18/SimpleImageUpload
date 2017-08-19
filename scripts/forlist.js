	var ref = firebase.database().ref("users/");
	ref.on("child_added", function(data, prevChildKey) {
   		var newPlayer = data.val();
   		var Email=newPlayer.email;
      	var name=newPlayer.name;
   		var imgUrl=newPlayer.imageSent;
   		var str="Click to view image";
   		var link=str.link(imgUrl);
         var thtml="";
         var imga=document.createElement("img");
         imga.src=imgUrl;
         imga.setAttribute('width',16);
         imga.setAttribute('height',16);
   		thtml+="<tr><td><img class='img img-thumbnail' src='"+imga.src+"' height='60' width='80'/></td><td>"+name+"</td><td>"+link+"</td><td>"+Email+"</td></tr>";
   		$(thtml).appendTo("#cont tbody");
         
	});
