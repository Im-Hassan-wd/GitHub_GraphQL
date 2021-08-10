const getData = async (loginName) => {

  const graphqlQuery = JSON.stringify ({
    query: `{
       user(login: "${loginName}") {
       name
       login
       bio
       avatarUrl
       repositories(last: 20) {
           nodes {
           url
           name
           updatedAt
           stargazerCount
           forkCount
           primaryLanguage {
               langName:name
               color
           }
               }
           }
       }
    }`
  });

  const base = 'https://api.github.com/graphql';
  const query = { method: 'post', body: graphqlQuery, headers: { 'Content-Type': 'application/json', 'Content-Length': graphqlQuery.length, Authorization: `Bearer ${key}` } }

  const response = await fetch(base, query);
  const data = await response.json();

  return data.data;

}
// getData("iamshaunjp")
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
