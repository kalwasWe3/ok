


$("#btnKod").on('click', async  event => {
    var kod = await $("#kod").val(); 
    var data = await {kod:kod};
    
    var options = await {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
    };
    
    const response = await fetch('/dane', options);
    const dataJson = await response.json();

    // check if code is in base
    if(dataJson.kode !== false){
            const code = await dataJson[0].kode;
            const codeUsed = await dataJson[0].used;
    // check that the code has been used
            if(codeUsed == false){
                await $("#response").text(code + "jest w bazie");
            }else{
                await $("#response").text("kod został użyty");
            }
     }else{
            $("#response").text("kod nie istnieje");
    }
});





