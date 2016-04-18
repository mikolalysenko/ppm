var test = require('tape')
var fs = require('fs')
var ppm = require("../ppm.js");

test('parse + serialize', function (t) {
  t.plan(2)

  var image = [
    [[255, 0, 0], [255, 0, 0], [255, 0, 0]],
    [[0, 255, 0], [0, 255, 0], [0, 255, 0]],
    [[0, 0, 255], [0, 0, 255], [0, 0, 255]]
  ];

  ppm.parse(ppm.serialize(image), function(err, img) {
    t.equals(err, null)
    t.deepEquals(img, image)
  })
});

test('unsupported binary ppm', function (t) {
  t.plan(2)

  ppm.parse(fs.createReadStream(__dirname + '/test.ppm'), function (err, img) {
    t.equals(err.message, 'unsupported format: P6')
    t.equals(img, null)
  })
});
