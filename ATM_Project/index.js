#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { welcome } from "./welcome.js";
await welcome();
let user = {
    name: "John Doe",
    pin: 2233,
    balance: 30000,
};
let userInquiry = await inquirer.prompt([
    {
        name: "pin",
        message: "Enter your PIN: ",
        type: "password"
    }
]);
if (userInquiry.pin != user.pin) {
    let resp5 = chalk.yellow(`You've entered a wrong pin`);
    console.log(resp5);
}
else if (userInquiry.pin == user.pin) {
    // user input prompt
    let optScreen = await inquirer.prompt([
        {
            name: "UserMenu",
            type: "list",
            choices: ["Withdraw", "FastCash", "BalanceInquiry"],
            message: "Please select an option to proceed: "
        },
        {
            name: "WithdrawAmount",
            type: "list",
            choices: [5000, 10000, 15000, 20000],
            message: "Please select Fast cash option to proceed: ",
            when(optScreen) {
                return optScreen.UserMenu == "FastCash";
            }
        },
        {
            name: "WithdrawAmount",
            type: "number",
            message: "Please insert your withdrawal amount: ",
            when(optScreen) {
                return optScreen.UserMenu == "Withdraw";
            }
        },
    ]);
    // logic for proceeding
    if (optScreen.UserMenu == "BalanceInquiry") {
        let resp4 = chalk.green(`Your current Balance is ${user.balance}`);
        console.log(resp4);
    }
    else if (optScreen.WithdrawAmount > user.balance) {
        let resp1 = chalk.bgRed(`You don't have sufficient Balance, Please check for Balance Inquiry`);
        console.log(resp1);
    }
    else {
        user.balance = user.balance - optScreen.WithdrawAmount;
        let resp3 = chalk.magenta(`Your new Balance is ${user.balance}`);
        let resp2 = chalk.blue(`Please wait Your Transaction is proceeding`);
        console.log(resp2);
        console.log(resp3);
    }
}
;
