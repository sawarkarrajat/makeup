import React, { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "../sass/Dashboard.sass";
import muData from "../makeupData.json";
import { useStateValue } from "./StateProvider";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Button from "@material-ui/core/Button";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import FilterTree from "./FilterTree";
import PriceRange from "./PriceRange";
import StarRating from "./StarRating";
import girlhhm from "../asset/girlhhmm.png";
import searchIcon from "../asset/search.png";
import crossIcon from "../asset/cross.png";
import girlImg from "../asset/girl.png";
import {
  ratingFilter,
  minMaxPriceFilter,
  tagsFilter,
  brandsFilter,
} from "./filterServices";

/**
 * this method is used to extract labels from the json data/file
 * @param {String} label
 * @returns {Array} label array
 */
const extractionLabels = (label) => {
  return [...new Set(muData.map((item) => item[label]))];
};
/**
 * this method is used to extract only tags from the json data/file
 * @returns {Array} tags array
 */
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

/**
 * used to store brand labels
 * @type {Array<String>}
 */
const brand = extractionLabels("brand");

/**
 * used to store tags list
 * @type {Array<String>}
 */
const tag_list = extractionTaglist();

/**
 * TypeSomething component for idle screen
 * @returns {HTML} component
 */
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
/**
 * Nothing found component for no results screen
 * @returns {HTML} component
 */
const NothingFound = () => {
  return (
    <div className="dashboard__msgContainer">
      <h2>hhmm couldn't find anything...</h2>
      <img src={girlhhm} alt="girlmakeup" className="dashboard__girlImage" />
    </div>
  );
};

/**
 * used to filter json data on the basis of text in searchbar
 *
 * @param {String} searchedText - text in searchbar
 * @returns {Array<Object>} matches - matches for the text in results
 */
const autoCompleteFilter = (searchedText) => {
  let matches = muData.filter((product) => {
    const regex = new RegExp(`^${searchedText}`, "gi");
    //finding matches on the basis of name, brand, category, and product type
    return (
      product.brand?.match(regex) ||
      product.name?.match(regex) ||
      product.category?.match(regex) ||
      product.product_type?.match(regex)
    );
  });
  return matches;
};

/**
 * Dashboard component - the root component of app
 * @property {function}
 * @returns {JSX}
 */
const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [noResultsMsg, setNoResultsMsg] = useState(false);
  const [currentlyDisplayedCards, setCurrentlyDisplayedCards] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searcheditems, setSearcheditems] = useState([]);
  const [
    { brandFiltersArray, tagFiltersArray, priceMin, priceMax, rating },
    dispatch,
  ] = useStateValue();
  const [pageContainer, setPageContainer] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalNoOfPages, setTotalNoOfPages] = useState();
  const cardContainer = useRef(null);

  /**
   * to bring card container into view
   */
  const scrollinview = () => {
    cardContainer.current.scrollIntoView();
  };

  /**
   * this method is used to replicate api hit behaviour
   */
  const fakeLoading = () => {
    setIsLoading(true);
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  };

  /**
   * the autocomletesearch is called to generate suggestion for text in input of searchbar
   *
   * @param {Object} e - event object containing value parameters
   */
  const autoCompleteSearch = async (e) => {
    e.preventDefault();
    let stext = e.target.value,
      matches;
    setSearchText(stext);
    if (stext.length === 0) {
      matches = [];
      setSuggestions([]);
      setNoResultsMsg(false);
      return;
    } else {
      matches = await autoCompleteFilter(stext.trim());
      setSuggestions(matches);
    }
  };

  /**
   * this method replicates hitting of api and sets the contents of page
   */
  const searchSequence = () => {
    fakeLoading();
    if (suggestions.length === 0) {
      setNoResultsMsg(true);
      return;
    }
    setSearcheditems(suggestions);
    setCurrentlyDisplayedCards(suggestions);
    setSuggestions([]);
  };

  /**
   * this method is used to clear text in searchbar
   *
   * @param {Object} e
   */
  const handleSearchClear = (e) => {
    e.preventDefault();
    setSearchText("");
    setSuggestions([]);
  };

  /**
   * this method is called to process click on suggestion which in turn shows the product
   *
   * @param {Object} e
   * @param {Object} product - object containing all the details of clicked product
   */
  const handleSuggestionClick = (e, product) => {
    e.preventDefault();
    setSearchText(product.name);
    fakeLoading();
    setSuggestions([]);
    setCurrentlyDisplayedCards([product]);
  };
  /**
   * this method is called to check if filters exist
   * @returns {Boolean}
   */

  const checkIfFiltersApplied = useCallback(() => {
    // console.log("value in checkIfFiltersApplied", {
    //   brandFiltersArray,
    //   tagFiltersArray,
    //   priceMin,
    //   priceMax,
    //   rating,
    // });

    if (
      brandFiltersArray.length === 0 &&
      tagFiltersArray.length === 0 &&
      priceMin === "" &&
      priceMax === "" &&
      rating === 0
    ) {
      return false;
    } else {
      return true;
    }
  }, [brandFiltersArray, tagFiltersArray, priceMin, priceMax, rating]);

  /**
   * method awaken when enter key is pressed in search bar to initiate search sequence
   *
   * @param {Object} e
   */
  const handleKey = (e) => {
    e.preventDefault();

    if (
      e.keyCode === 13 ||
      e.which === 13 ||
      e.key === "Enter" ||
      e.button === 0
    ) {
      handleSearchButton(e);
    }
  };

  /**
   * handles search sequence on search button click
   *
   * @param {Object} e
   */
  const handleSearchButton = (e) => {
    e.preventDefault();
    searchSequence();
    console.log("filters exist", checkIfFiltersApplied());
  };

  /**
   * this method clears all the applied filter and resets the global filter state and localstorage
   *
   * @param {Object} e
   */
  const handleClearFilters = (e) => {
    e.preventDefault();
    dispatch({
      type: "CLEAR_FILTER",
    });
    setCurrentlyDisplayedCards(searcheditems);
    localStorage.clear();
  };

  /**
   * this method is invoked every time the context
   * of currently displayed cards change to accomodate pagination
   */
  const paginationSequence = useCallback(() => {
    setTotalNoOfPages(Math.ceil(currentlyDisplayedCards.length / 15));
    let itemsArray = [];
    var cursor = 0;
    let tempContainer = [];
    setPageContainer([]);
    for (let index = 0; index < totalNoOfPages; index++) {
      for (let item = 0; item < 15; item++) {
        if (currentlyDisplayedCards[cursor] !== undefined) {
          itemsArray.push(currentlyDisplayedCards[cursor]);
          cursor++;
        } else {
          continue;
        }
      }
      tempContainer.push(itemsArray);
      itemsArray = [];
    }
    setPageContainer(tempContainer);
  }, [currentlyDisplayedCards, totalNoOfPages]);

  /**
   * a side effect to trigger pagination sequence to uphold cards changes
   */
  useEffect(() => {
    paginationSequence();
  }, [currentlyDisplayedCards, paginationSequence]);

  /**
   * this method changes the current page of the container
   *
   * @param {Number} index varible that uses a number to define current page
   */
  const handlePagination = (index) => {
    setCurrentPage(index);
    scrollinview();
  };

  /**
   * this method is used to trigger the application of filters on searched items
   *
   * @param {Object} e
   */
  const handleApplyFilters = useCallback(() => {
    // e.preventDefault();
    let products;
    if (searcheditems.length === 0) {
      //copy whole db if no item available to search from!
      products = Object.assign([{}], muData);
      // toast(
      //   "please wait searching the whole factory just for you or you can also search for an item and then apply filters :)"
      // );
    } else {
      //copy searcheditems in products
      products = Object.assign([{}], searcheditems);
    }

    //using promise chaining to accomodate serialization of events
    return new Promise((resolve, reject) => {
      if (rating) {
        products = ratingFilter(products, rating);
      }
      if (products.length > 0) resolve(products);
      else reject(new Error("no results in rating"));
    })
      .then((products) => {
        return new Promise((resolve, reject) => {
          if (priceMin === "" && priceMax !== "") {
            products = minMaxPriceFilter(products, 0, priceMax);
          } else if (priceMax === "" && priceMin !== "") {
            products = minMaxPriceFilter(products, priceMin, 9999);
          } else if (priceMax === "" && priceMin === "") {
            if (products.length > 0) resolve(products);
            else reject(new Error("no results in priceminmax"));
          } else {
            products = minMaxPriceFilter(products, priceMin, priceMax);
          }
          if (products.length > 0) resolve(products);
          else reject(new Error("no results in priceminmax"));
        }).then((products) => {
          return new Promise((resolve, reject) => {
            if (tagFiltersArray.length > 0) {
              products = tagsFilter(products, tagFiltersArray);
            }
            if (products.length > 0) resolve(products);
            else reject(new Error("no results in tags"));
          }).then((products) => {
            return new Promise((resolve, reject) => {
              if (brandFiltersArray.length > 0) {
                products = brandsFilter(products, brandFiltersArray);
              }
              if (products.length > 0) resolve(products);
              else reject(new Error("no results in brands"));
            }).then((products) => {
              console.log("after filter products are", products);
              setCurrentlyDisplayedCards(products);
            });
          });
        });
      })
      .catch((error) => {
        console.error(error);
        toast(error);
      });
  }, [
    searcheditems,
    brandFiltersArray,
    tagFiltersArray,
    priceMin,
    priceMax,
    rating,
  ]);
  useEffect(() => {
    if (checkIfFiltersApplied()) {
      handleApplyFilters();
    } else {
      setCurrentlyDisplayedCards(searcheditems);
    }
  }, [searcheditems, checkIfFiltersApplied, handleApplyFilters]);
  /**
   * this method stores the current state of application while opening the product
   * details in new page
   */
  const handleCardClick = () => {
    const oldState = JSON.stringify({
      brandFiltersArray: brandFiltersArray,
      tagFiltersArray: tagFiltersArray,
      priceMin: priceMin,
      priceMax: priceMax,
      rating: rating,
      searchText: searchText,
      currentlyDisplayedCards: currentlyDisplayedCards,
      searcheditems: searcheditems,
    });
    //save current state in localstorage
    localStorage.setItem("oldState", oldState);
  };

  /**
   * side effect to check if old state of application exist!
   * if exists the dispatch refills data in global and local state.
   */
  useEffect(() => {
    let oldState = JSON.parse(localStorage.getItem("oldState"));
    console.log("value in old state is", oldState);
    if (oldState) {
      setSearchText(oldState.searchText);
      setSearcheditems(oldState.searcheditems);
      setCurrentlyDisplayedCards(oldState.currentlyDisplayedCards);
      dispatch({
        type: "POPULATE_FROM_OLDSTATE",
        item: oldState,
      });
      localStorage.clear();
    }
  }, [dispatch]);

  /**
   * side Effect to check if the applicationis mannually refreshed
   * if so then it resets everything
   */
  useEffect(() => {
    if (document.refreshForm?.visited.value !== "") {
      localStorage.clear();
    }
  }, []);
  return (
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
        </div>
      </div>
      <div className="dashboard__aside">
        <div className="dashboard__searchPanel">
          <input
            type="text"
            value={searchText}
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
          <div ref={cardContainer} className="dashboard__cardsContainer">
            {pageContainer?.length > 0 ? (
              pageContainer[currentPage]?.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  clicked={handleCardClick}
                />
              ))
            ) : noResultsMsg ? (
              <NothingFound />
            ) : (
              <TypeSomething />
            )}
          </div>
        )}
        {pageContainer.length > 0 && (
          <div className="dashboard__pagination">
            {pageContainer.length > 1 && (
              <Button
                id="btn_first"
                variant="contained"
                size="small"
                onClick={() => {
                  handlePagination(0);
                }}
              >
                first
              </Button>
            )}
            {pageContainer.length > 1 &&
              pageContainer.map((item, index) => (
                <Button
                  className="pagination__button"
                  key={index}
                  id={"btn_" + index}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    handlePagination(index);
                  }}
                  style={
                    currentPage === index ? { backgroundColor: "#ffd5d5" } : {}
                  }
                >
                  {index + 1}
                </Button>
              ))}
            {pageContainer.length > 1 && (
              <Button
                id="btn_last"
                variant="contained"
                size="small"
                onClick={() => {
                  handlePagination(totalNoOfPages - 1);
                }}
              >
                last
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
