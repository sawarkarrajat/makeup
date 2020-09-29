import React, { useState } from "react";
import "../sass/Dashboard.sass";
import Navbar from "./Navbar";
import searchIcon from "../asset/search.png";
import crossIcon from "../asset/cross.png";
import makeupData from "../makeupData.json";
// import TreeView from "@material-ui/lab/TreeView";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";
// import TreeItem from "@material-ui/lab/TreeItem";
// import Checkbox from "./Checkbox";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import girlImg from "../asset/girl.png";
import girlhhm from "../asset/girlhhmm.png";
/**
 * Root page of site or main page for SPA
 */
let muData = Object.assign([{}], makeupData);
// const extractionLabels = (label) => {
//   return [...new Set(muData.map((item) => item[label]))];
// };

// const extractionTaglist = () => {
//   let tags = [];
//   muData.forEach((item) => {
//     item.tag_list.forEach((tag) => {
//       if (!tags.includes(tag)) {
//         tags.push(tag);
//       }
//     });
//   });
//   return tags;
// };

// const brand = extractionLabels("brand");
// const category = extractionLabels("category");
// const product_type = extractionLabels("product_type");
// const tag_list = extractionTaglist();

const TypeSomething = () => {
  return (
    <div className="dashboard__msgContainer">
      <img src={girlImg} alt="girlmakeup" className="dashboard__girlImage" />
      <h3>
        type something in search bar above <br />
        to find products you might like...
      </h3>
    </div>
  );
};
const NothingFound = () => {
  return (
    <div className="dashboard__msgContainer">
      <h2>hhmm couldn't find anything...</h2>
      <img src={girlhhm} alt="girlmakeup" className="dashboard__girlImage" />
    </div>
  );
};

function Dashboard() {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noResultsMsg, setNoResultsMsg] = useState(false);
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
      setNoResultsMsg(false);
    }

    setSuggestions(matches);
  };
  const searchSequence = () => {
    fakeLoading();
    if (suggestions.length === 0) {
      setNoResultsMsg(true);
    }
    setCurrentlyDisplayedCards(suggestions);
    setSuggestions([]);
  };
  const handleSearchClear = (e) => {
    e.preventDefault();
    setSearchText("");
    setSuggestions([]);
    setCurrentlyDisplayedCards([]);
    setNoResultsMsg(false);
  };
  const handleSuggestionClick = (e, name) => {
    e.preventDefault();
    setSearchText(name);
    searchSequence();
  };
  const handleKey = (event) => {
    event.preventDefault();

    if (
      event.keyCode === 13 ||
      event.which === 13 ||
      event.key === "Enter" ||
      event.button === 0
    ) {
      searchSequence();
    }
  };
  const handleSearchButton = (e) => {
    e.preventDefault();
    searchSequence();
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
            {/* <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              <TreeItem nodeId="1" label="Applications">
                <Checkbox label={brand[0]} />
                <Checkbox label={brand[1]} />
                <Checkbox label={brand[2]} />
                <Checkbox label={brand[3]} />
              </TreeItem>
            </TreeView> */}
          </div>
        </div>
        <div className="dashboard__aside">
          <div className="dashboard__searchPanel">
            <input
              type="text"
              value={searchText}
              onChange={(e) => autoCompleteSearch(e.target.value)}
              onKeyUp={(e) => {
                return handleKey(e);
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
                  <p className="dashboard__suggestionName">{product.name}</p>
                  <p className="dashboard__suggestionCategory">
                    {!product.category ? "none" : product.category}
                  </p>
                  <p className="dashboard__suggestionBrand">
                    {!product.brand ? "no brand" : product.brand}
                  </p>
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
              {currentlyDisplayedCards?.length > 0 ? (
                currentlyDisplayedCards.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : noResultsMsg ? (
                <NothingFound />
              ) : (
                <TypeSomething />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
