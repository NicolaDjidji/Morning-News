import React from "react";
import "./App.css";
import { connect } from "react-redux";
function Banner(props) {
  console.log(props);
  return (
    <div>
      <div className="Banner">
        <div
          onClick={() => props.changeSource(props.flag1)}
          className={props.flag1}
        />
        <div
          onClick={() => props.changeSource(props.flag2)}
          className={props.flag2}
        />
      </div>
    </div>
  );
}
function mapDispatchToProps(dispatch) {
  return {
    changeSource: function (country) {
      dispatch({
        type: "change",
        country,
      });
    },
  };
}
export default connect(null, mapDispatchToProps)(Banner);
