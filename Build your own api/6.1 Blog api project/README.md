# Blog API Project

This project is a blog platform with a custom RESTful API and a web interface. The project is divided into two main components:
- **`index.js`**: Handles the custom API for server requests using `axios`.
- **`server.js`**: Manages the backend code for the main website.

## Technologies Used

- **Frontend**: 
  - **EJS Templating Engine**: For rendering dynamic HTML pages.
  - **CSS**: For styling the frontend.
  - **HTML**: Structure of web pages.

- **Backend**:
  - **Node.js**: JavaScript runtime used for server-side development.
  - **Express.js**: Web framework for handling requests and routing.
  - **Axios**: For making HTTP requests from the backend to the API.
  - **Middlewares**: Used for processing requests and handling various backend operations.

## Features

- **Custom API**: The `index.js` file contains the API code, which handles requests using `axios`.
- **Web Interface**: The `server.js` file is responsible for managing the website's backend logic.
- **Blog Management**:
  - **Create New Blog**: Users can post new blogs.
  - **Edit Blog**: Full blogs can be edited.
  - **Patch Blog**: Parts of the blog can be updated without rewriting the entire content.
  - **Delete Blog**: Blogs can be deleted from the platform.
- **Dynamic Templating**: EJS is used to dynamically generate and serve HTML pages based on server-side logic.
- **CSS Styling**: The website's user interface is styled with CSS.

## Future Improvements

- **User Authentication**: Implement user login and registration to secure blog management.
- **Pagination**: Add pagination to display a limited number of blog posts per page.
- **Search and Filtering**: Integrate search functionality and filters to find blogs by categories, tags, or keywords.
- **Comment System**: Add the ability for users to comment on blog posts.
- **Rich Text Editor**: Implement a rich text editor for creating and editing blog posts with formatting options.
- **Image and Media Support**: Allow users to upload and include images or videos in blog posts.
- **Analytics**: Integrate analytics to track blog post views and user interactions.
- **Notifications**: Implement notifications for new comments or blog updates.
- **Responsive Design**: Ensure the website is fully responsive and works well on mobile devices.


## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/coderaark12/Blog-API-Project.git

2. Install the dependencies:
    ```bash
    npm install

3. Start the API server:
    ```bash
    node index.js

4. Start the main server:
    ```bash
    node server.js