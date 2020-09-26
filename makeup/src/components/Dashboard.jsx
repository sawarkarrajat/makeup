import React, { useState } from "react";
import "../sass/Dashboard.sass";
import Navbar from "./Navbar";
import searchIcon from "../asset/search.png";
import crossIcon from "../asset/cross.png";
import makeupData from "../makeupData.json";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import Checkbox from "./Checkbox";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
/**
 * Root page of site or main page for SPA
 */
function Dashboard() {
  let muData = Object.assign([{}], makeupData);
  const extractionLabels = (label) => {
    return [...new Set(muData.map((item) => item[label]))];
  };
  const extractionTaglist = () => {
    let tags = [];
    muData.forEach((item) => {
      item.tag_list.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    return tags;
  };
  const [searchText, setSearchText] = useState("");
  const brand = extractionLabels("brand");
  const category = extractionLabels("category");
  const product_type = extractionLabels("product_type");
  const tag_list = extractionTaglist();
  const [isLoading, setIsLoading] = useState(false);
  const [currentlyDisplayedCards, setCurrentlyDisplayedCards] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const fakeLoading = () => {
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  };
  const autoCompleteSearch = (searchedText) => {
    setSearchText(searchedText);
    let matches = muData.filter((product) => {
      const regex = new RegExp(`^${searchedText}`, "gi");

      return (
        product.brand?.match(regex) ||
        product.name?.match(regex) ||
        product.category?.match(regex) ||
        product.product_type?.match(regex)
      );
    });
    if (searchedText.length === 0) {
      matches = [];
      setSuggestions([]);
    }
    console.table(matches);
    setSuggestions(matches);
  };
  const handleSearchClear = (e) => {
    e.preventDefault();
    setSearchText("");
    setSuggestions([]);
    setCurrentlyDisplayedCards([]);
  };
  const handleSuggestionClick = (e, name) => {
    e.preventDefault();
    setSearchText(name);
    setSuggestions([]);
  };
  const handleKey = (event) => {
    if (
      event.keyCode === 13 ||
      event.which === 13 ||
      event.key === "Enter" ||
      event.button === 0
    ) {
      fakeLoading();
      setCurrentlyDisplayedCards(suggestions);
      setSuggestions([]);
    }
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    fakeLoading();
    setCurrentlyDisplayedCards(suggestions);
  };
  return (
    <div className="dashboard__main">
      <Navbar />
      <div className="dashboard__container">
        <div className="dashboard__filter">
          <h3>filters</h3>
          <hr />
          <br />
          <div className="dashboard__filterLabel">
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId="1" label="Applications">
                <Checkbox label={brand[0]} />
                <Checkbox label={brand[1]} />
                <Checkbox label={brand[2]} />
                <Checkbox label={brand[3]} />
              </TreeItem>
            </TreeView>
          </div>
        </div>
        <div className="dashboard__aside">
          <div className="dashboard__searchPanel">
            <input
              type="text"
              value={searchText}
              onChange={(e) => autoCompleteSearch(e.target.value)}
              onKeyUp={(event) => {
                return handleKey(event);
              }}
              autoComplete="on"
              placeholder="search for products here..."
              className="dashboard__searchInput"
            />
            <button
              className="dashboard__searchButton"
              onClick={(e) => handleSearchButton(e)}
            >
              search
              <img src={searchIcon} alt="search" />
            </button>
            <button
              className="dashboard__clearButton"
              onClick={(e) => handleSearchClear(e)}
            >
              clear
              <img src={crossIcon} alt="cross" />
            </button>
          </div>
          {suggestions.length > 0 && (
            <div className="dashboard__searchSuggestions">
              {suggestions.map((product) => (
                <div
                  key={product.id}
                  className="dashboard__suggestion"
                  onClick={(e) => handleSuggestionClick(e, product.name)}
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
          {isLoading ? (
            <div className="dashboard__cardsContainer">
              <LoadingSkeleton />
            </div>
          ) : (
            <div className="dashboard__cardsContainer">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
