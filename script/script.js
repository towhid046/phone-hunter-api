const loadData = async () => {
  const url = "https://openapi.programming-hero.com/api/phones?search=iphone";
  const response = await fetch(url);
  const data = await response.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("cards-container");

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

          <div class="card-actions">
            <button class="btn btn-info text-white font-semibold text-lg">Show Details</button>
          </div>

        </div>
        `;

    phonesContainer.appendChild(div);
  });
};

loadData();
