import { ParsedUrlQuery } from "querystring";

export interface QueryProps extends ParsedUrlQuery {
    [key: string]: string;
  }
  