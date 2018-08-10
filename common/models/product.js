'use strict';

module.exports = function(Product) {
  Product.getByPrice = function(req, res) {
    if (req.body) {
      Product.find({
        fields: {
          productName: true,
        },
        where: {
          and: [
            {sellingPrice: {
              between: [
                req.body.startPrice,
                req.body.endPrice,
              ],
            },
            },
          ],
        },
      }, function(err, instance) {
        if (instance) {
          let att = [];
          instance.map((item) => {
            att.push(item.__data.productName);
          });
          if (att.length) {
            res.json(att);
          } else {
            res.json([]);
          }
        } else {
          res.json();
        }
      });
    } else {
      res.json([]);
    }
  };

  Product.remoteMethod('getByPrice', {
    accepts: [
        {arg: 'req', type: 'object', http: {source: 'req'}},
        {arg: 'res', type: 'object', http: {source: 'res'}},
    ],
    returns: {root: true, type: 'object'},
    http: {path: '/getByPrice', verb: 'post'},
  });
};
