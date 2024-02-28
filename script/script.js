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
    const { phone_name, image, slug } = phone;
    const div = document.createElement("div");
    div.classList = `card bg-base-100 border-2 p-6`;

    div.innerHTML = `
        <figure onclick="showDetailsClickHandelar('${slug}')" class="cursor-pointer py-12 bg-[#f3f8ff] rounded-xl">
          <img src="${image}" alt="Phone image" />
        </figure>

        <div class="card-body items-center text-center">
          <h2 class="card-title font-bold text-2xl">${phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <h3 class='font-bold text-2xl py-4'>999$</h3>
          <div class="card-actions">
            <button onclick="showDetailsClickHandelar('${slug}')" class="btn btn-info text-white font-semibold text-lg">Show Details</button>
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

// show details click handelar:
const showDetailsClickHandelar = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  const singlePhone = data.data;
  displayPhoneDetails(singlePhone);
  show_modal.showModal();
};

// display single phone details:
const displayPhoneDetails = (singlePhone) => {
  const {image,slug, name, mainFeatures, others, releaseDate, brand } = singlePhone;
  const phoneDetailsContainer = document.getElementById(
    "phone-details-container"
  );
  phoneDetailsContainer.innerHTML = `
  <figure class="flex justify-center py-12 bg-[#f3f8ff] rounded-xl">
  <img
    src="${image}"
    class="rounded-xl"
  />
</figure>
<div class="space-y-2">

  <h2 class="card-title font-bold text-black text-3xl">${name}</h2>
  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

  <p class="uppercase"><strong class="capitalize">Storage:</strong> ${mainFeatures?.storage}</p>
  <p><strong class="capitalize">Display Size:</strong> ${mainFeatures?.displaySize}</p>
  <p><strong class="capitalize">Chipset:</strong> ${mainFeatures?.chipSet}</p>
  <p class="uppercase"><strong class="capitalize">Memory:</strong> ${mainFeatures?.memory}</p>
  <p><strong class="capitalize">Slug:</strong> ${slug}</p>
  <p><strong class="capitalize">Release date:</strong> ${releaseDate}</p>
  <p><strong class="capitalize">Brand:</strong> ${brand}</p>
  <p class="uppercase"><strong class="capitalize">Gps:</strong> ${others?.GPS === undefined ? '❌' : others.GPS}</p>

</div>
  `;
};
// loadData('iphone')