export default function (token = "", action) {
  switch (action.type) {
    case "newToken":
      console.log("action", action.token);
      const userToken = action.token;
      return userToken;
    default:
      return token;
  }
}
