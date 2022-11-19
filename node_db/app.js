
const http = require('http');
const url = require('url');
const qs = require('querystring');
const customer = require('./models/customer')

const server = new http.createServer(function (req, response) {
    var link = url.parse(req.url, true);
    var query = link.query;
    var path = link.pathname;

    if (path == "/api/users") {
        customer.getAll((err, res) => {
            response.end(JSON.stringify(res))
        })
    }
    else if (path == "/api/user" && req.method == "GET") {
        let id = query.id
        customer.getOne(id, (err, res) => {
            response.end(JSON.stringify(res))
        })
    }
    else if (path == "/api/user" && req.method == "POST") {
        formData = '';
        req.on('data', (data) => {
            formData += data.toString();
        });

        req.on('end', () => {
            var query = qs.parse(formData);
            customer.createOne(query, (err, result) => {
                if (!err) {
                    response.end(JSON.stringify({ status: "OK" }))
                }
                else {
                    response.end(JSON.stringify({ status: "FAILED" }))
                }
            })
        })
    }
    else if (path == "/api/user/delete" && req.method == "DELETE") {
        let id = query.id
        customer.deleteOne(id, (err, res) => {
            response.end(JSON.stringify(res))
        })
    }

    else if(path == "/api/user/update" && req.method == "PUT"){
        formData = '';
        req.on('data', (data)=>{
            formData += data.toString();
        });
        req.on('end', ()=>{
            var query = qs.parse(formData);
            customer.updateOne(query, (err, result)=>{
                if(!err){
                    response.end(JSON.stringify({status: "OK"}))
                }
                else{
                    response.end(JSON.stringify({status: "FAILED"}))
                }
            })
        })
    }
});

server.listen(80);
