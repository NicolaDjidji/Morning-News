export default function (token = "", action) {
  console.log("2.1 token", token);
  console.log("2.1 action", action);
  switch (action.type) {
    case "newToken":
      console.log("2.2-TOKEN reducer", action.token);
      const userToken = action.token;
      return userToken;
    default:
      return token;
  }
}
