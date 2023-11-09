function comments(stringsArray) {
    const users = [];
    const articles = {};
    const commentsCount = {};

    const conditions = {
        userExists: (username) => users.find(element => element === username),
        articleExists: (article) => Object.keys(articles).find(key => key === article)
    };

    function storeCommentData(username, article, commentTitle, commentContent) {
        if (Object.keys(articles[article]).find(key => key === username)) {
            articles[article][username].push({
                title: commentTitle,
                content: commentContent
            });
            commentsCount[article] += 1
        } else {
            articles[article][username] = [{
                title: commentTitle,
                content: commentContent
            }];
            commentsCount[article] += 1
        };
    };

    function workWithComments(element) {
        let [username, data] = element.split(" posts on ");
        if (conditions.userExists(username)) {
            let [article, commentData] = data.split(": ");
            if (conditions.articleExists(article)) {
                let [commentTitle, commentContent] = commentData.split(", ");
                if (commentContent) storeCommentData(username, article, commentTitle, commentContent);
            };
        };
    };

    function logOutput() {
        let sortedArticles = Object.keys(commentsCount).sort().sort((a, b) => commentsCount[b] - commentsCount[a])

        for (let article of sortedArticles) {
            console.log(`Comments on ${article}`)
            sortedUsers = Object.keys(articles[article]).sort((a, b) => a.localeCompare(b))
            sortedUsers.forEach((user) => {
                for (let comment of articles[article][user]) {
                    console.log(`--- From user ${user}: ${comment.title} - ${comment.content}`)
                };
            });
        };
    };

    function main(input) {
        input.map((element) => {
            if (element.startsWith("user")) users.push(element.slice(5));
            else if (element.startsWith("article")) {
                articleName = element.slice(8)
                articles[articleName] = {};
                commentsCount[articleName] = 0;
            }
            else if (element.includes("posts on")) workWithComments(element);
        });

        logOutput();
    }
    main(stringsArray);
}