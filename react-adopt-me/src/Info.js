import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Info extends Component {
  // constructor () {
  //     super();

  state = { loading: true, showModal: false };
  // }
  async componentDidMount() {
    // like useEffect with [] - run at the beginning of every component being rendered
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
    // this.setState({
    //     loading: false,
    //     name: json.pets[0].name, etc...
    // });
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2> loading...</h2>; // loading icon or smth
    }
    // console.log(this.state);
    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    // throw new Error('lol');

    return (
      <div className={"details"}>
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${city}, ${state}`}</h2>
          {/*<h2>{animal} - {breed} - {city}, {state}</h2> same*/}
          <ThemeContext.Consumer>
            {/*using context with class components*/}
            {([theme]) => (
              <button onClick={this.toggleModal} style={{ background: theme }}>
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const InfoWithRouter = withRouter(Info);

export default function InfoWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <InfoWithRouter />
    </ErrorBoundary>
  );
}
