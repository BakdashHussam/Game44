# Game44
Game starts with 5 players (1 the actual user and 4 computer-managed player) and each player has a credit of 100.
Each round a random number between 0 to 9.99 with 0.01 steps should be generated in the back-end. Let’s call it SecretNumber because we don’t want to impose it to the players.
Players will guess the SecretNumber and place their GuessedNumber before the round get started.
When the round starts, 10 credit will be deducted from each user’s credit balance, a growing graph starts animating from 0 to the SecretNumber. When after the round, for each player if it’s GuessedNumber is smaller than the SecretNumber, he will win by his GuessedNumber multiplied by 10 (player deducted credit), otherwise he loses his 10 credits.

Example:
ROUND1
Player_1: Credit: 100, GuessedNumber: 1.5
Player_2: Credit: 100, GuessedNumber: 2
Player_3: Credit: 100, GuessedNumber: 3
Player_4: Credit: 100, GuessedNumber: 5
Player_5: Credit: 100, GuessedNumber: 7

ROUND1 STARTS: (SecretNumber = 2.85)
Player_1: Credit: 90, GuessedNumber: 1.5
Player_2: Credit: 90, GuessedNumber: 2
Player_3: Credit: 90, GuessedNumber: 3
Player_4: Credit: 90, GuessedNumber: 5
Player_5: Credit: 90, GuessedNumber: 7

ROUND1 ENDS (Results):
Player_1: Credit: 105, GuessedNumber: 1.5 (Won 1.5 * 10)
Player_2: Credit: 110, GuessedNumber: 2 (Won 2 * 10)
Player_3: Credit: 90, GuessedNumber: 3 (Lost)
Player_4: Credit: 90, GuessedNumber: 5 (Lost)
Player_5: Credit: 90, GuessedNumber: 7 (Lost)
