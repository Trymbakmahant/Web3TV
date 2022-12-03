import { Link } from "react-router-dom";
function UploadHOme() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Hello there Wellcome to WEB3TV</h1>
          <p className="py-8 text-2xl">
            in WEB3TV you have freedom to share your content with others without
            having to worry about world . if you have good content.
          </p>
          <Link
            style={{ marginRight: "20px" }}
            exact
            className="btn btn-primary"
            to="/uploadvideo"
          >
            Upload Video
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UploadHOme;
