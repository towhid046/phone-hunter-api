const loadData = async (value, isShow) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  const response = await fetch(url);
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones, isShow);
};

const displayPhones = (phones, isShow) => {
  const phonesContainer = document.getElementById("cards-container");

  // clear the phonesContainer after searching
  phonesContainer.innerHTML = "";

  // show see more btn if the result is more than 12
  showMoreBtn(phones.length, isShow);

  // show only 12 phone after search primarly:
  if (!isShow) {
    phones = phones.slice(0, 12);
  }
  // display phone handelar:
  displayPhoneHandelar(phones, phonesContainer);

  // remove the loader after showing the search result
  spinnerHandelar(false);
};

// display data handelar
const displayPhoneHandelar = (phones, phonesContainer) => {
  phones.forEach((phone) => {
    const { phone_name, image } = phone;
    const div = document.createElement("div");
    div.classList = `card bg-base-100 border-2 p-6`;

    div.innerHTML = `
        <figure class="py-12 bg-[#f3f8ff] rounded-xl">
          <img src="${image}" alt="Shoes" />
        </figure>

        <div class="card-body items-center text-center">
          <h2 class="card-title font-bold text-2xl">${phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <h3 class='font-bold text-2xl py-4'>999$</h3>
          <div class="card-actions">
            <button class="btn btn-info text-white font-semibold text-lg">Show Details</button>
          </div>
        </div>
        `;
    phonesContainer.appendChild(div);
  });
};

// show more button based on condition
const showMoreBtn = (phonesLength, isShow) => {
  const showMoreDiv = document.getElementById("show-more-div");
  phonesLength > 12 && !isShow
    ? showMoreDiv.classList.remove("hidden")
    : showMoreDiv.classList.add("hidden");
};

// handel spinner or loader:
const spinnerHandelar = (isLoading) => {
  const loadingDiv = document.getElementById("spinner");
  isLoading
    ? loadingDiv.classList.remove("hidden")
    : loadingDiv.classList.add("hidden");
};

// add event listener to the input fild:
const searchFild = document.getElementById("search-input-fild");

// search btn event handelar
const searchBtnHandelar = (isShow) => {
  spinnerHandelar(true);
  const searchValue = searchFild.value;
  loadData(searchValue, isShow);
};

// show phone deatails handelar:
const showMoreBtnHandelar = () => {
  const isShow = true;
  searchBtnHandelar(isShow);
};

// loadData('iphone')