const apiURL = "http://localhost:3030/jsonstore/blog/";
const selectMenu = document.querySelector("#posts");
const postInfoOutput = document.querySelector("#post-body");
const commentsList = document.querySelector("#post-comments");
const postTitleHeading = document.querySelector("#post-title");
let postsData;

function attachEvents() {

    const loadPostsBtn = document.querySelector("#btnLoadPosts");
    loadPostsBtn.addEventListener("click", loadAllPosts);
    const viewPostBtn = document.querySelector("#btnViewPost");
    viewPostBtn.addEventListener("click", viewPostAndComments)
};

async function loadAllPosts() {
    postsData = await ((await fetch(`${apiURL}posts`)).json())

    Object.entries(postsData).map(([key, value]) => {
        let option = document.createElement("option");
        option.value = key;
        option.textContent = postsData[key].title;
        selectMenu.appendChild(option);
    })
};

async function viewPostAndComments() {
    clearOldData();

    let currentPostID = selectMenu.value;

    postTitleHeading.textContent = postsData[currentPostID].title;
    postInfoOutput.textContent = postsData[currentPostID].body;

    let allComments = await ((await fetch(`${apiURL}comments`)).json());

    Object.values(allComments)
        .filter(comment => comment.postId === currentPostID)
        .map(element => {
            let newListItem = document.createElement("li");
            newListItem.id = element.id;
            newListItem.textContent = element.text;

            commentsList.appendChild(newListItem);
        });
};

function clearOldData() {
    postTitleHeading.textContent = "Post Details";
    postInfoOutput.innerHTML = "";
    commentsList.innerHTML = "";
};

attachEvents();