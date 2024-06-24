# Frontend Technical Test - Technology

## The FACEIT Feed Test

You are tasked with implementing the following in a React app using TypeScript. It should take you no more than a few hours. You can mock your own data or use other services like [JSONPlaceholder](https://jsonplaceholder.typicode.com):

- Posts: [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts)
- Users: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)

To help us evaluate technical fit, you must use Redux for state management, and we encourage you to use Next.js.

### The User Scenario

1. **Feed View**: As a user, when I start the App it directs me to the Feed view. The feed view has a scrollable list of Posts (20 items/page). Each Post has an author and a body of content. Each author has an avatar and a name.

2. **Infinite Scrolling**: When I scroll to the bottom of the list it will load older posts.

3. **Real-Time Updates**: When a post is added while the user is navigating, a real-time message is pushed to the client and the post is pre-pended at the top of the list. Nice-to-have: the new post will be highlighted for the first few seconds.

4. **Post Detail View**: When I select one of the Posts it goes to a new page. This new page has only that singular Post.

5. **Enhanced Reading Experience**: It will render in such a way as to make it a more pleasant reading experience when compared to seeing it in the feed. For example, it reveals the whole body in this view, whilst in the feed it only shows 100 characters of the body.

6. **Navigation**: I should be able to navigate back to the Feed from the Post and as an added bonus, I'm at the same scroll position I was before.

### Design Suggestion

The following is a suggestion for the design, but not a requirement:

- **Feed**: A view with a scrollable list of posts, each showing an author, avatar, and a snippet of the post body (first 100 characters).
- ![Screenshot by Dropbox Capture](https://github.com/geryit/esl-faceit/assets/514149/7524fca7-dd02-4851-8ff6-f8f3e3c028e1)

### Considerations

- **Code Readability**: Please aim for readability of your code; remember, code is read more than it's written.
- **Instructions**: Provide clear instructions on how to run the application. Be mindful of differences in operating systems, as the people who evaluate your test might be working on a different OS than yours.
- **Testable Code**: We are very fond of testable code. Please showcase your ability to write good tests.
- **Optimization Strategies**: Consider using different optimization strategies such as code splitting, lazy loading, tree-shaking, caching, etc.
- **Core Web Vitals**: Please take care of your core web vitals and ensure best practices are followed.
- **Version Control**: Make sure your code is version controlled using git.
- **Packaging**: Please package your application in compressed format either zip or tar.

---

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Testing

To run intergration tests:

```bash
npm test
```

To run e2e tests on local:

```bash
npm run cypress:open
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
