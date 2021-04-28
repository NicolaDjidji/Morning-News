import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";
import lottie from "lottie-web";
const { Meta } = Card;

const ScreenMyArticles = ({ article, deleteToWishList }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const container = useRef(null);
  console.log(article);
  var showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      render: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./error.json"),
    });
  }, []);
  var handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  var handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  var newCard = [];

  article.map((singleArticle, i) => {
    newCard.push(
      <div key={i}>
        <Card
          style={{
            width: 300,
            margin: "15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          cover={<img alt="example" src={singleArticle.img} />}
          actions={[
            <Icon type="read" key="ellipsis2" />,
            <Icon
              type="delete"
              onClick={() => deleteToWishList(singleArticle.title)}
              key="ellipsis"
            />,
          ]}
        >
          <Meta title={singleArticle.title} description={singleArticle.desc} />
        </Card>
        <Modal
          title={title}
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{singleArticle.desc}</p>
        </Modal>
      </div>
    );
  });

  if (article.length > 0) {
    return (
      <div>
        <Nav />

        <div className="Banner" />

        <div className="Card">
          <div style={{ display: "flex", justifyContent: "center" }}>
            {newCard}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="CardError">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 className="error">There is nothing to see here</h1>
          <div className="container" ref={container}></div>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return { article: state.articles };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (articleTitle) {
      dispatch({
        type: "deleteArticle",
        title: articleTitle,
      });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
