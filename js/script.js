/**** Display repos ****/
const displayRepos = document.querySelector(".repo-list");

/**** where profile info will appear ****/
const overview = document.querySelector(".overview");
const username = "KatrinaDH";

const getData = async function() {
  const userInfo = await fetch(
   `https://api.github.com/users/${username}`
  );
  const data = await userInfo.json();
  displayInfo(data);
};

getData();


/***** fetch github user data *****/
const displayInfo = function(data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
  <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(div);
    getRepo();
};

/**** fetch repos from github ****/
const getRepo = async function() {
  const fetchRepos = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await fetchRepos.json();
  displayRepoInfo(repoData);
};

/**** display info about repos ****/
const displayRepoInfo = function (repos){
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    displayRepos.append(repoItem);
  }
};
