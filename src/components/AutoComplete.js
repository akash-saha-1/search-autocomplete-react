import React, { useState, useEffect, useRef } from 'react';
import * as data from './../data/data.json';

const AutoComplete = (props) => {
  const [display, setDisplay] = useState(false);
  const [fullList, setFullList] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState('');
  const [noResult, setNoResult] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    //console.log(data.default);
    setFullList(data.default);
    setFilter(data.default);
    window.addEventListener('mousedown', handleClickOutside);
    //document.getElementsByClassName('card').
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const selectUser = (user) => {
    props.setTableData([user]);
    setFilter();
    setDisplay(false);
  };

  const selectUsers = (users) => {
    props.setTableData(users);
    setFilter();
    setDisplay(false);
  };

  const searchUsers = (e) => {
    let val = e.target.value;
    setSearch(val);
    if (val) {
      let newResult = [...fullList];
      newResult = newResult.filter(
        (item) =>
          item.name.includes(val) ||
          item.id.includes(val) ||
          item.address.includes(val) ||
          item.pincode.includes(val) ||
          item.items.toString().includes(val)
      );
      if (newResult && newResult.length > 0) {
        setFilter(newResult);
        setNoResult(false);
        setDisplay(true);
      } else {
        setNoResult(true);
        setDisplay(true);
      }
    } else {
      setDisplay(false);
      setNoResult(false);
    }
  };
  // key down function on each element
  const keyDown = (e, value) => {
    let key = e.keyCode || e.which;
    let cards = document.getElementsByClassName('card');
    if (cards) {
      Array.prototype.forEach.call(cards, function (el) {
        el.style.pointerEvents = 'none';
      });
    }
    //downArrow
    if (key === 40) {
      if (e.target.nextElementSibling) e.target.nextElementSibling.focus();
    }
    //up arrow
    if (key === 38) {
      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.focus();
      } else {
        document.getElementById('search-input').focus();
        let cards = document.getElementsByClassName('card');
        if (cards) {
          Array.prototype.forEach.call(cards, function (el) {
            el.style.pointerEvents = 'auto';
          });
        }
      }
    }
    //enter key
    if (key === 13) {
      selectUser(value);
    }
  };
  //key press event on search bar
  const keyDownSearch = (e) => {
    let key = e.which || e.keyCode;
    //down arrow
    if (key === 40) {
      let cards = document.getElementsByClassName('card');
      if (cards) {
        cards[0].focus();
        Array.prototype.forEach.call(cards, function (el) {
          el.style.pointerEvents = 'none';
        });
      }
    }
    //enter key
    if (key === 13) {
      if (filter && filter.length > 0) {
        selectUsers([...filter]);
      }
    }
  };

  const focusElem = () => {
    let cards = document.getElementsByClassName('card');
    if (cards) {
      Array.prototype.forEach.call(cards, function (el) {
        el.style.pointerEvents = 'none';
      });
    }
  };

  return (
    <>
      <div ref={wrapperRef}>
        <div className="flex-container flex-column pos-rel search-container">
          <label htmlFor="search-input" className="search-label">
            <i className="fa fa-search" aria-hidden="true"></i>
            <span className="sr-only">Search icons</span>
          </label>
          <input
            id="search-input"
            className="search-input"
            name="abc"
            onClick={searchUsers}
            placeholder="Search users by ID, address, name, pincode"
            value={search}
            onChange={searchUsers}
            onKeyDown={keyDownSearch}
          />
        </div>
        {display && (
          <div
            className={`autoContainer result-container ${
              noResult ? 'no-result' : ''
            }`}
          >
            {noResult && <p className="no-user">No User Found</p>}
            {!noResult &&
              filter &&
              filter.map((value, i) => {
                return (
                  <div
                    onClick={() => selectUser(value)}
                    className="option card"
                    key={i}
                    tabIndex="0"
                    onKeyDown={(e) => keyDown(e, value)}
                    //onFocus={focusElem}
                  >
                    <p>
                      <b>{value.id}</b>
                    </p>
                    <p>
                      <i>{value.name}</i>
                    </p>
                    <p>{value.address}</p>
                    <p>{value.pincode}</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default AutoComplete;
