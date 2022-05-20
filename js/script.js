//profile info
const itsMe = document.querySelector(".overview");
const username = "tiffy3b";
const repoList = document.querySelector(".repo-list");
const repoInfo = document.querySelector(".repos");
const singleRepoData = document.querySelectorAll(".repo-data");

const myProfile = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const profile = await response.json();
    api(profile);
};

myProfile();

const api = function (profile){
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${profile.name}</p>
    <p><strong>Bio:</strong> ${profile.bio}</p>
    <p><strong>Location:</strong> ${profile.location}</p>
    <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div>`;
    itsMe.append(div);
    fetchRepoList();
};
const fetchRepoList = async function (){
    const repo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const list = await repo.json();
    listClasses(list);
};
const listClasses = function (repos) {
    for (const repo of repos) {
        const listRepo = document.createElement("li");
        listRepo.classList.add("repo");
        listRepo.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listRepo);
    }
};
repoList.addEventListener("click", function (e){
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        singleRepoInfo(repoName);
    }
});
const singleRepoInfo = async function (repoName){
    const grabInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const info = await grabInfo.json();
    console.log(info);
    const fetchLanguages = await fetch (info.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
        for (const language in languageData){
        languages.push(language);}

        specificRepo(repoInfo, languages);
};
const specificRepo = function (repoInfo, languages){
    singleRepoData.innerHTML = "";
    singleRepoData.classList.remove("hide");
    repoInfo.classList.add("hide");
    const div = document.createElement("div");
    div.innerHTML = `
        <h3>Name: ${info.name}</h3>
        <p>Description: ${info.description}</p>
        <p>Default Branch: ${info.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${info.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    singleRepoData.append(div);
};