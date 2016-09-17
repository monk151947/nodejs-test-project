var _ = require('lodash'),
  Report = require('../models/Report');


 module.exports = function(app) {

  var reports = {};

  reports.create = function(req, res, next) {
   req.body.date = new Date();
   var ReportModel = new Report(req.body);
   console.log("report model created")
   ReportModel.save(function(err, report) {
        if (err) {
          console.log("error in save"+err);
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
          console.log("saved")
           return  res.json({
                type: true,
                data: report
            })
        }
    })
  };

  reports.getReports = function(req, res, next) {
    Report.find({})
      .exec(function(err, reports) {
     if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            res.json({
                type: true,
                data: reports
            })
        }
    });

   };

   reports.getReport = function(req, res, next) {

    Report.find({_id: req.params.id})
      .exec(function(err, report) {
     if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Report: " + req.params.id + " not found"
            })
        } else {
          if(report.length > 0){
            res.json({
               type: true,
               data: report
          })
          }
          else
          {
            res.json({
               type: false,
               data: "Report: " + req.params.id + " not found"
          })
          }

        }
    });

   };

   reports.updateReport = function(req, res, next) {
    var id = req.params.id
    req.body.date = new Date();
    Report.findOne({_id: id})
    .exec(function(err, report) {

     if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
            if(report){
              report.date = req.body.date
              report.total_time = req.body.total_time
              report.notes = req.body.notes

              report.save(function(err, report) {
                if (err) {
                    res.status(500);
                    res.json({
                        type: false,
                        data: "Error occured: " + err
                    })
                } else {
                    res.json({
                        type: true,
                        data: report
                    })
                }
            });
            }
            else {
              res.json({
                type: false,
                data: "Report" + id +"not updated"
              })
          }

        }
    });

   };

  reports.deleteReport = function(req, res, next) {

    Report.remove({_id: req.params.id})
      .exec(function(err, report) {
     if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            })
        } else {
        res.json({
               type: true,
               data: "Report: " + req.params.id + " deleted successfully"
          })
        }
    });

   };


  return reports;
}