const fs = require('fs');
const path = require('path');

var listado = [];
var googleipsused = [];
var kalayips = [];
var cognitousedips = [];
var tutkips = [];
var ntpsips = [];
var awsstaging = [];

var ourpublicipadd = ["4.16.177.238"];

var salvalistado = [];

var hey = [/\b(\w*kalay\w*)\b/gi, /\b(\w*google\w*)\b/gi, /\b(\w*cognito\w*)\b/gi, /\b(\w*tutk\w*)\b/gi, /\b(\w*ntp\w*)\b/gi, /\b(\w*staging\w*)\b/gi];
var hoh = [kalayips, googleipsused, cognitousedips, tutkips, ntpsips, awsstaging];
var gray = /[0-2]{0,1}[0-9]{0,1}[0-9]{1}\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}\.[1-2]{0,1}[0-9]{0,1}[0-9]{1}/g;

/*
0.0.0.0/8	"This" network
10.0.0.0/8	Private-use networks
100.64.0.0/10	Carrier-grade NAT
127.0.0.0/8	Loopback
127.0.53.53	Name collision occurrence
169.254.0.0/16	Link local
172.16.0.0/12	Private-use networks
192.0.0.0/24	IETF protocol assignments
192.0.2.0/24	TEST-NET-1
192.168.0.0/16	Private-use networks
198.18.0.0/15	Network interconnect device benchmark testing
198.51.100.0/24	TEST-NET-2
203.0.113.0/24	TEST-NET-3
224.0.0.0/4	Multicast
240.0.0.0/4	Reserved for future use
255.255.255.255/32	Limited broadcast
 */

var privates = /(^0\.)|(^10\.)|(^100\.6[4-9]\.)|(^100\.[7-9]\d\.)|(^100\.1[0-2][0-7]\.)|(^127\.)|(^169\.254\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.0\.0\.)|(^192\.0\.2\.)|(^192\.168\.)|(^198\.1[8-9]\.)|(^198\.51\.100\.)|(^203\.0\.113\.)|(^22[4-9]\.)|(^23[0-9]\.)|(^2[4-5][0-5])|(^255\.)/g;



fs.readdir('./', (err, files) =>{
    files.forEach(file =>{
        //console.log(file);
        //to select only files ending in .txt
        //console.log(path.extname(file));
        if(path.extname(file) == ".txt"){
            //console.log("HEY");
            toread(file);
        }
        
    });
});


function toread(file){
    fs.readFile(file, 'utf8', function(err, data){
        if(err){
            console.log(err);
        }else{
            
            //console.log(data);
            var tre = data.split('\n');
            for(let i = 0; i < tre.length; i++){
                stre = tre[i];
                //console.log(stre);
                scanpips(gray, listado);
                runregex();
                fixtables();
                //fir();
            }
            
            //find();
            console.log(path.basename(file));
            //console.log(listado);
            // To pass cleaner multiple times to clean all Bogon and Private IP Addresses 
           
            loopingremove(listado);

            salvalistado = listado;
            //console.log("===================");
            //console.log(listado);
            //console.log("===================")
            listado = [];
            if(awsstaging.length > 0){
                
                
                console.log("___________________________________________");
                console.log("IPs used from Kalay at: " + path.basename(file));
                console.log(kalayips);
    
                console.log("___________________________________________");
                console.log("IPs used from GOOGLE at: " + path.basename(file));
                console.log(googleipsused);
    
                console.log("___________________________________________");
                console.log("IPs received by DNS for Cognito AWS at: " + path.basename(file));
                console.log(cognitousedips);
    
                console.log("___________________________________________");
                console.log("IPs used by Staging server in AWS: " + path.basename(file));
                console.log(awsstaging);

                console.log("___________________________________________");
                console.log("IPs used by DVR from TUTK: " + path.basename(file));
                console.log(tutkips);  
                
                console.log("___________________________________________");
                console.log("IPs used by DVR from NTP server pool.ntp.org: " + path.basename(file));
                console.log(ntpsips);  
    
                console.log("___________________________________________");
                console.log("Our Public Address from ISP provider: " + path.basename(file));
                console.log(ourpublicipadd);  
    
                
                console.log("___________________________________________");
                console.log("UNKOWN!!!! IPs used by DVR at: " + path.basename(file));
                console.log(salvalistado);   
                
                
                
                unkownscan(file);
            }       
        }        
    });   
}

function selectnonrepeat(ip, li){
    if(li.length === 0){
        li.push(ip);
        //console.log(ip[0])
    }else{
        for(let t = 0; t < li.length; t++){
            if(!li.includes(ip)){
    //            console.log(ip);
                li.push(ip);
                //console.log(ip);
                
            }
        }
    }
}

function loopingremove(n){
    for(let t = 0; t < 10000; t++){
        removeprivateip(n);
    }
}

function removeprivateip(li){
    for(let k = 0; k < li.length; k++){
        var kree = li[k];
        var p = kree.match(privates);
        if(p){
            //console.log(p);
            li.splice(k, 1);
        }
    }
}

function scanpips(stringmatch, objecttabe){
    var r = stre.match(stringmatch);
                
    if(r){    
            var len = r.length;
            //console.log(len);
            if(len > 1){
                for(let p = 0; p < len; p++){
                    //console.log("****************");
                    //console.log(r[p]);
                    //console.log("*****************");                                
                    selectnonrepeat(r[p], objecttabe);
                }
            }else{
                //console.log("///////////////");
                //console.log(r[0]);
                //console.log("//////////////");
                selectnonrepeat(r[0], objecttabe);
            }
        }
}


function scanpipsforkey(stringmatch, objecttabe){
    var r = stre.match(stringmatch);
    //console.log(stre);                
    if(r){   
            var lios = stre.match(gray); 
            
            if(lios){
                var len = lios.length;
                //console.log(len);
                if(len > 1){
                    for(let p = 0; p < len; p++){
                        //console.log("****************");
                        //console.log(r[p]);
                        //console.log("*****************");                                
                        selectnonrepeat(lios[p], objecttabe);
                    }
                }else{
                    //console.log("///////////////");
                    //console.log(r[0]);
                    //console.log("//////////////");
                    selectnonrepeat(lios[0], objecttabe);
                }
            }            
            removeprivateip(objecttabe);
        }
}

function runregex(){
    for(let i = 0; i < hey.length; i++){
        scanpipsforkey(hey[i], hoh[i]);
    }
}



function fixtables(){
    for(let i = 0; i < googleipsused.length; i++){
            var ips = googleipsused[i];
            if(cognitousedips.includes(ips)){
                var jer = cognitousedips.indexOf(ips);
                cognitousedips.splice(jer, 1);            
            }
            if(kalayips.includes(ips)){
                var tur = kalayips.indexOf(ips);
                kalayips.splice(tur, 1);
            }
            if(tutkips.includes(ips)){
                var tur = tutkips.indexOf(ips);
                tutkips.splice(tur, 1);
            }
            if(ntpsips.includes(ips)){
                var tur = ntpsips.indexOf(ips);
                ntpsips.splice(tur, 1);
            }
            if(awsstaging.includes(ips)){
                var tur = awsstaging.indexOf(ips);
                awsstaging.splice(tur, 1);
            }
            if(ourpublicipadd.includes(ips)){
                var tur = ourpublicipadd.indexOf(ips);
                ourpublicipadd.splice(tur, 1);
            }
            if(listado.includes(ips)){
                var her = listado.indexOf(ips);
                listado.splice(her, 1);
                for(let a = 0; a < cognitousedips.length; a++){
                    var cognip = cognitousedips[a];
                    if(listado.includes(cognip)){
                        var gre = listado.indexOf(cognip);
                        listado.splice(gre, 1);
                    }
                }
                for(let e = 0; e < kalayips.length; e++){
                    var kalay = kalayips[e];
                    if(listado.includes(kalay)){
                        var yor = listado.indexOf(kalay);
                        listado.splice(yor, 1);
                    }    
                }
                for(let e = 0; e < tutkips.length; e++){
                    var tutks = tutkips[e];
                    if(listado.includes(tutks)){
                        var hu = listado.indexOf(tutks);
                        listado.splice(hu, 1);
                    }    
                }
                for(let e = 0; e < ntpsips.length; e++){
                    var ntps = ntpsips[e];
                    if(listado.includes(ntps)){
                        var ha = listado.indexOf(ntps);
                        listado.splice(ha, 1);
                    }    
                }
                for(let e = 0; e < awsstaging.length; e++){
                    var ntps = awsstaging[e];
                    if(listado.includes(ntps)){
                        var ha = listado.indexOf(ntps);
                        listado.splice(ha, 1);
                    }    
                }
                for(let e = 0; e < ourpublicipadd.length; e++){
                    var ntps = ourpublicipadd[e];
                    if(listado.includes(ntps)){
                        var ha = listado.indexOf(ntps);
                        listado.splice(ha, 1);
                    }    
                }
            }
    }
}





function unkownscan(file){
        for(let wr = 0; wr < salvalistado.length; wr++){
            //console.log(salvalistado[wr]);
            var je = salvalistado[wr];
            //var tr = 67.225;
            nane = `\\b(\\w*${je}\\w*)\\b`;
            var cande = new RegExp(nane, "gi");
    
            //console.log(cande);
            //var prefix = /\b(\w*67.225.\w*)\b/gi;
            //detectlines(file, cande);
            
            let per = 0;
            detectlines(file, cande, per, je)
        }
    
       
    
}




function detectlines(file, cande, per, je){
    fs.readFile(file, 'utf8', function(err, data){
        if(err){
            console.log(err);
        }else{
            
            //console.log(data);
            var pra = per;
            var tre = data.split('\n');
            console.log("");
            console.log("");
            console.log("****************************************");
            console.log("************* " + je + " *************");
            console.log("****************************************");
            for(let i = 0; i < tre.length; i++){
                stre = tre[i];
                //console.log(stre);
                if(pra < 5){
                    var tra = stre.match(cande);
                    if(tra){
                        console.log("_____");
                        console.log(stre);
                        pra += 1;
                    
                    }
                }
            }
        }
    });
}