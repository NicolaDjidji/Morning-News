export default function (country = true, action) {
  switch (action.country) {
    case "flag1":
      console.log("action", action.country);
      if (!country) {
        country = true;
      }
      console.log(country);
      return country;
    case "flag2":
      console.log("action", action.country);
      if (country) {
        country = false;
      }
      console.log(country);
      return country;
    default:
      return country;
  }
}
