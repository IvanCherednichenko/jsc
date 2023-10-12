//
// TCheList2310.12.js
//
// Cherednichenko TCheList version 2310.12.
//
// https://github.com/IvanCherednichenko/jsc
//
// (C) 2023 Ivan Cherednichenko. All Rights Reserved.
//
// This program is free software and distributed under GNU Lesser GPL 3.0 license.
//

function TCheList() {
	var FNames = [];
	var FValues = [];

	this.indexOf = function(name, ignoreCase) {
		if (ignoreCase) {
			name = name.toLocaleLowerCase();
		}

		for (var i = 0; i < FNames.length; i++) {
			if (FNames[i] == name) {
				return i;
			}
			if (ignoreCase && (FNames[i].toLocaleLowerCase() == name)) {
				return i;
			}
		}
		return -1;
	}

	this.add = function(name, value, modify) {
		var i = this.indexOf(name);
		if (i == -1) {
			FNames.push(name);
			return FValues.push(value);
		}

		if (modify) {
			FValues[i] = value;
			return i;
		}
	}

	this.values = function(nameOrIndex, ignoreCase) {
		if (Number.isInteger(nameOrIndex)) {
			return FValues[nameOrIndex];
		}

		return FValues[this.indexOf(nameOrIndex, ignoreCase)];
	}

	this.delete = function(nameOrIndex) {
		if (Number.isInteger(nameOrIndex)) {
			if ((nameOrIndex >= 0) && (nameOrIndex <= FNames.length)) {
				FNames.splice(nameOrIndex, 1);
				FValues.splice(nameOrIndex, 1);
				return true;
			}
			else {
				return false;
			}
		}

		return this.delete(this.indexOf(nameOrIndex));
	}
}
