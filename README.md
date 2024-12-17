Paginator with Row Selection in PrimeReact
This project demonstrates a DataTable component with pagination, row selection, and the ability to programmatically select rows across multiple pages based on user input. It uses the PrimeReact library for the table, paginator, and other UI components.

Features:
Data Fetching with Pagination

Dynamic data fetching from an API using Axios.
Paginator enables navigation between pages with options for rows per page.
Row Selection Across Pages

Users can input the number of rows to select via an Overlay Panel.
Rows are selected across multiple pages if the current page does not contain enough rows.
Interactive Table with Checkboxes

Multi-row selection using checkboxes with borders for better visibility.
Selection logic dynamically updates as rows are selected across pages.
Overlay Panel for Input

The OverlayPanel component allows users to input the desired number of rows to select.
A Submit button applies the row selection logic seamlessly.
Technologies Used:
React: Component-based UI design and state management.
PrimeReact: A robust UI component library for React applications, including DataTable, Paginator, OverlayPanel, and Buttons.
Axios: HTTP client for API calls to fetch data dynamically.
React Icons: For icons like the Chevron Down icon used in buttons.
CSS: Custom styles for checkboxes, overlay input fields, and other UI elements.
TypeScript: Ensures type safety and better code maintenance.
How It Works
Data Fetching

Data is fetched from the API endpoint:
https://api.artic.edu/api/v1/artworks?page=${page}.
Pagination

The Paginator component enables navigation between pages.
Rows per page are fixed at 12.
Row Selection Logic

Users input the desired number of rows via an overlay input panel.
If the input exceeds the current page rows, rows are fetched from subsequent pages.
Example:

Input: 15
Page 1 contains 12 rows → 3 rows are fetched from Page 2.
Overlay Input Panel

Users enter the desired row count, and rows are programmatically selected.
