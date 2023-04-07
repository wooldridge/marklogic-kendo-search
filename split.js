var fs  = require("fs");

var count = 1000;

fs.readFileSync('./persons_csv.json').toString().split('\n').forEach(function (line) {
    console.log(line);
    count++;
    line = line.replace(/,\s*$/, "");
    let obj = JSON.parse(line);
    //fs.appendFileSync("./output.txt", line.toString() + "\n");
    fs.writeFileSync('./documents/person-' + count + '.json', JSON.stringify(obj, null, 4));
});
