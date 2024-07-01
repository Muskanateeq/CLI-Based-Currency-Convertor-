#! usr/bin/env node
// Currency convertor
import inquirer from "inquirer";
import chalk from "chalk";
// Currency convertor API LINK
let apilink = "https://v6.exchangerate-api.com/v6/ff9d5a8866723066f0afa3c7/latest/USD";
// fetch data
let fetchData = async (data) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};
let data = await fetchData(apilink);
//countries view
let countries = Object.keys(data);
// converted from currency
let currencyConverter = await inquirer.prompt({
    type: "list",
    name: "currency",
    message: "Converting from currency",
    choices: countries,
});
//converted to currency
let currencyConverter2 = await inquirer.prompt({
    type: "list",
    name: "currency2",
    message: "Converting to currency",
    choices: countries,
});
// user converting amount
let useramount = await inquirer.prompt({
    type: "input",
    name: "amount",
    message: `Enter amount to convert in ${chalk.yellow.bold(currencyConverter2.currency2)}:`,
    validate: function (value) {
        if (isNaN(value) === false) {
            return true;
        }
        return false;
    }
});
// cnv link
let cnv = `https://v6.exchangerate-api.com/v6/ff9d5a8866723066f0afa3c7/pair/${currencyConverter.currency}/${currencyConverter2.currency2}`;
// fetching cnvData
let cnvData = async (data) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};
// fething conversionRate
let conversionRate = await cnvData(cnv);
// conversion amount
let convertedamount = useramount.amount * conversionRate;
// result view
console.log(`your ${chalk.greenBright.bold(useramount.amount)} ${chalk.yellow.bold(currencyConverter.currency)} in ${chalk.yellow.bold(currencyConverter2.currency2)} is ${chalk.greenBright.bold(convertedamount)}`);
