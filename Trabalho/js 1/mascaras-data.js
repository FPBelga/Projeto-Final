

function aplicarMascaraEmDataIso(data){

    if(!data){
        return "";
    }
    return moment(data).format("DD/MM/YYYY");
}


function aplicarMascaraDataEHoraEmDataIso(data){

    if(!data){
        return "";
    }
    return moment(data).format("DD/MM/YYYY hh:mm:ss");
}
