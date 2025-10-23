Product Requirement Document (PRD): Quantum Dice

1. Project Overview
"Quantum Dice" is a minimalist, provably fair dice game designed as a portfolio piece to showcase core iGaming development skills. The application will be a single-page web app where a player can bet on the outcome of a virtual 100-sided dice roll. The project's primary goal is to demonstrate technical proficiency in frontend development, game logic, probability, and an understanding of key iGaming concepts (House Edge, Provably Fair) to the Stake Engine review team.

2. Target Audience

    Primary: The technical review team at Stake.com. They are experienced developers who will evaluate the code quality, architectural decisions, and understanding of iGaming principles.

    Secondary: Any recruiter or hiring manager in the web development or gaming industry.

3. Core Features (Minimum Viable Product - MVP)

3.1. Game Logic & Rules

    Player Balance: The player starts with a mock balance (e.g., 1,000 credits).

    Bet Amount: The player can input a specific bet amount.

    Risk Configuration: A slider allows the player to choose a target number between 0.01 and 99.99.

    Bet Type: The player can choose to bet whether the roll will be "Roll Over" or "Roll Under" the chosen target number.

    Dynamic Payout Calculation: The UI must display the Win Chance (%) and the Payout Multiplier (x) in real-time as the player adjusts the slider.

    House Edge: A fixed, non-removable house edge of 1% will be built into the payout formula. This is industry standard.

    Game Execution: A "Roll Dice" button initiates the game round. The player's balance is updated according to the win/loss outcome.

3.2. User Interface (UI) & User Experience (UX)

    Layout: A clean, three-column layout: Bet Controls (left), Live Payout Info (center), and Game Results/History (right).

    Visual Style: A dark-themed, professional UI inspired by the Stake platform but with a unique accent color (e.g., electric blue) to establish a distinct identity.

    Result Animation: The dice roll outcome will be revealed via an animated number counter that rapidly cycles before landing on the final result, creating a moment of suspense.

    Game History: A list displaying the results of the last ~10 rounds (Bet Type, Target, Roll Result, Payout).

    Sound Effects: Simple, satisfying audio feedback for UI interactions (clicks), the roll animation, and the win/loss events.

3.3. Provably Fair System

    Core Mechanic: The game will implement a simplified but functional "Provably Fair" system.

    Seeds: The system will use a serverSeed (generated and hashed by the "server" logic), a clientSeed (viewable and changeable by the player), and a nonce (the number of bets made with the current seed pair).

    Verification: Before a bet, the player is shown the hash of the serverSeed. After the bet, the serverSeed is revealed, allowing the player to verify that a) the seed wasn't changed post-bet and b) the combination of all three inputs correctly produces the game's outcome.

4. User Stories

    As a player, I want to set a bet amount and use a slider to define my win condition so that I can control my risk and reward.

    As a player, I want to see my win chance and payout multiplier update instantly as I adjust the slider so I can make informed betting decisions.

    As a player, I want to click a button to roll the dice and see an engaging animation reveal the outcome.

    As a player, I want my balance to automatically update after each roll to reflect my win or loss.

    As a player, I want to view and change my clientSeed and verify past bets using the revealed serverSeed to trust that the game is fair.

5. Key Formulas & Logic

    Win Chance:

        If "Roll Under" X: winChance = X

        If "Roll Over" X: winChance = 99.99 - X

    Payout Multiplier:

        payoutMultiplier = (1 - HOUSE_EDGE) * (100 / winChance)

        Where HOUSE_EDGE = 0.01

    Provably Fair Result Calculation:

        Create a combined string: hmac_key = serverSeed

        Create data string: data = clientSeed + ":" + nonce

        Generate a hash: hash = HMAC_SHA256(hmac_key, data)

        Take the first 5 characters of the hex hash and convert to an integer: lucky_number_int = parseInt(hash.substring(0, 5), 16)

        Use the modulo operator to get a result between 0 and 9999: result = lucky_number_int % 10000

        Divide by 100 to get the final dice roll value: dice_roll = result / 100 (This gives a number between 0.00 and 99.99)

6. Out of Scope for MVP (Potential Future Features)

    Auto-Bet functionality.

    Advanced 3D dice animation (Three.js).

    User accounts or persistent balances.

    Leaderboards or social features.

7. Deployment Target

    Platform: GitHub Pages.

    Goal: A live, publicly accessible URL will be included at the top of the project's README.md for instant, one-click testing by the review team.