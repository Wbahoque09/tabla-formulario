import { mockPetition } from "../helpers/mock-petition.js";

export default class Table {
	/**
	 * @param {import("../@types").TableComponent.TableColumns} columns
	 * @param {HTMLElement} rootElement
	 */
	constructor(columns, rootElement) {
		this.columns = columns;
		this.rootElement = rootElement;
		this.tableElement = document.createElement("table");
		this.tableHeadElement = document.createElement("thead");
		this.tableBodyElement = document.createElement("tbody");
		this.fields = this.#getFields();
		this.#createTable();
	}

	#createTable() {
		const tableRowElement = document.createElement("tr");
		this.columns.forEach((column) => {
			const thElement = document.createElement("th");
			thElement.textContent = column.name;

			if (!column.visible) {
				thElement.style.display = "none";
			}

			tableRowElement.appendChild(thElement);
		});

		this.tableHeadElement.appendChild(tableRowElement);
		this.tableElement.appendChild(this.tableHeadElement);
		this.tableElement.appendChild(this.tableBodyElement);
		this.rootElement.appendChild(this.tableElement);
	}


	async loadItems(items = []) {
		this.tableBodyElement.innerHTML = "";

		await mockPetition(700, () => {
			items
				.map((item) => Object.entries(item))
				.map((item) => this.#createRow(item))
				.forEach((item) => this.tableBodyElement.appendChild(item));
		});
	}

	#getFields() {
		return this.columns.map((column) => ({
			name: column.field,
			visible: column.visible,
		}));
	}

	#createRow(item) {
		const tableRowElement = document.createElement("tr");
		this.fields.forEach((field) => {
			const tableDataElement = document.createElement("td");
			tableRowElement.appendChild(tableDataElement);

			const data = item.find((item) => item[0] === field.name);

			if (!data) return;

			if (!field.visible) {
				const inputElement = document.createElement("input");
				inputElement.type = "hidden";
				inputElement.value = data[1];
				tableDataElement.style.display = "none";
				tableDataElement.appendChild(inputElement);
			}

			if (field.visible) {
				tableDataElement.textContent = data[1];
			}
		});

		return tableRowElement;
	}
}
