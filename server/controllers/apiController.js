"use strict";

const apiController = {};
const TransactionModel = require("../models/TransactionModel");
const moment = require("moment");

apiController.getRoutes = (req, res, next) => {
  TransactionModel.find({})
    .then(routes => {
      console.log("TransactionModel.getRoutes: ", routes);
      res.locals.routes = routes;
      next();
    })
    .catch(err => {
      console.log("TransactionModel.getRoutes - database error: " + err);
      next(err);
    });
};

apiController.RealtimeRoutes = (req, res, next) => {
  // return the most recent route with details
};

// RouteList - (timeRange) - simple list of unique routeNames over the time range
apiController.RouteList = (req, res, next) => {
  // db.getCollection('transactions').distinct("requestUrl",{})
  const startTime = moment().format()
  const endTime =  moment().subtract('hours',12).format();
  console.log(`startTime: ` + startTime);
  console.log(`endTime: ` + endTime);
  TransactionModel.distinct("routeName", {
    $and: [
      { startTimestamp: { $lte: startTime } },
      { endTimestamp: { $gte: endTime } }
    ]
  })
    .then(routes => {
      console.log("TransactionModel.getRoutes: ", routes);
      res.locals.routes = routes;
      next();
    })
    .catch(err => {
      console.log("TransactionModel.getRoutes - database error: " + err);
      next(err);
    });
};

// RouteList - (timeRange) - return an object that shows the total route transactions over timerange
// and calculate 60 datapoints reflecting the total transactions for
// each datapoint which represents 1/60th of the timerange
// routeName, timeRange
apiController.RouteThroughput = (req, res, next) => {};

// RouteFailureRate - (timeRange) - return an object that shows the failures over timerange
// and calculate 60 datapoints reflecting the total failures for
// each datapoint which represents 1/60th of the timerange
// routeName, timeRange
apiController.RouteFailureRate = (req, res, next) => {};

// RouteResponseTime - (timeRange) - return an object that shows the average transaction duration over timerange
// and calculate 60 datapoints reflecting the average transaction duration for
// each datapoint which represents 1/60th of the timerange
// routeName, timeRange
apiController.RouteResponseTime = (req, res, next) => {};

// RouteResponseTime - (timeRange) - return an object that shows the average transaction duration over timerange
// and calculate 60 datapoints reflecting the average transaction duration for
// each datapoint which represents 1/60th of the timerange
// routeName, timeRange
apiController.RouteDetails = (req, res, next) => {};

// ApplicationThroughPut (timeRange) - return an object that shows the totals routes processed over timerange and
// calculate 60 datapoints reflecting the routes processed duration for the routes procesed over time
apiController.ApplicationThroughput = (req, res, next) => {};

// ApplicationResponseTime (timeRange) - return an object that shows the routes processed over timerange and
// calculate 60 datapoints reflecting the routes processed duration for the routes procesed over time
apiController.ApplicationResponseTime = (req, res, next) => {};

// ApplicationResponseTime (timeRange) - return an object that shows the route failures processed over timerange and
// calculate 60 datapoints reflecting the routes failures duration for the routes procesed over time
apiController.ApplicationFailureRates = (req, res, next) => {};

// ApplicationPopularRoutes (timeRange) - show top 5 routes with avg response time and number of
// hits per route for given time range
apiController.ApplicationPopularRoutes = (req, res, next) => {};

module.exports = apiController;
