import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState, useContext, ReactNode } from 'react';
import * as setCookieParser from 'set-cookie-parser';

// Define the context type
interface DomainContextType {
  domainList: Array<any>;
  domain: string;
  wsUrl: string;
  updateDomain(url: string): void;
  getTokens(url: string): Promise<string>;
}

// Create the context
const DomainContext = createContext<DomainContextType | undefined>(undefined);

// Create a provider component
interface DomainContextProviderProps {
  children: ReactNode;
}

export function DomainContextProvider({ children }: DomainContextProviderProps) {
  const domainList = [
    {
      id: 0,
      url: 'https://alpha.avidbots.com',
      wsurl: 'wss://alpha.avidbots.com',
      buttonName: 'Alpha Environment',
    },
    {
      id: 1,
      url: 'https://az-alpha.avidbots.com',
      wsurl: 'wss://az-alpha.avidbots.com',
      buttonName: 'Az-Alpha Environment',
    },
  ];
  // const domainList = [
  // 	{
  // 		id: 0,
  // 		url: 'https://command.avidbots.com',
  // 		wsurl: 'wss://command.avidbots.com',
  // 		buttonName: 'Command Center',
  // 	},
  // 	{
  // 		id: 1,
  // 		url: 'https://walmart.avidbots.com',
  // 		wsurl: 'wss://walmart.avidbots.com',
  // 		buttonName: 'Walmart Command Center',
  // 	},
  // ];

  const [domain, setDomain] = useState('');
  const [wsUrl, setWsUrl] = useState('');

  const updateDomain = (_domain: any) => {
    setDomain(_domain.url);
    getTokens(_domain.url);
    const _wsurl = domainList.find((d) => d.url === _domain.url)?.wsurl;
    setWsUrl(_wsurl);
  };

  /**
   *
   * @param domain url from which token has to be generated
   * @returns
   */
  const getTokens = async (_domain?: string) => {
    const url = _domain ? _domain : domain;
    return fetch(`${url}/authentication/v0/ready`, {
      credentials: 'include',
    }).then((res) => {
      const combinedCookieHeader = res.headers.get('Set-Cookie');
      AsyncStorage.setItem('cookie', combinedCookieHeader);
      const splitCookieHeaders = setCookieParser.splitCookiesString(combinedCookieHeader);
      const cookies = setCookieParser.parse(splitCookieHeaders);
      const token = cookies.find((d) => d?.name === 'XSRF-TOKEN').value;

      AsyncStorage.setItem('_token', token);
      return token;
    });
  };

  const contextValue: DomainContextType = {
    domainList,
    domain,
    wsUrl,
    updateDomain,
    getTokens,
  };

  return <DomainContext.Provider value={contextValue}>{children}</DomainContext.Provider>;
}

// Custom hook to access the context
export function useDomainContext() {
  const context = useContext(DomainContext);
  if (!context) {
    throw new Error('useDomainContext must be used within a Provider');
  }
  return context;
}
