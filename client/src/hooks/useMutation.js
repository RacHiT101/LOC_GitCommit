import { useState, useCallback } from "react";
import axios from "axios";
import {useAuth} from "../providers/AuthProvider.jsx";

/**
 * Used for request that is sent on event happens, for example, send DELETE request on button click
 * Calling the hook does not make the request. To send request, please use "run" method, returned by this hook
 * "run" method takes in the body and header of the request. When making GET or DELETE request, body is ignored
 * by default.
 *
 * @param url the url of the resource
 * @param type a string represents the method, please use HTTP_METHOD from ./http-method.js
 * @return {{
 *   isLoading: boolean,
 *   isError: boolean,
 *   data: any,
 *   run: ((function(body, headers): Promise<void>)|*),
 *   error: {status: number, message: string}
 * }}
 */
export const useMutation = (url, type) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {getAccessToken} = useAuth()

  const run = useCallback(
    async ({ body = {}, query, headers } = {}) => {
      const method = type.toLowerCase();
      let res;
      const queryString = new URLSearchParams(query).toString();
      try {
        setLoading(true);
        if (method === "delete" || method === "get") {
          res = await axios[method](
            `${import.meta.env.VITE_SERVICE_URL}/${url}?${queryString}`,
            {
              headers: {
                Authorization: `Bearer ${getAccessToken?.()}`,
                ...(headers || {})
              }
            }
          );
        } else {
          res = await axios[method](
            `${import.meta.env.VITE_SERVICE_URL}/${url}?${queryString}`,
            body,
            {
              headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                ...(headers || {})
              }
            }
          );
        }
        setData(res.data);
        setLoading(false);
        return res.data;
      } catch (e) {
        setLoading(false);
        setError({
          status: e.response?.status,
          message: e.response?.data,
        });
        throw e;
      }
    },
    [url, type]
  );

  return {
    data,
    error,
    isError: error !== null,
    isLoading: loading,
    run,
  };
};
