Current Post Comments Query
This GraphQL query for Builderius fetches and organizes WordPress comments for the current post. It handles hierarchical structures, recursive nesting, and active pagination.

Description
This specialized query retrieves comments for the post being visited. It uses the parent: 0 argument to fetch only top-level comments at the first level, then uses the @recursive directive to pull up to 5 levels of nested replies.

Main Features
Dynamic Post Detection: Automatically identifies the current post ID.

Hierarchical Mapping: Separates root comments from nested replies.

Recursive Replies: Fetches child comments automatically within the same loop.

Full Pagination: Supports the standard WordPress comment pagination via URL parameters.
