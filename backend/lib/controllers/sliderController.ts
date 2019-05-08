import * as mongoose from 'mongoose';
import { ItemSchema } from '../models/itemModel';
import { UserSchema } from '../models/userModel';
import { SliderSchema } from '../models/sliderModel';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as multer from 'multer';
const dateTime = require('node-datetime');

const Item = mongoose.model('Item', ItemSchema);
const Slider = mongoose.model('Slider', SliderSchema);
const User = mongoose.model('User', UserSchema);

const sliderStore = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/slider');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '.' + file.originalname);
	}
});

const sliderUpload = multer({ storage: sliderStore }).single('file');

export class SliderController {

	public addImage(req: Request, res: Response) {
		let imageData = req.body;
		console.log(imageData);
		let image = new Slider(imageData);
		image.save((error, savedImage) => {
			if (error) {
				console.log(error);
			} else {
				res.status(200).send({ msg: savedImage });
			}
		});
	}

	public uploadPicture(req: Request, res: Response) {
		sliderUpload(req, res, function(err) {
			if (err) {
				return res.status(501).json({ error: err });
			}
			const realFileName = req['file'].filename;
			return res.json({ fileName: realFileName });
		});
	}

	public getAllSliderImages(req: Request, res: Response) {
		Slider.find({}, function(err, sliders) {
			var data = [];
		
			sliders.forEach(function(slider) {
			  if(req.body.user_id == slider.user_id) {
				data.push(slider)
			  }
			});
		
			res.send(data);  
		  });
	}

	public removeImage(req: Request, res: Response) {
		console.log(req)
		let id = req.params.id;
		Slider.deleteOne({ _id: { $in: id } }, (err, msg) => {
			if (err) {
				res.send(err);
			} else {
				return res.json({ msg: msg });
			}
		});
	}

	public getImageById(req: Request, res: Response) {
		Slider.findById(req.params.id, (err, image) => {
			if (err) console.log(err);
			else {
				res.json(image);
			}
		});
	}

	public updateImage(req: Request, res: Response) {
		console.log(req.body);
		console.log(req.params.id);
		Slider.findById({ _id: req.params.id }, (err, image) => {
			image.picture = req.body.picture;
			image
				.save()
				.then((item) => {
					res.json('Update done');
				})
				.catch((err) => {
					res.status(400).send('Update failed');
				});
		});
	}
}
