import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";
const { Meta } = Card;

const ScreenArticlesBySource = ({ addToWishList, user }) => {
  const [articleList, setArticleList] = useState([]);

  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  var { id } = useParams();

  useEffect(() => {
    const findArticles = async () => {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=d6909b1d94584011ba38de44d8101300`
      );
      const body = await data.json();
      console.log(body);
      setArticleList(body.articles);
    };

    findArticles();
  }, []);

  var showModal = (title, content) => {
    setVisible(true);
    setTitle(title);
    setContent(content);
  };

  var handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  var handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  async function sendTokenToBack(title, desc, img) {
    console.log("token send");
    console.log("The token is: ", user);
    console.log("title: ", title.title);
    console.log("Desc is:", title);
    const data = await fetch(`/newarticle`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `token=${user}&title=${title.title}&desc=${title.desc}&img=${title.img}`,
    });
    let res = await data.json();
    console.log(res);
  }
  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div className="Card">
        {articleList.map((article, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                width: 300,
                margin: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              cover={<img alt="example" src={article.urlToImage} />}
              actions={[
                <Icon
                  type="read"
                  key="ellipsis2"
                  onClick={() => showModal(article.title, article.content)}
                />,
                <Link to="/screenmyarticles">
                  <Icon
                    type="like"
                    key="ellipsis"
                    onClick={() => {
                      return (
                        addToWishList({
                          title: article.title,
                          desc: article.content,
                          img: article.urlToImage,
                        }),
                        sendTokenToBack({
                          title: article.title,
                          desc: article.content,
                          img: article.urlToImage,
                        })
                      );
                    }}
                  />
                </Link>,
              ]}
            >
              <Meta title={article.title} description={article.description} />
            </Card>
            <Modal
              title={title}
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>{content}</p>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  console.log("4-State: ", state);
  return { user: state.user };
}
function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({
        type: "add",
        actionArticles: article,
      });
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenArticlesBySource);
