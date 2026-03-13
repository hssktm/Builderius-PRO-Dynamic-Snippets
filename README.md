# Builderius Snippets

A growing collection of copy-paste snippets for the [Builderius](https://builderius.io) WordPress site builder. Queries, layouts, styles — grab what you need and drop it into your project.

---

## Snippet Types

### GraphQL Data Variables

Builderius data variable queries that pull dynamic content from WordPress, external APIs, or computed expressions. These power Collections, conditional rendering, and dynamic text.

**How to use:**
1. Open your template in the Builderius builder
2. Go to **Data Variables** and add a new **GraphQL Query**
3. Paste the snippet into the query editor
4. Look for `# CHANGE HERE` comments — these mark values you need to customize
5. Reference the output in your modules using `[[varName.field]]` or inside a Collection with `{{field}}`

### Layouts (Builderius JSON)

Pre-built module structures exported as Builderius JSON. These give you ready-made sections, page skeletons, or component patterns you can import directly.

**How to use:**
1. Copy the JSON from the snippet
2. In the Builderius builder, use the import/paste function to add the module tree
3. Adjust classes, content, and data bindings to fit your template

### CSS

Reusable CSS patterns — entity-scoped classes, component styles, or responsive patterns. Designed to work with Builderius CSS variables and the framework class system.

**How to use:**
1. Copy the CSS from the snippet
2. Paste it into **Entity CSS** (via the template/component settings) or **Framework CSS** (for site-wide styles)
3. Apply the class names to your modules using the class manager

---

## Repo Structure

```
snippet_name/
  README.md    <- What it does, how to customize, output fields
  snippet      <- The snippet content (query, JSON, or CSS)
```

Every snippet lives in its own folder. The folder `README.md` has everything you need to know about that specific snippet — what it does, what to change, and how to wire it up. This top-level README covers the general workflow only.

---

## Quick Reference

### Builderius Variable Syntax

| Syntax | Scope | Use for |
|--------|-------|---------|
| `[[var]]` | Template-level data variable | Text content (HTML-escaped) |
| `[[[var]]]` | Template-level data variable | URLs, raw HTML (unescaped) |
| `{{field}}` | Loop item inside Collection | Text content (escaped) |
| `{{{field}}}` | Loop item inside Collection | URLs, raw HTML (unescaped) |

### Common Markers in Snippets

| Marker | Meaning |
|--------|---------|
| `# CHANGE HERE` | A value you should customize for your site |
| `@private` | Intermediate variable — won't appear in your data output |
| `{{variable}}` inside a query | References another variable in the same query (resolved server-side) |

### Collection Pattern

Snippets that return arrays are meant for a **Collection** module:

```
Collection  (data-b-context="[[dataVar.arrayField]]")
  └── Template
        ├── HtmlElement  (content="{{title}}")
        ├── HtmlElement  (tag=a, href="{{{url}}}")
        └── ...
```

Set `data-b-context` on the Collection to point at the array. Inside the Template child, use `{{field}}` to render each item.

---

## Available Snippets

### GraphQL Data Variables

| Snippet | Description |
|---------|-------------|
| `YouTube Playlist API` | Fetches videos from a YouTube playlist using the Google API. Important: This snippet uses API tokens and repeated requests can be costly. |
| `Dynamic Breadcrumbs` | Full breadcrumb system for posts, custom post types, and taxonomies without manual text. |
| `Current post comments` | Hierarchical extraction of comments from the current post with response threads and active pagination |
| `Direct Logout with Redirect` | Generates a secure logout URL that skips confirmation and redirects to a custom page |
| `Estimated Reading Time` | Calculate reading time based on word count of the current post. |
| `Get previous and next posts` | Fetch adjacent posts relative to the current post with featured images |
| `Global Dynamic Title Resolver` | Resolves the current page title across all WordPress contexts (archives, search, 404, front-page, and single posts) while cleaning HTML tags and common prefixes. |
| `Customized post query based on taxonomy terms` | Display posts from specific categories with flat category array |











More snippet types (GraphQL query) coming soon.

---

## Contributing

1. **Important:** Each snippet you add must include the comments `# name:` and `# desc:` at the very beginning of the `snippet` file.

   Example:
   `# name: Snippet Title`
   `# desc: Short description of what this snippet does`

2. Create a folder with a descriptive `snake_case` name.
3. Add a `snippet` file with the content (GraphQL query).
4. Add a `README.md` that covers:
   - What the snippet does.
   - How to customize it (reference any `# CHANGE HERE` markers).
   - What fields/classes/modules it provides.
5. Keep the specific instructions for each snippet in the README.md folder for each snippet and let the workflow automatically update the "Available Snippets" table in the main README, so you don't need to edit it manually.
   

---

## Resources

- [Builderius Documentation](https://builderius.io/documentation/)
- [Builderius Community](https://community.builderius.io/)
