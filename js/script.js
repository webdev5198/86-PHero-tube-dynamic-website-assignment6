let sortedData = [];
const loadVideosCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const categoriesData = await res.json();

  // display tabs
  const tabContainer = document.getElementById("tab-container");

  // If there are categories, display them as tabs
  tabContainer.classList = `flex justify-center gap-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200`;

  categoriesData.data.forEach((tabsCategories) => {
    const div = document.createElement("div");

    // dynamic data pass in other function
    div.innerHTML = `
          <a onclick="displayCardContainer('${tabsCategories.category_id}')" href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-orange-400"> 
          ${tabsCategories.category}
          </a>
        `;
    tabContainer.appendChild(div);
  });

  // Display the first category by default
  displayCardContainer(categoriesData.data[0].category_id);
};

// Initialize card container
const displayCardContainer = async (categoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );

  const cardData = await res.json();

  const notFound = document.getElementById("not-found");

  if (cardData.data.length === 0) {
    notFound.classList.remove("hidden");
  } else {
    notFound.classList.add("hidden");
  }

  const cardContainer = document.getElementById("card-container");
  cardContainer.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`;
  cardContainer.innerHTML = "";

  cardData.data.forEach((cardInfo) => {
    // convert second to hus and minitue

    // second
    const sec = cardInfo.others.posted_date;
    // miniute
    const minitue = Math.floor(sec / 60);
    // hrs
    const hrs = Math.floor(minitue / 60);
    // remaining minitue
    const remainingMinutes = minitue % 60;

    // show display card container
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="max-w-sm my-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#" class="relative">
            <img class=" rounded-t-lg w-full h-36" src=${
              cardInfo?.thumbnail
            } alt="" />
            <span class="absolute bottom-3 right-3 bg-blue-400 rounded-sm text-white text-xs font-medium text-end p-1">${
              cardInfo.others.posted_date > 0
                ? hrs +
                  " " +
                  "hrs" +
                  " " +
                  remainingMinutes +
                  " " +
                  "min" +
                  " " +
                  "ago"
                : ""
            }</span>
        </a>

        <div class="flex space-x-4 p-4">
            <img alt="" src=${
              cardInfo?.authors[0]?.profile_picture
            } class="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500">
            <div class="flex flex-col space-y-1">
                <a rel="noopener noreferrer" href="#" class="text-sm font-semibold">${
                  cardInfo?.title
                } </a>
                <p class="text-xs flex gap-2 items-center  dark:text-gray-400">${
                  cardInfo?.authors[0]?.profile_name
                }    ${
      cardInfo?.authors[0].verified
        ? '<span><img class="w-4" src="./images/quality.png" alt="Verified" /></span>'
        : ""
    }</p>
                <p class="text-xs flex gap-1 items-center  dark:text-gray-400"><span>${
                  cardInfo?.others?.views
                }</span>views</p>
            </div>
        </div>
    </div>
        `;

    cardContainer.appendChild(div);
  });
  sortData(categoryId);
};

const sortData = async (sortCategory) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${sortCategory}`
  );

  const sortCardData = await res.json();
  sortCardData.data.sort((a, b) => {
    const lowestViews = parseInt(a.others.views);
    const highestViews = parseInt(b.others.views);
    return highestViews - lowestViews; // Sort in descending order
  });
};

loadVideosCategories();
