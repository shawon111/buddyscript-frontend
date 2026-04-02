"use client";

export default function TestDropdown() {
  return (
    <div className="dropdown m-5">
      <button
        className="btn btn-secondary dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        Dropdown
      </button>

      <ul className="dropdown-menu">
        <li><a className="dropdown-item">Action</a></li>
        <li><a className="dropdown-item">Another action</a></li>
      </ul>
    </div>
  );
}