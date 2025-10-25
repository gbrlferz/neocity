// 1. Select our elements
// We only need the links and the one content-area box
const navLinks = document.querySelectorAll('.nav-link');
const contentArea = document.querySelector('.content-area');

/**
 * Creates a function to load content
 * 'async' lets us use 'await' to wait for the fetch to finish
 * @param {string} url The URL of the page fragment to fetch
 */
async function loadContent(url) {
	try {
		// 2. Go fetch the content from the URL (e.g., "about.html")
		const response = await fetch(url);

		// 3. Check if the file was found (response.ok is true for 200-299)
		if (!response.ok) {
			// If we get a 404 (Not Found) or other error, show a message
			throw new Error(`Page not found: ${url}`);
		}

		// 4. Get the plain HTML text from the response
		const html = await response.text();

		// 5. Put that HTML right into our content-area
		contentArea.innerHTML = html;

	} catch (error) {
		// 6. If anything goes wrong, log it and show a user-friendly error
		console.error('Error fetching content:', error);
		contentArea.innerHTML = '<p>Error loading page. Please try again.</p>';
	}
}

// 7. Set up our click events for each link
navLinks.forEach(function(link) {
	link.addEventListener('click', function(event) {

		// Stop the browser from following the link normally
		event.preventDefault();

		// Get the URL to load from the link's href
		// This replaces the old 'data-target' logic
		const urlToLoad = link.getAttribute('href');

		// --- This part is the same as before ---
		// Loop through all links and remove 'active' class
		navLinks.forEach(function(navLink) {
			navLink.classList.remove('active');
		});

		// Add 'active' class to the *clicked* link
		link.classList.add('active');
		// --- End of same part ---

		// 8. Call our new function to load the content
		loadContent(urlToLoad);
	});
});

// 9. Load the default page
// We need to manually load the 'about.html' content when the page
// first starts so it's not blank.
loadContent('about.html');
