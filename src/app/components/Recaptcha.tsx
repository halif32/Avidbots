import ReCaptchaV3 from '@fatnlazycat/react-native-recaptcha-v3';
import { useGlobalContext } from 'contexts/GlobalContext';
import { useEffect, useRef } from 'react';


export const ReCaptcha = () => {
	const webViewReloadRef = useRef<{ reload: () => void }>();
	const { reCaptchaKeys, isCaptchaVisible, setCaptchaVisible, captchaTokens } = useGlobalContext();

	useEffect(()=> {
		setCaptchaVisible(false);
	},[]);

	return isCaptchaVisible ? (
		<ReCaptchaV3
			url={reCaptchaKeys.URL}
			siteKey={reCaptchaKeys.SITE_KEY}
			containerStyle={{ height: 0 }}
			onExecute={(token: string) => {
				captchaTokens.push(token);
				setCaptchaVisible(false);
			}}
			webViewReload={(fn) => (webViewReloadRef.current = fn)}
			// 1 - invisible(V3) ||  2- normal(V2)
			reCaptchaType={1}
		/>
	) : null;
};
