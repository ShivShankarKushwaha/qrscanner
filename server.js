const express = require('express');
const app = express();
const os = require('os');
const port = process.env.PORT || 5500;

app.use(express.static(__dirname+'/public'));
app.use('/node_modules', express.static(__dirname+'/node_modules'));
app.use('public',express.static(__dirname+'/public'));


let ipv4;
function getip()
{
    const networkInterfaces = os.networkInterfaces();
    Object.keys(networkInterfaces).forEach(interfaceName => {
    const addresses = networkInterfaces[interfaceName];
    addresses.forEach(address => {
    if (address.family === 'IPv4' && !address.internal) {
    ipv4=address.address;
    }
});
});
}

app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/public/index.html");
})



app.listen(port,()=>{
    getip();
console.log(`server is running on http://localhost:${ port} and ipconfig is: http://${ ipv4 }:${ port }`);
});