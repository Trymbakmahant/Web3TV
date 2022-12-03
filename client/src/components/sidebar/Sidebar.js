function Sidebar() {
  return (
    <div className="" style = {{display: "inline-block"}}>
      <div>
        <div className="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 bg-base-100 text-base-content">
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Subscriptions</a>
              </li>
            </ul>
          </div>
        </div>{" "}
      </div>

      {/* <UploadVideos /> */}
    </div>
  );
}

export default Sidebar;
