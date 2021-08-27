function generateNameFirstLast(string) {
	let dataArray = string.split(" ");
	dataArray = dataArray.filter((el) => {
		return el != "";
	});
	let objek = {};
	if (dataArray.length == 1) {
		objek.first_name = dataArray[0];
	} else if (dataArray.length > 1) {
		objek.first_name = dataArray[0];
		objek.last_name = dataArray.slice(1).join(" ");
	}
	return objek;
}

let checkOpenClinic = (req, res, next) => {
	if (new Date().getDay() == 6 || new Date().getDay() == 0) {
		console.log("clinik tutup sabtu dan minggu");// 
		// res.render("home", { data: { middleware:"clinik tutup sabtu dan minggu"}})
		res.render("home")
		// res.send("klinik tutup")// res.render // redirect
	} else {
		console.log("klinik buka senin sampai jumat",new Date().getDay());
		next();
	}
}

function session(req,res) {
	if (req.session.pengunjung) {
		req.session.pengunjung += 1;
	} else {
		req.session.pengunjung = 1;
		req.session.Date = new Date().getDate();
	}
}
//console.log(generateNameFirstLast("joko      susilo  arduino"));

module.exports = { generateNameFirstLast , checkOpenClinic ,session};
