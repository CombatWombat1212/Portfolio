import { processGroups, processImages } from "@/scripts/ProcessImages";

const KOALAKO_IMGS = processImages({
  banner_building: {
    name: "banner_building",
    src: "./assets/images/case_studies/koalako/banners/banner_building.png",
    alt: "A banner image of a child playing with lego blocks",
    width: 3840,
    height: 1001,
  },
  banner_closing: {
    name: "banner_closing",
    src: "./assets/images/case_studies/koalako/banners/banner_closing.png",
    alt: "The text 'Koalako' 3D rendered in photorealistic wooden blocks with letters on each one",
    width: 1920,
    height: 600,
  },
  banner_delivery: {
    name: "banner_delivery",
    src: "./assets/images/case_studies/koalako/banners/banner_delivery.png",
    alt: "A photograph of a child reaching out to a large bubble",
    width: 3840,
    height: 1000,
  },
  banner_intro: {
    name: "banner_intro",
    src: "./assets/images/case_studies/koalako/banners/banner_intro.png",
    alt: "A 2D illustrated graphic of a koala climbing a pencil",
    width: 2401,
    height: 1200,
  },
  delivery_activities: {
    name: "delivery_activities",
    src: "./assets/images/case_studies/koalako/delivery/delivery_activities.png",
    alt: "A screenshot of the KoalaKo activities page, showing a list of activities that parents can do with their child. Each activity has a title, description, tags, an icon to favorite, and can be tapped to view more information",
    width: 1125,
    height: 2436,
  },
  delivery_games: {
    name: "delivery_games",
    src: "./assets/images/case_studies/koalako/delivery/delivery_games.png",
    alt: "A closely cropped screenshot of a high fidelity mockup screen for KoalaKo, showing a number of filters allowing parents to fine tune the games they want to play with their child. Filters include category, budget, and number of players",
    width: 1042,
    height: 908,
  },
  delivery_game_listing: {
    name: "delivery_game_listing",
    src: "./assets/images/case_studies/koalako/delivery/delivery_game_listing.png",
    alt: "A screenshot of the KoalaKo game listing page, showing a listing of a game that has been selected from the activities screen. The listing shows the title, description, tags, an icon to favorite the game, user reviews, and a suggested local spot to play",
    width: 1125,
    height: 2436,
  },
  delivery_interests: {
    name: "delivery_interests",
    src: "./assets/images/case_studies/koalako/delivery/delivery_interests.png",
    alt: "A screenshot of the KoalaKo app where, during onboarding, the user can optionally select the interests of their child. This helps the app to better reccomend relevant activities and games to the user",
    width: 1125,
    height: 2436,
  },
  delivery_location: {
    name: "delivery_location",
    src: "./assets/images/case_studies/koalako/delivery/delivery_location.png",
    alt: "A closely cropped screenshot of the KoalaKo app which shows the ability to search your local area for child friendly play areas",
    width: 1042,
    height: 922,
  },
  delivery_login: {
    name: "delivery_login",
    src: "./assets/images/case_studies/koalako/delivery/delivery_login.png",
    alt: "A screenshot of the KoalaKo login screen, showing the ability to either sign in with an existing account or create a new account",
    width: 1125,
    height: 2436,
  },
  delivery_map: {
    name: "delivery_map",
    src: "./assets/images/case_studies/koalako/delivery/delivery_map.png",
    alt: "A full screenshot of the location browsing screen in the KoalaKo app, showing a map of the local area with a number of child friendly locations marked which can be selected to view more information",
    width: 1125,
    height: 2436,
  },
  delivery_post_activity: {
    name: "delivery_post_activity",
    src: "./assets/images/case_studies/koalako/delivery/delivery_post_activity.png",
    alt: "A screenshot of the KoalaKo app where, after completing an activity, the user can post a review of the activity, and provide feedback, or continue on with another activity.",
    width: 1125,
    height: 2436,
  },
  delivery_profile_child: {
    name: "delivery_profile_child",
    src: "./assets/images/case_studies/koalako/delivery/delivery_profile_child.png",
    alt: "A screenshot of the KoalaKo app showing the profile of your child.  This profile contains no personal details about your child, except for their name which isnt necessary to provide.  The profile contains a list of activities that the child has completed, and their favourite activities.",
    width: 1125,
    height: 2436,
  },
  delivery_profile_parent: {
    name: "delivery_profile_parent",
    src: "./assets/images/case_studies/koalako/delivery/delivery_profile_parent.png",
    alt: "A screenshot of the KoalaKo app showing the profile of the parent.  This profile contains your name, stats such as number of children, and a badge indicating how often you use the app.  The profile also contains a list of your past activities, and a list of your children.",
    width: 1125,
    height: 2436,
  },
  delivery_statistics: {
    name: "delivery_statistics",
    src: "./assets/images/case_studies/koalako/delivery/delivery_statistics.png",
    alt: "A screenshot of the KoalaKo app showing the statistics screen.  This screen shows the number of activities that have been completed, the types of creative play within those activities such as physically active, or musical, the structure of the activities such as structured or unstructured, and filters for the timeframe of this data.",
    width: 1125,
    height: 2436,
  },
  delivery_trophies: {
    name: "delivery_trophies",
    src: "./assets/images/case_studies/koalako/delivery/delivery_trophies.png",
    alt: "A screenshot of the KoalaKo app showing the trophies screen. This screen is a collection of awards and achievements you can earn in various ways while using the app and completing activities.",
    width: 1125,
    height: 2436,
  },
  features_child_profiles: {
    name: "features_child_profiles",
    src: "./assets/images/case_studies/koalako/features/features_child_profiles.png",
    alt: "KoalaKo app screenshot showing a message asking if you'd like to proceed without setting up a child profile. This requires no personal information about your child, and enables the app to better reccomend activities and games while also tracking creative development.",
    width: 1256,
    height: 2048,
    group: 'hifi_features',
    index: 0,
  },
  features_community_feedback: {
    name: "features_community_feedback",
    src: "./assets/images/case_studies/koalako/features/features_community_feedback.png",
    alt: "KoalaKo app screenshot showing a comment section underneath an activity listing.",
    width: 1256,
    height: 1960,
    group: 'hifi_features',
    index: 3,
  },
  features_location_browsing: {
    name: "features_location_browsing",
    src: "./assets/images/case_studies/koalako/features/features_location_browsing.png",
    alt: "KoalaKo app screenshot showing a map of the local area with a number of child friendly locations marked which can be selected to view more information",
    width: 2912,
    height: 1960,
    group: 'hifi_features',
    index: 4,
  },
  features_selecting_interests: {
    name: "features_selecting_interests",
    src: "./assets/images/case_studies/koalako/features/features_selecting_interests.png",
    alt: "KoalaKo app screenshot showing a list of interests that can be selected to help the app reccomend activities and games.",
    width: 1256,
    height: 2048,
    group: 'hifi_features',
    index: 1,
  },
  features_statistics_page: {
    name: "features_statistics_page",
    src: "./assets/images/case_studies/koalako/features/features_statistics_page.png",
    alt: "KoalaKo app screenshot showing the statistics screen.  This screen shows the number of activities that have been completed, the types of creative play within those activities such as physically active, or musical, and the number of hours spent on creative play.",
    width: 1256,
    height: 2048,
    group: 'hifi_features',
    index: 2,
  },
  findings_games: {
    name: "findings_games",
    src: "./assets/images/case_studies/koalako/findings/findings_games.png",
    alt: "A closely cropped screenshot of the KoalaKo app showing a single activity listing, and a number of filters available to search through the available activities.",
    width: 1400,
    height: 1020,
  },
  findings_stats: {
    name: "findings_stats",
    src: "./assets/images/case_studies/koalako/findings/findings_stats.png",
    alt: "A closely cropped screenshot of the KoalaKo app showing a circular graph which shows the number of hours played vs a goal of hours in the selected timeframe",
    width: 1400,
    height: 2016,
  },
  background_bulb: {
    name: "background_bulb",
    src: "./assets/images/case_studies/koalako/illustrations/background_bulb.svg",
    alt: "An illustrated graphic of a broken lightbulb",
    width: 155,
    height: 239,
  },
  background_kids: {
    name: "background_kids",
    src: "./assets/images/case_studies/koalako/illustrations/background_kids.svg",
    alt: "An illustrated graphic of two children playing with a ball",
    width: 300,
    height: 328,
  },
  exercise_brainstorming: {
    name: "exercise_brainstorming",
    src: "./assets/images/case_studies/koalako/illustrations/exercise_brainstorming.svg",
    alt: "An illustrated graphic of a central bubble with a number of smaller bubbles branching off of it",
    width: 110,
    height: 89,
  },
  exercise_crazy_8s: {
    name: "exercise_crazy_8s",
    src: "./assets/images/case_studies/koalako/illustrations/exercise_crazy_8s.svg",
    alt: "An illustrated graphic of a notepad and pencil",
    width: 110,
    height: 103,
  },
  exercise_importance: {
    name: "exercise_importance",
    src: "./assets/images/case_studies/koalako/illustrations/exercise_importance.svg",
    alt: "An illustrated graphic of a scatterplot graph with an arc of the graph highlighted",
    width: 107,
    height: 105,
  },
  exercise_roadmap: {
    name: "exercise_roadmap",
    src: "./assets/images/case_studies/koalako/illustrations/exercise_roadmap.svg",
    alt: "An illustrated graphic of a cupcake, a cake, and a much larger wedding cake",
    width: 142,
    height: 97,
  },
  solution_personal_info: {
    name: "solution_personal_info",
    src: "./assets/images/case_studies/koalako/illustrations/solution_personal_info.svg",
    alt: "An illustrated graphic of a padlock within a shield",
    width: 69,
    height: 77,
  },
  solution_worldly_creativity: {
    name: "solution_worldly_creativity",
    src: "./assets/images/case_studies/koalako/illustrations/solution_worldly_creativity.svg",
    alt: "An illustrated graphic of a globe",
    width: 69,
    height: 70,
  },
  testing_popcorn: {
    name: "testing_popcorn",
    src: "./assets/images/case_studies/koalako/illustrations/testing_popcorn.svg",
    alt: "An illustrated graphic of 3 popcorn kernals exploding outwards",
    width: 211,
    height: 176,
  },
  testing_questions: {
    name: "testing_questions",
    src: "./assets/images/case_studies/koalako/illustrations/testing_questions.svg",
    alt: "An illustrated graphic of two text message speech bubbles",
    width: 169,
    height: 178,
  },
  testing_usability: {
    name: "testing_usability",
    src: "./assets/images/case_studies/koalako/illustrations/testing_usability.svg",
    alt: "An illustrated graphic of a computer screen with a magnifying glass hovering over the cursor",
    width: 176,
    height: 159,
  },
  prototypes_userflow_splash_screen: {
    name: "prototypes_userflow_splash_screen",
    src: "./assets/images/case_studies/koalako/prototypes/prototypes_userflow_splash_screen.png",
    alt: "A screenshot of the onboarding screen of the KoalaKo app, where the user is able to either sign up or log in to the app.",
    width: 1125,
    height: 2436,
    group: 'userflow',
    index: 0,
  },
  prototypes_userflow_statistics: {
    name: "prototypes_userflow_statistics",
    src: "./assets/images/case_studies/koalako/prototypes/prototypes_userflow_statistics.png",
    alt: "A screenshot of the statistics screen of the KoalaKo app, where the user is able to view their play history, statistics, and other data on creative development.",
    width: 1125,
    height: 2436,
    group: 'userflow',
    index: 1,
  },
  prototype_low_activities: {
    name: "prototype_low_activities",
    src: "./assets/images/case_studies/koalako/prototypes/prototype_low_activities.png",
    alt: "A low fidelity prototype of the activities screen of the KoalaKo app, where the user is able to view a list of activities and select one to play.",
    width: 1125,
    height: 2436,
    group:"prototypes_lowfi",
    index: 2,
  },
  prototype_low_homepage: {
    name: "prototype_low_homepage",
    src: "./assets/images/case_studies/koalako/prototypes/prototype_low_homepage.png",
    alt: "A low fidelity prototype of the homepage of the KoalaKo app, where the user is able to view a list of activities, as well as navigate to other parts of the app.",
    width: 1125,
    height: 2436,
    group:"prototypes_lowfi",
    index: 1,
  },
  prototype_low_map: {
    name: "prototype_low_map",
    src: "./assets/images/case_studies/koalako/prototypes/prototype_low_map.png",
    alt: "A low fidelity prototype of the map screen of the KoalaKo app, where the user is able to view a map of their local area and its child friendly locations.",
    width: 1125,
    height: 2436,
    group:"prototypes_lowfi",
    index: 3,
  },
  prototype_low_onboarding: {
    name: "prototype_low_onboarding",
    src: "./assets/images/case_studies/koalako/prototypes/prototype_low_onboarding.png",
    alt: "A low fidelity prototype of the onboarding screen of the KoalaKo app, where the user is able to either sign up or log in to the app.",
    width: 1125,
    height: 2436,
    group:"prototypes_lowfi",
    index: 0,
  },
  prototype_low_statistics: {
    name: "prototype_low_statistics",
    src: "./assets/images/case_studies/koalako/prototypes/prototype_low_statistics.png",
    alt: "A low fidelity prototype of the statistics screen of the KoalaKo app, where the user is able to view their play statistics, and other data on creative development.",
    width: 1125,
    height: 2436,
    group:"prototypes_lowfi",
    index: 4,
  },
  prototypes_userflow_map: {
    name: "prototypes_userflow_map",
    src: "./assets/images/case_studies/koalako/prototypes/prototypes_userflow_map.svg",
    alt: "An illustrated userflow map of the KoalaKo app, showing all the different branching paths a user can take through the app.",
    width: 592,
    height: 310,
  },
  refine_post_activity_after: {
    name: "refine_post_activity_after",
    src: "./assets/images/case_studies/koalako/refine/refine_post_activity_after.png",
    alt: "A refined version of the post-activity screen of the KoalaKo app, where the user is able to rate their experience and leave feedback if they want.",
    width: 942,
    height: 2042,
  },
  refine_post_activity_before: {
    name: "refine_post_activity_before",
    src: "./assets/images/case_studies/koalako/refine/refine_post_activity_before.png",
    alt: "An early, high fidelity version of the post-activity screen of the KoalaKo app, where the user is able to rate their experience and leave feedback. A noticible graphical downgrade from other screens in the app, requiring a redesign.",
    width: 942,
    height: 2039,
  },
  refine_stats_after: {
    name: "refine_stats_after",
    src: "./assets/images/case_studies/koalako/refine/refine_stats_after.png",
    alt: "A refined version of the statistics screen of the KoalaKo app, where the user is able to view their play history, statistics, and other data on creative development. The circular progress bars have been replaced after recieving feedback that the feature was misguided and had poor optics.",
    width: 942,
    height: 1675,
  },
  refine_stats_before: {
    name: "refine_stats_before",
    src: "./assets/images/case_studies/koalako/refine/refine_stats_before.png",
    alt: "An early, high fidelity version of the statistics screen of the KoalaKo app, where the user is able to view their play history, statistics, and other data on creative development. The circular progress bar denoting the users play time recieved valuable feedback, and would be removed.",
    width: 942,
    height: 1675,
  },
  refine_trophies_location: {
    name: "refine_trophies_location",
    src: "./assets/images/case_studies/koalako/refine/refine_trophies_location.png",
    alt: "A screenshot of the KoalaKo app where everything is blocked out except for one icon with an arrow pointing to it to highlight where on the screen the trophies button is located.",
    width: 942,
    height: 1672,
  },
  refine_trophies_page: {
    name: "refine_trophies_page",
    src: "./assets/images/case_studies/koalako/refine/refine_trophies_page.png",
    alt: "The trophies screen of the KoalaKo app, where the user is able to view their awards and achievements.",
    width: 942,
    height: 1672,
  },
  solution_mockup_location: {
    name: "solution_mockup_location",
    src: "./assets/images/case_studies/koalako/solution/solution_mockup_location.png",
    alt: "A high fidelity mockup of the location screen of the KoalaKo app, where the user is able to view a map of their local area and its child friendly locations.",
    width: 942,
    height: 2036,
    group: "solution_mockup_map",
  },
  solution_mockup_map_item: {
    name: "solution_mockup_map_item",
    src: "./assets/images/case_studies/koalako/solution/solution_mockup_map_item.png",
    alt: "A high fidelity mockup of a selected location on the map screen of the KoalaKo app.  Where the user is able to more information about the location, and the activities available there.",
    width: 942,
    height: 2036,
    group: "solution_mockup_map",
  },
  solution_mockup_setup: {
    name: "solution_mockup_setup",
    src: "./assets/images/case_studies/koalako/solution/solution_mockup_setup.png",
    alt: "A high fidelity mockup of the child profile setup screen of the KoalaKo app, which can be skipped if the user doesn't want to track play history, and just wants to use the app for its activity database and location features.",
    width: 942,
    height: 2040,
    group: "solution_mockup_signup",
  },
  solution_mockup_skip_signup: {
    name: "solution_mockup_skip_signup",
    src: "./assets/images/case_studies/koalako/solution/solution_mockup_skip_signup.png",
    alt: "A high fidelity mockup of a user having skipped the child profile setup screen of the KoalaKo app, and is now seeing a message encouraging them to opt-in to tracking their play history, as it enables greater functionality.  Ultimately, this is completely optional.",
    width: 942,
    height: 2040,
    group: "solution_mockup_signup",
  },
}, "koalako");

const KOALAKO_IMG_GROUPS = processGroups(KOALAKO_IMGS);

export { KOALAKO_IMGS, KOALAKO_IMG_GROUPS };
