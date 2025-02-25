import express from "express"
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' with { type: "json" };
import { GPS, sequelizeConnection } from './sequelizeConnection.js';
import { Op } from 'sequelize';

const app = express()

const port = 3000;

app.use(express.json())

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/gps', async (req, res)=>{
	/*
		//TODO: Это должна была быть свагеровская спека
		'lat': {
			description: 'latitude',
			required: true,
			type: 'number',
			format: 'float',
			example: 56.859938
		}
		in: 'body',
		description: 'longitude',
		required: true,
		type: 'number',
		format: 'float',
		example: 35.908561
	 */
	if(req.body === undefined){
		console.log(req)
		res.status(400).send("Body undefined!");
	}
	const {lat, lng, gps_time} = req.body
	if(lat === undefined || lng === undefined || gps_time === undefined){
		res.status(400).send("Not enough data");
	}
	console.log("Creating GPS row with:", lat, lng, gps_time);
	try{
		const rec = await GPS.create({ lng, lat, gps_time });
		res.status(200).send(rec.toJSON());
	} catch (e) {
		res.status(500).send(e);
	}
})

app.post('/get-gps', async(req, res) => {
	if(req.body === undefined){
		console.log(req)
		res.status(400).send("Body undefined!");
	}
	const{from, to} = req.body
	if(from === undefined || to === undefined){
		res.status(400).send("Not enough data");
	}
	console.log("Searching in range: ", from, to);
	try{
		const result = await GPS.findAll({
			where: {
				created_at: {
					[Op.between]: [from, to]
				}
			}
		})
		res.status(200).send(result);
	} catch (e){
		res.status(500).send(e)
	}
})

app.listen(port, ()=>{
	console.log(`⚡️Backend is running at http://localhost:${port} | http://localhost:${port}/docs`)
})

/*
{
  "from": "2025-02-25 23:30:00",
  "to": "2025-02-25 23:59:00"
}
*/
