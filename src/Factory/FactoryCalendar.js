class dateFactory{ // CRIANDO A FABRICA DE TRATAMENTO DE DADOS

    Build(simpleconsultas){
        const startdateObj = new Date(simpleconsultas.startdate);
        var day = startdateObj.getDate();
        var month = startdateObj.getMonth();
        var year = startdateObj.getFullYear();

        var hour = Number.parseInt(simpleconsultas.starthour.split(':')[0]);
        var minute = Number.parseInt(simpleconsultas.starthour.split(':')[1]);

        const enddateObj = new Date(simpleconsultas.enddate);

        var finalday = enddateObj.getDate();
        var finalmonth = enddateObj.getMonth();
        var finalyear = enddateObj.getFullYear();
        
        var finalhour = Number.parseInt(simpleconsultas.endhour.split(':')[0]);
        var finalminute = Number.parseInt(simpleconsultas.endhour.split(':')[1]);


        var startdate = new Date(year,month,day,hour,minute,0,0);
        var finaldate = new Date(finalyear,finalmonth,finalday,finalhour,finalminute,0,0)
       startdate.setHours( startdate.getHours());
       finaldate.setHours( finaldate.getHours()-3);
       console.log('dentro')
        
        var consulta = { // PASSANDO UMA VARIAVEL CONTENDO OS DADOS "TRATADOS"
            datestarter: startdate,
            datefinish: finaldate,
        }

        return consulta;
    }

}

export default new dateFactory();