// add button functionality
// let billTemplate = "<table><tr>";
let itemIndex = 0;
let billNumber = 0;
let billTotal = 0;

const billItemArr = [];

function addToTheBill()
{
	let itemName = document.getElementById("inventory_items_input").value;
	let itemCount = document.getElementById("item-count").value;
	let itemAmount = document.getElementById("item-amount").value;

	console.log(itemName + " " + itemCount + " " + itemAmount);

	if(itemName=="" || itemCount=="" || itemAmount=="")
	{
		return false;
	}
	else
	{
		itemIndex++;
	}

	// get the cumilative bill amount
	billTotal += parseFloat(itemAmount);

	document.getElementById("inventory_items_input").value = "";
	document.getElementById("item-count").value = "";
	document.getElementById("item-amount").value = "";

	// document.getElementById("bill-table-div").innerHTML = "<table>" + displayTheBill(itemName, itemCount, itemAmount) + "</table>";
	let dateTime = new Date();

	let billHeader = `-- Animal Clinic --\n-- Bill Number ${billNumber} --\n\n${("Index").padEnd(5)} ${("Item or Service").padEnd(25)} ${("Count").padEnd(8)} ${("Amount").padEnd(12)}\n`;
	let billFooter = `\n${("Bill Total").padStart(31)} --- ${(parseFloat(billTotal).toFixed(2)).toString()}\n\n-- ${dateTime} --\nBy NextGEN-Labs - SriLanka`;
	console.log(billHeader + displayTheBill(itemName, itemCount, itemAmount) + billFooter);
	document.getElementById("bill-table-div").innerHTML = billHeader + displayTheBill(itemName, itemCount, itemAmount) + billFooter;
	return true;
}

function displayTheBill(name, count, amount)
{
	// creating the template
	// let billTemplate = `<td width="5%">${itemIndex}</td><td width="80%">${name}</td><td width="5%">${count}</td><td width="10%">${amount}</td>`;
	// let amountP2 = parseFloat(amount).toFixed(2);
	let billTemplate = `${(itemIndex).toString().padEnd(5, "-")} ${(name).toString().padEnd(25, "-")} ${(count).toString().padEnd(8, "-")} ${(parseFloat(amount).toFixed(2)).toString().padEnd(12)}${"\n"}`;
	billItemArr[itemIndex-1] = billTemplate;

	// let bill = "<table><tr>";
	
	let bill = "";
	for(let x of billItemArr)
	{
		// bill += "<tr>" + x + "</tr>";
		bill += x;
	}

	// document.getElementById("bill-table-div").value = "";
	return bill;
}

function clearItemEntry()
{
	document.getElementById("inventory_items_input").value = "";
	document.getElementById("item-count").value = "";
	document.getElementById("item-amount").value = "";
}

function eraseText() 
{
    document.getElementById("bill-table-div").value = "";
}