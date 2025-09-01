import { Header } from "../common-components/header";
import { useState } from "react";

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Header 
        title="Employees" 
        showSearchBar={true} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
      />
      <div className="p-6">
        <p>Employees Content</p>
      </div>
    </div>
  );
};

export default Employees;
