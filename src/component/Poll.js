import React from "react";

export default function Poll(props) {
  return (
    <>
      <div className="col-lg-6">
        <div className="poll-details">
          <ul className="poll-tab">
            <li className="active">
              <a href="#">Poll#1</a>
            </li>
            <li>
              <a href="#">Poll#2</a>
            </li>
            <li>
              <a href="#">Poll#2</a>
            </li>
          </ul>

          <div className="poll-content">
            <div className="poll-title">
              Where should the next concert be held?
            </div>
            <div className="poll-vote-list">
              <div className="list-title">
                <span>Answer</span>
                <span>Votes</span>
              </div>
              <div className="poll-vot-count">
                <div className="vote-details">
                  <span className="poll-name">Chicago, IL</span>
                  <span className="poll-number">137,082</span>
                </div>
              </div>
              <div className="poll-vot-count">
                <div className="vote-details">
                  <span className="poll-name">Chicago, IL</span>
                  <span className="poll-number">137,082</span>
                </div>
              </div>
              <div className="poll-vot-count">
                <div className="vote-details">
                  <span className="poll-name">Chicago, IL</span>
                  <span className="poll-number">137,082</span>
                </div>
              </div>
              <div className="poll-vot-count">
                <div className="vote-details">
                  <span className="poll-name">Chicago, IL</span>
                  <span className="poll-number">137,082</span>
                </div>
              </div>
              <button className="vote-btn">Cast Your Vote</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
