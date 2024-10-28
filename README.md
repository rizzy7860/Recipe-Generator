# ResCulina - Recipe Generator

ResCulina is a responsive recipe generator developed for the technical audition at Payroc. It allows users to discover recipes based on the ingredients they have on hand, addressing the common question:

> What can I cook with what I have?

This app leverages TheMealDB API to provide recipe data and deliver relevant cooking options.

## Section 1 - Requirements Analysis

The context revolves around a scenario where a host, preparing a meal for friends with limited access to ingredients, needs to create a meal solely from what is on hand. This inspired the idea to build an application that enables users to search for recipes using available ingredients. The application utilizes a REST API (TheMealDB) provided in the scenario for recipe querying.

My approach to development began with an analysis of the requirements, the language used, the available API endpoints, and the API limitations. The requirements highlighted the need to filter recipes by various parameters: ingredients, quantity, cooking time, number of ingredients, and meal type. These parameters shaped my development strategy and guided the app's functionality. Upon examining TheMealDB REST API, I identified several challenges:

1. **Limited endpoints**: Access to data is restricted by premium and non-premium endpoints.

1. **Lack of multi-query support**: The API does not support filtering by multiple parameters (e.g., cuisine and category) simultaneously.

1. **No cooking time data**: Cooking time is not available as static data, requiring a text parsing algorithm from the instructions in order to estimate the cooking time.

1. **Ingredient-quantity pairing**: Ingredients and quantities are in separate lists, requiring a pairing algorithm.

1.** Single ingredient search limitation**: Multi-ingredient search is a premium feature, limiting the UI options.

These API constraints informed the direction of the UI design and interaction structure, as outlined below.

## Section 2 - UI Mockup & User Experience (UX) Considerations

For the user interface, I relied on my design experience and intuition to create a layout that balances simplicity with functionality. The initial concept envisions ResCulina as a web app where users can explore recipes, learn about ingredient properties, and generate custom recipes in an accessible portal.

![Rough Mockup of ResCulina](https://i.ibb.co/DbqyCXt/mockup.png)

Given the scope of this audition, I prioritised a streamlined user experience, reducing the complexity of options to essential features. The approach I went for was to:

1. **Ingredient-based search**: Allow users to search recipes by a primary ingredient (a supported endpoint). An autocomplete suggestion box helps ensure the input matches the API’s ingredient list for accurate results.

1. **Recipe preview card**: Display a snapshot of available recipes based on the chosen ingredient, providing key data such as cuisine and category.

1. **Two-panel layout**: Use a left-side search and right-side display structure to maintain user context, present data intuitively, and enable easy adjustments.

This layout style anchors the user experience in always-visible context, ensuring a seamless flow from ingredient selection to recipe viewing, ultimately providing an intuitive and dynamic search experience.

## Section 3- Technology Stack

1. **Next.js**: Chosen for its robust framework features, Next.js provides an optimal development experience for building high-performance React applications. It allows server-side rendering (SSR) and static site generation (SSG), which improves initial load speed. Next.js also supports API routes and easy integration with REST APIs, simplifying the integration with TheMealDB API. In my current job as a software developer, we use Next.js predominantly in building applications for clients and is a framework I have most experience with. Also, given its tight coupling with Vercel, it simplified the CI/CD and deployment process.

1. **Tailwind CSS**: Tailwind CSS was selected for its utility-first approach, which speeds up the styling process by allowing highly customisable components with minimal CSS bloat - albeit with lengthy classes. Tailwind's built-in responsiveness makes it easy to adapt the UI for various screen sizes, an important factor in enhancing usability across devices. Additionally, the Tailwind ecosystem streamlines the prototyping process, which aligns well with an agile approach for this technical audition.

1. **TypeScript**: TypeScript's static type-checking reduces runtime errors, improving code reliability. It ensures that component props, API responses, and user inputs have expected structures, which is essential for an app relying on API data like TheMealDB. TypeScript's rigorous type safety also contributes to code maintainability.

The techstack that I currently use at my workplace, and in turn used for this technical audition was: React, Next.js, Typescript, Tailwind CSS, GitHub for version control, and Vercel for deployment.

## Section 4 - Development Approach and Challenges

With requirements analysis complete and the UI finalised, I set about to create the application. It is always best to begin with functionality over aesthetics, and as such I focused most of my time establishing the best course of action in delivering on the audition parameters and the decided-upon UI:

1. The search input effectively serves as the gateway to the crux of the application's functionality. I opted to create an autocomplete suggestion feature for a number of reasons: (1) discrepancies in the API response may yield incorrect results. For example, searching for 'chicken breast' compared with 'chicken breasts' yield different results, despite it intuitively suggesting the same thing; the use of pluralisation at the initial search phase should not dictate the quality of the results; (2) autocomplete suggestions help refine the user's search in a clean and intuitive manner, and can be used to accurately make the subsequent API call to fetch the recipes. Ideally, when the user begins to type in the search box, the autocomplete should make an API request - with debouncing in place - and be provided suggestions that are asynchronously queried and returned. However, in this instance I opted to fetch all ingredients when the application first loads and cache the result. This was done because the API endpoint required a full and complete string; it did not support fuzzy searching, providing results based on approximation, thus nullyfying the benefits of server-side data fetching. The benefit at least to first fetching the data and then caching it is whilst the initial load time is slower, the querying time is faster.

1. With the main ingredient selected based on the search input of the user, the next step was to perform an API call to the necessary endpoint ('filter by main ingredient') in the RecipeResults component. This endpoint does not provide comprehensive information about the recipe, only its title, ID, and thumbnail. The strategy was as such to lift the state from the SearchInput component - by nesting SearchInput and RecipeResults in a parent component that holds the state called RecipeSelector. By doing this, the state of SearchInput is shared with RecipeResults, where the necessary request could be made Concerning the API request, in order to fetch more information about the recipe, I first performed a data fetch to retrieve the meals, looped over the result, and performed fetches for each individual meal via the 'lookup full meal details by ID' endpoint; this was done through the use of `promise.all`, a technique of awaiting multiple promises in parallel and returning the desired data. By doing this, each meal will now have an expanded dataset which can not only be displayed but be used by filtering components. It was necessary to use useEffect to perform the async operations, as opposed to an async fetch, due to the fact that a server component (RecipeResults at first) cannot be imported into a client component (RecipeSelector) since its becomes a client component; client components are rendered first before server components, requiring a new request to the server if imported in a client component. The way around this is to import the server component as a child prop of the client component, thus rendering them separately. This strategy however will not work in this scenario, given that state is being lifted. Another option is to store the state in the URL and access it in the server component; this would require dynamic routing, which was outside the scope of this technical audition.

1. With the recipes now fetched in detail, it was a matter of looping over the result and displaying it in the desired structure via the RecipePreview component.

1. Due to time restrictions, I was not able to implement a filtering algorithm which utilises the parameters of the technical audition and enable users to filter the recipes. However, in order to ensure the integrity of what I envisioned the end product to look like, I implemented two basic 'previews' of filters that filter via cuisine and meal type; the cuisine and meal types are populated dynamically, in that their values are derived from the returned recipes. Ideally, I would have implemented filtering logic that enables a user to select multiple values from the different filters in order to narrow down the best recipe; it is best to do filtering server side and utilise query strings and an ORM for a smoother developer experience, however due to API restraints and API querying, I would have had to utilise client-side filtering, the implementation of which was not possible in the allotted time.

## Section 5 - Desired Improvements for Implementation

1. Keyboard navigation: Enable users to navigate autocomplete suggestions with arrow keys and select with Enter.

1. Full recipe display: Use parallel routing for a persistent right-panel recipe view. Intercepting the route for smaller screens would also improve UI/UX.

1. Responsive layout improvements: Adjust layout heights to eliminate unnecessary page scrolling, creating a more SPA-like experience with component scrolling.

1. Advanced filtering: Implement a text parser for estimated cooking times, a “clear filters” button, and a unified dropdown filter structure for refined searches. Additionally, server-side filtering would optimise data handling and enhance developer experience if supported by the API.

1. Testing: Utilise a test-driven development paradigm and write robust unit tests. I would also use Storybook.js for component testing.

1. Branding: I would create a custom colour palette and company branding for ResCulina, including a custom logo and themed components; I would also implement an 8 point design system with design tokens for fluid design.

1. Themes: I would enable the user to switch between dark and light mode, which in turn would necessitate components styled in both themes.

1. Accessibility: I would implement a more robust use of ensuring accessibility, from text sizing and component sizing to colour contrasting, ensuring compliance with best practices and guidelines (WCAG).
