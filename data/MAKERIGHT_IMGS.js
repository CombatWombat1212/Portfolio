import { processGroups, processImages } from "@/scripts/ProcessImages";

const MAKERIGHT_IMGS = processImages({
  full_potential: {
    name: "full_potential",
    src: "./assets/images/case_studies/makeright/full_potential.svg",
    alt: "3D printer in the shape of a pad lock",
    width: 212.28,
    height: 283,
  },
  barriers_to_entry: {
    name: "barriers_to_entry",
    src: "./assets/images/case_studies/makeright/barriers_to_entry.svg",
    alt: "Gate / barrier with the symbols for knowledge, and money",
    width: 360.84,
    height: 330.02,
  },

  makeright_logo: {
    name: "makeright_logo",
    src: "./assets/images/case_studies/makeright/makeright_logo.svg",
    alt: "The text 'MakeRight' with logo of a 3D printer nozzle",
    width: 889.88,
    height: 162.04,
  },







  pitch_vector_choose: {
    name: "pitch_vector_choose",
    src: "./assets/images/case_studies/makeright/pitch/pitch_vector_choose.svg",
    alt: "A graphic of a 3D model of a boat being clicked on",
    width: 102.24,
    height: 128.4,
  },

  pitch_vector_tweak: {
    name: "pitch_vector_tweak",
    src: "./assets/images/case_studies/makeright/pitch/pitch_vector_tweak.svg",
    alt: "A graphic of a boat with different paint-job options",
    width: 96.56,
    height: 119.75,
  },

  pitch_vector_order: {
    name: "pitch_vector_order",
    src: "./assets/images/case_studies/makeright/pitch/pitch_vector_order.svg",
    alt: "A graphic of a 3D printed boat inside a shopping cart",
    width: 110.73,
    height: 100.59,
  },

  pitch_vector_recieve: {
    name: "pitch_vector_recieve",
    src: "./assets/images/case_studies/makeright/pitch/pitch_vector_recieve.svg",
    alt: "A graphic of a gift-wrapped 3D printed boat on a doorstep",
    width: 96.95,
    height: 117.8,
  },



  pitch_laptop_choose: {
    name: "pitch_laptop_choose",
    src: "./assets/images/case_studies/makeright/pitch/pitch_laptop_choose.png",
    alt: "MakeRight UI screenshot showing a storefront page filled with different 3D models",
    width: 2952,
    height: 1743,
  },

  pitch_laptop_tweak: {
    name: "pitch_laptop_tweak",
    src: "./assets/images/case_studies/makeright/pitch/pitch_laptop_tweak.png",
    alt: "MakeRight UI screenshot showing the ability to customize the scale, color, and material of your 3D printed object",
    width: 2952,
    height: 1743,
  },

  pitch_laptop_order: {
    name: "pitch_laptop_order",
    src: "./assets/images/case_studies/makeright/pitch/pitch_laptop_order.png",
    alt: "MakeRight UI screenshot showing the order ticket page, where a plastic boat has been purchased",
    width: 2952,
    height: 1743,
  },

  pitch_laptop_recieve: {
    name: "pitch_laptop_recieve",
    src: "./assets/images/case_studies/makeright/pitch/pitch_laptop_recieve.png",
    alt: "MakeRight UI screenshot showing a message from your assigned 3D printer - your order is ready and images are attatched to the message to prove it",
    width: 2952,
    height: 1743,
  },




  pitch_laptop_frame: {
    name: "pitch_laptop_frame",
    src: "./assets/images/case_studies/makeright/pitch/pitch_laptop_frame.png",
    alt: "Empty frame of a laptop bordering a screenshot of the MakeRight UI",
    width: 2952,
    height: 1743,
  },




  pitch_mockup_choose: {
    name: "pitch_mockup_choose",
    src: "./assets/images/case_studies/makeright/pitch/pitch_mockup_choose.png",
    alt: "MakeRight UI screenshot showing a storefront page filled with different 3D models",
    width: 2952,
    height: 1743,
  },

  pitch_mockup_tweak: {
    name: "pitch_mockup_tweak",
    src: "./assets/images/case_studies/makeright/pitch/pitch_mockup_tweak.png",
    alt: "MakeRight UI screenshot showing the ability to customize the scale, color, and material of your 3D printed object",
    width: 2952,
    height: 1743,
  },

  pitch_mockup_order: {
    name: "pitch_mockup_order",
    src: "./assets/images/case_studies/makeright/pitch/pitch_mockup_order.png",
    alt: "MakeRight UI screenshot showing the order ticket page, where a plastic boat has been purchased",
    width: 2952,
    height: 1743,
  },

  pitch_mockup_recieve: {
    name: "pitch_mockup_recieve",
    src: "./assets/images/case_studies/makeright/pitch/pitch_mockup_recieve.png",
    alt: "MakeRight UI screenshot showing a message from your assigned 3D printer - your order is ready and images are attatched to the message to prove it",
    width: 2952,
    height: 1743,
  },


























  building_makeright_banner: {
    name: "building_makeright_banner",
    src: "./assets/images/case_studies/makeright/building_makeright_banner.png",
    alt: "Photograph of a lab filled with 3D printers",
    width: 3840,
    height: 1400,
  },

  secondary_research: {
    name: "secondary_research",
    src: "./assets/images/case_studies/makeright/secondary_research.svg",
    alt: "Graphic of a document with charts and a magnifying glass",
    width: 191.61,
    height: 184.39,
  },


  interviews: {
    name: "interviews",
    src: "./assets/images/case_studies/makeright/interviews.svg",
    alt: "Graphic of two people sitting at a table",
    width: 199.66,
    height: 182.73,
  },

  aha_moment: {
    name: "aha_moment",
    src: "./assets/images/case_studies/makeright/aha_moment.svg",
    alt: "Stylized graphic of a lightbulb",
    width: 206.75,
    height: 209.42,
  },

  brainstorming: {
    name: "brainstorming",
    src: "./assets/images/case_studies/makeright/brainstorming.svg",
    alt: "Graphic of a brain with a lightning bolt to represent brainstorming",
    width: 147.7,
    height: 193.83,
  },
  refine_ideas: {
    name: "refine_ideas",
    src: "./assets/images/case_studies/makeright/refine_ideas.svg",
    alt: "Graphic of a lightbulb in a funnel to represent refining ideas",
    width: 101.37,
    height: 197.83,
  },
  focus_group_testing: {
    name: "focus_group_testing",
    src: "./assets/images/case_studies/makeright/focus_group_testing.svg",
    alt: "Graphic of 3 people under a magnifying glass to represent focus group testing",
    width: 169.33,
    height: 171.65,
  },
  brainstorming_chart: {
    name: "brainstorming_chart",
    src: "./assets/images/case_studies/makeright/brainstorming_chart.svg",
    alt: "Simplified version of a brainstorming mind map",
    width: 230.48,
    height: 252.89,
  },

  brainstorming_chart_full: {
    name: "brainstorming_chart_full",
    title: "Cost and Difficulty of 3D Printing Mindmap",
    src: "./assets/images/case_studies/makeright/brainstorming_chart_full.svg",
    alt: "A large-scale mindmap surrounding the cost and difficulty of 3D printing",
    width: 1445.2,
    height: 1210,
  },

  brainstorming_chart_full_background: {
    name: "brainstorming_chart_full_background",
    title: "Cost and Difficulty of 3D Printing Mindmap",
    src: "./assets/images/case_studies/makeright/brainstorming_chart_full_background.svg",
    alt: "A large-scale mindmap surrounding the cost and difficulty of 3D printing with an opaque background",
    width: 3920,
    height: 3395,
  },



  // TODO: its not actually a system map its a journey map
  journey_map: {
    name: "journey_map",
    src: "./assets/images/case_studies/makeright/journey_map.svg",
    alt: "Journey map of the MakeRight platform",
    width: 1045.55,
    height: 430.16,
  },

  maker_journey_low_fi: {
    name: "maker_journey_low_fi",
    src: "./assets/images/case_studies/makeright/maker_journey_low_fi.png",
    alt: "A hand drawn sketch of a 3D printer nozzle",
    width: 974,
    height: 1130,
  },

  customer_journey_low_fi: {
    name: "customer_journey_low_fi",
    src: "./assets/images/case_studies/makeright/customer_journey_low_fi.png",
    alt: "A hand drawn sketch of a shopping bag",
    width: 978,
    height: 960,
  },

  maker_journey_high_fi: {
    name: "maker_journey_high_fi",
    src: "./assets/images/case_studies/makeright/maker_journey_high_fi.svg",
    alt: "A graphic of a 3D printer nozzle",
    width: 95.56,
    height: 105.54,
  },

  customer_journey_high_fi: {
    name: "customer_journey_high_fi",
    src: "./assets/images/case_studies/makeright/customer_journey_high_fi.svg",
    alt: "A graphic of a shopping bag",
    width: 93.59,
    height: 90.66,
  },

  // TODO: these pages don't represent checkout, they show the store page listing

  iterations_checkout_low_fi: {
    name: "iterations_checkout_low_fi",
    src: "./assets/images/case_studies/makeright/prototypes/iterations_checkout_low_fi.png",
    alt: "A low fidelity prototype of the checkout page",
    width: 2139,
    height: 1305,
    group: "iterations_checkout",
  },

  iterations_checkout_high_fi: {
    name: "iterations_checkout_high_fi",
    src: "./assets/images/case_studies/makeright/prototypes/iterations_checkout_high_fi.png",
    alt: "A high fidelity prototype of the checkout page",
    width: 2139,
    height: 1305,
    group: "iterations_checkout",
  },

  iterations_file_checking_low_fi: {
    name: "iterations_file_checking_low_fi",
    src: "./assets/images/case_studies/makeright/prototypes/iterations_file_checking_low_fi.png",
    alt: "A low fidelity prototype of the file checking page",
    width: 2139,
    height: 1305,
    group: "iterations_file_checking",
  },

  iterations_file_checking_high_fi: {
    name: "iterations_file_checking_high_fi",
    src: "./assets/images/case_studies/makeright/prototypes/iterations_file_checking_high_fi.png",
    alt: "A high fidelity prototype of the file checking page",
    width: 2139,
    height: 1305,
    group: "iterations_file_checking",
  },

  feedback_overview_before: {
    name: "feedback_overview_before",
    src: "./assets/images/case_studies/makeright/prototypes/feedback_overview_before.png",
    alt: "A condensed stack of images that show the original version of the MakeRight Manufacturer Overview page",
    width: 2084,
    height: 1283,
    group: "feedback_overview",
  },

  feedback_overview_after: {
    name: "feedback_overview_after",
    src: "./assets/images/case_studies/makeright/prototypes/feedback_overview_after.png",
    alt: "A snippet of a single scrolling page, the final version of the MakeRight Manufacturer Overview",
    width: 2084,
    height: 1283,
    lightboxImg: "feedback_overview_after_full",
    // group: "feedback_overview",
  },

  feedback_overview_after_full: {
    name: "feedback_overview_after_full",
    src: "./assets/images/case_studies/makeright/prototypes/feedback_overview_after_full.png",
    alt: "The full MakeRight Manufacturer Overview page",
    width: 3840,
    height: 19480,
    group: "feedback_overview",
    zoom: true,
  },

  feedback_printers_before: {
    name: "feedback_printers_before",
    src: "./assets/images/case_studies/makeright/prototypes/feedback_printers_before.png",
    alt: "An older version of the UI for inputting a manufacturer's 3D printer during signup",
    width: 2084,
    height: 1065,
    group: "feedback_printers",
  },

  feedback_printers_after: {
    name: "feedback_printers_after",
    src: "./assets/images/case_studies/makeright/prototypes/feedback_printers_after.png",
    alt: "Updated UI for inputting a manufacturer's 3D printer during signup",
    width: 2084,
    height: 1065,
    group: "feedback_printers",
  },

  feedback_filament_before: {
    name: "feedback_filament_before",
    src: "./assets/images/case_studies/makeright/prototypes/feedback_filament_before.png",
    alt: "An early version of the UI for inputting a manufacturer's filament during signup",
    width: 2084,
    height: 1149,
    group: "feedback_filament",
  },

  feedback_filament_after: {
    name: "feedback_filament_after",
    src: "./assets/images/case_studies/makeright/prototypes/feedback_filament_after.png",
    alt: "Updated UI for inputting a manufacturer's filament during signup",
    width: 2084,
    height: 1149,
    group: "feedback_filament",
  },

  feedback_tutorials: {
    name: "feedback_tutorials",
    src: "./assets/images/case_studies/makeright/prototypes/feedback_tutorial_system.png",
    alt: "A screenshot of the Tutorial tooltips that were added throughout the manufacturer testing process",
    width: 4568,
    height: 1568,
  },

  delivered_project_banner: {
    name: "delivered_project_banner",
    src: "./assets/images/case_studies/makeright/delivered_project_banner.png",
    alt: "A rendering of a 3D printed elephant, sitting in a cardboard box, with a MakeRight logo on the side, on a table",
    width: 1920,
    height: 500,
  },

  connecting_consumers: {
    name: "connecting_consumers",
    src: "./assets/images/case_studies/makeright/connecting_consumers.svg",
    alt: "A graphic representing connecting consumers to manufacturers",
    width: 224.16,
    height: 177.14,
  },

  browseable_storefront: {
    name: "browseable_storefront",
    src: "./assets/images/case_studies/makeright/browseable_storefront.svg",
    alt: "A graphic of a storefront",
    width: 175.72,
    height: 166.84,
  },

  maker_profit: {
    name: "maker_profit",
    src: "./assets/images/case_studies/makeright/maker_profit.svg",
    alt: "A graphic of money being 3D printed to represent maker profit",
    width: 158.88,
    height: 178.89,
  },

  closing_banner: {
    name: "closing_banner",
    src: "./assets/images/case_studies/makeright/makeright_closing_banner.png",
    alt: "A 3D rendering of the word 'MakeRight' in 3D printed letters",
    width: 1920,
    height: 650,
  },


  maker_screen_01: {
    name: "maker_screen_01",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_01.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Getting started",
    title: "Login",
    phase: "1/3",
    description: ["Ideally we will have a welcoming and informative homepage, however, this was not within the project scope. Therefore each user journey begins at Login."],
    actions: ["Click log-in or signup"],
    notes: [],
    alt: "A login screen for the MakeRight platform.",
  },

  maker_screen_02: {
    name: "maker_screen_02",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_02.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Getting started",
    title: "Create account",
    phase: "2/3",
    description: ["Choose between the two user types, customer and maker."],
    actions: ["Fill out the provided forms and continue on."],
    notes: ["‘What is a maker?’ text links them to an overview page on being a maker (mocked-up for the project, but is not in this case study)."],
    alt: "A screen to create a new account on MakeRight, with options to choose between being a customer or a maker.",
  },

  maker_screen_03: {
    name: "maker_screen_03",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_03.png",
    width: 3840,
    height: 3134,
    group: "makeright_maker_final",
    section: "Getting started",
    title: "Onboarding overview",
    phase: "3/3",
    description: ["Communicate the steps of the onboarding process, and ensure users read the maker Overview page."],
    actions: ["Click ‘View Overview’ to read the maker overview, then click the checkbox to verify that they have done so before moving forward."],
    notes: ["The maker overview explains critical information about the rules and responsibilities of a maker. Like a ‘Terms of Service’ but more visual, and actually helpful."],
    // TODO: "(include a tooltip on words like maker overview that explains what it is)"
    alt: "An onboarding overview screen which links to a page that explains the process and rules for being a maker on MakeRight, with a checkbox to confirm the user has read it.",
  },

  maker_screen_04: {
    name: "maker_screen_04",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_04.png",
    width: 3840,
    height: 6818,
    group: "makeright_maker_final",
    section: "Account setup",
    title: "Account setup",
    phase: "1/1",
    description: ["Collect personal details for the user’s account, banking information to pay them for their work, and their weekly availability to determine when they will receive new orders."],
    actions: ["Fill out the provided forms and continue on."],
    notes: ["Weekly availability UI has been filled to demonstrate the function of the section."],
    alt: "A screen for makers to set up their account, including personal details, banking information, and weekly availability.",
  },

  maker_screen_05: {
    name: "maker_screen_05",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_05.png",
    width: 3840,
    height: 6198,
    group: "makeright_maker_final",
    section: "Verification",
    title: "Verify self & equipment",
    phase: "1/3",
    description: ["Submit proof of ownership for their equipment and supplies. This ensures that no one is able to sign up under dishonest pretenses."],
    actions: ["Submit images of valid photo id, and verification images of their printer(s), available filament(s), and any relevant additional equipment."],
    notes: ["These details allow us to assign Makers based on the requirements of a job. This gives customers the ability to select the quality of machine, the print material and colour, and other printer features required to print certain forms."],
    alt: "A verification screen for makers to submit proof of ownership for their equipment and supplies.",
  },

  maker_screen_06: {
    name: "maker_screen_06",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_06.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Verification",
    title: "Verify email",
    phase: "2/3",
    description: ["Ensure that users have verified their email."],
    actions: ["Check their email for a verification code, resend the email if necessary, enter the code and begin the test."],
    notes: ["Users need to verify their email to receive the results of the onboarding process. Therefore, this step is a brief yet necessary interruption to avoid upset Makers who weren’t able to receive their test results."],
    alt: "A screen to verify the user's email address.",
  },

  maker_screen_07: {
    name: "maker_screen_07",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_07.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Verification",
    title: "Email verified",
    phase: "3/3",
    description: ["Brief user feedback screen before moving forward."],
    actions: [],
    notes: [],
    alt: "A brief feedback screen to confirm the user's email has been verified.",
  },

  maker_screen_08: {
    name: "maker_screen_08",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_08.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Maker test start",
    title: "Test start",
    phase: "1/3",
    description: ["A reminder of what will be expected, alongside the first instruction of the test."],
    actions: ["Click the ‘Orders’ button in the navbar."],
    notes: ["The following test teaches users the order completion process by walking them through a mock order. The resulting printed object is then reviewed to gauge the user’s 3D printing skills. Thereby feeding 2 birds with 1 seed."],
    alt: "A reminder screen for makers to begin the MakeRight test, with the first instruction to click the 'Orders' button.",
  },

  maker_screen_09: {
    name: "maker_screen_09",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_09.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Maker test start",
    title: "Orders (awaiting acceptance)",
    phase: "2/3",
    description: ["A complete list of their past and present job orders."],
    // actions: ["Click through the provided tutorials, Select ‘Order Details’"],
    actions: ["Select ‘Order Details’"],
    notes: ["Users are reminded with the heading in the top left of the screen that all of the following process is a part of the test. The maker test also includes an ‘Info Mode’ mentioned in the top left to provide optional tutorials throughout the process."],
    // TODO: (Include a way to disable or enable tutorials with a toggle)
    alt: "A screen showing a list of past and present job orders for makers.",
  },

  maker_screen_10: {
    name: "maker_screen_10",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_10.png",
    width: 3840,
    height: 6600,
    group: "makeright_maker_final",
    section: "Maker test start",
    title: "Order details",
    phase: "3/3",
    description: ["Provide the details of particular job order: the user’s chosen specifications, object info, a preview of the model, order timeline, and additional comments left by your customer."],
    // actions: ["Click through the provided tutorials, and accept or reject their incoming order."],
    actions: ["Accept or reject their incoming order."],
    notes: ["Users can accept the order at any time, however, once accepted they have 24hrs to complete the vetting process. This allows for some flexibility as to when to begin the practical test. In a real order, they would have 2hrs to accept or reject a new job."],
    alt: "A screen providing the details of a particular job order, with options to accept or reject it.",
  },

  maker_screen_11: {
    name: "maker_screen_11",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_11.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "File vetting",
    title: "Orders (awaiting vetting)",
    phase: "1/2",
    description: ["Preview the deadline to vet the file, and click the button to perform the next step of the process."],
    actions: [],
    notes: [],
    alt: "A screen showing the deadline for vetting a file for print and the option to perform the next step.",
  },

  maker_screen_12: {
    name: "maker_screen_12",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_12.png",
    width: 3840,
    height: 4518,
    group: "makeright_maker_final",
    section: "File vetting",
    title: "File vetting",
    phase: "2/2",
    description: ["Allow the user to download the file, and check to ensure that it is able to be printed via slicing software. This ensures makers are never expected to print a file that cannot be printed, and that they never have to modify models."],
    // actions: ["Click through the optional tutorials", "Review the steps and guidelines if needed, download the attached file, open it in their slicing software, and assess", "Select the result of their vetting process, and submit."],
    actions: ["Review the steps and guidelines if needed, download the attached file, open it in their slicing software, and assess", "Select the result of their vetting process, and submit."],
    notes: [],
    alt: "A screen for makers to download and vet a file to ensure it can be printed, with optional tutorials.",
  },

  maker_screen_13: {
    name: "maker_screen_13",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_13.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Submit print",
    title: "Orders (ready to submit)",
    phase: "1/2",
    description: ["Time to begin printing when ready. The maker already downloaded the file during the vetting stage, and prepared it in slicing software. Meaning, they will be ready to get started with the print as soon as they can."],
    actions: ["Complete the order print, return to this page, and click ‘Submit Print’"],
    notes: [],
    alt: "A screen showing that it is time to begin printing a job order when the maker is ready.",
  },

  maker_screen_14: {
    name: "maker_screen_14",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_14.png",
    width: 3840,
    height: 4538,
    group: "makeright_maker_final",
    section: "Submit print",
    title: "Print verification",
    phase: "2/2",
    description: ["Submit 4 images of the printed object to the customer. This gives the customer peace of mind that the print was totally successful, or the opportunity to intervene and request a reprint if something looks wrong."],
    actions: ["Capture and submit each required image, and click ‘Submit’."],
    notes: [],
    alt: "A screen for makers to submit 4 images of the printed object for customer verification.",
  },

  maker_screen_15: {
    name: "maker_screen_15",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_15.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Job/Test complete",
    title: "Orders (print submitted)",
    phase: "1/3",
    description: ["Remind the maker that their order has been submitted, and it’s time to wait for the customer’s response. Ensuring the customer is satisfied and won't be surprised by the product that arrives on their doorstep."],
    actions: ["Wait for the customer’s approval, prepare to ship the object if they want to, and view their submission if they want to double-check what they’ve delivered. "],
    notes: [],
    alt: "A reminder screen for makers that their job order has been submitted and they should wait for customer approval.",
  },

  maker_screen_16: {
    name: "maker_screen_16",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_16.png",
    width: 3840,
    height: 2160,
    group: "makeright_maker_final",
    section: "Job/Test complete",
    title: "Orders (job completed)",
    phase: "2/3",
    description: ["A completed job ticket. In the case of the maker test, they are about to review their results, marking the end of the process."],
    actions: ["Click ‘View Feedback’ to review the results of their test. Outside of the test, this would allow them to see whether or not the user has verified their print. If they did, it would then be time to mail the object."],
    notes: ["If they’ve passed, all that’s left is to complete a short video call, much like an uber driver’s last onboarding step would be an in-person inspection of themselves and their vehicle."],
    alt: "A completed job ticket for makers to review their results, with an option to view feedback.",
  },

  maker_screen_17: {
    name: "maker_screen_17",
    src: "./assets/images/case_studies/makeright/final_screens/maker/no_tutorials/maker_screen_17.png",
    width: 3840,
    height: 5270,
    group: "makeright_maker_final",
    section: "Job/Test complete",
    title: "Customer feedback",
    phase: "3/3",
    description: ["Allows the maker to review the customer’s response to their submitted images.  They can see the rating and feedback provided by the customer, much like an uber driver receives a rating after a job.", "If the customer accepts and verifies the images then it’s time to mail the object.", "If they reject the object, they may have to reprint and correct their mistake.", "In the case of the maker test, this page shows their results.  If they’ve passed, all that’s left is to complete a short video call, much like an uber driver’s last onboarding step would be an in-person inspection of themselves and their vehicle."],
    actions: [],
    alt: "A screen for makers to review customer feedback on their completed job order, including rating and feedback, and instructions for next steps.",
  },

  customer_screen_01: {
    name: "customer_screen_01",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_01.png",
    width: 3840,
    height: 2160,
    group: "makeright_customer_final",
    section: "Getting Started",
    title: "Login",
    phase: "1/2",
    description: ["Ideally we will have a welcoming and informative homepage, however, this was not within the project scope. Therefore each user journey begins at Login."],
    actions: ["Click log-in or signup"],
    alt: "Login page for MakeRight, where users can click the login or sign-up button.",
  },
  customer_screen_02: {
    name: "customer_screen_02",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_02.png",
    width: 3840,
    height: 2160,
    group: "makeright_customer_final",
    section: "Getting Started",
    title: "Create account",
    phase: "2/2",
    description: ["Choose between the two user types, customer and maker."],
    notes: ["‘What is a maker?’ text links them to an overview page on being a maker (mocked-up for the project, but is not in this case study)."],
    actions: [],
    alt: "Selection screen for users to choose between creating a customer or maker account.",
  },
  customer_screen_03: {
    name: "customer_screen_03",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_03.png",
    width: 3840,
    height: 4992,
    group: "makeright_customer_final",
    section: "Account setup",
    title: "Account setup",
    phase: "1/3",
    description: ["Gather the necessary info for a new customer account."],
    notes: [],
    actions: [],
    alt: "Account setup page for MakeRight, where new customers can input their information to create a new account.",
  },
  customer_screen_04: {
    name: "customer_screen_04",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_04.png",
    width: 3840,
    height: 2736,
    group: "makeright_customer_final",
    section: "Account setup",
    title: "Select Interests",
    phase: "2/3",
    description: ["The target demographic is users who wouldn’t normally use 3D printing to solve their issues.  So, to help them explore the possibilities of the technology, we encourage users to select some personal interests.  We then use that info to create a storefront page tailored to their hobbies."],
    actions: ["Select 3 or more topics, or skip this optional page."],
    notes: [],
    alt: "Select Interests page for MakeRight, where customers can optionally select their interests to personalize their storefront page.",
  },
  customer_screen_05: {
    name: "customer_screen_05",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_05.png",
    width: 3840,
    height: 2160,
    group: "makeright_customer_final",
    section: "Account setup",
    title: "Verify Email",
    phase: "3/3",
    description: ["Verify the email of the new customer account."],
    actions: ["Check their email for a verification code, resend the email if necessary, enter the code and move on. Or skip for now (purchasing is not possible until account is verified)."],
    notes: [],
    alt: "Email verification page for MakeRight, where new customers can verify their email address to activate their account.",
  },

  customer_screen_06: {
    name: "customer_screen_06",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_06.png",
    width: 3840,
    height: 7016,
    group: "makeright_customer_final",
    section: "Browsing",
    title: "Storefront",
    phase: "1/2",
    description: ["Acts essentially as the homepage for customers.  Encourages a new window-shopping approach to 3D printing for consumers, and enables them to explore the possibilities of the technology."],
    actions: ["Browse and select items."],
    alt: "Storefront page for MakeRight, where customers can browse through available items.",
  },
  customer_screen_07: {
    name: "customer_screen_07",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_07.png",
    width: 3840,
    height: 5030,
    group: "makeright_customer_final",
    section: "Browsing",
    title: "Item listing",
    phase: "2/2",
    description: ["The full details of a selected item from the store.  Including an interactive 3D model, images of past prints, and comments from other customers."],
    actions: ["Customize the model’s scale, color, material, and print quality. While simultaneously previewing these changes, and their impact on cost. Customers can then purchase the item and proceed to checkout."],
    alt: "Item listing page for MakeRight, where customers can view detailed information about the selected item, including an interactive 3D model, images of past prints, and comments from other customers.",
  },

  customer_screen_08: {
    name: "customer_screen_08",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_08.png",
    width: 3840,
    height: 4042,
    group: "makeright_customer_final",
    section: "Purchasing",
    title: "Checkout",
    phase: "1/2",
    description: ["Checkout screen from which customers complete their purchase."],
    actions: ["Customize the model further, add additional comments to the order ticket, and customize the 2 separate timeline options; shipping speed, and production speed.  Where production speed changes the priority and deadline of the order for the assigned maker, for an added fee."],
    alt: "Checkout page for MakeRight, where customers can customize their order and finalize their purchase.",
  },

  customer_screen_09: {
    name: "customer_screen_09",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_09.png",
    width: 3840,
    height: 4688,
    group: "makeright_customer_final",
    section: "Purchasing",
    title: "Checkout (edit order)",
    phase: "1/2",
    description: ["Checkout screen from which customers complete their purchase."],
    actions: ["Customize the model further, add additional comments to the order ticket, and customize the 2 separate timeline options; shipping speed, and production speed.  Where production speed changes the priority and deadline of the order for the assigned maker, for an added fee."],
    alt: "Expanded Checkout page for MakeRight, where customers can make final changes to their order, add comments, and adjust timeline options for an added fee.",
  },

  customer_screen_10: {
    name: "customer_screen_10",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_10.png",
    width: 3840,
    height: 3248,
    group: "makeright_customer_final",
    section: "Purchasing",
    title: "Order placed",
    phase: "2/2",
    description: ["Confirmation screen denoting that the order has been placed successfully, and is now pending assignment to one of our makers."],
    actions: ["Continue browsing, or view your active orders."],
    alt: "Order placed confirmation page for MakeRight, where customers are notified that their order has been successfully placed and is pending assignment to a maker.",
  },

  customer_screen_11: {
    name: "customer_screen_11",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_11.png",
    width: 3840,
    height: 2160,
    group: "makeright_customer_final",
    section: "Order in-progress",
    title: "My Orders (pending)",
    phase: "1/2",
    description: ["The page where users can view the full list of their ongoing and past orders."],
    actions: ["Interact with any of their order tickets."],
    alt: "My Orders page for MakeRight, where customers can view the full list of their ongoing and past orders.",
  },
  customer_screen_12: {
    name: "customer_screen_12",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_12.png",
    width: 3840,
    height: 3054,
    group: "makeright_customer_final",
    section: "Order in-progress",
    title: "My Orders (accepted/vetting)",
    phase: "2/2",
    description: ["A customer’s 'My Orders' page when their ticket has been accepted by a Maker.  At this stage, the Maker is currently assessing whether or not the ordered file is ready to be printed."],
    actions: ["Click on the ticket to visit the order ticket page if they want more info."],
    alt: "Accepted/Vetting Order Ticket page for MakeRight, where customers can view the status of their order ticket when it has been accepted by a Maker and is currently being assessed.",
  },
  customer_screen_13: {
    name: "customer_screen_13",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_13.png",
    width: 3840,
    height: 4504,
    group: "makeright_customer_final",
    section: "Order in-progress",
    title: "Order ticket (accepted/vetting)",
    phase: "2/2",
    description: ["The expanded view of an order ticket, i.e. the ticket’s dedicated page.  Identical to the previous screen, this shows the appearance of an order ticket that has just been accepted by a Maker if the user were to click on it from the previous My Order’s screen."],
    actions: ["Users can cancel the order, request changes (for a fee), communicate with their maker, and view details on their maker and the order."],
    alt: "Expanded Order Ticket page for MakeRight, where customers can manage their order details, communicate with their Maker, and request changes.",
  },
  customer_screen_14: {
    name: "customer_screen_14",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_14.png",
    width: 3840,
    height: 3762,
    group: "makeright_customer_final",
    section: "Print completed",
    title: "My Orders (print completed)",
    phase: "1/4",
    description: ["Once the print has been completed, the Maker submits verification images to the customer.  This ensures that the customer is never surprised with the product that arrives at their front door, and can intervene if something appears off before shipping."],
    actions: ["Check through the photos, refer to the attached guide for a list of common issues, and click the appropriate response option."],
    alt: "Print verification page for MakeRight, where customers can check the verification images submitted by the Maker to ensure that the product matches their order specifications.",
  },

  customer_screen_15: {
    name: "customer_screen_15",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_15.png",
    width: 3840,
    height: 3762,
    group: "makeright_customer_final",
    section: "Print completed",
    title: "My Orders (verifying print)",
    phase: "1/4",
    description: ["Once the print has been completed, the Maker submits verification images to the customer.  This ensures that the customer is never surprised with the product that arrives at their front door, and can intervene if something appears off before shipping."],
    actions: ["Check through the photos, refer to the attached guide for a list of common issues, and click the appropriate response option."],
    alt: "Print verification page for MakeRight, with additional guide on what to look for.",
  },

  customer_screen_16: {
    name: "customer_screen_16",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_16.png",
    width: 3840,
    height: 4576,
    group: "makeright_customer_final",
    section: "Print completed",
    title: "My Orders (verifying print, expanded)",
    phase: "1/4",
    description: ["Once the print has been completed, the Maker submits verification images to the customer.  This ensures that the customer is never surprised with the product that arrives at their front door, and can intervene if something appears off before shipping."],
    actions: ["Check through the photos, refer to the attached guide for a list of common issues, and click the appropriate response option."],
    alt: "Expanded Print verification page for MakeRight, where customers can see a detailed guide on what to look for when verifying their print.",
  },

  customer_screen_17: {
    name: "customer_screen_17",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_17.png",
    width: 3840,
    height: 7340,
    group: "makeright_customer_final",
    section: "Print completed",
    title: "Order ticket (print verified)",
    phase: "2/4",
    description: ["Here the customer has approved of the print, and is now waiting for the maker to respond with the shipping details."],
    actions: [],
    alt: "Print verified confirmation page for MakeRight, where customers are notified that their print has been approved and are waiting for shipping details.",
  },

  customer_screen_18: {
    name: "customer_screen_18",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_18.png",
    width: 3840,
    height: 2662,
    group: "makeright_customer_final",
    section: "Print completed",
    title: "My Orders (shipped)",
    phase: "3/4",
    description: ["With the item approved by the customer, the Maker has now packaged and shipped the item, and provided the customer with the necessary tracking info."],
    actions: [],
    alt: "Shipped confirmation page for MakeRight, where customers are notified that their item has been packaged and shipped, and provided with the necessary tracking information.",
  },

  customer_screen_19: {
    name: "customer_screen_19",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_19.png",
    width: 3840,
    height: 7750,
    group: "makeright_customer_final",
    section: "Print completed",
    title: "Order ticket (shipped)",
    phase: "3/4",
    description: ["With the item approved by the customer, the Maker has now packaged and shipped the item, and provided the customer with the necessary tracking info."],
    actions: [],
    alt: "Shipped confirmation page for MakeRight, with additional information.",
  },

  customer_screen_20: {
    name: "customer_screen_20",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_20.png",
    width: 3840,
    height: 3474,
    group: "makeright_customer_final",
    section: "Print completed",
    title: "My Orders (delivered)",
    phase: "4/4",
    description: ["Once it has been confirmed that the package arrived to the customer, they have the opportunity to rate the Maker and provide feedback.  Otherwise, the ordering process is complete and the customer can enjoy their product."],
    actions: [],
    alt: "Order delivered confirmation page for MakeRight, where customers are given the opportunity to rate their Maker and provide feedback.",
  },

  customer_screen_21: {
    name: "customer_screen_21",
    src: "./assets/images/case_studies/makeright/final_screens/customer/customer_screen_21.png",
    width: 3840,
    height: 9206,
    group: "makeright_customer_final",
    section: "Print completed",
    title: "Order ticket (delivered)",
    phase: "4/4",
    description: ["Once it has been confirmed that the package arrived to the customer, they have the opportunity to rate the Maker and provide feedback.  Otherwise, the ordering process is complete and the customer can enjoy their product."],
    actions: [],
    alt: "Order ticket delivered confirmation page for MakeRight, where customers are given the opportunity to rate their Maker and provide feedback.",
  },
}, "makeright");


const MAKERIGHT_IMG_GROUPS = processGroups(MAKERIGHT_IMGS);

// const MAKERIGHT_IMG_GROUPS = {};



// // function to check for overlapping indexes within a group
// function checkForOverlappingIndexes(group, index, name) {
//   const currentGroup = MAKERIGHT_IMG_GROUPS[group].imgs;
//   for (let i = 0; i < currentGroup.length; i++) {
//     if (currentGroup[i].index === index) {
//       throw new Error(`Overlapping indexes within group "${group}": ${currentGroup[i].name} and ${name}`);
//     }
//   }
// }


// // function to add sections to a group
// function addSectionsToGroup(group) {
//   // Check if all images in the group have a section
//   const allHaveSection = MAKERIGHT_IMG_GROUPS[group].imgs.every((img) => {
//     return img.section !== undefined;
//   });

//   if (allHaveSection) {
//     // Add sections to the group
//     const sections = [];
//     MAKERIGHT_IMG_GROUPS[group].imgs.forEach((img, index) => {
//       const sectionName = img.section;
//       if (sectionName && !sections.some((section) => section.name === sectionName)) {
//         const sectionStart = index;
//         let sectionEnd = index;
//         // find the end index of the current section
//         for (let i = index + 1; i < MAKERIGHT_IMG_GROUPS[group].imgs.length; i++) {
//           if (MAKERIGHT_IMG_GROUPS[group].imgs[i].section === sectionName) {
//             sectionEnd = i;
//           } else {
//             break;
//           }
//         }
//         sections.push({
//           name: sectionName,
//           start: sectionStart,
//           end: sectionEnd
//         });
//       }
//     });
//     MAKERIGHT_IMG_GROUPS[group].sections = sections;
//   }
// }


// // function to update group properties
// function updateGroupProperties(group, img) {
//   MAKERIGHT_IMG_GROUPS[group].imgs.push(img);
//   MAKERIGHT_IMG_GROUPS[group].height.min = Math.min(MAKERIGHT_IMG_GROUPS[group].height.min, img.height);
//   MAKERIGHT_IMG_GROUPS[group].height.max = Math.max(MAKERIGHT_IMG_GROUPS[group].height.max, img.height);
//   MAKERIGHT_IMG_GROUPS[group].height.constant = MAKERIGHT_IMG_GROUPS[group].height.constant && img.height === MAKERIGHT_IMG_GROUPS[group].height.min;
//   MAKERIGHT_IMG_GROUPS[group].width.min = Math.min(MAKERIGHT_IMG_GROUPS[group].width.min, img.width);
//   MAKERIGHT_IMG_GROUPS[group].width.max = Math.max(MAKERIGHT_IMG_GROUPS[group].width.max, img.width);
//   MAKERIGHT_IMG_GROUPS[group].width.constant = MAKERIGHT_IMG_GROUPS[group].width.constant && img.width === MAKERIGHT_IMG_GROUPS[group].width.min;

//   addSectionsToGroup(group);

//   MAKERIGHT_IMG_GROUPS[group].imgs.sort((a, b) => {
//     return a.index - b.index;
//   });
// }







// // function to process each image in the object
// function processImage(key) {
//   if (MAKERIGHT_IMGS[key].group) {
//     if (!MAKERIGHT_IMG_GROUPS[MAKERIGHT_IMGS[key].group]) {
//       MAKERIGHT_IMG_GROUPS[MAKERIGHT_IMGS[key].group] = {
//         name: MAKERIGHT_IMGS[key].group,
//         imgs: [],
//         height: {
//           min: Infinity,
//           max: -Infinity,
//           constant: true
//         },
//         width: {
//           min: Infinity,
//           max: -Infinity,
//           constant: true
//         }
//       };
//     }
//     let index = MAKERIGHT_IMGS[key].index;
//     if (typeof index === "undefined") {
//       index = MAKERIGHT_IMG_GROUPS[MAKERIGHT_IMGS[key].group].imgs.length;
//     } else {
//       checkForOverlappingIndexes(MAKERIGHT_IMGS[key].group, index, MAKERIGHT_IMGS[key].name);
//     }
//     MAKERIGHT_IMGS[key].index = index;
//     updateGroupProperties(MAKERIGHT_IMGS[key].group, MAKERIGHT_IMGS[key]);
//   }
// }

// Object.keys(MAKERIGHT_IMGS).forEach(processImage);



export default MAKERIGHT_IMGS;
export { MAKERIGHT_IMG_GROUPS };
