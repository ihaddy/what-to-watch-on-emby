// const readline = require('readline');
import * as readline from 'readline';

export function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}


// const ans = await askQuestion("Are you sure you want to deploy to PRODUCTION? ");