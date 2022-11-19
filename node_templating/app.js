const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const customer = require('./data/customer');
const HandleBars = require('handlebars');

registerPartials();
// let template = HandleBars.compile("<p>{{msg}}</p>");
// var res = template({msg: "Hello from handlebars"});
// console.log(res);
const server = http.createServer(function (req, res) {
    const link = url.parse(req.url, true);
    const query = link.query;
    const page = link.pathname;

    if (page == "/") {
        customer.getAll((err, result)=>{
            let context = {data: result}
            let t = renderTemplate('index', context);
            console.log(context);
            res.end(t);
        });
    }
    else if(page == "/customer/create" && req.method == "GET"){
        let template = renderTemplate('create',{});
        res.end(template)

    }
    else if(page == "/customer/create" && req.method == "POST"){
        let formData = '';
        req.on('data',function(data){
            formData += data.toString();
        });
        req.on('end',function(){
            let userData = qs.parse(formData);
            customer.addOne(userData.name,userData.email,userData.age,(err, result)=>{
                var context = {
                    result: {
                        success: true,
                        errors: []
                    }
                };
                if(err){
                    console.log(err)
                    context.result.success = false;
                }
                let t = renderTemplate('create',context);
                res.end(t);
            });
        })
    }
});
server.listen(80)

function renderTemplate(name, data) {
    var filePath = path.join(__dirname, "templates", name + ".hbs");
    let templateText = fs.readFileSync(filePath, "utf-8");
    let template = HandleBars.compile(templateText);
    return template(data);
}

function registerPartials(){
    var filePath = path.join(__dirname, "templates", "partials", "navbar.hbs");
    let templateText = fs.readFileSync(filePath, "utf-8");
    HandleBars.registerPartial("navbar",templateText);

}
