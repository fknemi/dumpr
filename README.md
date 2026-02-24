# Dumpr

A waste management mobile application for scheduling waste collection and discovering recycling initiatives in your community.

<br>

<p align="center">
<img width="200" height="400" alt="Home-LoggedIn" src="https://github.com/user-attachments/assets/f73d9576-d870-454c-a4e3-b8c8840b5359" />
<img width="200" height="400" alt="Tickets-LoggedIn" src="https://github.com/user-attachments/assets/0591a519-0436-4bed-b061-931034a4c737" />
<img width="200" height="400" alt="Profile-LoggedOut" src="https://github.com/user-attachments/assets/4329781c-f409-438a-b8b8-8777ab3d85d6" />
</p>

<br>

## Overview

Dumpr simplifies waste collection scheduling and promotes sustainable recycling practices. Users can request waste pickups, track their environmental impact, and participate in community recycling programs.

<br>

## Tech Stack

React Native and Firebase.

<br>

## Features

- User registration and authentication
- Waste collection scheduling and tracking
- Recycling program discovery
- Push notifications for collection updates
- Photo uploads for waste requests
- Location services for address validation
- Environmental impact tracking
- Offline functionality

<br>

## Getting Started

### Prerequisites

- Node.js v20 or higher
- Xcode for iOS development
- Android Studio for Android development

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/fknemi/dumpr.git
cd dumpr
npm install
```

Configure Firebase by adding the following to your project:

- `google-services.json` inside the `android/` directory
- `GoogleService-Info.plist` inside the `ios/` directory
- A `.env` file at the root with your Firebase credentials

### Running the App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

<br>

## Project Structure

```
dumpr/
├── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # App screens
│   ├── stores/        # Zustand state stores
│   ├── hooks/         # Custom hooks
│   └── types/         # TypeScript type definitions
├── assets/            # Images and fonts
├── android/           # Android native code
├── ios/               # iOS native code
└── App.tsx            # Root component
```
