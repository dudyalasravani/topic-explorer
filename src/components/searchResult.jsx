import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_GIT_TOPICS = gql`
  query SearchTopics($search: String!) {
    search(query: $search, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            stargazers {
              totalCount
            }
            resourcePath
            repositoryTopics(first: 10) {
              totalCount
              nodes {
                topic {
                  name
                  stargazerCount
                  relatedTopics {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function SearchResult(props) {
  const [newTopic, setTopic] = useState(props.value);
  const [search,setSearch] = useState('');
  const [searchTerm,setSearchTerm] = useState(props.value);


  useEffect(() => {
    if (props.value === newTopic) {
      setSearch(`${props.value} stars:>10000`);
    } else {
      setSearch(`${newTopic} stars:>10000`);
      setSearchTerm(newTopic);
      props.onChange(newTopic);
    }
  },[props])

  const { loading, error, data } = useQuery(GET_GIT_TOPICS, {
    variables: { search }
  });

    return (
    <React.Fragment> {loading &&       <div>
      <i className="fa fa-spinner fa-spin mr-4" />
      <span>...Searching for {search}</span>
    </div>}
    {error && <div>Error! {error.message}</div> }
      {data &&
        data.search.edges &&
        data.search.edges.map((edge, index) => (
          <ul className="list-group" key={index}>
            <li className="list-group-item">
              <div className="d-flex justify-content-between">
                <h5>{edge.node.resourcePath}</h5>
                <span className="badge badge-success badge-pill badge-star">
                  <i className="fa fa-star mr-2" aria-hidden="true" />
                  {edge.node.stargazers.totalCount}
                </span>
              </div>
              <div>
                Related Topics:
                {edge.node.repositoryTopics.nodes.map((node, j) => (
                  <button
                    key={j}
                    onClick={() => setTopic(node.topic.name)}
                    type="button"
                    className="btn btn-outline-info btn-sm mx-1 my-1"
                  >
                    {node.topic.name}{" "}
                    <span className="badge badge-light badge-pill">
                      <i className="fa fa-star m1-2" aria-hidden="true" />
                      {node.topic.stargazerCount}
                    </span>
                  </button>
                ))}
              </div>
            </li>
          </ul>
        ))}
    </React.Fragment>
  );
}

export default SearchResult;
