# Movie Library using Next.JS

Objective: Improve a movie library app using Next.JS, which allows users to search for movies and view details about them using a movie API, for this exercise we'll use The Movie Database (TMDb) API.

API Reference: https://developer.themoviedb.org/reference/intro/getting-started

## Requirements:

This is a Next.JS v14 project, setup with App Router; if you are not familiar with Next.JS App Router you can still use Page Router, they can co-exist.

Design the UI with simple CSS, the project has TailwindCSS and DaisyUI already setup up to simplify styling. It is strongly suggested to leverage DaisyUI styles to speed up styling elements.

The index/search page is already working, it searches for movies and shows the results in a grid. You need to create a movie detail page and link all the results to it. So that from the index page you can click on results and navigate to the details page.

The detail page should contain the following:

-   The movie title and tagline.
-   The movie overview.
-   The release year and runtime.
-   The poster image.
-   The list of genres.
-   A fake "like" button. For the interest of speed, doesn't need to use icons, but should show a different style after clicking it (doesn't need to call an API or anything).
-   Bonus: A link to IMDB (check the TMDb API response).

Fetch movie data from the TMDb API by ID, having performance and page speed in mind.

Bonus:

-   Add a toggle button on index page to order movie results by released date or popularity.
-   Add pagination to index page.
