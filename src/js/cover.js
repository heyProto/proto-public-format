import React, { Component } from "react";
import posed, { PoseGroup } from "react-pose";
import {get as axiosGet} from "axios";
import "../css/cover.css";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      dataJSON: undefined,
      prevFlow: undefined,
      currentFlow: {}
    };
    this.filters = {};
  }

  componentDidMount() {
    axiosGet(this.props.dataURL)
      .then(response => {
        let data = response.data;
        this.setState({ dataJSON: data.flows, fetchingData: false, currentFlow: data.flows[0] })});
  }

  handleClick = (filterable, filter, type) => {

    if(filterable) {
      if(!this.filters || !this.filters[type]) {
        this.filters[type] = [];
        this.filters[type].push(filter);
      } else {
        let index = this.filters[type].findIndex(x => x === filter);
        if(index < 0) {
          this.filters[type].push(filter);
        } else {
          this.filters[type].splice(index,1);
          if(this.filters[type].length === 0)
            delete this.filters[type];
        }
      } 
    } else {
      this.setState(prevState => {
        let flow = prevState.dataJSON.find(x => x.id === filter);
        return {
          prevFlow: prevState.currentFlow,
          currentFlow: flow
        }
      })
    }
  };

  goHome = () => {
    this.setState(prevState => {
      return {
        prevFlow: undefined,
        currentFlow: prevState.prevFlow
      }
    });
    this.filters = {};
    this.props.onSubmit(this.filters);
  };

  render() {
    if (this.state.fetchingData) {
      return <p>Loading...</p>;
    } else  {
      const data = this.state.dataJSON;
      const currentFlow = data.find(x => x.id === this.state.currentFlow.id);
      if (currentFlow) {
        // const CurrentQ = posed.div({
        //   enter: {
        //     y: 0,
        //     x: 0,
        //     scale: 1,
        //     opacity: 1,
        //     delay: 0,
        //     transition: { duration: 0 }
        //   },
        //   exit: {
        //     y: -50,
        //     x: -300,
        //     scale: 0.5,
        //     opacity: 0,
        //     transition: { type: "tween", duration: 200 }
        //   }
        // });

        // const Flows = posed.div({
        //   enter: {
        //     y: 0,
        //     opacity: 1,
        //     delay: 300,
        //     transition: { duration: 200 }
        //   },
        //   exit: {
        //     y: 50,
        //     opacity: 0,
        //     transition: { type: "tween", duration: 200 }
        //   }
        // });

        return (
          <div className="container">
            <div className="question-card">
              <div className="header">
                <div className="prev-q" >
        {this.state.prevFlow && <img src="https://cdn.protograph.pykih.com/Assets/filter-cover/home.png" alt="" className="icon" onClick={this.goHome} />} {currentFlow.headline}
                </div>
              </div>
              <div className="content">
                <div className="current-q">
                  {currentFlow.question}
                </div>
              </div>
              <div className="flows">
                {currentFlow.sections.map((item, i) => (
                  <div
                    className="flow-section"
                    style={{ width: (Math.floor(100/currentFlow.sections.length) + '%') }}
                    id={i}
                    key={i}
                  >
                    <div className="section-area">
                      <div className="flow-header">{item.title}</div>
                      {item.options.map(x => (
                        <div className="choice-div" key={x.filter}>
                          <label>
                            <input
                              type="checkbox"
                              className="hidden"
                              key={x.filter}
                              id={x.filter}
                              onClick={() => this.handleClick(currentFlow.filterable, x.filter, item.type)}
                            />
                            <span className="choice-button">{x.name}</span>
                          </label>
                          {x.description && <div className="choice-desc">{x.description}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

              {currentFlow.filterable && <button
                className="submit-button"
                onClick={() => this.props.onSubmit(this.filters)}
              >Submit</button>}
            </div>
          </div>
        );
      } else {
        return <p>Incorrect flow navigation, please check data.</p>;
      }
    }
  }
}

export default QuestionCard;
