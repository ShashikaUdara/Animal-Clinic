// add button functionality
// let billTemplate = "<table><tr>";
let itemIndex = 0;
let billNumber = 0;
let billTotal = 0;
let lastBill = "";
let name_count_amount = [];

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
		// get the cumilative bill amount
		billTotal += parseFloat(itemAmount);
		setItemEntryAreaClear();

		addItemsToBillArray(itemName, itemCount, itemAmount);
		addToNameCountAmountArray(itemName, itemCount, itemAmount);

		setBillItems();

		showInBillDisplay();
		return true;
	}
}

function addToNameCountAmountArray(name, count, amount)
{
	let temp = [];
	temp[0] = name;
	temp[1] = count;
	temp[2] = amount;
	name_count_amount[itemIndex-1] = temp;
	console.log("Name Count and Amount: " + name_count_amount); 
}

function setItemEntryAreaClear()
{
	document.getElementById("inventory_items_input").value = "";
	document.getElementById("item-count").value = "";
	document.getElementById("item-amount").value = "";
}

function showInBillDisplay()
{
	document.getElementById("bill-table-div").value = lastBill;
}

function addItemsToBillArray(name, count, amount)
{
	// creating the template
	// let billTemplate = `<td width="5%">${itemIndex}</td><td width="80%">${name}</td><td width="5%">${count}</td><td width="10%">${amount}</td>`;
	// let amountP2 = parseFloat(amount).toFixed(2);
	let billTemplate = `${(itemIndex).toString().padEnd(5, "-")} ${(name).toString().padEnd(25, "-")} ${(count).toString().padEnd(8, "-")} ${(parseFloat(amount).toFixed(2)).toString().padEnd(12)}${"\n"}`;
	billItemArr[itemIndex-1] = billTemplate;
}

function setBillItems()
{
	let dateTime = new Date();

	let billHeader = `-- Animal Clinic --\n-- Bill Number ${billNumber} --\n\n${("Index").padEnd(5)} ${("Item or Service").padEnd(25)} ${("Count").padEnd(8)} ${("Amount").padEnd(12)}\n`;
	let billFooter = `\n${("Bill Total").padStart(31)} --- ${(parseFloat(billTotal).toFixed(2)).toString()}\n\n-- ${dateTime} --\nBy NextGEN-Labs - SriLanka`;
	
	let bill = "";
	for(let x of billItemArr)
	{
		bill += x;
	}

	lastBill = billHeader + bill + billFooter;
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
    itemIndex = 0;
    while(billItemArr.length > 0) 
    {
	    billItemArr.pop();
	}

	while(name_count_amount.length > 0) 
    {
	    name_count_amount.pop();
	}
	
    console.log(billItemArr + " - " + name_count_amount)
}

function printBill()
{
	let actionCode = "";
	if(document.getElementById("bill-table-div").value != "")
	{
		if(confirm("Print bill?"))
		{
			actionCode = "Printing...";
		}
		else
		{
			actionCode = "Cancel printing...";
		}
	}
	else
	{
		alert("Oops!!!\nBill is empty...");
	}
}

function loadLasttBill()
{
	console.log(lastBill);
	document.getElementById("bill-table-div").value = lastBill;
}

function removeItem()
{
	let rmItemIndex = parseInt(document.getElementById("remove-index").value);
	let a = "";
	let b = "";
	let c = "";
	let countTemp = 0;
	console.log(rmItemIndex);

	if(itemIndex < rmItemIndex)
	{
		alert("No such item in the list");
		return false;
	}
	else
	{
		// billItemArr.splice(rmItemIndex-1, 1);
		name_count_amount.splice(rmItemIndex-1, 1);

		eraseText();

		for(let x of name_count_amount)
		{
			console.log(x);
			// if(countTemp%3 == 0)
			// {
			// 	a = x;
			// }
			// else if(countTemp%3 == 1)
			// {
			// 	b = x;
			// }
			// else
			// {
			// 	c = x;
			// 	addItemsToBillArray(a, b, c);
			// 	console.log(a + " " + b + " " + c);
			// }
			countTemp++;
		}
		
    	setBillItems();
    	showInBillDisplay();
    	itemIndex--;
    	return true;
	}
}