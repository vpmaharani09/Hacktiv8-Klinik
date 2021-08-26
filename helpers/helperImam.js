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

//console.log(generateNameFirstLast("joko      susilo  arduino"));

module.exports = { generateNameFirstLast };
