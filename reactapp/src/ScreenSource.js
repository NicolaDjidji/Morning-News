import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import Banner from "./Banner";
function ScreenSource(props) {
  console.log("props", props);
  const [sourceList, setSourceList] = useState([]);
  const [sourceENList, setSourceENList] = useState([]);
  const [country, setCountry] = useState(true);

  useEffect(() => {
    const APIResultsLoading = async () => {
      const data = await fetch(
        "https://newsapi.org/v2/sources?language=fr&country=fr&apiKey=5394d73e58b94d0c8376c181ce3015da"
      );
      const body = await data.json();
      setSourceList(body.sources);
    };

    APIResultsLoading();
  }, []);
  useEffect(() => {
    const usAPI = async () => {
      const data = await fetch(
        "https://newsapi.org/v2/sources?country=us&language=en&apiKey=5394d73e58b94d0c8376c181ce3015da"
      );
      const body = await data.json();
      setSourceENList(body.sources);
    };

    usAPI();
  }, []);

  if (props.country) {
    return (
      <div>
        <Nav />
        <Banner flag1="flag1" flag2="flag2" />
        <div className="HomeThemes">
          <List
            itemLayout="horizontal"
            dataSource={sourceList}
            renderItem={(source) => (
              <Link to={`/screenarticlesbysource/${source.id}`}>
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`/images/${source.category}.png`} />}
                    title={source.name}
                    description={source.description}
                  />
                </List.Item>
              </Link>
            )}
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <Nav />

      <Banner flag1="flag1" flag2="flag2" />

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceENList}
          renderItem={(source) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${source.category}.png`} />}
                title={
                  <Link to={`/screenarticlesbysource/${source.id}`}>
                    {source.name}
                  </Link>
                }
                description={source.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return { country: state.country };
}
export default connect(mapStateToProps, null)(ScreenSource);
