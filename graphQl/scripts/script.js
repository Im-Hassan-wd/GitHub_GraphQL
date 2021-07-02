const form = document.querySelector('form');

const getUser = async (username) => {

  const userDetails = await getData(username);

  return userDetails;

}
form.addEventListener('submit', e => {
  e.preventDefault();

  const username = form.username.value.trim();
  form.reset();

  // get user
  getUser(username)
    .then(data => console.log(data))
    .catch(err => console.log(err))
});
