function clearThis(){
  document.getElementById("name1").value="";
  document.getElementById("email").value="";
  document.getElementById("password").value="";
}
//image handling functions
var uId=0;
var selectedFile;
var filename;
var userName;
var emailAddress;
function processSelectedFiles(fileinput){
  selectedFile=fileinput.files[0];
}
function writeUserData(uId,name, email, imageUrl) {
  var database = firebase.database().ref("users");
  var refU=database.push();
  refU.set({
  	name:name,
    email: email,
    imageSent : imageUrl
  });
}
function uploadFile(){
    filename=selectedFile.name;
    userName=document.getElementById("name1").value;
    emailAddress=document.getElementById("email").value;
    var storageRef=firebase.storage().ref().child("images/"+filename);
    var uploadTask=storageRef.put(selectedFile);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
      }
      }, function(error) {
          // Handle unsuccessful uploads
    }, function() {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          var downloadURL = uploadTask.snapshot.downloadURL;
          writeUserData(uId,userName,emailAddress,downloadURL);
		  emailjs.send("gmail","sendimage",{
			  name: userName, 
			  message:downloadURL,
			  email:emailAddress
			})
			.then(
			  function(response) {
			    console.log("SUCCESS", response);
			  }, 
			  function(error) {
			    console.log("FAILED", error);
			  }
			);
          alert("successful!!!");
           uId++;
          clearThis();

          
          });

    } 