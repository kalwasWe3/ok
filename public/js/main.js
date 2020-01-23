
getData();

async function getData(){
   var response = await fetch('/numeber');
   var data = await response.json();
    await $("#numer").text("pozostało: " + (100 - data.length));

}



var mail = "patryk@we3studio.pl";

var data={mail:mail};

var options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
};



$("#buttonGet").on('click', async  event => {
    const response = await fetch('/push', options);
    const dataJson = await response.json();
    const count = await dataJson.status;
     console.log(dataJson);
    if(count !== "faild"){
        const  generatedKode = await dataJson.kode;
        await $("#kode").text(generatedKode);
        await generateBarCode(generatedKode); 
    }else{
        $("#kode").text("już dzis probowało ponad 100 osob"); 
    }
});


function generateBarCode(n) {
    var nric = n;
    var url = 'https://api.qrserver.com/v1/create-qr-code/?data=' + nric + '&amp;size=50x50';
    $('#barcode').attr('src', url);
}



















