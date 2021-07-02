const key = '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';

const getData = async (login) => {

  const graphqlQuery = JSON.stringify ({
    query: `{
       user(login: "${login}") {
       name
       login
       bio
       avatarUrl
       repositories(first: 20) {
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
