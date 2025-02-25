import express from "express"

const app = express()

const port = 3000;

app.post('/gps', (req, res)=>{
	const json = JSON.parse(req.body);
	console.log("Adding GPS:", json);
})
