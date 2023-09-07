/**
 * content.js
 * 
 * This module provides the content for content pages.
 *
 */

 /**
 * Content for the About page
 * 
 * @returns {array} - Array with all the different sections
 */
export const dataContentAbout = {
  image:{
    mobile: '/images/about/about/mobile/about-top-500x250.jpg',
    desktop: '/images/about/about/desktop/about-top-250x650.jpg',
  },
  intro: `<section>
    <h2 class="a11y">Intro</h2>
    <p>Welcome to Tiny Fords. My name is Kevin, and I'm the creator of this website. I've been collecting Ford die-cast cars for years, and I created this website as a tool to keep track of my collection.</p>
  </section>`,
  body:{
    asideImage: [
      {
        type: 'challenge',
        content:`<section>
          <h2>The Challenge</h2>
          <p>As my collection grew, I found myself buying duplicates and missing out on cars I wanted to add to my collection. I realized that I needed a way to easily and quickly navigate my collection online, so I wouldn't make these mistakes anymore. That's when I decided to create Tiny Fords.</p>
        </section>`
      },
      {
        type: 'purpose',
        content: `<section>
          <h2>Why Tiny Fords?</h2>
          <p>The website is a non-commercial site and it was created by me for myself, but I decided to share it with others as I thought we might be able to swap duplicates or identify cars I have not yet in my collection. With Tiny Fords, I can browse Hot Wheels, Matchbox, and other car models easily, and avoid buying duplicates.</p>
        </section>`,
      },
      {
        type: 'technical',
        content: `<section>
          <h2>Behind the scenes</h2>
          <p>The website was created using a Cloudflare Worker on a free account. I chose this platform because it was easy to use and it was free. I'm proud to say it was made in 2023. I didn't use any framework, it was all done by me. It was challenging, but I was determined to make it happen.</p>
        </section>`,
      },
      {
        type: 'future',
        content: `<section>
          <h2>What's next?</h2>
          <p>In the future, I plan to add more features and improvements to the website, such as a "Want List" page, where I can keep track of the cars I'm looking for. I also plan to keep the collection up-to-date with new additions.</p>
        </section>`,
      },
      {
        type: 'closing',
        content: `<section>
          <h2 class="a11y">Closing words</h2>
          <p>Thank you for visiting Tiny Fords. I hope you enjoy exploring my collection as much as I do. If you have any questions or feedback, please don't hesitate to reach out to me via the <a href="/contact">contact page</a>.</p>
        </section>`,
      }
    ],
  }
};

 /**
 * Content for the How to Find Toy Number page
 * 
 * @returns {array} - Array with all the different sections
 */
 export const dataContentHowToFindToyNumber = {
  image:{
    mobile: '/images/about/how-to-find-toy-number/mobile/how-to-top-500x250.jpg',
    desktop: '/images/about/how-to-find-toy-number/desktop/how-to-top-250x650.jpg',
  },
  intro: `<section>
    <h2 class="a11y">Intro</h2>
    <p>Use Mattel toy codes to search for a car on this website to find out if it is already in the collection. These codes can also be used on other websites such as eBay to quickly locate the car.</p>
  </section>`,
  body:{
    asideImage: [
      {
        type: 'searching',
        content:`<section>
          <h2>Searching on Tiny Fords</h2>
          <p>To get the best results, follow these steps:</p>
          <ol>
            <li>Locate the toy code</li>
            <li>Enter the code in the search bar</li>
            <li>Check if the returned results match the car you're looking for</li>
            <li>If no results are returned, the car may not be in the collection yet</li>
            <li>If you're not sure, search for the car's name to confirm its absence</li>
          </ol>
        </section>`
      }
    ],
    belowImage: [
      {
        type: 'hw-mb',
        content: `<section>
          <h2>Normal Hot Wheels and Matchbox</h2>
          <div class="contentWithImage">
            <p>Matchbox and Hot Wheels cars have a code on the back of their packaging, sometimes also on the front. Usually, it is found at the top of the backcard, and is a combination of three letters and two numbers (e.g. 'GTB91').</p>
            <img src="/images/about/how-to-find-toy-number/how-to-hw-example-500x500.jpg" alt="Rear packaging of a Hot Wheels case with the toy code encircled in red" height="1" width="1" />
          </div>
        </section>`
      },{
        type: 'premium',
        content: `<section>
          <h2>Premium</h2>
          <div class="contentWithImage contentRight">
            <p>Premium cars may have their code located differently, such as closer to the barcode on the back of the packaging.</p>
            <img src="/images/about/how-to-find-toy-number/how-to-premium-example-500x500.jpg" alt="Rear packaging of a Hot Wheels Premium case with the toy code encircled in red" height="1" width="1" />
          </div>
        </section>`
      },{
        type: 'mb-power-grabs',
        content: `<section>
          <h2>Matchbox Power Grabs</h2>
          <div class="contentWithImage">
            <p>Matchbox Power Grab boxes don't have the usual backcard. Instead, the code can be found on the bottom near the barcode.</p>
            <img src="/images/about/how-to-find-toy-number/how-to-mb-power-grab-example-500x500.jpg" alt="Rear packaging of a Matchbox Power Grab box with the toy code encircled in red" height="1" width="1" />
          </div>
        </section>`
      }
    ]
  }
};

 /**
 * Content for the KLAS Car Keepers page
 * 
 * @returns {array} - Array with all the different sections
 */
 export const dataContentKlasCarKeepers = {
  image:{
    mobile: '/images/about/klas-car-keepers/mobile/klas-top-500x250.jpg',
    desktop: '/images/about/klas-car-keepers/desktop/klas-top-250x650.jpg',
  },
 }