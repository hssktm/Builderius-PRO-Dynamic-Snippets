Advanced Dynamic Breadcrumbs
This snippet generates a fully automatic hierarchical navigation system that extracts the complete path from the home page to the current content.

How to use this code
Data Usage: The main object is breadcrumbs. You must use it in a "Collection" to render each navigation level.

Output Structure: Each array item contains:

title: The dynamic name of the page or term.

url: The link to that section.

type: An origin identifier (e.g., front_page, taxonomy, parent, current_page).

Logic and Conditions
Type Usage: The type field is not just for styling; its primary role is to serve as a condition. You can use it to apply specific display logic based on the link's origin.

Full Hierarchy: The system automatically detects category or page "parents" and orders them correctly.

Category Control: Thanks to the query structure, you can use conditions in the builder to hide parent categories or specific types if you prefer a more simplified path in certain views.
