/* eslint-disable no-undef */
import React from 'react';
import './App.css';
import cheerio from 'cheerio';
import request from 'request'

const searchUrbanDict = function(word){
  const query = word.selectionText;
  const url = "http://humanum.arts.cuhk.edu.hk/Lexis/lexi-mf/search.php?word=" + query;

  // open new tab for result
  // chrome.tabs.create({ url });

  const options = {
    method: 'POST',
    url,
    headers: {
      'Access-Control-Allow-Origin': 'no-cors'
    }
  };

  const callback = (error, response, html) => {
    console.info('request callback');
      if (!error && response.statusCode === 200){
        console.info('done in getting html from ', url);
        const $ = cheerio.load(html, { decodeEntities: false });
        const result = $('#char_info_table > tbody > tr:nth-child(3) > td:nth-child(2)').html();
        alert(result)
      } else {
        console.error('request failed', error);
      }
    };

  request(options, callback)
};

chrome.contextMenus.create({
  title: "查詢倉頡碼",
  contexts:["selection"],  // ContextType
  onclick: searchUrbanDict // A callback function
});

function App() {
  return (
    <div className="App">
      右Click中文字，按Popup menu上的「查詢倉頡碼」即可
    </div>
  );
}

export default App;
