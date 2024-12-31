# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## RIADAH

Riadah is designed to foster a community of athletes and sports enthusiasts by providing a platform for users to share their fitness journey and daily workouts. By taking a picture of your fitness session, you can showcase your progress, share your achievements, and inspire others in the community.

*NOTE:* **This project took me 4 full work time days to be able to get to this version.**

## RIADAH Aim

Riadah aims to celebrate and enhance the sports lifestyle by offering a vibrant, interactive platform for fitness enthusiasts to connect, grow, and thrive together. Whether you’re a professional athlete or someone starting their fitness journey, Riadah is your go-to app for sharing and discovering inspiration.

## Features

1. Sign Up and Sign In:
Effortlessly create an account or log in using secure and fast authentication powered by Appwrite. Users can register via email or integrate their social media accounts for quick access.

2. Home Page:
Explore a vibrant feed of posts from athletes and fitness enthusiasts in your community which is powered by Appwrite. Stay motivated by discovering workouts, tips, and achievements shared by others.

3. Profile Page:
Showcase and display your fitness journey through a gallery of your posts powered by Appwrite. Posts that you created in the Create Page using your account.

4. Maps Page:
Showcase fixed fitness hotspots such as gyms, parks, trails, or sports facilities. This will help users plan the next workout by providing a specified map that includes fitness hotspots.

5. Create Page:
The centerpiece of Riadah, enabling users to upload workout posts seamlessly. Add images, descriptions, and titles to inspire and connect with the community. Appwrite ensures secure and efficient storage of your posts in the database.

## Inner Features

1. Search Bar:
Find specific workout posts **by searching for the title** of the post. This can be done by **pressing on the search icon**.

2. Latest Posts:
A dedicated section on the Home Page that showcases the most recent uploads from the community **(last 7 posts)**. This feature keeps the app fresh and engaging, ensuring users never miss out on trending workouts or achievements.

## Hidden Features

1. Retaining your account:
This means that even if you reload the entire project the app will be always heading you to the user screens unless you signout from the Profile page by **pressing on the exit image**.

2. Refreshing the page:
You can swipe up hard in the Home page so you will be able to see new changes



## Very Important....

**To be able to run the application you will have to install the following commands:**

1. Expo features: for routing between pages/ ensuring the good appearance of the content/.........

   ```bash
    npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
   ```

2. NativeWind *I learned it during this project and I have to say.. this made the styling task so easy* 

   ```bash
    npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
   ```

3. Appwrite implementation  

   ```bash
    npx expo install react-native-appwrite react-native-url-polyfill
   ```

4. Animation implementaion for the latest posts section  

   ```bash
    npm install react-native-animatable expo-av
   ```

5. Image Picker to allow uploading images in the create page  

   ```bash
    npx expo install expo-image-picker
   ```

7. Maps implementation to showcase the map in the Maps page

   ```bash
    npx expo install react-native-maps
   ```

**These are required to run the app because otherwhise you will be facing errors**
