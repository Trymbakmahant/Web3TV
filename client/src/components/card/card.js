import { Link } from "react-router-dom";
import logo from "../images/logo.png";
function Card(props) {

  return (
    <div
      className="card card-compact w-96  bg-base-100 shadow-xl "
      style={{ height: "250px", marginTop: "7%", width: "650px"}}
    >
      <figure>

        <img src={props.thumbnail} alt="Shoes" style = {{width: "50px"}}/>

      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.description}</p>
        <div className="card-actions justify-end">
          <Link
            style={{ marginRight: "20px" }}
            exact
            className="btn btn-primary"
            to={"/player/" + props.creator + "/" + props.id}
          >
            Watch
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
