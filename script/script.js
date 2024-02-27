const loadData = async (value) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${value}`;
  const response = await fetch(url);
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("cards-container");

  phonesContainer.innerHTML = "";
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

// showing search data:
const searchFild = document.getElementById("search-input-fild");

searchFild.addEventListener("keyup", function () {
  const searchValue = searchFild.value;
  loadData(searchValue);
});

const searchButton = () => {
  const searchValue = searchFild.value;
  loadData(searchValue);
};

loadData();
