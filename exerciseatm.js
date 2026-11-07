const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

async function startATM() {
    const rl = readline.createInterface({ input, output });

   
    const correctPIN = "1234";
    let balance = 1000.00; // beginning balance
    let maxAttempts = 3;
    let isAuthenticated = false;

    console.log(" WELCOME TO JAVASCRIPT BANK ");

   
    while (maxAttempts > 0) {
        const enteredPIN = await rl.question("Please enter your 4-digit ATM PIN: ");

        if (enteredPIN === correctPIN) {
            isAuthenticated = true;
            console.log("PIN accepted! Access granted.\n");
            break;
        } else {
            maxAttempts--;
            console.log(`Incorrect PIN. You have ${maxAttempts} attempt(s) remaining.\n`);
        }
    }

    if (!isAuthenticated) {
        console.log("Card blocked due to too many incorrect PIN attempts. Goodbye!");
        rl.close();
        return;
    }

 
    let exit = false;
    while (!exit) {
       
        console.log("      WELCOME TO JAVASCRIPT BANK ");
        console.log("=================================");
        console.log("1. Check Account Balance");
        console.log("2. Withdraw Money");
        console.log("3. Deposit Money");
        console.log("4. Exit");
        
        const choice = await rl.question("\nPlease select an option (1-4): ");

        switch (choice.trim()) {
            case "1":
                console.log(`\nYour current account balance is: $${balance.toFixed(2)}`);
                break;

            case "2":
                const withdrawInput = await rl.question("\nEnter amount to withdraw: $");
                const withdrawAmount = parseFloat(withdrawInput);

                if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
                    console.log("Error: Please enter a valid amount greater than zero.");
                } else if (withdrawAmount > balance) {
                    console.log("Error: Insufficient funds for this withdrawal.");
                } else {
                    balance -= withdrawAmount;
                    console.log(`Successfully withdrew $${withdrawAmount.toFixed(2)}.`);
                    console.log(`Your remaining balance is: $${balance.toFixed(2)}`);
                }
                break;

            case "3":
                const depositInput = await rl.question("\nEnter amount to deposit: $");
                const depositAmount = parseFloat(depositInput);

                if (isNaN(depositAmount) || depositAmount <= 0) {
                    console.log("Error: Please enter a valid deposit amount greater than zero.");
                } else {
                    balance += depositAmount;
                    console.log(`Successfully deposited $${depositAmount.toFixed(2)}.`);
                    console.log(`Your updated balance is: $${balance.toFixed(2)}`);
                }
                break;

            case "4":
                console.log("\nThank you for banking with JavaScript Bank. Have a wonderful day!");
                exit = true;
                break;

            default:
                console.log("\nInvalid option! Please choose a number between 1 and 4.");
        }
    }

    rl.close();
}

startATM();