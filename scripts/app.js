import Table from "./components/table.js";
import { tableColumns } from "./helpers/column-config.js";
import { validationFormPatterns } from "./helpers/form-validator.js";
import { mockPetition } from "./helpers/mock-petition.js";

const rootElement = document.querySelector("#root");
const formUser = document.getElementById("user-form");
const alertsElement = document.getElementById("alerts");
const listUsersButton = document.querySelector("#listar-btn");

const table = new Table(tableColumns, rootElement);

export const users = [
{
	id: 1,
	identification: 123456789,
	name: "ramiro",
	last_name: "garcia",
	email: "ramirogarcia@example.com",
	cellphone: 3999999999,
	address: "Cra a10 # 80 - 90",
	city: "Barranquilla",
	country: "Colombia",
},
{
	id: 2,
	identification: 1234567891,
	name: "william",
	last_name: "bahoque",
	email: "williambahoque@example.com",
	cellphone: 3999999998,
	address: "Cra b10 # 80 - 90",
	city: "Barranquilla",
	country: "Colombia",
},
{
	id: 3,
	identification: 12345678923,
	name: "andres",
	last_name: "jose",
	email: "andresjose@example.com",
	cellphone: 3999999999,
	address: "Cra c10 # 80 - 90",
	city: "No existe",
	country: "Colombia",
},
];

const loadUsers = async () => await table.loadItems(users);

const enbleOrDisableInputs = (inputs, disabled = true) => {
	for (const input of inputs) {
		input.disabled = disabled;
	}
};

const clearForm = (inputs) => {
	for (const input of inputs) {
		if (input.name !== "") {
		input.value = "";
		}
	}
};

const clickListUser = async (e) => {
	e.preventDefault();
	await loadUsers();
};

const formSubmit = async (e) => {
	e.preventDefault();
	const inputs = e.target;
	const data = {};
	let canUpdate = true;

	for (const input of inputs) {
    const validatorInfo = validationFormPatterns[input.name];

    if (validatorInfo) {
		const isValid = input.value.match(validatorInfo.pattern);
		if (!isValid) {
        canUpdate = false;
        alert(validatorInfo.message);
        break;
		}
    }

    if (input.name === "identification") {
		const exist = users.some((user) => user.identification === input.value);
		if (exist) {
			canUpdate = false;
			alert("La identificacion ya se encuentra registrada con otro usuario");
			break;
		}
    }

    if (input.value === "" && input.name !== "") {
		console.log(input.name);
		canUpdate = false;
		alert("Los campos del formulario no deben de estar vacios");
		break;
    }

    data[input.name] = input.value;
    canUpdate = true;
	}

	if (!canUpdate) return;

	const id = users.length + 1;
	data["id"] = id;

	users.push(data);

	enbleOrDisableInputs(inputs, true);

	await mockPetition(1000, async () => {
    clearForm(inputs);
    enbleOrDisableInputs(inputs, false);
    await loadUsers();
	});
};

(async () => {
	await loadUsers();
	listUsersButton.addEventListener("click", clickListUser);
	formUser.addEventListener("submit", formSubmit);
})();
