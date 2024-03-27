document.addEventListener("DOMContentLoaded", function() {
    const createButton = document.getElementById("create");
    const readButton = document.getElementById("read");
    const updateButton = document.getElementById("update");
    const selectButton = document.getElementById("select");
    
    createButton.addEventListener("click", async function(){
        let vazon = document.getElementById("vazon").value;
        let baseUrl='http://localhost/pizzatagdij/index.php?vevo/'+vazon;
        const formdata= new FormData(document.getElementById("dolgozoForm")); 
        let options={
            method: "POST",
            mode: "cors",
            body: formdata
        };
        let response= await fetch(baseUrl, options);
    });
    updateButton.addEventListener("click", async function(){
        let baseUrl='http://localhost/pizzatagdij/index.php?vevo/'+vazon;
        let object={
            vazon: document.getElementById("vazon").value,
            vnev: document.getElementById("vnev").value,
            vcim: document.getElementById("vcim").value
        };
        let body=JSON.stringify(object);
        let options={
            method: "PUT",
            mode: "cors",
            body: body
        };
        let response= await fetch(baseUrl, options);
    });
    readButton.addEventListener("click", async function(){
        //dolgozoForm.classList.add("d-none");
        //dolgozoDiv.classList.remove("d-none");
        let baseUrl="http://localhost/pizzatagdij/index.php?vevo";
        let options={
            method: "GET",
            mode: "cors"
        };
        let response= await fetch(baseUrl, options);
        if(response.ok){
            let data= await response.json();
            ugyfelekListazasa(data);
        }
        else{
            console.error("Hiba a szerver válaszában!");
        }
    });
    function ugyfelekListazasa(dolgozok){
        let dolgozoDiv= document.getElementById("ugyfellista");
        let tablazat = dolgozokFejlec();
        for(let dolgozo of dolgozok){
            tablazat+= dolgozoSor(dolgozo);
        }
        dolgozoDiv.innerHTML = tablazat+"</tbody> </table>";
    }
    function dolgozoSor(dolgozo){
        let sor=`<tr>
                    <td>${dolgozo.vazon}</td>
                    <td>${dolgozo.vnev}</td>
                    <td>${dolgozo.vcim}</td>
                    <td>
                    <button type="button" class="btn btn-outline-success" id="select" onclick="adatBetoltes(${dolgozo.vazon}, '${dolgozo.vnev}', ${dolgozo.vcim})" >Kiválaszt</button>
                        <button type="button" class="btn btn-outline-danger" id="delete" onclick="adatTorles(${dolgozo.vazon})" ><i class="fa-solid fa-trash"></i></button>
                    </td>
                </tr>`;
        return sor;
    }
    function dolgozokFejlec(){
        let fejlec=`<table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Azonosító</th>
                                <th>Név</th>
                                <th>Cím</th>
                                <th>Művelet</th>
                            </tr>
                        </thead>
                        <tbody>`;
        return fejlec;
    }
});
function adatBetoltes(vazon, vnev, vcim){
    let baseUrl='http://localhost/pizzatagdij/index.php?vevo/'+vazon;
    let options={
        method: "GET",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    document.getElementById("vazon").value=vazon;
    document.getElementById("vnev").value=vnev;
    document.getElementById("vcim").value=vcim;
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}
function adatTorles(vazon){
    let baseUrl='http://localhost/pizzatagdij/index.php?vevo/'+vazon;
    let options={
        method: "DELETE",
        mode: "cors"
    };
    let response= fetch(baseUrl, options);
    response.then(function(response){
        if(response.ok){
            let data= response.json();
        }
        else{
            console.error("Hiba a szerverben!");
        }
    });
}