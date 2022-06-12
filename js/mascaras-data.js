 
function aplicarMascaraEmDataIso(data){
    if(!data){
        return "";
    }
    return moment(data).format('DD/MM/YYYY');
}

function aplicarMascaraDataHoraEmDataIso(data){
    if(!data){
        return "";
    }
    return moment(data).format('DD/MM/YYYY HH:mm:ss');
}

function aplicarMascaraMoeda(moeda){
    if(!moeda){
        return "";
    }
    return moeda.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
}
  