describe("URL and Element Test with Network Call Check", () => {
  it("should visit the URL, check for the element, scroll to the bottom, and verify network call", () => {
    // Step 1: Visit the URL
    cy.visit("/");

    // Step 2: Check if the element exists

    cy.get('[data-test-id="post-card"]').should("have.length.at.least", 20);

    // Step 3: Scroll to the bottom of the page
    cy.scrollTo("bottom");

    // Step 4: Intercept the network call and check if it is made
    cy.intercept(
      "GET",
      "https://jsonplaceholder.typicode.com/posts/?_start=20&_limit=20"
    ).as("apiCall");

    // Wait for the network call to be made after scrolling
    cy.wait("@apiCall").its("response.statusCode").should("eq", 200);

    cy.get('[data-test-id="post-card"]').should("have.length.at.least", 40);

    // Click to the first post
    cy.get('[data-test-id="post-card"]').first().click();

    // Url should be /post/1
    cy.url().should("include", "/post/1");

    // There should be a single element with content: "Leanne Graham"
    cy.get("h2").should("have.text", "Leanne Graham");

    // Go back to the previous page
    cy.contains("Back to posts").click();

    // Click "Add a real time post" button
    cy.contains("Add a real time post").click();

    // Check if the real time post is added
    cy.contains("This is a real-time post received via WebSocket.").should(
      "be.visible"
    );
  });
});
