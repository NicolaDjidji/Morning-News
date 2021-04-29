export default function (article = [], action) {
  switch (action.type) {
    case "add":
      var articlesCopy = [...article];
      articlesCopy.push(action.actionArticles);
      return articlesCopy;
    case "deleteArticle":
      var articlesCopy = [...article];
      var position = null;
      for (let i = 0; i < articlesCopy.length; i++) {
        console.log(action);
        console.log(articlesCopy[i].title);
        if (articlesCopy[i].title == action.title) {
          console.log("wow");
          position = i;
          articlesCopy.splice(position, 1);
        }
      }
      return articlesCopy;
    default:
      return article;
  }
}
