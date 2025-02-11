# Soldier of Fortune Card Comparison App

## Overview
This application allows users to search for Magic: The Gathering (MTG) cards and compare them against the legendary *Soldier of Fortune*. The app uses advanced AI algorithms to evaluate the searched card based on various attributes, determining if it outperforms *Soldier of Fortune* in terms of power, rarity, abilities, and more. This comparison helps users analyze the potential strength of their cards in a fun and engaging way.

## Features
- **Card Search**: Enter the name of any MTG card to retrieve its details and compare it against *Soldier of Fortune*.
- **AI Comparison**: The app uses deep AI algorithms to determine if the card is better based on predefined attributes like stats, abilities, and rarity.
- **Instant Feedback**: The app provides an immediate result, letting you know if the searched card surpasses *Soldier of Fortune* or not.
- **User-Friendly Interface**: Simple, intuitive design with smooth scrolling and fade-in effects for a seamless user experience.

## How It Works
1. **Enter Card Name**: Type the name of the MTG card you want to compare in the input box.
2. **Fetch Data**: Upon submission, the app fetches data from the [Scryfall API](https://scryfall.com/docs/api), which provides detailed information about the card.
3. **AI Evaluation**: The card’s attributes are analyzed using AI algorithms to assess its power relative to *Soldier of Fortune*.
4. **Comparison Result**: The app displays whether the card you searched for is better than *Soldier of Fortune*, based on its calculated comparison score.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (with lodash.js for utility functions)
- **Backend**: Fetching data from the [Scryfall API](https://scryfall.com/docs/api).
- **AI Algorithms**: Deep algorithmic evaluation for comparing card attributes.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- The [Scryfall API](https://scryfall.com/docs/api) for providing comprehensive MTG card data.
- Open-source libraries and tools like lodash.js for utility functions.
