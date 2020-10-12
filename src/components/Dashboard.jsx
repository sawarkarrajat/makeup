import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import "../sass/Dashboard.sass";
import Navbar from "./Navbar";
import searchIcon from "../asset/search.png";
import crossIcon from "../asset/cross.png";
import check from "../asset/check.png";
import muData from "../makeupData.json";
import { useStateValue } from "./StateProvider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import girlImg from "../asset/girl.png";
import girlhhm from "../asset/girlhhmm.png";
import FilterTree from "./FilterTree";
import PriceRange from "./PriceRange";
import StarRating from "./StarRating";
import { ratingFilter } from "./filterServices";

// let muData = Object.assign([{}], makeupData);
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

const brand = extractionLabels("brand");
const tag_list = extractionTaglist();

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

const autocompleteFilter = (searchedText) => {
  let matches = muData.filter((product) => {
    const regex = new RegExp(`^${searchedText}`, "gi");

    return (
      product.brand?.match(regex) ||
      product.name?.match(regex) ||
      product.category?.match(regex) ||
      product.product_type?.match(regex)
    );
  });
  return matches;
};
// const entityFilter = (products, entityName, value) => {
//   let data = products.filter((item) => item[entityName] === value);
//   console.log("value in entity filter", data);
// };

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noResultsMsg, setNoResultsMsg] = useState(false);
  const [currentlyDisplayedCards, setCurrentlyDisplayedCards] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [
    { brandFiltersArray, tagFiltersArray, priceMin, priceMax, rating },
    dispatch,
  ] = useStateValue();
  const searchInput = useRef(null);
  const fakeLoading = () => {
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  };

  const autoCompleteSearch = (e) => {
    e.preventDefault();
    let stext = e.target.value.trim(),
      matches;
    setSearchText(stext);
    if (stext.length === 0) {
      matches = [];
      setSuggestions([]);
      setNoResultsMsg(false);
      return;
    } else {
      matches = autocompleteFilter(stext);
      setSuggestions(matches);
    }
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
  };
  const handleSuggestionClick = (e, product) => {
    e.preventDefault();
    setSearchText(product.name);
    fakeLoading();
    setSuggestions([]);
    setCurrentlyDisplayedCards([product]);
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
  const handleClearFilters = (e) => {
    e.preventDefault();
    dispatch({
      type: "CLEAR_FILTER",
    });
  };
  const handleApplyFilters = async (e) => {
    e.preventDefault();
    if (currentlyDisplayedCards.length === 0) {
      toast("Search for a product to apply filters");
      searchInput.current.focus();
    } else {
      let products = Object.assign([{}], currentlyDisplayedCards);
      if (rating) {
        products = await ratingFilter(products, rating);
      }
      setCurrentlyDisplayedCards(products);
    }
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
            <FilterTree treeLabel="brands" checkboxArray={brand} />
            <FilterTree treeLabel="tags" checkboxArray={tag_list} />
            <PriceRange />
            <StarRating />
          </div>
          <div className="dashboard__filterActions">
            <button
              className="dashboard__clearFilter dashboard__Button"
              onClick={(e) => handleClearFilters(e)}
            >
              clear all
              <img src={crossIcon} alt="search" />
            </button>
            <button
              className="dashboard__applyFilter dashboard__Button"
              onClick={(e) => handleApplyFilters(e)}
            >
              apply filter
              <img src={check} alt="filters" />
            </button>
          </div>
        </div>
        <div className="dashboard__aside">
          <div className="dashboard__searchPanel">
            <input
              type="text"
              value={searchText}
              ref={searchInput}
              onChange={(e) => autoCompleteSearch(e)}
              onKeyUp={(e) => {
                return handleKey(e);
              }}
              autoComplete="on"
              placeholder="search for products here..."
              className="dashboard__searchInput"
            />
            <button
              className="dashboard__searchButton dashboard__Button"
              onClick={(e) => handleSearchButton(e)}
            >
              search
              <img src={searchIcon} alt="search" />
            </button>
            <button
              className="dashboard__clearButton dashboard__Button"
              onClick={(e) => handleSearchClear(e)}
            >
              clear
              <img src={crossIcon} alt="cross" />
            </button>
          </div>
          {suggestions.length > 0 && (
            <ClickAwayListener onClickAway={() => setSuggestions([])}>
              <div className="dashboard__searchSuggestions">
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    className="dashboard__suggestion"
                    onClick={(e) => handleSuggestionClick(e, product)}
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
            </ClickAwayListener>
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
};

export default Dashboard;
