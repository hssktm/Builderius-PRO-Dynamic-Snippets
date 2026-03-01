Get previous and next posts
This snippet fetches data for the previous and next posts relative to the current entry, including their featured images.

How to edit the code
Locate these sections to customize the snippet:

Fetch objects: The code uses native functions to retrieve the IDs of adjacent posts privately.

Data Query: It uses posts_query with the post__in argument to extract specific information from the retrieved post.

Images: Locate the md: file_url and lg: file_url lines to modify or add image sizes (Thumbnail, Medium, Full).

Customization: You can remove the img: featured_image blocks if you only need to show navigation titles and links.
