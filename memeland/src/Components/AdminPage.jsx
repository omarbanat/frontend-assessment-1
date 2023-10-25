import React from "react";
import "../css/HomePage.css";
import AdminTopPage from "./AdminTopPage";
import AdminTablePage from "./AdminTablePage";
import AdminAddMeme from "./AdminAddMeme";
const AdminPage = () => {
  return (
    <div>
      <AdminTopPage />
      <AdminTablePage/>
      <AdminAddMeme />
    </div>
  );
};

export default AdminPage;
