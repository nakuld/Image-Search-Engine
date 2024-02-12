const accessKey = "GyOT7jC9vmgaUzm-wad3tdx121cMostoMZMZeZ1iatI";

const searchForm = document.getElementById("search-form")
const imgSearchBox = document.getElementById("image-search-box");
const imgSearchResult = document.getElementById("image-result-box");
const imgLoadMore = document.getElementById("image-load-more");

let keyword = "";
let page = 1;

async function searchImages(){
  keyword = imgSearchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  if(page === 1){
    imgSearchResult.innerHTML = "";
  }

  // console.log(data);

  const results = data.results;

  results.map((result) =>{
    const image = document.createElement("img");
    image.src = result.urls.small;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    imageLink.appendChild(image);
    imgSearchResult.appendChild(imageLink);
  })

  imgLoadMore.style.display = "block"

}

searchForm.addEventListener("submit", (e) =>{
  e.preventDefault();
  page = 1;
  searchImages();
  return;
})

imgLoadMore.addEventListener("click", ()=>{
  page++
  searchImages();
})