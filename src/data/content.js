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
            <img src="/images/about/how-to-find-toy-number/how-to-hw-example-500x500.jpg" alt="Rear packaging of a Hot Wheels case with the toy code encircled in red" height="1" width="1">
          </div>
        </section>`
      },{
        type: 'premium',
        content: `<section>
          <h2>Premium</h2>
          <div class="contentWithImage contentRight">
            <p>Premium cars may have their code located differently, such as closer to the barcode on the back of the packaging.</p>
            <img src="/images/about/how-to-find-toy-number/how-to-premium-example-500x500.jpg" alt="Rear packaging of a Hot Wheels Premium case with the toy code encircled in red" height="1" width="1">
          </div>
        </section>`
      },{
        type: 'mb-power-grabs',
        content: `<section>
          <h2>Matchbox Power Grabs</h2>
          <div class="contentWithImage">
            <p>Matchbox Power Grab boxes don't have the usual backcard. Instead, the code can be found on the bottom near the barcode.</p>
            <img src="/images/about/how-to-find-toy-number/how-to-mb-power-grab-example-500x500.jpg" alt="Rear packaging of a Matchbox Power Grab box with the toy code encircled in red" height="1" width="1">
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
  intro: `<section>
    <h2 class="a11y">Intro</h2>
    <p>If you're anything like me, you'll understand the importance of keeping our prized die-cast cars in pristine condition. That's where KLAS Car Keepers come in. Based in Essex, KLAS has created these top-quality protectors that I've come to rely on for my collection. Not only do they offer stellar protection, but they're also eco-friendly – a big thumbs up in my book! Whether you're a seasoned collector or just starting out, let's explore how KLAS Car Keepers can make a difference for our tiny treasures.</p>
  </section>`,
  body:{
    asideImage:[
      {
        type: 'about',
        content: `<section>
          <h2>About KLAS</h2>
          <p>Nestled in Essex (UK), KLAS is not just any company - it's a passion project by a fellow collector who totally gets our collectible obsession! Their protectors? Top-tier, if you ask me. And here's the cherry on top: KLAS is all about going green. Every protector is made from recyclable materials, and even their packaging gets the eco-friendly nod with recycled boxes and padding; a perfect blend of quality and eco-consciousness!</p>
        </section>`,
      },{
        type: 'features',
        content: `<section>
          <h2>General features</h2>
          <ul>
            <li>High-Quality Material: KLAS Car Keepers are made from thick recyclable PET plastic, ensuring they are durable and protective.</li>
            <li>Sustainability: Unlike other manufacturers who use non-recyclable PVC, KLAS uses fully recyclable polyethylene terephthalate (PET), the same material used in drinking bottles.</li>
            <li>Clamshell Folding Design: This design offers complete and secure protection for unopened collectable cars, encasing both the blister and card, shielding them from damage, condensation, and dust.</li>
            <li>Easy Access: Each protector is easy to open and reseal, offering a crystal clear window to view the model inside.</li>
            <li>Storage & Display: KLAS Car Keepers are stackable for easy storage. They also come with a hanger holder hole for those who wish to display their collection.</li>
          </ul>
        </section>`,
      }
    ],
    belowImage: [
      {
        type: 'heading',
        content:`<section><h2>Car Keepers</h2></section>`
      },
      {
        type: 'short-card',
        content: `<section>
          <h3>Short Card</h3>
          <p>KLAS Car Keepers Short Card protective cases are a must-have for every Hot Wheels or Matchbox car aficionado. These cases are meticulously crafted to fit the Hot Wheels or Matchbox short card collections, ensuring your prized possessions remain in mint condition.</p>
          <ul>
            <li><strong>Size:</strong> 1:64 suitable for Hot Wheels or Matchbox short cards.</li>
            <li><strong>Card Dimensions:</strong> 10.8cm x 10.8cm</li>
          </ul>
          <div class="contentWithImage">
            <ul>
              <li><strong>High-Quality Material:</strong> Crafted from 0.5mm thick recyclable PET plastic, the Short Card Keeper is durable and eco-friendly.</li>
              <li><strong>Full Protection:</strong> Each case snugly encloses the car and its card, while the crystal clear window perfectly showcases your collectible.</li>
              <li><strong>Easy Access:</strong> For those moments when you want a closer look, the case can be easily opened and resealed without compromising its integrity.</li>
              <li><strong>Storage & Display:</strong> Designed for convenience, these cases are stackable and come equipped with a hanger holder hole for those who love to display.</li>
            </ul>
            <img src="/images/about/klas-car-keepers/klas-example-short-500x500.jpg" alt="Example of a short card KLAS car keeper" height="1" width="1">
          </div>
        </section>`
      },{
        type: 'long',
        content: `<section>
          <h3>Long Card</h3>
          <p>KLAS Car Keepers Long Card protective cases are the epitome of protection for the serious Hot Wheels car collector. Specifically designed for the Hot Wheel long card collections, these cases are the perfect blend of style and security.</p>
          <ul>
            <li><strong>Size:</strong> 1:64 suitable for Hot Wheels long cards.</li>
            <li><strong>Card Dimensions:</strong> 16.5cm x 10.8cm/li>
          </ul>
          <div class="contentWithImage contentRight">
            <ul>
              <li><strong>High-Quality Material:</strong> Made from robust 0.5mm thick recyclable PET plastic, ensuring longevity and sustainability.</li>
              <li><strong>Full Protection:</strong> With a snug fit for both the card and car, the transparent window offers an unobstructed view of your cherished collectible.</li>
              <li><strong>Easy Access:</strong> Collector-friendly design allows for easy opening and resealing, balancing accessibility with top-notch protection.</li>
              <li><strong>Storage & Display:</strong> These cases are not only stackable for efficient storage but also come with a hanger holder hole for proud display.</li>
            </ul>
            <img src="/images/about/klas-car-keepers/klas-example-long-500x500.jpg" alt="Example of a long card KLAS car keeper" height="1" width="1">
          </div>
        </section>`
      },{
        type: 'team-transport',
        content: `<section>
          <h3>Team Transport</h3>
          <p>KLAS Car Keepers Team Transporter protective cases are the dream of every Hot Wheels enthusiast. Tailor-made for the Hot Wheels Team Transport cars and trucks collection, these cases are a testament to KLAS's commitment to quality and precision.</p>
          <ul>
            <li><strong>Size:</strong> 1:64 suitable for Hot Wheels Team Transport cars and trucks.</li>
            <li><strong>Card Dimensions:</strong> 20.3cm x 16.5cm/li>
          </ul>
          <div class="contentWithImage">
            <ul>
              <li><strong>High-Quality Material:</strong> Crafted from 0.7mm thick recyclable PET plastic, these protectors are built to last.</li>
              <li><strong>Full Protection:</strong>  Each case is designed to offer secure protection for both the card and the vehicle, complemented by a crystal clear viewing window.</li>
              <li><strong>Easy Access:</strong> Collector-centric design ensures ease of access with simple opening and resealing mechanisms.</li>
              <li><strong>Storage & Display:</strong> With a stackable design for streamlined storage, these cases also sport a hanger holder hole for those who prefer to display.</li>
            </ul>
            <img src="/images/about/klas-car-keepers/klas-example-transport-500x500.jpg" alt="Example of a team transport KLAS car keeper" height="1" width="1">
          </div>
        </section>`
      },{
        type: 'premiums',
        content: `<section>
          <h3>Premium</h3>
          <p>KLAS Car Keepers Premium Car Culture protective cases are tailor-made for the dedicated Hot Wheels car collector. These protectors are specially designed for the Hot Wheel Premium Car Culture or Boulevard car collections.</p>
          <ul>
            <li><strong>Size:</strong> 1:64 suitable for Hot Wheels Premium Car Culture cars.</li>
            <li><strong>Card Dimensions:</strong> 16.5cm x 13.5cm/li>
          </ul>
          <div class="contentWithImage contentRight">
            <ul>
              <li><strong>High-Quality Material:</strong> Like other KLAS protectors, the Premium Car Culture Keeper is made from 0.5mm thick recyclable PET plastic.</li>
              <li><strong>Full Protection:</strong>  Each case offers complete and secure protection for both the card and the car, providing a crystal clear window to showcase your model.</li>
              <li><strong>Easy Access:</strong> Designed for collectors, it is easy to open and reseal, ensuring both accessibility and protection.</li>
              <li><strong>Storage & Display:</strong> Stackable design for optimal storage space, and comes with a hanger holder hole for display enthusiasts.</li>
            </ul>
            <img src="/images/about/klas-car-keepers/klas-example-premium-500x500.jpg" alt="Example of a premium KLAS car keeper" height="1" width="1">
          </div>
        </section>`
      }
    ]
  }
 }