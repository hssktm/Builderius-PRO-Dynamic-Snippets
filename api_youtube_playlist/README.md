YouTube API Snippet – Updated Instructions

API URL Configuration

Use the following URL to fetch data from a YouTube playlist:

https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=[YOUR_PLAYLIST_ID]&maxResults=50&key=[YOUR_API_KEY
]

Replace [YOUR_PLAYLIST_ID] with your playlist ID.
Replace [YOUR_API_KEY] with your Google API Key.

This URL returns a JSON with up to 50 videos from the playlist.

Understanding and Modifying the Snippet

Main variables:

raw_response – the result of the API call.
response_body – the response body.
decoded_data – JSON decoded data.
youtube_list – filters decoded_data.items and selects only the necessary fields. This is the name you will use in a Collection element to fetch data dynamically.

Current expression (ID, title, and high thumbnail):

expression: "foreach(decoded_data.items, (item) -> { { id: item.snippet.resourceId.videoId, title: item.snippet.title, image: item.snippet.thumbnails.high.url } })"

Updated with description:

expression: "foreach(decoded_data.items, (item) -> { { id: item.snippet.resourceId.videoId, title: item.snippet.title, image: item.snippet.thumbnails.high.url, description: item.snippet.description } })"

To add a new field, add a comma after the last property inside the object and define the new key followed by its API path.

Example adding more fields:

expression: "foreach(decoded_data.items, (item) -> { { id: item.snippet.resourceId.videoId, title: item.snippet.title, image: item.snippet.thumbnails.high.url, description: item.snippet.description, publishedAt: item.snippet.publishedAt, channelTitle: item.snippet.channelTitle } })"

youtube_list now contains only the defined fields such as id, title, image, description, publishedAt, and channelTitle.

Usage in a Collection Element

Create a Collection element in Builderius.

Select the snippet data source.
Use youtube_list as the collection.

Map the fields to your elements:

{{id}} -> Video ID
{{title}} -> Title
{{image}} -> Thumbnail
{{description}} -> Description
{{publishedAt}} -> Publish date
{{channelTitle}} -> Channel name

This prevents exposing all fields from decoded_data.items and only returns the ones you explicitly define.

Embedding in an iframe

To display the video dynamically:

<iframe width="560" height="315" src="https://www.youtube.com/embed/{{id}}" title="{{title}}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

{{id}} is automatically replaced with each video ID from youtube_list.
{{title}} can be used as the title attribute for accessibility.
