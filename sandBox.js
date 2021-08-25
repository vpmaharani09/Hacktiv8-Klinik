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

// console.log(generateNameFirstLast("joko      susilo  arduino"));

function dataSeparationFirstAndLastName(firstName, lastname) {
	let arrayFirstName = firstName.split(" ");
	arrayFirstName = arrayFirstName.filter((el) => {
		return el != "";
	});

	let arrayLastName = lastname.split(" ");
	arrayLastName = arrayLastName.filter((el) => {
		return el != "";
	});

	let fullName = [...arrayFirstName, ...arrayLastName];
	if (fullName.length == 1) {
		firstName = fullName[0];
		lastname = "";
	} else if (fullName.length > 1) {
		firstName = fullName[0];
		lastname = fullName.slice(1).join(" ");
	}
	console.log(firstName, "||", lastname);
	return fullName;
}

console.log(dataSeparationFirstAndLastName("dodi ardi", "jodi  didi"));
