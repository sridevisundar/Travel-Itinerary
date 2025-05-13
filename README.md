# Travel Itinerary Prototype

## Overview

This is a **prototype** version of the **Travel Itinerary Planner** application built using **Next.js**. It helps users plan and organize their travel itineraries by viewing available **hotels**, **trains**, **buses**, and **flights** for their travel needs. While this is still a prototype, it demonstrates the core functionality and can be extended with real-time APIs for booking and viewing options.

## Features (Prototype)

* **Create Itinerary**: Allows users to add destinations and create their travel itinerary.
* **View Available Hotels**: View a list of available hotels at the selected destination.
* **View Available Trains**: View available train routes between cities or destinations.
* **View Available Buses**: View available bus routes to the desired destination.
* **View Available Flights**: View available flight options based on the selected destination and travel dates.
* **Basic UI**: Simple user interface to manage travel itinerary and view transport/accommodation details.

## Technologies Used

* **Frontend**: Next.js (for dynamic routing, SSR, and pages)
* **Styling**: Basic CSS (Tailwind CSS integration planned for future versions)
* **State Management**: React hooks and Context API

## Installation (For Testing Prototype Locally)

1. Clone the repository:

   ```bash
   git clone https://github.com/sridevisundar/Travel-Itinerary.git
   cd Travel-Itinerary
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

## Current Limitations

* **Limited Integration**: Right now, transport and hotel data are not yet integrated with live APIs. Future versions will include real-time data fetching and booking.
* **Basic UI**: The user interface is minimal and will be improved for better interaction with transport/accommodation data.
* **No Payment/Booking Functionality**: Users cannot currently book transport or hotels; they can only view available options.

## Future Improvements

* **Real-time Data**: Integrate APIs for real-time data for flights, trains, buses, and hotels.
* **Booking Functionality**: Enable users to directly book flights, trains, buses, and hotels.
* **Advanced Itinerary Planning**: Include activity planning, day-by-day itinerary management, and dynamic updates.
* **Export Functionality**: Allow users to export their itinerary with all travel and accommodation details to PDF or other formats.

## Contributing

Contributions to improve the functionality and UI of the application are welcome. If you'd like to contribute, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.
