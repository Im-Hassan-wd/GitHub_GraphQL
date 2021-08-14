const form = document.querySelector('form');
const userImage = document.querySelector('.user-image');
const aside = document.querySelector('aside');
const mainList = document.querySelector('.main-content-list');
const userRepository = document.querySelector('.user-repository');
const burger = document.querySelector('.burger i');
const menu = document.querySelector('.nav-search');
const repository = document.querySelector('#repository');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
  burger.classList.toggle('fa-times');
  repository.classList.toggle('active');
});

const updateUI = (data) => {

  const userDetails = data.user;
  const repositories = data.user.repositories.nodes;

  // update user detaills
  userImage.innerHTML = `
      <img src="${userDetails.avatarUrl}" alt="">
      <i class="fas fa-caret-down"></i>
  `;
  aside.innerHTML = `
      <div class="avatar">
        <img src="${userDetails.avatarUrl}" alt="">
      </div>
      <div class="about">
        <h1>${userDetails.name}</h1>
        <h2>${userDetails.login}</h2>
        <p>${userDetails.bio}</p>
      </div>
  `;
  mainList.innerHTML = `
    <div class="list">
      <i class="fas fa-book-open"><a href="#">Overview</a></i>
      <i class="fas fa-"><a href="#">Repositories</a>${repositories.length}</i>
      <i class="fas fa-poll"><a href="#">Projects</a></i>
      <i class="fas fa-dice-d6"><a href="#">Packages</a></i>
    </div>
  `;
    userRepository.innerHTML = `
    <div class="search">
      <input type="text" name="search" placeholder="find a repository..." autocomplete="off">
    </div>

    <div class="result">
      <p><b>${repositories.length}</b> results for <b>public</b> repositories</p>
    </div>
    `;
  repositories.forEach(({name,updatedAt,forkCount, primaryLanguage, stargazerCount, url})=> {
    userRepository.innerHTML += `
          <div class="repositories">
            <div class="title">
              <a href="${url}" target="_blank">${name}</a>
            </div>
            <div class="details">
              <div class="language">
                <div class=""></div>
                <div></div>
              </div>

              <div class="star">
                <i class="far fa-star"></i>
                <div>${stargazerCount}</div>
              </div>

              <div class="york">
                <i class="fas fa-code-branch"></i>
                <div>${forkCount}</div>
              </div>

              <div class="updated">
                <p>${updatedAt.slice(0, 10)}</p>
              </div>
            </div>
          </div>
    `;
});
}

const error = (err) =>{
  repository.innerHTML = '<h1>Oops! This user profile does not exist.</h1>';
}
// geting user details
const getUser = async (username) => {

  const userDetails = await getData(username);

  return userDetails;

}
form.addEventListener('submit', e => {
  e.preventDefault();

  const username = form.username.value.trim();
  form.reset();
  menu.classList.remove('active');
  burger.classList.remove('fa-times');
  repository.classList.remove('active');

  // get user
  getUser(username)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});
