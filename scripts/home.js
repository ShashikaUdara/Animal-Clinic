// add button functionality
// let billTemplate = "<table><tr>";
let itemIndex = 0;
let billNumber = 1;
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

function removeFromNameCountAmountArray(rIndex)
{
	// temp = name_count_amount[rIndex-1];
	// name_count_amount.splice(rIndex-1, 1);
	// console.log("------------------- Name Count and Amount: " + name_count_amount[rIndex-1]); 

	// for(let x of name_count_amount)
	// {
	// 	console.log(x);
	// }

	console.log("**************** name_count_amount[rIndex-1][2]: " + name_count_amount[rIndex-1][2]);

	// deducting amount from the total
	billTotal = billTotal - parseFloat(name_count_amount[rIndex-1][2]);
	itemIndex--;
	// console.log("temp: " + temp);
}

function setItemEntryAreaClear()
{
	document.getElementById("inventory_items_input").value = "";
	document.getElementById("item-count").value = "";
	document.getElementById("item-amount").value = "";
	document.getElementById("remove-index").value = "";
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
	// let billTemplate = `${(itemIndex).toString().padEnd(5, "-")} ${(name).toString().padEnd(25, "-")} ${(count).toString().padEnd(8, "-")} ${(parseFloat(amount).toFixed(2)).toString().padEnd(12)}${"\n"}`;
	let billTemplate = `${(name).toString().padEnd(25, "-")} ${(count).toString().padEnd(8, "-")} ${(parseFloat(amount).toFixed(2)).toString().padEnd(12)}${"\n"}`;
	billItemArr[itemIndex-1] = billTemplate;
}

function setBillItems()
{
	let dateTime = new Date();

	let billHeader = `-- Animal Clinic --\n-- Bill Number ${billNumber} --\n\n${("Index").padEnd(5)} ${("Item or Service").padEnd(25)} ${("Count").padEnd(8)} ${("Amount").padEnd(12)}\n`;
	let billFooter = `\n${("Bill Total").padStart(31)} --- ${(parseFloat(billTotal).toFixed(2)).toString()}\n\n-- ${dateTime} --\nBy NextGEN-Labs - SriLanka`;
	
	let bill = "";
	let count = 0;
	let temp = `${(count).toString().padEnd(5, "-")}`;
	for(let x of billItemArr)
	{
		count += 1;
		bill += `${(count).toString().padEnd(5, "-")}` + x;
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
    document.getElementById("remove-index").value = "";
 //    itemIndex = 0;
 //    while(billItemArr.length > 0) 
 //    {
	//     billItemArr.pop();
	// }

	// while(name_count_amount.length > 0) 
 //    {
	//     name_count_amount.pop();
	// }
	
 //    console.log(billItemArr + " - " + name_count_amount)
}

function eraseBillDataAfterPrint() 
{
    document.getElementById("bill-table-div").value = "";
    document.getElementById("remove-index").value = "";
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
			billNumber++;
			eraseBillDataAfterPrint();
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
	console.log("##### rmItemIndex: " + rmItemIndex);

	if(itemIndex < rmItemIndex || rmItemIndex < 1 || Number.isNaN(rmItemIndex))
	{
		alert("No such item in the list");
		document.getElementById("remove-index").value = "";
		return false;
	}
	else
	{
		removeFromNameCountAmountArray(rmItemIndex);

		console.log("billItemArr[rmItemIndex-1]: " + billItemArr[rmItemIndex-1]);
		billItemArr.splice(rmItemIndex-1, 1);
		console.log("name_count_amount[rmItemIndex-1]: " + name_count_amount[rmItemIndex-1]);
		name_count_amount.splice(rmItemIndex-1, 1);

		eraseText();

		for(let x of name_count_amount)
		{
			console.log(x);
			countTemp++;
		}
		
    	setBillItems();
    	showInBillDisplay();
    	return true;
	}
}