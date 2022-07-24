var express = require('express');
var router = express.Router();
var { loginId, transactionKey } = require('../models/config');
var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;
var { validateForm } = require('../models/validator');
var randomstring = require('randomstring');
var moment = require('moment');
var nodemailer = require('nodemailer');
var sql = require("mssql");
var json2csv = require('json2csv');
var json2xls = require('json2xls');
var csvtojson = require('csvtojson');
var fs = require('fs');
var multer = require('multer');
var path = require('path');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
var xlsxj = require('xlsx-to-json')
var AdmZip = require('adm-zip');
require('dotenv').config()
var Request = require('request');

var config = {
    user: process.env.db_user,
    password: process.env.db_password,
    server: process.env.db_server,
    port: process.env.db_port,
    database: process.env.db_database,
    options: {
      connectionTimeout: 50000,
      requestTimeout: 50000
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  };
  router.get('/events', function(req, res) {
    console.log('insideee')
    res.render('events');
  });
  router.get('/admin/addevent', function(req, res) {
    if(req.session && req.session.admin){
      res.locals.admin = req.session.admin;
      console.log('inside evenetss')
      res.render('admin/addevent');  
    }
    else{
      req.session.reset();
      res.redirect('/admin');
    }
  });
// --------------------------/
// ----------------------------------------------------------------------------Add Events-----------------------------------------------------------------------------------------
router.post('/addevent',function(req,res){
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    var request = new sql.Request();
    request.input('pevid', sql.Int, null);
    request.input('city', sql.VarChar(50), req.body.city);
    request.input('state', sql.VarChar(50), req.body.state);
    request.input('startday', sql.VarChar(100), req.body.startday);
    request.input('enddate', sql.VarChar(100), req.body.enddate);
    request.input('season', sql.Int, req.body.season);
    request.input('title', sql.VarChar(100), req.body.title);
    request.input('eoo', sql.DateTime, req.body.eoo);
    request.input('ec', sql.DateTime, req.body.ec);
    request.input('sanction', sql.VarChar(30), req.body.sanction);
    request.input('status', sql.VarChar(30), req.body.status);
    request.input('type', sql.VarChar(20), 'add');
    request.input('location',sql.VarChar(50),req.body.location);
    request.input('venue',sql.VarChar(50),req.body.venue);
    request.input('hosthotel',sql.VarChar(100),req.body.hosthotel);
    request.input('checkintime',sql.VarChar(100),req.body.checkintime);
    request.input('notes',sql.VarChar(500), req.body.notes);
    request.execute('addeventreg', function(err, recordsets, returnValue, affected) {
      if(err){
        console.log(err,'errroor')
        res.sendStatus(500);
      }
      else{
          console.log(recordsets.recordset)
          res.send(recordsets.recordset);
        }
      });
  });
});
// -------------------------------------------------------------------------Edit Event-----------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.post('/editeventreg', function(req, res) {
    // console.log(req.body.pevid)
    var sql = "Select * from bc_event_parent where pevid="+req.body.pevid+"";
    // console.log(sql);
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});
// --------------------------------------------------------------Update Event-----------------------------------------------------------------------------------------------
router.post('/updateevent',function(req,res){
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    var request = new sql.Request();
    // console.log(req.body)
    request.input('pevid', sql.Int, req.body.pevid);
    request.input('city', sql.VarChar(50), req.body.city);
    request.input('state', sql.VarChar(50), req.body.state);
    request.input('startday', sql.VarChar(100), req.body.startday);
    request.input('enddate', sql.VarChar(100), req.body.enddate);
    request.input('season', sql.Int, req.body.season);
    request.input('title', sql.VarChar(100), req.body.title);
    request.input('eoo', sql.DateTime, req.body.eoo);
    request.input('ec', sql.VarChar(50), req.body.ec);
    request.input('sanction', sql.VarChar(30), req.body.sanction);
    request.input('status', sql.VarChar(30), req.body.status);
    request.input('type', sql.VarChar(20), 'edit');
    request.input('location',sql.VarChar(50),req.body.location);
    request.input('venue',sql.VarChar(50),req.body.venue);
    request.input('hosthotel',sql.VarChar(100),req.body.hosthotel);
    request.input('checkintime',sql.VarChar(100),req.body.checkintime);
    request.input('notes',sql.VarChar(500), req.body.notes);
    request.execute('addeventreg ', function(err, recordsets, returnValue, affected) {
      if(err){
        res.sendStatus(500);
      }
      else{
          // console.log(recordsets.recordset)
          res.send(recordsets.recordset);
        }
      });
  });
});
// -------------------------------------------------------Add Class--------------------------------------------------------
router.post('/addclass',function(req,res){
  
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    var request = new sql.Request();
    request.input('evid', sql.Int, null);
    request.input('pevid', sql.Int, req.body.pevid);
    request.input('draw_grp', sql.Int, 0);
    request.input('startdate', sql.DateTime, req.body.startdate);
    request.input('perfcount', sql.Int, 0);
    request.input('roundcount', sql.Int, 0);
    request.input('evtype', sql.VarChar(50), req.body.evtype);
    request.input('evclass', sql.VarChar(50), req.body.evclass);
    request.input('evlabel', sql.VarChar(50), req.body.evlabel);
    request.input('schedfees', sql.Int, req.body.schedfees);
    request.input('fees', sql.Money, req.body.fees);
    request.input('added', sql.Decimal(8, 2), req.body.added);
    request.input('sanction', sql.VarChar(50), req.body.sanction);
    request.input('status', sql.VarChar(50), req.body.status);
    request.input('evlink', sql.Int, 0);
    request.input('type', sql.VarChar(10), 'add');
    request.execute('addclassreg ', function(err, recordsets, returnValue, affected) {
      if(err){
        console.log(err,'error in class events')
        res.sendStatus(500);
      }
      else{
        console.log(recordsets.recordset,'opopop')
        res.send(recordsets.recordset)
      }
    });
  });
});
// ----------------------------------------------------------------------------Edit Class-----------------------------------------------------------------------------------------
router.post('/updateclass',function(req,res){
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    var request = new sql.Request();
    // console.log(req.body)
    request.input('evid', sql.Int, req.body.evid);
    request.input('pevid', sql.Int, req.body.pevid);
    request.input('draw_grp', sql.Int, req.body.draw_grp);
    request.input('startdate', sql.DateTime, req.body.startdate);
    request.input('perfcount', sql.Int, req.body.perfcount);
    request.input('roundcount', sql.Int, req.body.roundcount);
    request.input('evtype', sql.VarChar(50), req.body.evtype);
    request.input('evclass', sql.VarChar(50), req.body.evclass);
    request.input('evlabel', sql.VarChar(50), req.body.evlabel);
    request.input('schedfees', sql.Int, req.body.schedfees);
    request.input('fees', sql.Money, req.body.fees);
    request.input('added', sql.Decimal(8, 2), req.body.added);
    request.input('sanction', sql.VarChar(50), req.body.sanction);
    request.input('status', sql.VarChar(50), req.body.status);
    request.input('evlink', sql.Int, req.body.evlink);
    request.input('type', sql.VarChar(10), 'edit');
    request.execute('addclassreg ', function(err, recordsets, returnValue, affected) {
      if(err){
        res.sendStatus(500);
      }
      else{
          res.sendStatus(200);
        }
      });
  });
});
//------------------------------------------------GET EVENT INTO  CLASS----------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.post('/geteventinfo', function(req, res) {
    // console.log(req.body)
    var sql = "select * from bc_event_parent where pevid="+req.body.eventid;
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});

//------------------------------------------------------------Class Info-----------------------------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    router.post('/classdata', function(req, res) {
      // if(req.session && req.session.user){
        // res.locals.user = req.session.user; 
        var sql = "select evid as classid,(evclass+' '+evtype) as class,evlabel,bep.sanction,fees,startdate,bep.city,bep.state,bep.title,bep.season from bc_event_child bec join bc_event_parent bep on bec.pevid=bep.pevid where bec.evid="+req.body.evid+"";
      // console.log(sql)
      request.query(sql, function (err, recordsets) {
        if (err) {
          res.sendStatus(500);
        }
        else {
          // console.log(recordsets.recordset)
          res.send(recordsets.recordset);
        }
      });
    // }
    // else{
    //   req.session.reset();
    //   res.redirect('/');
    // }
  });
  });

//-------------------------------------------------Class1 data-----------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.get('/Class1Data', function(req, res) {
    // console.log(req.body)
    var sql = "SELECT a.city, a.state, a.startday,b.evid, b.evclass, b.evtype, b.evlabel,b.startdate,COUNT(a.pevid) AS dacount FROM bc_event_parent a,bc_event_child b WHERE a.pevid = b.pevid AND startday > DATEADD(DAY,-180,GETDATE()) AND b.evlink = 0 GROUP BY b.evid,a.city,a.state,a.startday,b.evclass,b.evtype,b.evlabel,b.startdate ORDER BY b.startdate DESC";
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});

//-------------------------------------------------Destroy-----------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.post('/destroy', function(req, res) {
    // console.log(req.body)
    var sql1 = "Delete from bc_event_parent where pevid="+req.body.pevid+""
    var sql2 = "Delete from bc_event_child where pevid="+req.body.pevid+""
    var sql3 = "Delete from bc_judge_x where pevid="+req.body.pevid+""
    var sql4 = "Delete from bc_riderfee_pevids where pevid="+req.body.pevid+""
    var sql5 = "DELETE FROM bc_entries WHERE pevid = "+req.body.pevid+""
    var sql6 = "DELETE FROM bc_entry_x WHERE pevid = "+req.body.pevid+""
    request.query(sql1, function (err, recordsets1) {
      request.query(sql2, function (err, recordsets2) {     
        request.query(sql3, function (err, recordsets3) {
          request.query(sql4, function (err, recordsets4) {
            request.query(sql5, function (err, recordsets5) {
              request.query(sql6, function (err, recordsets6) {
                if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.sendStatus(200)
      }
    });
            });
          });
        });
      });
    });
  });
});
//------------------------------------------------------------Class Result Info-----------------------------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    router.post('/classresdata', function(req, res) {
        // console.log(req.body)
        var sql = "select evid as classid,(evclass+' '+evtype) as class,startdate,bep.city,bep.state,bep.title from bc_event_child bec join bc_event_parent bep on bec.pevid=bep.pevid where bec.evid="+req.body.evid+"";
        var sql1 = "SELECT a.*,b.money,b.sc FROM bc_res_outs a INNER JOIN bc_res_place b ON a.outid = b.outid WHERE b.evid ="+req.body.evid+" ORDER BY b.sc DESC";
      // console.log(sql1)
      request.query(sql, function (err, recordsets) {
        request.query(sql1, function (err, recordsets1) {
          if (err) {
            res.sendStatus(500);
          }
          else {
          // console.log(recordsets1.recordset)
          res.send({data : recordsets.recordset, table : recordsets1.recordset});
        }
      });
      });
  });
  });
//------------------------------------------------------------Schedule More-----------------------------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    router.post('/moreschedule', function(req, res) {
        var sql = "select * from bc_event_parent where pevid="+req.body.pevid+"";
        var sql1 = "SELECT pevid,jid,jname FROM bc_judge_x WHERE pevid = "+req.body.pevid+" ORDER BY jid";
        var sql2  = "SELECT evid,pevid,(cast(evid as nvarchar(5))+' '+sanction+' '+evclass+' '+evtype) as Class,startdate,cast((SELECT COUNT(*) FROM bc_entry_x WHERE evid =bec.evid)as nvarchar(5))+'/'+cast((SELECT COUNT(*) FROM bc_res_place WHERE evid =bec.evid)as nvarchar(5)) as entries_results FROM bc_event_child bec WHERE pevid ="+req.body.pevid+" ORDER BY startdate ASC, evtype DESC, evclass ASC"
        // console.log(sql)
        request.query(sql, function (err, recordsets) {
          request.query(sql1, function (err, recordsets1) {
            request.query(sql2, function (err, recordsets2) {
              if (err) {
                res.sendStatus(500);
              }
              else {
                // console.log(recordsets.recordset,'1')
                // console.log(recordsets1.recordset)
                // console.log(recordsets2.recordset)
                res.send({data1 : recordsets.recordset, data2 : recordsets1.recordset, data3 : recordsets2.recordset});
              }
            });
          });
        });
    });
  });
  
  //--get single calsss data
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    router.post('/getsingleclass', function(req, res) {
      // console.log(req.body)
      var sql = "select bc.*,bp.season,bp.city,bp.state,bp.title,(SELECT COUNT(*) FROM bc_entry_x WHERE evid = bc.evid) entries,(SELECT COUNT(*) FROM bc_entry_x WHERE evid = bc.evid AND draw > 0) draw,(SELECT COUNT(*) FROM bc_res_place WHERE evid = bc.evid) results from bc_event_parent bp join bc_event_child bc on bp.pevid=bc.pevid where bp.pevid="+req.body.pevid + "and bc.evid= " +req.body.evid +"";
      request.query(sql, function (err, recordsets) {     
        if(err){
          // console.log(err)
          res.sendStatus(500);
        }
        else{
          // console.log(recordsets.recordset);
          res.send(recordsets.recordset);
        }
      });
    });
  });
  //-------------------delete class
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    // create Request object
    var request = new sql.Request();
    router.post('/deleteclass', function(req, res) {
      // console.log(req.body)
      var sql = "delete from bc_event_child where evid="+req.body.evid;
      request.query(sql, function (err, recordsets) {     
        if(err){
          // console.log(err)
          res.sendStatus(500);
        }
        else{
          // console.log(recordsets.recordset);
          res.send(recordsets.recordset);
        }
      });
    });
  });

// -------------------------------------------------------------------------Update Judge Data-----------------------------------------------------------------------------------------
router.post('/updatejudge',function(req,res){
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    var request = new sql.Request();
    request.input('pevid', sql.Int, req.body.pevid);
    request.input('json', sql.VarChar(8000), JSON.stringify(req.body.judge));
    request.execute('add_edit_judges ', function(err, recordsets, returnValue, affected) {
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset)
        res.send(recordsets.recordset);
      }
    });
  });
});

// -------------------------------------------------------------------------Judge Data-----------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.post('/judgedata', function(req, res) {
    // console.log(req.body)
    var sql = "select * from bc_judge_x where pevid="+req.body.pevid+"";
    // console.log(sql);
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});
// ----------------------------------------------------------------------------Past Events-----------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.get('/pastevents', function(req, res) {
    // console.log(req.body)
    var sql = "SELECT ROW_NUMBER() over(order by startday desc) Id,  pevid, city, state, title,sanction, startday,status FROM bc_event_parent WHERE startday <=getdate() ORDER BY startday DESC";
    // console.log(sql);
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});

// ---------------------------------------------------------------------upcoming events-----------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.get('/eventsreg', function(req, res) {
    // console.log(sql);
    var sql = "SELECT ROW_NUMBER() over(order by startday desc) Id, pevid, city, state, title,sanction, startday,status FROM bc_event_parent WHERE startday >Dateadd(week,-1,getdate()) ORDER BY startday";
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});

// -------------------------------------------------------------------------Handler data in table-----------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.get('/handlerdata', function(req, res) {
    // console.log(req.body)
    var sql = "select * from bc_handlers order by handler";
    // console.log(sql);
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});

// -------------------------------------------------------------------------Edit Handler Data-----------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.post('/edithandler', function(req, res) {
    console.log(req.body)
    var sql = "Select * from bc_handlers where rowid="+req.body.rowid+"";
    // console.log(sql);
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});

//---------------------------------------------Add new Handler-----------------------------
router.post('/addnewhandler',function(req,res){
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    var request = new sql.Request();
    // console.log(req.body)
    request.input('handler', sql.VarChar(50), req.body.handler);
    request.input('memno', sql.Int, req.body.memno);
    request.input('phone', sql.VarChar(15), req.body.phone);
    request.input('type', sql.VarChar(10), 'Add');
    request.input('rowid', sql.Int, null);
    request.execute('add_edit_handlers ', function(err, recordsets, returnValue, affected) {
      if(err){
        res.sendStatus(500);
      }
      else{
          // console.log(recordsets.recordset)
          res.send(recordsets.recordset);
        }
      });
  });
});

//---------------------------------------------Update Handler-----------------------------
router.post('/updatehandler',function(req,res){
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    var request = new sql.Request();
    // console.log(req.body)
    request.input('handler', sql.VarChar(50), req.body.handler);
    request.input('memno', sql.Int, req.body.memno);
    request.input('phone', sql.VarChar(15), req.body.phone);
    request.input('type', sql.VarChar(10), 'Edit');
    request.input('rowid', sql.Int, req.body.rowid);
    request.execute('add_edit_handlers ', function(err, recordsets, returnValue, affected) {
      if(err){
        res.sendStatus(500);
      }
      else{
          // console.log(recordsets.recordset)
          res.sendStatus(200);
        }
      });
  });
});

//---------------------------------------------Delete Handler-----------------------------
router.post('/deletehandler',function(req,res){
  sql.connect(config, function (err) { 
    if (err) console.log(err);
    var request = new sql.Request();
    // request.input('handler', sql.VarChar(50), req.body.handler);
    // request.input('memno', sql.Int, req.body.memno);
    // request.input('phone', sql.VarChar(15), req.body.phone);
    request.input('type', sql.VarChar(10), 'Delete');
    request.input('rowid', sql.Int, req.body.rowid);
    request.execute('add_edit_handlers ', function(err, recordsets, returnValue, affected) {
      if(err){
        console.log(err,'errrooo')
        res.sendStatus(500);
      }
      else{
          // console.log(recordsets.recordset)
          res.sendStatus(200);
        }
      });
  });
});

//-------------------------------import jpad---------------------------
var storage = multer.diskStorage({
  destination: 'uploads/Jpad/',
  filename: function (req, file, cb) {
    cb(null, file.originalname.replace(path.extname(file.originalname), "") + '-' + Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage })
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.post('/jpadimport', upload.single('file'), function(req,res,next){
    var zip = new AdmZip(req.file.path);
  var zipEntries = zip.getEntries(); // an array of ZipEntry records

  zipEntries.forEach(function(zipEntry) {
    // console.log(zipEntry.toString(),'zipEntry');
    if (zipEntry.entryName.includes('bc_res_outs.json')) {
      console.log('first if')
      var data =  zipEntry.getData().toString();
      console.log(data,'datatatatataatatatatatatatata')
      for(i=0;i< data.length;i++){
        // console.log(data[0],'data0000')
        // var sql = "insert into bc_rpq(rowid,outid,pevid,evid,bbcid,perf,go,sc,place,tier,tier_place,money,points) VALUES('"+data[i]?.rowid+"','"+data[i]?.outid+"','"+data[i]?.pevid+"','"+data[i]?.evid+"','"+data[i]?.bbcid+"','"+data[i]?.perf+"','"+data[i]?.go+"','"+data[i]?.sc+"','"+data[i]?.place+"','"+data[i]?.tier+"','"+data[i]?.tier_place+"','"+data[i]?.money+"','"+data[i]?.points+"')";
        var sql = "insert into bc_rpq(rowid,outid,pevid,evid,bbcid,perf,go,sc,place,tier,tier_place,money,points) VALUES ('" +i +"',2,12,89,8,7,6,78,'place',23,'tier_place',45,1)";
        request.query(sql, function (err, recordsets) {     
          if(err){
            console.log(err,'first error')
            res.sendStatus(500);
          }
          else{
            res.sendStatus(200);
          }
        });
      }
    }
    // else if(zipEntry.entryName.includes('bc_res_place.json')) {
    //   console.log('second if ')
    //   var data1 = zipEntry.getData().toString('utf8');
    //   // console.log(data1)
    //   for(i=0;i<data1.length;i++){
    //     var sql = "insert into bc_roq(outid,pevid,entid,regno,pbid,bbcid,bno,bname,owner,del,j1,j2,j3,j4,j5,j6,bot,raw_score,dropped_judge,dropped_score,spread,score,imp_score,handi_score) VALUES('"+data1[i].outid+"','"+data1[i].pevid+"','"+data1[i].entid+"','"+data1[i].regno+"','"+data1[i].pbid+"','"+data1[i].bbcid+"','"+data1[i].bno+"','"+data1[i].bname+"','"+data1[i].owner+"','"+data1[i].del+"','"+data1[i].j1+"','"+data1[i].j2+"','"+data1[i].j3+"','"+data1[i].j4+"','"+data1[i].j5+"','"+data1[i].j6+"','"+data1[i].bot+"','"+data1[i].raw_score+"','"+data1[i].dropped_judge+"','"+data1[i].dropped_score+"','"+data1[i].spread+"','"+data1[i].score+"','"+data1[i].imp_score+"','"+data1[i].handi_score+"');";
    //     request.query(sql, function (err, recordsets) {     
    //       if(err){
    //         console.log(err,'second error')
    //         res.sendStatus(500);
    //       }
    //       else{
    //         // console.log(recordsets.recordset.length);
    //         res.sendStatus(200);
    //       }
    //     });
    //   }
    // }
  });
});
});

// ---------------------------------------------------------------------Event Results-----------------------------------------------------------------------------------------
sql.connect(config, function (err) { 
  if (err) console.log(err);
  // create Request object
  var request = new sql.Request();
  router.get('/eventresults', function(req, res) {
    // console.log(sql);
    var sql = "SELECT pevid, city, state, title,sanction, startday,status,(SELECT COUNT(*) FROM bc_res_outs WHERE pevid =a.pevid) rslts_outs,(SELECT SUM(money) FROM bc_res_place WHERE pevid = a.pevid) Payout FROM bc_event_parent a WHERE startday <=DATEADD(Month,1,GETDATE()) ORDER BY startday DESC, pevid;";
    request.query(sql, function (err, recordsets) {     
      if(err){
        // console.log(err)
        res.sendStatus(500);
      }
      else{
        // console.log(recordsets.recordset);
        res.send(recordsets.recordset);
      }
    });
  });
});
module.exports = router;