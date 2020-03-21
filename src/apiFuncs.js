import axios from "axios";
import APIKey from "./secrets";
export const baseUrl = "http://newsapi.org/v2/";
export const topHeadlines = `${baseUrl}top-headlines?apiKey=${APIKey}&q=coronavirus&pageSize=100`;

export const getEverything = async (domains, language, sorting) => {
  let endPoint = `${baseUrl}everything?apiKey=${APIKey}&q=coronavirus&pageSize=100`;
  if (domains) endPoint += `&domains=${domains}`;
  if (language) endPoint += `&language=${language}`;
  if (sorting) endPoint += `&sorting=${sorting}`;

  const result = await axios.get(endPoint).then(({ data }) => data);
  return result;
};

export const getTopHeadlines = () => {};

// setup category or q for corona virus everytime

// if everything
// params: domains, date(2020-03-21), language, sorting(relevancy, popularity, publishedAt(newer first))
// function to extract filtered data, maybe a switch for the url. like a builder

// top headlines
// params: country(code), category(general, health, science, technology, sports, business),
// filter by country, category
