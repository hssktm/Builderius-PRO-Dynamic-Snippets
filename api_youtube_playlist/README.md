YouTube API Snippet – Updated Instructions
1. API URL Configuration
Use the following URL to fetch data from a YouTube playlist:

https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=[YOUR_PLAYLIST_ID]&maxResults=50&key=[YOUR_API_KEY]

Replace [YOUR_PLAYLIST_ID] with your playlist ID.

Replace [YOUR_API_KEY] with your Google API Key.

This URL returns a JSON with all the videos from the list.

2. Understanding and Modifying the Snippet
Main variables:

raw_response – the result of the API call.

response_body – the response body.

decoded_data – JSON decoded data.

video_items – contains all elements from the list.

youtube_list – filters video_items and selects only the necessary fields. This is the name you will use in a Collection element to fetch data dynamically.

Modifying youtube_list to include additional fields:

Original (ID, title, and image only):
expression: "foreach(video_items, (item) -> { { id: item.snippet.resourceId.videoId, title: item.snippet.title, image: item.snippet.thumbnails.standard.url } })"

Updated with description (adding the field at the end of the object):
expression: "foreach(video_items, (item) -> { { id: item.snippet.resourceId.videoId, title: item.snippet.title, image: item.snippet.thumbnails.standard.url, description: item.snippet.description } })"

To add a new field, simply add a comma after the last element inside the inner braces and specify the name you want to give it followed by its API path (e.g., description: item.snippet.description).

youtube_list now cleans video_items and contains the fields: id, title, image, and description.

Following this same logic, you can add other data such as publishedAt: item.snippet.publishedAt or channelTitle: item.snippet.channelTitle.

3. Usage in a Collection Element
Create a Collection element in Builderius.

Select the snippet data source and use youtube_list as the collection.

Map the fields to your elements:

{{id}} -> Video ID

{{title}} -> Title

{{image}} -> Thumbnail

{{description}} -> Description

This prevents exposing all fields from video_items and only calls the ones you need.

4. Embedding in an iframe
To display the video dynamically:

<iframe width="560" height="315" src="https://www.youtube.com/embed/{{id}}" title="{{title}}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{{id}} is automatically replaced with each video ID from youtube_list.

{{title}} can be used as the title attribute for accessibility.
